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

	DrawMesh( mesh ){

		// if mesh does not have gl properties they must be created
		// gl attribute and index buffers will be added to mesh object
		// this can be a bit expensive bt it will only affect first frame the mesh is drawn on.
		// all scene meshes probably need to be initialized ( drawn the 1st time ) outside gameloop.
		if(!mesh.gl){
			mesh.gl = {
				// mesh must contain these 3 attributes to be usable!
				attributes : {
					"a_vertex" : this.gl.createBuffer(),
					"a_normal" : this.gl.createBuffer(),
					"a_uv0" : this.gl.createBuffer()
				},
				indices : []
			};
		}
	}
};