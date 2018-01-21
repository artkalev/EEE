E2.WebGL2Renderer = class WebGL2Renderer{
	constructor(){

		this.matrix_projection = new E2.Mat4();
		this.matrix_view = new E2.Mat4();

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