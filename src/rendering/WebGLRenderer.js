EEE.WebGLRenderer = class WebGLRenderer{
	constructor(){
		this.canvas = document.createElement("canvas");
		this.gl = this.canvas.getContext("webgl");
		if(!this.gl){ console.log("No WebGL Support!"); return; }
		document.body.appendChild( this.canvas );
	}
	DrawMesh(){

	}
};