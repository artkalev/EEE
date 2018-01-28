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
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth / this.pixelScale);
		this.canvas.height = Math.round(window.innerHeight / this.pixelScale);
	}

	InitializeTexture( tex ){
		tex.glTexture = this.gl.createTexture();
		this.gl.bindTexture( this.gl.TEXTRUE_2D, tex.glTexture );
		this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]) );
	}

	CreateGLProgram( vs, fs ){
		var v = this.gl.createShader(this.gl.VERTEX_SHADER);
		var f = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource( v, vs );
		this.gl.compileShader(v);

		this.gl.shaderSource( f, fs );
		this.gl.compileShader(f);

		var p = this.gl.createProgram();
		this.gl.attachShader(p, v);
		this.gl.attachShader(p, f);
		this.gl.bindAttribLocation(p, 0, "a_vertex");
		this.gl.bindAttribLocation(p, 1, "a_normal");
		this.gl.bindAttribLocation(p, 2, "a_color");
		this.gl.bindAttribLocation(p, 3, "a_uv0");
		this.gl.linkProgram(p);
		return p;
	}

	CreateMaterialPass(p){
		var _p = p;
		var o = {
			program   : p.program,
			depthTest : true, // wether to gl.enable(gl.DEPTH_TEST)
			drawMode  : EEE.GL_TRIANGLES, // 0:points, 1:edges, 2:triangles
			cullFace  : 1 // 0:off, 1:cull back, 2:cull front
		};
		// add default values
		for(var k in o){
			if(!_p.hasOwnProperty(k)){
				_p[k] = o[k];
			}
		}

		return _p;
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
			
			drawable.Draw(this.gl, mat.passes[i]);
		}
	}
};