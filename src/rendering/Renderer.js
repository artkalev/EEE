EEE.Renderer = class Renderer{
	constructor(){
		this.matrix_model = new EEE.Mat4().Identity(); 
		this.matrix_view = new EEE.Mat4().Identity();
		this.matrix_projection = new EEE.Mat4().Identity();

		this.pixelScale = 1;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.gl = this.canvas.getContext("webgl2", {antialias:0});
		if(!this.gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild( this.canvas );

		this.activeProgram = null;
		this.defaultMaterial = new EEE.Material();
		this.defaultMaterial.passes.push(
			new EEE.MaterialPass(
				new EEE.GLProgram(
					EEE.SHADERLIB.vertex.default,
					EEE.SHADERLIB.fragment.default
				)
			)
		);
		this.defaultTexture = new EEE.Texture();
		this.defaultMaterial.uniforms["u_diffuse_texture"].value = this.defaultTexture;
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth / this.pixelScale);
		this.canvas.height = Math.round(window.innerHeight / this.pixelScale);
	}

	RenderGUI( gui ){
		for(var i = 0; i < gui.elements.length; i++){
			gui.elements[i].Draw();
		}
	}

	Render( scene, camera ){

		this.matrix_view = camera.matrix_view;
		if( this.canvas.width != camera.width || this.canvas.height != camera.height ){
			camera.width = this.canvas.width;
			camera.height = this.canvas.height;
			camera.UpdateProjectionMatrix();
		} 
		this.matrix_projection = camera.matrix_projection;

		this.gl.clearColor( 
			scene.backgroundColor.r,
			scene.backgroundColor.g,
			scene.backgroundColor.b,
			scene.backgroundColor.a
		);
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.clear( this.gl.COLOR_BUFFER_BIT, this.gl.DEPTH_BUFFER_BIT );

		for(var i = 0; i < scene.objects.length; i++){
			var o = scene.objects[i];
			if(o.drawable){
				this.matrix_model = o.localToWorld;
				this.RenderDrawable( o.drawable );
			}
		}
	}

	RenderDrawable( drawable, material){
		var mat = material || this.defaultMaterial;
		for(var i = 0; i < mat.passes.length; i++){
			if(mat.passes[i].enableDepth == true){
				this.gl.enable(this.gl.DEPTH_TEST);
			}
			this.gl.enable(this.gl.CULL_FACE);
			switch(mat.passes[i].cullFace){
				case 0: this.gl.cullFace(this.gl.FRONT_AND_BACK); break;
				case 1: this.gl.cullFace(this.gl.BACK); break;
				case 2: this.gl.cullFace(this.gl.FRONT); break;
			}

			mat.passes[i].Use(this.gl);

			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_model", this.matrix_model.data, EEE.UNIFORM_MATRIX4);
			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_view", this.matrix_view.data, EEE.UNIFORM_MATRIX4);
			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_projection", this.matrix_projection.data, EEE.UNIFORM_MATRIX4);
			var texIndex = 0;
			for( var u_name in mat.uniforms ){
				if(mat.uniforms[u_name].type == EEE.UNIFORM_SAMPLER2D){
					if(mat.uniforms[u_name].value.needsUpdate == true){
						mat.uniforms[u_name].value.Initialize(this.gl);
					}
					this.gl.activeTexture(this.gl["TEXTURE"+mat.uniforms[u_name].unit]);
					this.gl.bindTexture(
						this.gl.TEXTURE_2D, 
						mat.uniforms[u_name].value.glTexture
					);
					mat.uniforms[u_name].unit;
				}
				mat.passes[i].glProgram.SetUniform( 
					this.gl, 
					u_name,
					mat.uniforms[u_name].value,
					mat.uniforms[u_name].type,
					mat.uniforms[u_name].unit || 0
				);
			}
			drawable.Draw(this.gl, mat.passes[i]);
		}
	}
};