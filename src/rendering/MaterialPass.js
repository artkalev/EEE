EEE.MaterialPass = class MaterialPass{
    constructor( vertexShaderSource, fragmentShaderSource ){
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        // drawing options
        this.depthFunc = EEE.GL_DEPTH_LEQUAL;
        this.drawMode = EEE.GL_TRIANGLES;
    }
}