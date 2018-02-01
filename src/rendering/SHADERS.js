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
    layout (std140) uniform u_blockGlobal {
        mat4 u_matrixView;
        mat4 u_matrixProjection;
        float u_time;
        float u_deltaTime;
    };
    
    layout (std140) uniform u_blockModel {
        mat4 u_matrixModel;
        float u_opacity;
    };

    layout (std140) uniform u_blockMaterial {
        vec4 u_diffuseColor;
        //vec3 u_emissiveColor;
    };
`;
EEE.SHADERLIB.vertex = {
    default :   
        EEE.SHADERLIB.header +
        EEE.SHADERLIB.attributes +
        EEE.SHADERLIB.uniforms + `

        out vec3 v_vertex;
        out vec3 v_normal;
        out vec3 v_normalWorld;
        out vec4 v_color;
        out vec2 v_uv0;
        
        void main(){
        	v_vertex = a_vertex;
            v_normal = normalize(a_normal);
            v_normalWorld = (u_matrixModel * vec4(a_normal, 0.0)).xyz;
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
            gl_Position = vec4( a_vertex, 1.0 );
        }

    `
};
EEE.SHADERLIB.fragment = {
    default:[
        "#version 300 es",
        "precision mediump float;",
        "in vec3 v_vertex;",
        "in vec3 v_normal;",
        "in vec3 v_normalWorld;",
        "in vec4 v_color;",
        "in vec2 v_uv0;",
        "out vec4 out_color;",

        EEE.SHADERLIB.uniforms,

        "void main(){",
        "	out_color = vec4( v_normalWorld*0.5+0.5, 1.0 );",
        "}"
    ].join("\n"),
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