E2.Obj = class Obj{
	constructor(){
		this.name = "node";
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