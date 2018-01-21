EEE.Obj = class Obj{
	constructor(){
		this.name = "node";
		this.uid = Math.random()*1000000000000;
		this.children = [];
		this.parent = null;
		this.modules = [];
	}
	
	AddModule( module ){
		var m = new module( this );
		this.modules.push( m );
		return m;
	}
};