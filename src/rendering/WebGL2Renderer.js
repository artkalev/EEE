EEE.WebGL2Renderer = class WebGL2Renderer{
	constructor(){

		this.matrix_projection = new EEE.Mat4();
		this.matrix_view = new EEE.Mat4();

		this.canvas = document.createElement("canvas");
		this.gl = this.canvas.getContext("webgl");
		if(!this.gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild(this.canvas);
	}
	Render( root ){

	}
	DrawMesh(){
		
	}
};