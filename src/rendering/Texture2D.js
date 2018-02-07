EEE.Texture2D = class Texture2D{
	constructor( width, height, internalFormat, pixelFormat, pixelType, url ){
		this.width = 2;
		this.height = 2;
		this.internalFormat = internalFormat || EEE.GL_RGBA;
		this.pixelFormat = pixelFormat || EEE.GL_RGBA;
		this.pixelType = pixelType || EEE.GL_UNSIGNED_BYTE;
		this.glTexture = null;
		this.source = null;
		this.url = url;
		if(this.url != null){
			this.Load( this.url );
		}
	}
	
	Initialize(){
		this.glTexture = gl.createTexture();
		gl.bindTexture( gl.TEXTURE_2D, this.glTexture );
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			this.internalFormat,
			this.width,
			this.height,
			0,
			this.pixelFormat,
			this.pixelType,
			this.source
		);
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, 2);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}
	
	Resize(width, height){
		this.width = width;
		this.height = height;
		gl.bindTexture( gl.TEXTURE_2D, this.glTexture );
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			this.internalFormat,
			this.width,
			this.height,
			0,
			this.pixelFormat,
			this.pixelType,
			null
		);
	}
	
	Load( url ){
		this.source = new Image();
		var self = this;
		this.source.addEventListener("load",function(){
			self.width = self.source.width;
			self.height = self.source.height;
			
			if(self.glTexture == null){ self.glTexture = gl.createTexture(); }
			gl.bindTexture( gl.TEXTURE_2D, self.glTexture );
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				self.internalFormat,
				self.width,
				self.height,
				0,
				self.pixelFormat,
				self.pixelType,
				self.source
			);
			if( IsPowerOfTwo(self.width) && IsPowerOfTwo(self.height)){
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			}
			console.log("texture loaded", self);
		});
		this.source.src = url;
		return this;
	}
}

