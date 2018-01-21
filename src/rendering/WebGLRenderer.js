EEE.WebGLRenderer = class WebGLRenderer{
	constructor(){
		this.matrix_view = new EEE.Mat4().Identity();
		this.matrix_projection = new EEE.Mat4().Identity();

		this.pixelScale = 1;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.gl = this.canvas.getContext("webgl");
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

					"void main(){",
					"	v_vertex = a_vertex;",
					"	v_normal = a_normal;",
					"	v_color = a_color;",
					"	v_uv0 = a_uv0;",
					"	gl_Position = vec4( a_vertex, 1.0 );",
					"}"
				].join("\n"),
				[
					"precision mediump float;",
					"varying vec3 v_vertex;",
					"varying vec3 v_normal;",
					"varying vec4 v_color;",
					"varying vec2 v_uv0;",
					"void main(){",
					"	gl_FragColor = v_color;",
					"}"
				].join("\n")
			)
		};
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

	Render( scene, camera ){
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
						this.DrawMesh( o.graphics );
						break;
					// todo add more drawing functions for sprites, particles etc
				}
			}
		}
	}

	DrawMesh( mesh, material, modelMatrix){
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

		// setup shaderprogram
		if(!material){
			this.gl.useProgram( this.programs["default"] );
			this.activeProgram = this.programs["default"];
		}else{
			this.gl.useProgram( material.glProgram );
			this.activeProgram = material.glProgram;
		}


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
		this.gl.drawElements( this.gl.TRIANGLES, mesh.indices.length, this.gl.UNSIGNED_SHORT, 0);

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, null );
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );
	}
};