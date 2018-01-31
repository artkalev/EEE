// pass information is used and referenced before drawcall is executed.
// to avoid binding attributes and uniforms multiple times,
// strict layouting must be followed in shaders!
// one uniform block is shared across all passes

EEE.MaterialPass = class MaterialPass{
    constructor( vertexShaderSource, fragmentShaderSource ){
        // shader sources
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        
        // gl shaders and program
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        this.uboIndex = 0;
        
        // drawing options
        this.depthFunc = EEE.GL_DEPTH_LEQUAL;
        this.drawMode = EEE.GL_TRIANGLES;
    }

    Compile( gl ){
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

        gl.linkProgram(this.program);
    }

    ApplyOptions( gl ){
        // todo
        // depth sorting
        // stencil
        // drawmode
        // etc
        // will be set here
        // this is done before drawing
    }
}