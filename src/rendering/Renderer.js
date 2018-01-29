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
			
			drawable.Draw(this.gl, mat.passes[i]);
		}
	}
};