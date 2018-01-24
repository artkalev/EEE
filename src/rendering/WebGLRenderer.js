EEE.WebGLRenderer = class WebGLRenderer{
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
		this.gl = this.canvas.getContext("webgl", {antialias:0});
		if(!this.gl){ console.log("No WebGL Support!"); return; }
		document.body.appendChild( this.canvas );

		this.activeProgram = null;
		this.programs = {
			"default" : this.CreateGLProgram(
				[
					"precision mediump float;",
					"attribute vec3 a_vertex;",
					"attribute vec3 a_normal;",
					"attribute vec4 a_color;",
					"attribute vec2 a_uv0;",

					"varying vec3 v_vertex;",
					"varying vec3 v_normal;",
					"varying vec4 v_color;",
					"varying vec2 v_uv0;",

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
					"precision mediump float;",
					"varying vec3 v_vertex;",
					"varying vec3 v_normal;",
					"varying vec4 v_color;",
					"varying vec2 v_uv0;",
					"void main(){",
					"	gl_FragColor = vec4(vec3(v_uv0, 0.0),1.0);",
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

				drawMode : 0, // gl.POINTS
			})
		]);
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth / this.pixelScale);
		this.canvas.height = Math.round(window.innerHeight / this.pixelScale);
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
			drawMode  : 2, // 0:points, 1:edges, 2:triangles
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
			if(o.graphics){
				switch( o.graphics.type ){
					case EEE.GRAPHICS_MESH:
						this.matrix_model = o.localToWorld;
						this.DrawMesh( o.graphics );
						break;
					// todo add more drawing functions for sprites, particles etc
				}
			}
		}
	}

	DrawMesh( mesh, material){
		// if mesh does not have gl properties they must be created
		// gl attribute and index buffers will be added to mesh object
		// this can be a bit expensive bt it will only affect first frame the mesh is drawn on.
		// all scene meshes probably need to be initialized ( drawn the 1st time ) outside gameloop.
		if(!mesh.gl){
			console.log("creating GL attributes for mesh: "+mesh.name);
			mesh.gl = {
				// mesh must contain these 3 attributes to be usable!
				attributes : {
					a_vertex : this.gl.createBuffer(),
					a_normal : this.gl.createBuffer(),
					a_color : this.gl.createBuffer(),
					a_uv0 : this.gl.createBuffer()
				},
				indices : this.gl.createBuffer()
			};
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_vertex);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.vertices, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_normal);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.normals, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_color);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.colors, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_uv0);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.uvs, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.gl.indices);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indices, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		}

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
			// else if all attributes are already initialized
			// bind all attributes and draw triangles
			
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_vertex );
			this.gl.enableVertexAttribArray(0);
			this.gl.vertexAttribPointer( 0, 3, this.gl.FLOAT, false, 0, 0 );
			
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_normal );
			this.gl.enableVertexAttribArray(1);
			this.gl.vertexAttribPointer( 1, 3, this.gl.BYTE, true, 0, 0 );	
			
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_color );
			this.gl.enableVertexAttribArray(2);
			this.gl.vertexAttribPointer( 2, 4, this.gl.UNSIGNED_BYTE, true, 0, 0 );
			
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_uv0 );
			this.gl.enableVertexAttribArray(3);
			this.gl.vertexAttribPointer( 3, 2, this.gl.FLOAT, false, 0, 0 );
			
			
			this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, mesh.gl.indices );
			switch(mat.passes[i].drawMode){
				case 0:
					this.gl.drawElements( this.gl.POINTS, mesh.indices.length, this.gl.UNSIGNED_SHORT, 0);
					break;
				case 1:
					this.gl.drawElements( this.gl.LINES, mesh.indices.length, this.gl.UNSIGNED_SHORT, 0);
					break;
				case 2:
					this.gl.drawElements( this.gl.TRIANGLES, mesh.indices.length, this.gl.UNSIGNED_SHORT, 0);
					break;
			}
			

			this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, null );
			this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );
		}
	}
};