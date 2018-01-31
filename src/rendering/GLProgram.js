EEE.GLProgram = class GLProgram{
    constructor(vsSource, fsSource){
        this.vsSource = vsSource;
        this.fsSource = fsSource;
        this.vs = null;
        this.fs = null;
        //this.uniformLocations = {};
        this.program = null;
        this.uboIndex = 0;
    }

    Use(gl){
        if(this.program == null){
            this.Initialize(gl);
        }
        gl.useProgram(this.program);
    }

    Initialize( gl ){
        // assign vertex shader source and compile it
        this.vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.vs, this.vsSource);
        gl.compileShader(this.vs);
        var error = gl.getShaderInfoLog(this.vs);
        if (error.length > 0) {
            throw error;
        }

        // assign fragment shader source and compile it
        this.fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.fs, this.fsSource);
        gl.compileShader(this.fs);
        var error = gl.getShaderInfoLog(this.fs);
        if (error.length > 0) {
            throw error;
        }

        //create and setup shader program
        this.program = gl.createProgram();
        gl.attachShader( this.program, this.vs );
        gl.attachShader( this.program, this.fs );
        gl.bindAttribLocation(this.program, 0, "a_vertex");
		gl.bindAttribLocation(this.program, 1, "a_normal");
		gl.bindAttribLocation(this.program, 2, "a_color");
        gl.bindAttribLocation(this.program, 3, "a_uv0");
        this.uboIndex = gl.getUniformBlockIndex(this.program, "u_block");
        gl.linkProgram( this.program );
        this.GetUniformLocations(gl);
    }

    SetUniform( gl, name, value, type, texIndex){
        if(value == null){return;}
        if(this.uniformLocations[name]){
            switch(type){
                case EEE.UNIFORM_MATRIX4: gl.uniformMatrix4fv( this.uniformLocations[name], false, value ); break;
                case EEE.UNIFORM_VEC4: gl.uniform4fv( this.uniformLocations[name], value ); break;
                case EEE.UNIFORM_SAMPLER2D: 
                    gl.uniform1i( this.GetUniformLocations[name], texIndex );
                    break;
            }
        }
    }

    GetUniformLocations(gl){
        var re = new RegExp( /uniform .* (.*);/g, "m");
        var lines = (this.vsSource + this.fsSource).split("\n");
        for(var i = 0; i < lines.length; i++){
            var e = re.exec( lines[i]);
            if(e != null){
                this.uniformLocations[e[1]] = gl.getUniformLocation(this.program, e[1]);
            }
        }
        console.log( this.uniformLocations );
    }
}