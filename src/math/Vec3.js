EEE.Vec3 = class Vec3{
	constructor( x,y,z ){
		this.type = EEE.MATH_VECTOR3;
		this.data = new Float32Array([x||0, y||0, z||0]);
	}
	get x(){ return this.data[0]; } set x(v){ this.data[0] = v; }
	get y(){ return this.data[1]; } set y(v){ this.data[1] = v; }
	get z(){ return this.data[2]; } set z(v){ this.data[2] = v; }

	Set(x,y,z){
		this.data[0] = x;
		this.data[1] = y;
		this.data[2] = z;
		return this;
	}

	LengthSqr(){
		return this.data[0]*this.data[0] + this.data[1]*this.data[1] + this.data[2]*this.data[2];
	}
	
	Length(){
		return Math.sqrt( this.LengthSqr() );
	}

	Normalize(){
		if(!this.IsZero){
			this.DivideScalar(this.Length);
		}
		return this;
	}

	// vec3 - vec3 operations

	Add(other){
		this.data[0] += other.data[0];
		this.data[1] += other.data[1];
		this.data[2] += other.data[2];
		return this;
	}
	
	Subtract(other){
		this.data[0] -= other.data[0];
		this.data[1] -= other.data[1];
		this.data[2] -= other.data[2];
		return this;
	}

	Multiply(other){
		this.data[0] *= other.data[0];
		this.data[1] *= other.data[1];
		this.data[2] *= other.data[2];
		return this;
	}

	Divide(other){
		this.data[0] /= other.data[0];
		this.data[1] /= other.data[1];
		this.data[2] /= other.data[2];
		return this;
	}

	// vec3 - scalar operations 

	AddScalar(other){
		this.data[0] += other;
		this.data[1] += other;
		this.data[2] += other;
		return this;
	}
	
	SubtractScalar(other){
		this.data[0] -= other;
		this.data[1] -= other;
		this.data[2] -= other;
		return this;
	}

	MultiplyScalar(other){
		this.data[0] *= other;
		this.data[1] *= other;
		this.data[2] *= other;
		return this;
	}

	DivideScalar(other){
		this.data[0] /= other;
		this.data[1] /= other;
		this.data[2] /= other;
		return this;
	}

	IsZero(){
		return this.data[0] == 0 && this.data[1] == 0  && this.data[2] == 0;
	}

	Clone(){
		return new EEE.Vec3( this.x,this.y,this.z );
	}
};

EEE.right = new EEE.Vec3(1,0,0);
EEE.up = new EEE.Vec3(0,1,0);
EEE.forward = new EEE.Vec3(0,0,1);