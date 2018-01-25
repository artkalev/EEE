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
		this.programs = {
			"default" : this.CreateGLProgram(
				[
					"#version 300 es",
					"precision mediump float;",
					"layout(location = 0) in vec3 a_vertex;",
					"layout(location = 1) in vec3 a_normal;",
					"layout(location = 2) in vec4 a_color;",
					"layout(location = 3) in vec2 a_uv0;",
					"layout(location = 4) in vec2 a_uv1;",

					"out vec3 v_vertex;",
					"out vec3 v_normal;",
					"out vec4 v_color;",
					"out vec2 v_uv0;",

					"uniform mat4 u_matrix_model;",
					"uniform mat4 u_matrix_view;",
					"uniform mat4 u_matrix_projection;",

					"void main(){",
					"	v_vertex = a_vertex;",
					"	v_normal = normalize(a_normal);",
					"	v_color = a_color;",
					"	v_uv0 = a_uv0;",
					"	gl_Position = u_matrix_projection * u_matrix_view * u_matrix_model * vec4( a_vertex, 1.0 );",
					"	gl_PointSize = 10.0;",
					"}"
				].join("\n"),
				[
					"#version 300 es",
					"precision mediump float;",
					"in vec3 v_vertex;",
					"in vec3 v_normal;",
					"in vec4 v_color;",
					"in vec2 v_uv0;",
					"out vec4 out_color;",
					"void main(){",
					"	out_color = vec4(vec3(v_uv0, 0.0),1.0);",
					"}"
				].join("\n")
			)
		};
		this.defaultMaterial = new EEE.Material([
			this.CreateMaterialPass({
				program:this.programs.default
			}),
			this.CreateMaterialPass({
				program : this.programs.default,
				drawMode : EEE.GL_POINTS,
			})
		]);
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
		// multiple material passes supported
		// passes are drawn is order
		var mat = material || this.defaultMaterial;
		for(var i = 0; i < mat.passes.length; i++){
			
			if(mat.passes[i].depthTest == true){
				this.gl.enable(this.gl.DEPTH_TEST);
			}
			this.gl.enable(this.gl.CULL_FACE);
			switch(mat.passes[i].cullFace){
				case 0: this.gl.cullFace(this.gl.FRONT_AND_BACK); break;
				case 1: this.gl.cullFace(this.gl.BACK); break;
				case 2: this.gl.cullFace(this.gl.FRONT); break;
			}

			this.gl.useProgram( mat.passes[i].program );
			this.activeProgram = mat.passes[i].program;

			var matrixModelLoc = this.gl.getUniformLocation(this.activeProgram, "u_matrix_model");
			var matrixViewLoc = this.gl.getUniformLocation(this.activeProgram, "u_matrix_view");
			var matrixProjLoc = this.gl.getUniformLocation(this.activeProgram, "u_matrix_projection");
			this.gl.uniformMatrix4fv(matrixModelLoc, false, this.matrix_model.data);
			this.gl.uniformMatrix4fv(matrixViewLoc, false, this.matrix_view.data);
			this.gl.uniformMatrix4fv(matrixProjLoc, false, this.matrix_projection.data);
			
			drawable.Draw(this.gl, mat.passes[i]);
		}
	}
};