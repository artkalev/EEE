EEE.Vec4 = class Vec4{
    constructor(){
		this.type = EEE.MATH_VECTOR4;
        this.data = new Float32Array(4);
    }
    get x(){ return this.data[0]; }
    get y(){ return this.data[1]; }
    get z(){ return this.data[2]; }
    get w(){ return this.data[3]; }

    set x(v){ this.data[0] = v; }
    set y(v){ this.data[1] = v; }
    set z(v){ this.data[2] = v; }
    set w(v){ this.data[3] = v; }

    LengthSqr(){
		return this.data[0]*this.data[0] + this.data[1]*this.data[1] + this.data[2]*this.data[2]  + this.data[3]*this.data[3];
	}
	
	Length(){
		return Math.sqrt( this.LengthSqr() );
	}

	// vec4 - vec4 operations

	Add(other){
		this.data[0] += other.data[0];
		this.data[1] += other.data[1];
        this.data[2] += other.data[2];
        this.data[3] += other.data[3];
	}
	
	Sub(other){
		this.data[0] -= other.data[0];
		this.data[1] -= other.data[1];
        this.data[2] -= other.data[2];
        this.data[3] -= other.data[3];
	}

	Multiply(other){
		this.data[0] *= other.data[0];
		this.data[1] *= other.data[1];
        this.data[2] *= other.data[2];
        this.data[3] *= other.data[3];
	}

	Divide(other){
		this.data[0] /= other.data[0];
		this.data[1] /= other.data[1];
        this.data[2] /= other.data[2];
        this.data[3] /= other.data[3];
	}

    // vec4 - scalar operations 

	AddScalar(other){
		this.data[0] += other;
		this.data[1] += other;
        this.data[2] += other;
        this.data[3] += other;
	}
	
	SubScalar(other){
		this.data[0] -= other;
		this.data[1] -= other;
        this.data[2] -= other;
        this.data[3] -= other;
	}

	MultiplyScalar(other){
		this.data[0] *= other;
		this.data[1] *= other;
        this.data[2] *= other;
        this.data[3] *= other;
	}

	DivideScalar(other){
		this.data[0] /= other;
		this.data[1] /= other;
        this.data[2] /= other;
        this.data[3] /= other;
	}

	IsZero(){
		return this.data[0] == 0 && this.data[1] == 0  && this.data[2] == 0&& this.data[3] == 0;
	}

	ToVec3(){
		return new EEE.Vec3( this.x, this.y, this.z );
	}
}