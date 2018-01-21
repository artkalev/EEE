EEE.Vec2 = class Vec2{
	constructor(x,y){
		this.type = EEE.MATH_VECTOR2;
		this.data = new Float32Array([x||0,y||0]);
	}
	
	get x(){ return this.data[0]; } set x(v){ this.data[0] = v; }
	get y(){ return this.data[1]; } set y(v){ this.data[1] = v; }
	
	LengthSqr(){
		return this.data[0]*this.data[0] + this.data[1]*this.data[1];
	}
	
	Length(){
		return Math.sqrt( this.LengthSqr() );
	}

	// vec2 - vec2 operations

	Add(other){
		this.data[0] += other.data[0];
		this.data[1] += other.data[1];
	}
	
	Sub(other){
		this.data[0] -= other.data[0];
		this.data[1] -= other.data[1];
	}

	Multiply(other){
		this.data[0] *= other.data[0];
		this.data[1] *= other.data[1];
	}

	Divide(other){
		this.data[0] /= other.data[0];
		this.data[1] /= other.data[1];
	}

	// vec2 - scalar operations 

	AddScalar(other){
		this.data[0] += other;
		this.data[1] += other;
	}
	
	SubScalar(other){
		this.data[0] -= other;
		this.data[1] -= other;
	}

	MultiplyScalar(other){
		this.data[0] *= other;
		this.data[1] *= other;
	}

	DivideScalar(other){
		this.data[0] /= other;
		this.data[1] /= other;
	}

	IsZero(){
		return this.data[0] == 0 && this.data[1] == 0;
	}
}