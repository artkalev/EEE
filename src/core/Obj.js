EEE.Obj = class Obj{
	constructor(){
		this.name = "node";
		this.uid = Math.random()*1000000000000;
		this.position = new EEE.Vec3(0,0,0);
		this.rotation = new EEE.Quat();
		this.scale = new EEE.Vec3(1,1,1);
		this.localToWorld = new EEE.Mat4().Identity();
		this.matrixNeedsUpdate = true;
		this.children = [];
		this.parent = null;
		this.modules = [];
		this.graphics = null;
	}
	
	Update(){
		for(var i = 0; i < this.modules.length; i++){
			this.modules[i].update();
		}
		this.UpdateMatrix();
	}

	UpdateMatrix(){
		if(this.matrixNeedsUpdate){
			this.localToWorld.TRS( this.position, this.rotation, this.scale );
			for(var i = 0; i < this.children.length; i++){
				this.children[i].matrixNeedsUpdate = true;
			}
			this.matrixNeedsUpdate = false;
		}
	}

	AddModule( module ){
		var m = Object.create(module);
		m.owner = this;
		this.modules.push( m );
		return m;
	}
};