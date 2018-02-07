EEE.Material = class Material{
    constructor( passes ){
        this.diffuseColor = new EEE.Color(1,1,1,1);
		
		this.textures = [
			null, // gl.TEXTURE4 // diffuseTexture
			null, // gl.TEXTURE5 // metallicSmoothnessTexture
			null, // gl.TEXTURE6 // normalTexture
			null, // gl.TEXTURE7 // lightmap
			null  // gl.TEXTURE8 // lightmapDir
		];
		
		this.textureTransforms = [
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1)
		];
		
		this.lightmap = null;
		this.lightmapDir = null;
		
        this.passes = passes || 
            [
                new EEE.MaterialPass( 
                    EEE.SHADERLIB.vertex.default, 
                    EEE.SHADERLIB.fragment.default,
                    true
                )
            ];
        this.u_blockMaterial = null;
    }
		
	get diffuseTexture(){ return this.textures[0]; }
	set diffuseTexture(t){ this.textures[0] = t; }
	
	get diffuseTextureTS(){ return this.textureTransforms[0]; }
	set diffuseTextureTS(t){ this.textureTransforms[0] = t; }
	
	get metallicSmoothnessTexture(){ return this.textures[1]; }
	set metallicSmoothnessTexture(t){ this.textures[1] = t; }
	
	get normalTexture(){ return this.textures[2]; }
	set normalTexture(t){ this.textures[2] = t; }
	
	get normalTextureTS(){ return this.textureTransforms[2]; }
	set normalTextureTS(t){ this.textureTransforms[2] = t; }
	
	BindTextures(){
		for( var i = 0; i < this.textures.length; i++ ){
			if( this.textures[i] != null){
				if(this.textures[i].glTexture != null){
					gl.activeTexture( gl.TEXTURE5+i );
					gl.bindTexture( gl.TEXTURE_2D, this.textures[i].glTexture);
				}
			}
		}
	}
	
    Update(){
    
	}
}