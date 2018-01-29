// pass information is used and referenced before drawcall is executed.
// to avoid binding attributes and uniforms multiple times,
// strict layouting must be followed in shaders!

EEE.MaterialPass = class MaterialPass{
    constructor( vertexShaderSource, fragmentShaderSource ){
        // shader sources
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        // gl shaders and program
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        // drawing options
        this.depthFunc = EEE.GL_DEPTH_LEQUAL;
        this.drawMode = EEE.GL_TRIANGLES;
    }
}