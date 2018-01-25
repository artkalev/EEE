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
		this.drawable = null;
		this.material = null; // overrides drawble's material

		this._firstFrame = true;
	}

	SetParent( parent ){
		if(this.parent == null){
			this.parent = parent;
			parent.children.push(this);
		}else if(this.parent != parent){
			var i = this.parent.children.indexOf(this);
			if(i > -1){
				this.parent.children.splice(i,1);
				this.parent = parent;
				this.parent.children.push(this);
			}
		}
		this.matrixNeedsUpdate = true;
	}
	
	FirstFrame(){
		for(var i = 0; i < this.modules.length; i++){
			this.modules[i].firstFrame();
		}
	}

	Update(){
		if(this._firstFrame == true){ this.FirstFrame(); this._firstFrame = false; return; }
		for(var i = 0; i < this.modules.length; i++){
			this.modules[i].update();
		}
		if(this.matrixNeedsUpdate){
			this.UpdateMatrix();
			this.matrixNeedsUpdate = false;
		}
	}

	UpdateMatrix(){
		this.localToWorld.TRS( this.position, this.rotation, this.scale );
		if(this.parent != null){
			this.localToWorld.Multiply( this.parent.localToWorld );
		}
		for(var i = 0; i < this.children.length; i++){
			this.children[i].matrixNeedsUpdate = true;
		}
	}

	AddModule( module ){
		var m = Object.create(module);
		m.owner = this;
		this.modules.push( m );
		return m;
	}
};