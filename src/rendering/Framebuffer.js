EEE.Framebuffer = class FrameBuffer{
    constructor(){
        this.width = 512;
        this.height = 512;
        this.glTexture = null;
        this.glFramebuffer = null;
        this.isInitialized = false;
        this.needsUpdate = true;
    }

    Initialize(gl){
        const attachment = gl.COLOR_ATTACHMENT0;
        this.glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texImage2D( 
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            this.width,
            this.height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        this.glFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer( gl.FRAMEBUFFER, this.glFramebuffer );
        gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, this.glTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    Update(gl){
        if(this.needsUpdate){
            if(this.glFramebuffer == null){
                this.Initialize(gl);
            }
            this.needsUpdate = false;
        }
    }
}