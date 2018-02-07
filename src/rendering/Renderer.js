var gl = null;
EEE.Renderer = class Renderer{
	constructor(){
		this.u_globalBlock = null;

		this.pixelScale = 1.0;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.canvas.style.imageRendering = "pixelated";
		gl = this.canvas.getContext("webgl2", {antialias:0});
		if(!gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild( this.canvas );
		
		this.gbuffer = new EEE.GBuffer(this.canvas.width, this.canvas.height);

		this.defaultTexture = new EEE.Texture2D();
		this.defaultTexture.width = 2;
		this.defaultTexture.height = 2;
		//this.defaultTexture.source = new Uint8Array([ 255,0,0,255 ]);
		this.defaultTexture.source = new Uint8Array([
			255,  0,  0,255,    0,255,  0,255,
			  0,  0,255,255,    255,255,255,255
		]);
		this.defaultTexture.Initialize();
		
		console.log(this.defaultTexture);	
		
		this.defaultMaterial = new EEE.Material();
		this.composePassesMaterial = new EEE.Material([
			new EEE.MaterialPass( 
				EEE.SHADERLIB.vertex.screenQuad, 
				EEE.SHADERLIB.fragment.deferredCompose,
				false,
				{
					"u_depth":{ type:EEE.UNIFORM_INT, value:0, location:null },
					"u_normalDepth":{ type:EEE.UNIFORM_INT, value:1, location:null },
					"u_diffuseColor":{ type:EEE.UNIFORM_INT, value:2, location:null },
					"u_normMetalSmoothness":{ type:EEE.UNIFORM_INT, value:3, location:null },
					"u_matrixView":{type:EEE.UNIFORM_MAT4},
					"u_matrixViewInverse":{type:EEE.UNIFORM_MAT4},
					"u_matrixProjection":{type:EEE.UNIFORM_MAT4},
					"u_matrixProjectionInverse":{type:EEE.UNIFORM_MAT4},
					"u_cameraPosition":{type:EEE.UNIFORM_VEC3},
					"u_near":{type:EEE.UNIFORM_FLOAT},
					"u_far":{type:EEE.UNIFORM_FLOAT},
					"u_pointLights":{}
				}
			)
		]);
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth);
		this.canvas.height = Math.round(window.innerHeight);
		this.gbuffer.Resize( this.canvas.width*this.pixelScale,this.canvas.height*this.pixelScale );
	}

	RenderGUI( gui ){
		for(var i = 0; i < gui.elements.length; i++){
			gui.elements[i].Draw();
		}
	}

	ComposePasses( camera ){
		gl.viewport(0,0,this.canvas.width,this.canvas.height);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		var pass = this.composePassesMaterial.passes[0];
		
		pass.uniforms.u_cameraPosition.value = camera.position.data;
		pass.uniforms.u_near.value = camera.near;
		pass.uniforms.u_far.value = camera.far;
		pass.uniforms.u_matrixView.value = camera.matrix_view.data;
		pass.uniforms.u_matrixProjection.value = camera.matrix_projection.data;
		pass.uniforms.u_matrixViewInverse.value = camera.matrix_viewInverse.data;
		pass.uniforms.u_matrixProjectionInverse.value = camera.matrix_projectionInverse.data;
		pass.Use();
		
		EEE.ASSETS.meshes["quad"].Draw( pass );
	}

	RenderPostFX( material ){
		// todo
	}
	
	Blit( src, dst, program ){
		
	}
	
	Render( scene, camera ){
		
		if( this.canvas.width != camera.width || this.canvas.height != camera.height ){
			camera.width = this.canvas.width;
			camera.height = this.canvas.height;
			camera.UpdateProjectionMatrix();
		}

		// update and bind framebuffers
		this.gbuffer.Update();
		gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.gbuffer.glFramebuffer);

		gl.activeTexture( gl.TEXTURE5 );
		gl.bindTexture( gl.TEXTURE_2D, this.defaultTexture.glTexture );
		gl.activeTexture( gl.TEXTURE7 );
		gl.bindTexture( gl.TEXTURE_2D, this.defaultTexture.glTexture );
		
		gl.clearColor( 
			scene.backgroundColor.r,
			scene.backgroundColor.g,
			scene.backgroundColor.b,
			scene.backgroundColor.a
		);
		gl.viewport(0,0,this.gbuffer.width,this.gbuffer.height);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		for(var i = 0; i < scene.objects.length; i++){
			var o = scene.objects[i];
			if(o.drawable){
				var material = o.material || o.drawable.material || this.defaultMaterial;
				
				material.Update();
				material.BindTextures();
				
				for(var passIndex = 0; passIndex < material.passes.length; passIndex++){
					var pass = material.passes[passIndex];
					pass.uniforms.u_matrixModel.value = o.localToWorld.data;
					pass.uniforms.u_matrixView.value = camera.matrix_view.data;
					pass.uniforms.u_matrixProjection.value = camera.matrix_projection.data;
					
					pass.uniforms.u_diffuseTextureTS.value = material.diffuseTextureTS.data;
					pass.uniforms.u_normalTextureTS.value = material.normalTextureTS.data;
					
					pass.Use();
					
					o.drawable.Draw( pass );
				}
				gl.bindVertexArray( null );
			}
		}

		gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
		this.ComposePasses(camera);
	}
};