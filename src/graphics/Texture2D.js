EEE.Texture2D = class Texture2D extends EEE.Texture{
    constructor(){
        super();
        this.wrapS = EEE.GL_REPEAT;
        this.wrapT = EEE.GL_REPEAT;
        this.minFilter = EEE.GL_LINEAR;
        this.magFilter = EEE.GL_LINEAR;
    }
}