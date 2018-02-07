// in order to optimise rendering(especially multipass rendering)
// shaders must adhere to explicit layout locationing.

// normally shaders should make use of : 
//      EEE.SHADERLIB.attributes
//      EEE.SHADERLIB.uniforms
// this ensures correct and consistent attribute and uniform references

EEE.SHADERLIB = {};
EEE.SHADERLIB.header = `#version 300 es
    precision mediump float;
`;
EEE.SHADERLIB.attributes = `
    layout(location = 0) in vec3 a_vertex;
    layout(location = 1) in vec3 a_normal;
    layout(location = 2) in vec4 a_color;
    layout(location = 3) in vec2 a_uv0;
    layout(location = 4) in vec2 a_uv1;
`;
EEE.SHADERLIB.uniforms = `
    uniform mat4 u_matrixView;
    uniform mat4 u_matrixProjection;
    uniform mat4 u_matrixModel;
	
	uniform sampler2D u_diffuseTexture;
	uniform vec4 u_diffuseTextureTS;
	
	uniform sampler2D u_normalTexture;
	uniform vec4 u_normalTextureTS;
	
	uniform sampler2D u_metallicSmoothnessTexture;
	uniform sampler2D u_lightmapTexture;
	uniform sampler2D u_lightmapDirTexture;
`;
EEE.SHADERLIB.vertex = {
    default :   
        EEE.SHADERLIB.header +
        EEE.SHADERLIB.attributes +
        EEE.SHADERLIB.uniforms + `

        out vec3 v_vertex;
		out vec4 v_vertexWorld;
        out vec3 v_normal;
        out vec3 v_normalWorld;
        out vec4 v_color;
        out vec2 v_uv0;
        out mat3 v_normalMatrix;
        
        void main(){
        	v_vertex = a_vertex;
			v_vertexWorld = u_matrixModel * vec4( a_vertex, 1.0 );
            v_normal = normalize(a_normal);
            v_normalWorld = normalize(mat3(u_matrixModel) * v_normal);
        	v_color = a_color;
        	v_uv0 = a_uv0;
			
        	gl_Position = u_matrixProjection * u_matrixView * u_matrixModel * vec4( a_vertex, 1.0 );
        	gl_PointSize = 10.0;
        }
    `,
    screenQuad : 
        EEE.SHADERLIB.header +
        EEE.SHADERLIB.attributes + `
        
        out vec3 v_vertex;
        out vec2 v_uv0;
        void main(){
            v_vertex = a_vertex;
            v_uv0 = a_uv0;
            gl_Position = vec4( a_vertex*2.0, 1.0 );
        }

    `
};
EEE.SHADERLIB.fragment = {
    default:
		EEE.SHADERLIB.header +
        `precision mediump float;
        in vec3 v_vertex;
		in vec4 v_vertexWorld;
        in vec3 v_normal;
        in vec3 v_normalWorld;
        in vec4 v_color;
        in vec2 v_uv0;
		in mat3 v_normalMatrix;`+

        EEE.SHADERLIB.uniforms+`
		
		layout(location = 0) out vec4 normalDepth;
        layout(location = 1) out vec4 diffuseColor;
		layout(location = 2) out vec4 metallicSmoothness;
		
		mat3 TBN( vec3 p, vec3 N, vec2 uv ){
			vec3 dp1 = dFdx(p);
			vec3 dp2 = dFdy(p);
			vec2 duv1 = dFdx(uv);
			vec2 duv2 = dFdy(uv);
			// solve the linear system
			vec3 dp2perp = cross(dp2, N);
			vec3 dp1perp = cross(N, dp1);
			vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
			vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
			// construct a scale-invariant frame
			float invmax = inversesqrt(max(dot(T,T), dot(B,B)));
			return mat3(T * invmax, B * invmax, N);
		}
		
        void main(){
			mat3 tbn = TBN( v_vertexWorld.xyz, -v_normalWorld, v_uv0 );
			vec3 normalTex = texture( u_normalTexture, v_uv0 * u_normalTextureTS.zw ).xyz*2.0-1.0;
			normalTex.y *= -1.0;
			vec3 normal = -normalize( tbn * normalTex );
			
        	normalDepth = vec4( normal*0.5+0.5, gl_FragCoord.z );
			diffuseColor = texture( u_diffuseTexture, v_uv0 * u_diffuseTextureTS.zw );
			metallicSmoothness = vec4( v_vertexWorld.xyz , 1.0 );
        }
	`,
	deferredCompose:
		EEE.SHADERLIB.header + `
		in vec3 v_vertex;
		in vec2 v_uv0;
		
		uniform sampler2D u_depth;
		uniform sampler2D u_normalDepth;
		uniform sampler2D u_diffuseColor;
		uniform sampler2D u_normMetalSmoothness;
		
		uniform vec3 u_cameraPosition;
		uniform mat4 u_matrixView;
		uniform mat4 u_matrixViewInverse;
		uniform mat4 u_matrixProjection;
		uniform mat4 u_matrixProjectionInverse;
		uniform float u_near;
		uniform float u_far;
		
		out vec4 out_color;
		
		float LinearDepth( float depth ){
			return (2.0 * u_near) / (u_near + u_far - depth * (u_far - u_near));
		}
		
		vec3 WorldPositionFromDepth( float depth, vec2 uv ){
			vec4 p = u_matrixProjectionInverse * (vec4(uv, depth, 1.0) * 2.0 - 1.0);
			vec3 viewspace_position = p.xyz / p.w;
			return vec3(u_matrixViewInverse * vec4(viewspace_position, 1));
		}
		
		vec3 CalculateLight( vec3 worldPos, vec3 worldNormal, vec3 color, vec3 lightPos, float falloff ){
			vec3 L = vec3(0.0);
			vec3 lw = lightPos-worldPos;
			float f = max(0.0,(falloff - length(lw))/falloff);
			L = color * max( 0.0, dot( normalize(lw), worldNormal )) * f;
			return L;
		}
		
		vec3 AccumulateLight( vec3 worldPos, vec3 worldNormal ){
			vec3 L = vec3(0.0,0.0,0.0);
			
			L += CalculateLight(
				worldPos,
				worldNormal,
				vec3(1.0,1.0,1.0),
				vec3(0.0,2.0,3.0),
				10.0
			);
			
			L += CalculateLight(
				worldPos,
				worldNormal,
				vec3(0.0,1.0,1.0),
				vec3(2.0,2.0,-3.0),
				10.0
			);
			return L;
		}
		
		void main(){
			float depth = texture( u_depth, v_uv0 ).x;
			vec4 normalDepth = texture( u_normalDepth, v_uv0 );
			vec4 diffuseColor = texture( u_diffuseColor, v_uv0 );
			
			vec3 worldPos = WorldPositionFromDepth( depth, v_uv0 );
			vec3 worldNormal = normalDepth.xyz*2.0-1.0;
			
			vec3 lightPos = vec3(0.0,3.0,0.0);
			float lightRadius = 10.0;
			
			vec3 L = AccumulateLight( worldPos, worldNormal );
			
			out_color = vec4( diffuseColor.xyz * L, 1.0 );
			
			// draw debug views
			
			vec2 c = v_uv0*4.0;
			bool m0 = c.x < 1.0 && c.y < 1.0;
			vec3 debugNormal = texture( u_normalDepth, c ).xyz;
			
			bool m1 = c.x < 1.0 && c.y < 2.0 && c.y > 1.0;
			vec3 debugDiffuse = texture( u_diffuseColor, c - vec2(0.0,1.0) ).xyz;
			
			bool m2 =  c.x < 1.0 && c.y < 3.0 && c.y > 2.0;
			vec3 debugWorldPos = WorldPositionFromDepth( texture( u_depth, c - vec2(0.0,2.0) ).x, c - vec2(0.0,2.0) );
			
			bool m3 =  c.x < 1.0 && c.y < 4.0 && c.y > 3.0;
			vec3 debugLight = AccumulateLight( 
				WorldPositionFromDepth( texture( u_depth, c - vec2(0.0,3.0) ).x, c - vec2(0.0,3.0) ),
				texture( u_normalDepth, c - vec2(0.0,3.0) ).xyz 
			);
			
			if(m0 == true){
				out_color.xyz = debugNormal*2.0-1.0;
			}else if( m1 == true ){
				out_color.xyz = debugDiffuse;
			}else if( m2 == true ){
				out_color.xyz = debugWorldPos;
			}else if( m3 == true ){
				out_color.xyz = debugLight;
			}
		}
	`,
    screenQuad:
        EEE.SHADERLIB.header + `
        in vec3 v_vertex;
        in vec2 v_uv0;

        uniform sampler2D u_tex;

        out vec4 out_color;
        void main(){
            out_color = texture( u_tex, v_uv0 );
        }
    `
};