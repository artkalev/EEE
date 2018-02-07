EEE.GBuffer = class GBuffer{
    constructor(width, height){
        this.width = width;
        this.height = height;
		this.depth = new EEE.Texture2D( this.width, this.height, EEE.GL_DEPTH_COMPONENT24, EEE.GL_DEPTH_COMPONENT, EEE.GL_UNSIGNED_INT );
        this.normalDepth = new EEE.Texture2D( this.width, this.height, gl.RGBA, gl.RGBA, EEE.GL_UNSIGNED_BYTE );
		this.diffuseColor = new EEE.Texture2D( this.width, this.height, EEE.GL_RGBA, EEE.GL_RGBA, EEE.GL_UNSIGNED_BYTE );
		this.metallicSmoothness = new EEE.Texture2D( this.width, this.height, EEE.GL_RGBA, EEE.GL_RGBA, EEE.GL_UNSIGNED_BYTE );
        this.glFramebuffer = null;
        this.isInitialized = false;
        this.needsUpdate = true;
    }

    Initialize(){
		this.depth.Initialize(gl);
		this.normalDepth.Initialize(gl);
		this.diffuseColor.Initialize(gl);
		this.metallicSmoothness.Initialize(gl);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture( gl.TEXTURE_2D, this.depth.glTexture );
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture( gl.TEXTURE_2D, this.normalDepth.glTexture );
		
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture( gl.TEXTURE_2D, this.diffuseColor.glTexture );
		
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture( gl.TEXTURE_2D, this.metallicSmoothness.glTexture );
		
        this.glFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, this.glFramebuffer );
		gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.normalDepth.glTexture, 0);
		gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.diffuseColor.glTexture, 0);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this.metallicSmoothness.glTexture, 0);
		
		var status = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER);
        if (status != gl.FRAMEBUFFER_COMPLETE) {
            console.log('fb status: ' + status.toString(16));
            return;
        }
		
		gl.drawBuffers([
            gl.COLOR_ATTACHMENT0,
            gl.COLOR_ATTACHMENT1,
			gl.COLOR_ATTACHMENT2
        ]);
		
		
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    }
	
	ResizeTextures(){
		this.depth.Resize(this.width, this.height);
		this.normalDepth.Resize(this.width, this.height);
		this.diffuseColor.Resize(this.width, this.height);
		this.metallicSmoothness.Resize(this.width, this.height);
	}
	
	Resize( width, height ){
		this.width = width;
		this.height = height;
		this.needsUpdate = true;
	}

    Update(){
        if(this.needsUpdate){
            if(this.glFramebuffer == null){
                this.Initialize();
            }
			this.ResizeTextures();
            this.needsUpdate = false;
        }
    }
}