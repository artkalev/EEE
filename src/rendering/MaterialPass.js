// pass information is used and referenced before drawcall is executed.
// to avoid binding attributes and uniforms multiple times,
// strict layouting must be followed in shaders!
// one uniform block is shared across all passes

EEE.MaterialPass = class MaterialPass{
    constructor( vertexShaderSource, fragmentShaderSource, useUniformBlocks, uniforms ){
        // shader sources
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        
        this.uniforms = uniforms || {
			"u_matrixModel":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_matrixView":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_matrixProjection":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_diffuseTexture":{ type : EEE.UNIFORM_INT, value:5, location:0 },
			"u_diffuseTextureTS":{ type : EEE.UNIFORM_VEC4, value:null, location:0 },
			"u_metallicSmoothnessTexture":{ type : EEE.UNIFORM_INT, value:6, location:0 },
			"u_normalTexture":{ type : EEE.UNIFORM_INT, value:7, location:0 },
			"u_normalTextureTS":{ type : EEE.UNIFORM_VEC4, value:null, location:0 },
			"u_lightmapTexture":{ type : EEE.UNIFORM_INT, value:8, location:0 },
			"u_lightmapDirTexture":{ type : EEE.UNIFORM_INT, value:9, location:0 }
		};
        this.useUniformBlocks = useUniformBlocks;
        // gl shaders and program
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        this.u_blockGlobalIndex = null;
        this.u_blockModelIndex = null;
        
        // drawing options
        this.enableDepth = true;
		this.enableStencil = true;
        this.cull = EEE.GL_CULL_FRONT;
        this.depthFunc = EEE.GL_DEPTH_LEQUAL;
        this.drawMode = EEE.GL_TRIANGLES;
    }

    Compile(){
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource( this.vertexShader, this.vertexShaderSource );
        gl.shaderSource( this.fragmentShader, this.fragmentShaderSource );

        gl.compileShader( this.vertexShader );
        var error = gl.getShaderInfoLog(this.vertexShader);
        if (error.length > 0) {
            console.error( this.vertexShaderSource );
            throw error;
        }

        gl.compileShader( this.fragmentShader );
        var error = gl.getShaderInfoLog(this.fragmentShader);
        if (error.length > 0) {
            console.error( this.fragmentShaderSource );
            throw error;
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);

        gl.bindAttribLocation(this.program, 0, "a_vertex");
		gl.bindAttribLocation(this.program, 1, "a_normal");
		gl.bindAttribLocation(this.program, 2, "a_color");
        gl.bindAttribLocation(this.program, 3, "a_uv0");
        gl.bindAttribLocation(this.program, 4, "a_uv1");

        gl.linkProgram(this.program);
		
		for(var name in this.uniforms){
            this.uniforms[name].location = gl.getUniformLocation(this.program, name);
        }
    }

    ApplyOptions(){
        if(this.enableDepth){ gl.enable(gl.DEPTH_TEST); }
		if(this.enableStencil){ gl.enable(gl.DEPTH_TEST); }
        gl.enable(gl.CULL_FACE);
        gl.cullFace( this.cull );
    }

    Use(){
        if(this.program == null){
            this.Compile();
        }
        this.ApplyOptions();
        gl.useProgram( this.program );
		for(var name in this.uniforms){
			switch( this.uniforms[name].type ){
				case EEE.UNIFORM_MAT4:
					gl.uniformMatrix4fv( 
						this.uniforms[name].location, 
						false, 
						this.uniforms[name].value 
					);
					break;
				case EEE.UNIFORM_FLOAT:
					gl.uniform1f(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_INT:
					gl.uniform1i(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_VEC3:
					gl.uniform3fv(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_VEC4:
					gl.uniform4fv(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
			}
		}
    }
}