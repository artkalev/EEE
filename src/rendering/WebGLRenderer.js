EEE.WebGLRenderer = class WebGLRenderer{
	constructor(){

		this.matrix_view = new EEE.Mat4().Identity();
		this.matrix_projection = new EEE.Mat4().Identity();

		this.canvas = document.createElement("canvas");
		this.gl = this.canvas.getContext("webgl");
		if(!this.gl){ console.log("No WebGL Support!"); return; }
		document.body.appendChild( this.canvas );
	}

	Render( scene, camera ){
		
	}

	DrawMesh( mesh, material, modelMatrix){
		// if mesh does not have gl properties they must be created
		// gl attribute and index buffers will be added to mesh object
		// this can be a bit expensive bt it will only affect first frame the mesh is drawn on.
		// all scene meshes probably need to be initialized ( drawn the 1st time ) outside gameloop.
		if(!mesh.gl){
			mesh.gl = {
				// mesh must contain these 3 attributes to be usable!
				attributes : {
					a_vertex : this.gl.createBuffer(),
					a_normal : this.gl.createBuffer(),
					a_uv0 : this.gl.createBuffer()
				},
				indices : []
			};
			this.gl.bindBuffer(gl.ARRAY_BUFFER, mesh.gl.a_vertex);
			this.gl.bufferData(gl.ARRAY_BUFFER, 3, mesh.vertices, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(gl.ARRAY_BUFFER, mesh.gl.a_normal);
			this.gl.bufferData(gl.ARRAY_BUFFER, 3, mesh.normals, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(gl.ARRAY_BUFFER, mesh.gl.a_uv0);
			this.gl.bufferData(gl.ARRAY_BUFFER, 2, mesh.uv0, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(gl.ARRAY_BUFFER, null);
		}

		// setup shaderprogram
		this.gl.useProgram( material.glProgram );

		// else if all attributes are already initialized
		// bind all attributes and draw triangles
		var vLoc = this.gl.getAttribLocation("a_vertex");
		this.gl.bindBuffer( gl.ARRAY_BUFFER, mesh.gl.attributes.vertex );
		this.gl.enableVertexAttribArray(vLoc);
		this.gl.vertexAttribPointer( vLoc, 3, gl.FLOAT, false, 0, 0 );

		var nLoc = this.gl.getAttribLocation("a_normal");
		this.gl.bindBuffer( gl.ARRAY_BUFFER, mesh.gl.attributes.vertex );
		this.gl.enableVertexAttribArray(nLoc);
		this.gl.vertexAttribPointer( nLoc, 3, gl.BYTE, normalized, 0, 0 );

		var uLoc = this.gl.getAttribLocation("a_uv0");
		this.gl.bindBuffer( gl.ARRAY_BUFFER, mesh.gl.attributes.vertex );
		this.gl.enableVertexAttribArray(uLoc);
		this.gl.vertexAttribPointer( uLoc, 2, gl.FLOAT, false, 0, 0 );

	}
};