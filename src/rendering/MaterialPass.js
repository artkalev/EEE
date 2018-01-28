EEE.MaterialPass = class MaterialPass{
    constructor( glProgram ){
        this.glProgram = glProgram;
        this.enableDepth = true;
        this.drawMode = EEE.GL_TRIANGLES;
    }

    Use(gl){
        this.glProgram.Use(gl);
    }
}