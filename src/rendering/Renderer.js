EEE.Renderer = class Renderer{
	constructor(){
		this.u_globalBlock = null;

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

		this.deferredBuffer0 = new EEE.Framebuffer();

		// global uniform block
		// updated on every Render()
		this.u_globalBlock = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.u_globalBlock);
		this.gl.bufferData( this.gl.UNIFORM_BUFFER, 136, this.gl.DYNAMIC_DRAW );
		/* view matrix */ this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 0, new Float32Array(16), 0, 0 );
		/* proj matrix */ this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 64, new Float32Array(16), 0, 0 );
		/* time */        this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 128, new Float32Array(1), 0, 0 );
		/* delta time */  this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 132, new Float32Array(1), 0, 0 );
		this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

		this.defaultMaterial = new EEE.Material();
		this.composePassesMaterial = new EEE.Material([
			new EEE.MaterialPass( 
				EEE.SHADERLIB.vertex.screenQuad, 
				EEE.SHADERLIB.fragment.screenQuad,
				false
			)
		]);
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

	ComposePasses(){
		this.gl.bindTexture( this.gl.TEXTURE2D, this.deferredBuffer0.glTexture );
		this.composePassesMaterial.passes[0].Use(this.gl);
		
		EEE.ASSETS.meshes["quad"].Draw( this.gl, this.composePassesMaterial.passes[0] );
	}

	RenderPostFX( ){

	}

	Render( scene, camera ){
		if( this.canvas.width != camera.width || this.canvas.height != camera.height ){
			camera.width = this.canvas.width;
			camera.height = this.canvas.height;
			camera.UpdateProjectionMatrix();
		}

		// update and bind framebuffers
		this.deferredBuffer0.Update(this.gl);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.deferredBuffer0.glFramebuffer);

		/* set global uniformblock values used by all materials */
		this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.u_globalBlock);
		this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 0, camera.matrix_view.data);
		this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 64, camera.matrix_projection.data);
		this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 128, new Float32Array([EEE.time]));
		this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 132, new Float32Array([EEE.deltaTime]));
		this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

		/* u_globalBlock uniform block is bound at 0 ! */
		this.gl.bindBufferBase( this.gl.UNIFORM_BUFFER, 0, this.u_globalBlock );

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

				if(o.u_modelBlock == null){
					o.u_modelBlock = this.gl.createBuffer();
					this.gl.bindBuffer( this.gl.UNIFORM_BUFFER, o.u_modelBlock );
					this.gl.bufferData( this.gl.UNIFORM_BUFFER, 68, this.gl.DYNAMIC_DRAW );
					this.gl.bindBuffer( this.gl.UNIFORM_BUFFER, null );
				}

				this.gl.bindBuffer( this.gl.UNIFORM_BUFFER, o.u_modelBlock );
				this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 0, o.localToWorld.data);
				this.gl.bufferSubData( this.gl.UNIFORM_BUFFER, 64, new Float32Array([o.opacity]));
				this.gl.bindBuffer( this.gl.UNIFORM_BUFFER, null );

				this.gl.bindBufferBase( this.gl.UNIFORM_BUFFER, 1, o.u_modelBlock );

				var material = o.drawable.material || this.defaultMaterial;

				material.Update(this.gl);

				this.gl.bindBufferBase( this.gl.UNIFORM_BUFFER, 2, material.u_blockMaterial );

				for(var passIndex = 0; passIndex < material.passes.length; passIndex++){
					var pass = material.passes[passIndex];
					pass.Use(this.gl);
					o.drawable.Draw( this.gl, pass );
				}
				this.gl.bindVertexArray( null );
			}
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		this.ComposePasses();
		this.RenderPostFX();
	}
};