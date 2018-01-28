// built with python

/* src/core/header.js */

/*
       ______________________________________________
     .|                                              |
    |#|     __________   __________   __________     |
    |#|    |::::::::::| |::::::::::| |::::::::::|    |
    |#|    |:+:|        |:+:|        |:+:|           |
    |#|    |+:+|____    |+:+|____    |+:+|____       |
    |#|    |+#++:++#|   |+#++:++#|   |+#++:++#|      |
    |#|    |+#+|        |+#+|        |+#+|           |
    |#|    |#+#|______  |#+#|______  |#+#|______     |
    |#|    |##########| |##########| |##########|    |
    |#|                                              |
    |#|______________________________________________|
    |################################################' 

EEE (read "triple E")

author  : Kalev Mölder
website : tinkering.ee
email   : artkalev@gmail.com

This is a WebGL graphics/game engine.
I am writing this for my own education, pleasure and use.
So keep in mind that this engine should not be used for production.
It is more fit for experimentation.

That being said, this engine could become more stable and easily usable
in the future.

PS. no documentation exists at this time
*/

var EEE = {};

// CONSTANTS

// type constants
EEE.MATH_VECTOR2 = 0x0002;
EEE.MATH_VECTOR3 = 0x0003;
EEE.MATH_VECTOR4 = 0x0004;
EEE.MATH_QUATERNION = 0x0005;
EEE.MATH_MATRIX3 = 0x0006;
EEE.MATH_MATRIX4 = 0x0007;

EEE.GRAPHICS_MESH = 0x0010;
EEE.GRAPHICS_SPRITE = 0x0011;

// gl constants
// copied from : https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Constants
// used to define gl properties in graphics objects before gl context is present

// primitive drawtypes
EEE.GL_POINTS = 0x0000;
EEE.GL_LINES = 0x0001;
EEE.GL_LINE_LOOP = 0x0002;
EEE.GL_LINE_STRIP = 0x0003;
EEE.GL_TRIANGLES = 0x0004;
EEE.GL_TRIANGLE_STRIP = 0x0005;
EEE.GL_TRIANGLE_FAN = 0x0006;

// blending modes
EEE.GL_ZERO = 0;
EEE.GL_ONE = 1;
EEE.GL_SRC_COLOR = 0x0300;
EEE.GL_ONE_MINUS_SRC_COLOR = 0x0301;
EEE.GL_SRC_ALPHA = 0x0302;
EEE.GL_ONE_MINUS_SRC_ALPHA = 0x0303;
EEE.GL_DST_ALPHA = 0x0304;
EEE.GL_ONE_MINUS_DST_ALPHA = 0x0305;
EEE.GL_DST_COLOR = 0x0306;
EEE.GL_ONE_MINUS_DST_COLOR = 0x0307;
EEE.GL_SRC_ALPHA_SATURATE = 0x0308;
EEE.GL_CONSTANT_COLOR = 0x8001;
EEE.GL_ONE_MINUS_CONSTANT_COLOR = 0x8002;
EEE.GL_CONSTANT_ALPHA = 0x8003;
EEE.GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004;

// blending equations
EEE.GL_FUNC_ADD = 0x8006;
EEE.GL_FUNC_SUBTRACT = 0x800A;
EEE.GL_FUNC_REVERSE_SUBTRACT = 0x800B;

// textures
EEE.GL_NEAREST = 0x2600;
EEE.GL_LINEAR = 0X2601;
EEE.GL_NEAREST_MIPMAP_NEAREST = 0x2700;
EEE.GL_LINEAR_MIPMAP_NEAREST = 0x2701;
EEE.GL_NEAREST_MIPMAP_LINEAR = 0x2702;
EEE.GL_LINEAR_MIPMAP_LINEAR = 0x2703;
EEE.GL_TEXTURE_MAG_FILTER = 0x2800;
EEE.GL_TEXTURE_MIN_FILTER = 0x2801;
EEE.GL_TEXTURE_WRAP_S = 0x2802;
EEE.GL_TEXTURE_WRAP_T = 0x2803;
EEE.GL_TEXTURE_2D = 0x0DE1;
EEE.GL_TEXTURE = 0x1702;
EEE.GL_TEXTURE_CUBE_MAP = 0x8513;
EEE.GL_TEXTURE_BINDING_CUBE_MAP = 0x8514;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
EEE.GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
EEE.GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
EEE.GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
EEE.GL_REPEAT = 0x2901;
EEE.GL_CLAMP_TO_EDGE = 0x812F;
EEE.GL_MIRRORED_REPEAT = 0x8370;

// uniform types
EEE.UNIFORM_SAMPLER2D = 0x0000;
EEE.UNIFORM_MATRIX4 = 0x0001;
EEE.UNIFORM_VEC4 = 0x0002;

// global variables
EEE.time = Date.now() / 1000;
EEE.deltaTime = 0;

// assets object
EEE.ASSETS = {
    meshes : {},
    textures : {},
    audio : {},
    prefabs : {}
};

/* src/math/Vec2.js */

EEE.Vec2 = class Vec2{
	constructor(x,y){
		this.type = EEE.MATH_VECTOR2;
		this.data = new Float32Array([x||0,y||0]);
	}
	
	get x(){ return this.data[0]; } set x(v){ this.data[0] = v; }
	get y(){ return this.data[1]; } set y(v){ this.data[1] = v; }
	
	Set(x,y){
		this.data[0] = x;
		this.data[1] = y;
	}

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

/* src/math/Vec3.js */

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
	}
	
	Sub(other){
		this.data[0] -= other.data[0];
		this.data[1] -= other.data[1];
		this.data[2] -= other.data[2];
	}

	Multiply(other){
		this.data[0] *= other.data[0];
		this.data[1] *= other.data[1];
		this.data[2] *= other.data[2];
	}

	Divide(other){
		this.data[0] /= other.data[0];
		this.data[1] /= other.data[1];
		this.data[2] /= other.data[2];
	}

	// vec3 - scalar operations 

	AddScalar(other){
		this.data[0] += other;
		this.data[1] += other;
		this.data[2] += other;
	}
	
	SubScalar(other){
		this.data[0] -= other;
		this.data[1] -= other;
		this.data[2] -= other;
	}

	MultiplyScalar(other){
		this.data[0] *= other;
		this.data[1] *= other;
		this.data[2] *= other;
	}

	DivideScalar(other){
		this.data[0] /= other;
		this.data[1] /= other;
		this.data[2] /= other;
	}

	IsZero(){
		return this.data[0] == 0 && this.data[1] == 0  && this.data[2] == 0;
	}
};

/* src/math/Vec4.js */

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
}

/* src/math/Quat.js */

EEE.Quat = class Quat{
    constructor(){
        this.type = EEE.MATH_QUATERNION;
        this.data = new Float32Array([0,0,0,1]);
    }

    get x(){ return this.data[0]; }
    get y(){ return this.data[1]; }
    get z(){ return this.data[2]; }
    get w(){ return this.data[3]; }

    set x(v){ this.data[0] = v; }
    set y(v){ this.data[1] = v; }
    set z(v){ this.data[2] = v; }
    set w(v){ this.data[3] = v; }

    GetEuler(){
        var result = [0,0,0];
        var test = this.data[0]*this.data[1] + this.data[2]*this.data[3];
        if (test > 0.499) { // singularity at north pole
            result[0] = 2 * atan2(this.data[0],this.data[3]);
            result[1] = Math.PI/2;
            result[2] = 0;
            return result;
        }
        if (test < -0.499) { // singularity at south pole
            result[0] = -2 * atan2(this.data[0],this.data[3]);
            result[1] = - Math.PI/2;
            result[2] = 0;
            return result;
        }
        var sqx = this.data[0]*this.data[0];
        var sqy = this.data[1]*this.data[1];
        var sqz = this.data[2]*this.data[2];
        result[0] = atan2(2*this.data[1]*this.data[3]-2*this.data[0]*this.data[2] , 1 - 2*sqy - 2*sqz);
        result[1] = asin(2*test);
        result[2] = atan2(2*this.data[0]*this.data[3]-2*this.data[1]*this.data[2] , 1 - 2*sqx - 2*sqz)
        return result;
    }

    SetEuler(x,y,z){
        var c1 = Math.cos(y);
        var c2 = Math.cos(x);
        var c3 = Math.cos(z);
        var s1 = Math.sin(y);
        var s2 = Math.sin(x);
        var s3 = Math.sin(z);

        this.data[3] = c1*c2*c3 - s1*s2*s3;
        this.data[0] = s1*s2*c3 + c1*c1*s3;
        this.data[1] = s1*c2*c3 + c1*s2*s3;
        this.data[2] = c1*s2*c3 - s1*c2*s3;

        return this;
    }

    GetAngleAxis(){
        result = { angle:0, axis:new EEE.Vec3() };
        result.angle = 2 * Math.acos(this.data[3]);
        var q = Math.sqrt( 1-this.data[3]*this.data[3] );
        if(q < 0.001){
            result.axis.x = this.data[0];
            result.axis.y = this.data[1];
            result.axis.z = this.data[2];
        }else{
            result.axis.x = this.data[0] / q;
            result.axis.y = this.data[1] / q;
            result.axis.z = this.data[2] / q;
        }
        return result;
    }

    SetAngleAxis(angle, axis){
        var s = Math.sin(angle/2);
        this.data[0] = axis.x * s;
        this.data[1] = axis.y * s;
        this.data[2] = axis.z * s;
        this.data[3] = Math.cos( angle/2 );
        return this;
    }

    GetMat3(){
        var result = new EEE.Mat3();
        var xx = this.data[0]*this.data[0];
        var xy = this.data[0]*this.data[1];
        var xz = this.data[0]*this.data[2];
        var xw = this.data[0]*this.data[3];

        var yy = this.data[1]*this.data[1];
        var yz = this.data[1]*this.data[2];
        var yw = this.data[1]*this.data[3];

        var zz = this.data[2]*this.data[2];
        var zw = this.data[2]*this.data[3];

        result.m00  = 1 - 2 * ( yy + zz );
        result.m01  =     2 * ( xy - zw );
        result.m02  =     2 * ( xz + yw );
        
        result.m10  =     2 * ( xy + zw );
        result.m11  = 1 - 2 * ( xx + zz );
        result.m12  =     2 * ( yz - xw );

        result.m20  =     2 * ( xz - yw );
        result.m21  =     2 * ( yz + xw );
        result.m22  = 1 - 2 * ( xx + yy );

        return result;
    }

    SetMat3( mat ){
        var tr = mat.m00 + mat.m11 + mat.m22
        if (tr > 0) { 
            var S = sqrt(tr+1.0) * 2; // S=4*this.data[3] 
            this.data[3] = 0.25 * S;
            this.data[0] = (mat.m21 - mat.m12) / S;
            this.data[1] = (mat.m02 - mat.m20) / S; 
            this.data[2] = (mat.m10 - mat.m01) / S; 
        } else if ((mat.m00 > mat.m11)&(mat.m00 > mat.m22)) { 
            var S = sqrt(1.0 + mat.m00 - mat.m11 - mat.m22) * 2; // S=4*qx 
            this.data[3] = (mat.m21 - mat.m12) / S;
            this.data[0] = 0.25 * S;
            this.data[1] = (mat.m01 + mat.m10) / S; 
            this.data[2] = (mat.m02 + mat.m20) / S; 
        } else if (mat.m11 > mat.m22) { 
            var S = sqrt(1.0 + mat.m11 - mat.m00 - mat.m22) * 2; // S=4*qy
            this.data[3] = (mat.m02 - mat.m20) / S;
            this.data[0] = (mat.m01 + mat.m10) / S; 
            this.data[1] = 0.25 * S;
            this.data[2] = (mat.m12 + mat.m21) / S; 
        } else { 
            var S = sqrt(1.0 + mat.m22 - mat.m00 - mat.m11) * 2; // S=4*qz
            this.data[3] = (mat.m10 - mat.m01) / S;
            this.data[0] = (mat.m02 + mat.m20) / S;
            this.data[1] = (mat.m12 + mat.m21) / S;
            this.data[2] = 0.25 * S;
        }
        return this;
    }

    GetMat4(){
        var m = this.GetMat3();
        return m.GetMat4();
    }

    SetMat4(){
        //todo
        return this;
    }
}

/* src/math/Mat3.js */

EEE.Mat3 = class Mat3{

    /*
        Matrix uses column major order for OpenGL compatibility
          X   Y   Z
        +---+---+---+   +-----+-----+-----+
        | 0 | 3 | 6 |   | m00 | m10 | m20 |
        +---+---+---+   +-----+-----+-----+
        | 1 | 4 | 7 |   | m01 | m11 | m21 |
        +---+---+---+   +-----+-----+-----+
        | 2 | 5 | 8 |   | m02 | m12 | m22 |
        +---+---+---+   +-----+-----+-----+

    */

    /*
        in case of 3D this matrix is used mainly for converting quaternion to matrix.

        in case on 2D transformation matrix the data is encoded:
            X        Y
        +--------+--------+---+
        | scaleX | shearY | 0 |
        +--------+--------+---+
        | shearX | shearY | 0 |
        +--------+--------+---+
        | transX | transY | 1 |
        +--------+--------+---+
    */

    constructor(){
        this.type = EEE.MATH_MATRIX3;
        this.data = new Float32Array(9);
    }

    get m00(){ return this.data[0]; }   get m10(){ return this.data[3]; }   get m20(){ return this.data[6]; }
    get m01(){ return this.data[1]; }   get m11(){ return this.data[4]; }   get m21(){ return this.data[7]; }
    get m02(){ return this.data[2]; }   get m12(){ return this.data[5]; }   get m22(){ return this.data[8]; }

    set m00(v){ this.data[0] = v; } set m10(v){ this.data[3] = v; } set m20(v){ this.data[6] = v; }
    set m01(v){ this.data[1] = v; } set m11(v){ this.data[4] = v; } set m21(v){ this.data[7] = v; }
    set m02(v){ this.data[2] = v; } set m12(v){ this.data[5] = v; } set m22(v){ this.data[8] = v; }
    
    //#method Multiply
    //#param Mat3 other
    //#return Mat3
    //#descr Multiplies this Mat3 with other Mat3 and returns this Mat3.
    Multiply(other){
        var t = [
            this.m00 * other.m00 + this.m01 * other.m10 + this.m02 * other.m20,
            this.m00 * other.m01 + this.m01 * other.m11 + this.m02 * other.m21,
            this.m00 * other.m02 + this.m01 * other.m12 + this.m02 * other.m22,

            this.m10 * other.m00 + this.m11 * other.m10 + this.m12 * other.m20,
            this.m10 * other.m01 + this.m11 * other.m11 + this.m12 * other.m21,
            this.m10 * other.m02 + this.m11 * other.m12 + this.m12 * other.m22,

            this.m20 * other.m00 + this.m21 * other.m10 + this.m22 * other.m20,
            this.m20 * other.m01 + this.m21 * other.m11 + this.m22 * other.m21,
            this.m20 * other.m02 + this.m21 * other.m12 + this.m22 * other.m22
        ];
        this.data.set(t);
        return this;
    }

    MultiplyVec2( other ){

    }

    MultiplyVec3( other ){

    }

    TRS( position, rotation, scale ){
        
    }
    
    GetMat4(){
        var m = new EEE.Mat4();
        m.data[0] = this.data[0];   m.data[4] = this.data[3];   m.data[8]  = this.data[6];     m.data[12] = 0;
        m.data[1] = this.data[1];   m.data[5] = this.data[4];   m.data[9]  = this.data[7];     m.data[13] = 0;
        m.data[2] = this.data[2];   m.data[6] = this.data[5];   m.data[10] = this.data[8];     m.data[14] = 0;
        m.data[3] = 0;              m.data[7] = 0;              m.data[11] = 0;                m.data[15] = 1;
        return m;
    }
}

/* src/math/Mat4.js */

EEE.Mat4 = class Mat4{
    /*
        Column major format for opengl

        +----+----+----+----+   +-----+-----+-----+-----+
        |  0 |  4 |  8 | 12 |   | m00 | m10 | m20 | m30 |
        +----+----+----+----+   +-----+-----+-----+-----+
        |  1 |  5 |  9 | 13 |   | m01 | m11 | m21 | m31 |
        +----+----+----+----+   +-----+-----+-----+-----+
        |  2 |  6 | 10 | 14 |   | m02 | m12 | m22 | m32 |
        +----+----+----+----+   +-----+-----+-----+-----+
        |  3 |  7 | 11 | 15 |   | m03 | m13 | m23 | m33 |
        +----+----+----+----+   +-----+-----+-----+-----+

    */
    
    constructor(data){
        this.type = EEE.MATH_MATRIX4;
        this.data = data || new Float32Array(16);
    }

    get m00(){ return this.data[0]; }   get m10(){ return this.data[4]; }   get m20(){ return this.data[8]; }    get m30(){ return this.data[12]; }
    get m01(){ return this.data[1]; }   get m11(){ return this.data[5]; }   get m21(){ return this.data[9]; }    get m31(){ return this.data[13]; }
    get m02(){ return this.data[2]; }   get m12(){ return this.data[6]; }   get m22(){ return this.data[10]; }   get m32(){ return this.data[14]; }
    get m03(){ return this.data[3]; }   get m13(){ return this.data[7]; }   get m23(){ return this.data[11]; }   get m33(){ return this.data[15]; }

    set m00(v){ this.data[0] = v; } set m10(v){ this.data[4] = v; } set m20(v){ this.data[8] = v; }  set m30(v){ this.data[12] = v; }
    set m01(v){ this.data[1] = v; } set m11(v){ this.data[5] = v; } set m21(v){ this.data[9] = v; }  set m31(v){ this.data[13] = v; }
    set m02(v){ this.data[2] = v; } set m12(v){ this.data[6] = v; } set m22(v){ this.data[10] = v; } set m32(v){ this.data[14] = v; }
    set m02(v){ this.data[3] = v; } set m13(v){ this.data[7] = v; } set m23(v){ this.data[11] = v; } set m33(v){ this.data[15] = v; }

    Set( data ){
        this.data.set(data);
        return this;
    }

    Identity(){
        this.data.set([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ]);
        return this;
    }

    Multiply( other ){
        var t = [
            this.m00*other.m00 + this.m01*other.m10 + this.m02*other.m20 + this.m03*other.m30,
            this.m00*other.m01 + this.m01*other.m11 + this.m02*other.m21 + this.m03*other.m31,
            this.m00*other.m02 + this.m01*other.m12 + this.m02*other.m22 + this.m03*other.m32,
            this.m00*other.m03 + this.m01*other.m13 + this.m02*other.m23 + this.m03*other.m33,

            this.m10*other.m00 + this.m11*other.m10 + this.m12*other.m20 + this.m13*other.m30,
            this.m10*other.m01 + this.m11*other.m11 + this.m12*other.m21 + this.m13*other.m31,
            this.m10*other.m02 + this.m11*other.m12 + this.m12*other.m22 + this.m13*other.m32,
            this.m10*other.m03 + this.m11*other.m13 + this.m12*other.m23 + this.m13*other.m33,

            this.m20*other.m00 + this.m21*other.m10 + this.m22*other.m20 + this.m23*other.m30,
            this.m20*other.m01 + this.m21*other.m11 + this.m22*other.m21 + this.m23*other.m31,
            this.m20*other.m02 + this.m21*other.m12 + this.m22*other.m22 + this.m23*other.m32,
            this.m20*other.m03 + this.m21*other.m13 + this.m22*other.m23 + this.m23*other.m33,

            this.m30*other.m00 + this.m31*other.m10 + this.m32*other.m20 + this.m33*other.m30,
            this.m30*other.m01 + this.m31*other.m11 + this.m32*other.m21 + this.m33*other.m31,
            this.m30*other.m02 + this.m31*other.m12 + this.m32*other.m22 + this.m33*other.m32,
            this.m30*other.m03 + this.m31*other.m13 + this.m32*other.m23 + this.m33*other.m33
        ];

        this.data.set(t);
        return this;
    }

    TRS( position, rotation, scale ){
        this.Identity();
        var T = new EEE.Mat4([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            position.x,position.y,position.z,1
        ]);
        var R = rotation.GetMat4();
        
        var S = new EEE.Mat4([
            scale.x,0,0,0,
            0,scale.y,0,0,
            0,0,scale.z,0,
            0,0,0,1
        ]);

        this.Multiply(S).Multiply(R).Multiply(T);
        return this;
    }

    PerspectiveProjection( fov, aspect, near, far ){
        var s = 1 / Math.tan( (fov/2) * (Math.PI/180) );
        this.data.set([
            s / aspect,0,0,0,
            0,s,0,0,
            0,0,-(far/(far-near)), -1,
            0,0,-((far*near)/(far-near)), 0
        ]);
        return this;
    }

    Copy( other ){
        this.data.set(other.data);
        return this;
    }
};

/* src/physics/Bounds2D.js */

EEE.Bounds2D = class Bounds2D{
    constructor(){
        this.origin = new EEE.Vec2(0,0);
        this.min = new EEE.Vec2(-10,-10);
        this.max = new EEE.Vec2( 10, 10);
    }

    TestPoint( point ){
        // todo
    }
}

/* src/physics/Bounds3D.js */

EEE.Bounds3D = class Bounds3D{
    constructor(){
        this.origin = new EEE.Vec3( 0,0,0 );
        this.min = new EEE.Vec3(-1,-1,-1);
        this.max = new EEE.Vec3( 1, 1, 1);
    }

    TestPoint( point ){
        // todo
    }
}

/* src/graphics/Drawable.js */

// drawable is the core class for drawing meshes
// this will be used as base for Mesh, Sprite, Particle and more.
EEE.Drawable = class Drawable{
    
    constructor(){
        this.material = null; // can be overriden by obj.material, reeplaced with default if null
        this.drawMode = EEE.GL_TRIANGLES;
        this.isInitialized = false;
    }

    Initialize( gl ){
        // creating and initializing gl buffers here.
        this.isInitialized = true;
    }

    Draw( gl ){
        if(!this.isInitialized){
            this.Initialize( gl );
        }
        // glsl program is setup by renderer before calling this function!
        // only drawing function for this specific object here
        // for standard mesh it would be something like this:
        //      
        //  bind : attribute buffers and pointers
        //  draw : gl.drawElements() or gl.drawArrays()
    }
}

/* src/graphics/Texture.js */

EEE.Texture = class Texture{
    constructor(src){
        this.width = 0;
        this.height = 0;
        this.src = src;
        this.data = null;
        this.glTexture = null;
    }
    Initialize(gl){

    }
    Load(){

    }
}

/* src/graphics/Texture2D.js */

EEE.Texture2D = class Texture2D extends EEE.Texture{
    constructor(){
        super();
        this.wrapS = EEE.GL_REPEAT;
        this.wrapT = EEE.GL_REPEAT;
        this.minFilter = EEE.GL_LINEAR;
        this.magFilter = EEE.GL_LINEAR;
    }
}

/* src/graphics/Texture3D.js */

EEE.Texture3D = class Texture3D extends EEE.Texture{
    constructor(){
        super();
    }
}

/* src/graphics/Color.js */

EEE.Color = class Color{
    constructor(r,g,b,a){
        // 0 = black & 1 = white
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 0;
    }
}

/* src/graphics/Mesh.js */

EEE.Mesh = class Mesh extends EEE.Drawable{
    constructor( name, vertices, normals, colors, uvs0, indices ){
        super();
        this.name = name;
        this.material = null;
        this.vertices = new Float32Array(vertices);
        this.normals = new Int8Array(normals);
        this.colors = new Uint8Array(colors);
        this.uvs0 = new Float32Array(uvs0);
        this.uvs1 = new Float32Array(uvs0);
        this.indices = new Uint16Array(indices);

        this.VAO = null;

        this.gl_vertices = null;
        this.gl_normals = null;
        this.gl_colors = null;
        this.gl_uvs0 = null;
        this.gl_uvs1 = null;
        this.gl_indices = null;
    }

    Initialize(gl){
        super.Initialize();

        this.VAO = gl.createVertexArray();

        this.gl_vertices = gl.createBuffer();
        this.gl_normals = gl.createBuffer();
        this.gl_colors = gl.createBuffer();
        this.gl_uvs0 = gl.createBuffer();
        this.gl_uvs1 = gl.createBuffer();
        this.gl_indices = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_vertices);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_normals);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_colors);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_uvs0);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs0, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_uvs1);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs1, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.gl_indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // creating VAO for faster drawing
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer( 0, 3, gl.FLOAT, false, 0, 0 );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_normals );
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer( 1, 3, gl.BYTE, true, 0, 0 );	
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_colors );
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer( 2, 4, gl.UNSIGNED_BYTE, true, 0, 0 );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs0 );
        gl.enableVertexAttribArray(3);
        gl.vertexAttribPointer( 3, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs1 );
        gl.enableVertexAttribArray(4);
        gl.vertexAttribPointer( 4, 2, gl.FLOAT, false, 0, 0 );
        
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.gl_indices );

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
    }

    Draw(gl, pass){
        super.Draw(gl);
        gl.bindVertexArray(this.VAO);
        gl.drawElements( pass.drawMode, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}

EEE.ASSETS.meshes["triangle"] = new EEE.Mesh(
    "triangle",
    [ -0.5,-0.5, 0.0,     0.0, 0.5, 0.0,     0.5,-0.5, 0.0,  ],
    [ 0,0,127, 0,0,127, 0,0,127 ],
    [ 255,0,0,255,  0,255,0,255,  0,0,255,255 ],
    [ 0.0,0.0,  0.5,1.0,  1.0,0.0 ],
    [ 0,1,2 ]
);

EEE.ASSETS.meshes["quad"] = new EEE.Mesh(
    "quad",
    [ -0.5,-0.5, 0.0,    -0.5, 0.5, 0.0,    0.5, 0.5, 0.0,    0.5, -0.5, 0.0  ],
    [ 0,0,127, 0,0,127, 0,0,127, 0,0,127 ],
    [ 0,0,0,255,   0,255,0,255,  0,0,255,255,   255,0,0,255  ],
    [ 0.0,0.0,  0.0,1.0,  1.0,1.0,  1.0,0.0 ],
    [ 0,1,2, 0,2,3 ]
);

EEE.ASSETS.meshes["cube"] = new EEE.Mesh(
    "cube",
    [ 
         -0.5,  0.5, -0.5,    -0.5, -0.5, -0.5,     0.5,  0.5, -0.5,  // z-
          0.5,  0.5, -0.5,    -0.5, -0.5, -0.5,     0.5, -0.5, -0.5,  // z-
         -0.5,  0.5,  0.5,     0.5, -0.5,  0.5,    -0.5, -0.5,  0.5,  // z+
          0.5,  0.5,  0.5,     0.5, -0.5,  0.5,    -0.5,  0.5,  0.5,  // z+

         -0.5, -0.5, -0.5,    -0.5, -0.5,  0.5,     0.5, -0.5,  0.5,  // y-
         -0.5, -0.5, -0.5,     0.5, -0.5,  0.5,     0.5, -0.5, -0.5,  // y-
         -0.5,  0.5, -0.5,     0.5,  0.5,  0.5,    -0.5,  0.5,  0.5,  // y+
         -0.5,  0.5, -0.5,     0.5,  0.5, -0.5,     0.5,  0.5,  0.5,  // y+

         -0.5, -0.5, -0.5,    -0.5,  0.5, -0.5,    -0.5,  0.5,  0.5,  // x-
         -0.5, -0.5, -0.5,    -0.5,  0.5,  0.5,    -0.5, -0.5,  0.5,  // x-
          0.5, -0.5, -0.5,     0.5, -0.5,  0.5,     0.5,  0.5,  0.5,  // x+
          0.5, -0.5, -0.5,     0.5,  0.5,  0.5,     0.5,  0.5, -0.5   // x+
    ],
    [ 
         0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,  // z-
         0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,  // z+

         0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,  // y-
         0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,  // y+

        -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  // x-
         127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0   // x+
    ],
    [ 
          0,255,  0,255,    0,  0,  0,255,    255,255,  0,255, // z-
        255,255,  0,255,    0,  0,  0,255,    255,  0,  0,255, // z-
          0,255,255,255,  255,  0,255,255,      0,  0,255,255, // z+
        255,255,255,255,  255,  0,255,255,      0,255,255,255, // z+

          0,  0,  0,255,    0,  0,255,255,    255,  0,255,255, // y-
          0,  0,  0,255,  255,  0,255,255,    255,  0,  0,255, // y-
          0,255,  0,255,  255,255,255,255,      0,255,255,255, // y+
          0,255,  0,255,  255,255,  0,255,    255,255,255,255, // y+

          0,  0,  0,255,    0,255,  0,255,      0,255,255,255, // x-
          0,  0,  0,255,    0,255,255,255,      0,  0,255,255, // x-
        255,  0,  0,255,  255,  0,255,255,    255,255,255,255, // x+
        255,  0,  0,255,  255,255,255,255,    255,255,  0,255  // x+
    ],
    [ 
        1.0, 1.0,  1.0, 0.0,  0.0, 1.0, // z-
        0.0, 1.0,  1.0, 0.0,  0.0, 0.0, // z-
        0.0, 1.0,  1.0, 0.0,  0.0, 0.0, // z+
        1.0, 1.0,  1.0, 0.0,  0.0, 1.0, // z+

        0.0, 0.0,  0.0, 1.0,  1.0, 1.0, // y-
        0.0, 0.0,  1.0, 1.0,  1.0, 0.0, // y-
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, // y+
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, // y+

        0.0, 0.0,  0.0, 1.0,  1.0, 1.0, // x-
        0.0, 0.0,  1.0, 1.0,  1.0, 0.0, // x-
        1.0, 0.0,  0.0, 0.0,  0.0, 1.0, // x+
        1.0, 0.0,  0.0, 1.0,  1.0, 1.0  // x+
    ],
    [ 
         0, 1, 2,  3, 4, 5, // z-
         6, 7, 8,  9,10,11, // z+
        12,13,14, 15,16,17, // y-
        18,19,20, 21,22,23, // y+
        24,25,26, 27,28,29, // x-
        30,31,32, 33,34,35  // x+
    ]
);

/* src/graphics/Mesh2D.js */

EEE.Mesh2D = class Mesh2D extends EEE.Drawable{
    constructor( vertices ){
        super();
        this.vertices = new Float32Array(vertices);
        this.uvs = new Float32Array(vertices.length * (2/3));
        this.gl_vertices = null;
        this.gl_uvs = null;
    }
    Initialize(gl){
        super.Initialize(gl);
        this.gl_vertices = gl.createBuffer();
        this.gl_uvs = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs );
        gl.bufferData( gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW );

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    Draw(gl){
        super.Draw(gl);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs );
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer( 1, 2, gl.FLOAT, false, 0, 0 );

        gl.drawArrays( gl.Triangle, 0, this.vertices.length / 3 );
    }
}

/* src/core/GUI/GUI.js */

EEE.GUI = class GUI extends EEE.Drawable{
    constructor(){
        super();
        this.showCursor = true;
        this.elements = [];
    }
    Update(){
        if(this.showCursor){

        }
    }
    Draw(gl){
        // renderer will not have program and uniforms set for rendering GUI!
        if(this.showCursor){
            
        }
    }
};

/* src/core/GUI/GUIElement.js */

EEE.GUIElement = class GUIElement{
    constructor(){
        this.position = new EEE.Vec2(0,0);
        this.scale = new EEE.Vec2(0,0);
        this.bounds = new EEE.Bounds2D();
        this.drawable = null;
    }

    Update(){

    }
}

/* src/core/Init.js */

EEE.Init = function(){
    console.log("Started 'EEE' Initialization");
    EEE.loader = new EEE.Loader();
    EEE.renderer = new EEE.Renderer();
    if(!EEE.renderer.gl){ alert("WebGL failed to initialize! Your browser/hardware does not support WebGL?"); return; }
    EEE.input = new EEE.Input(); // input needs for renderer canvas to be present
    EEE.scene = new EEE.Scene();
    EEE.gui = new EEE.GUI();

    console.log("'EEE' Initialization Completed!");
    console.log("Starting mainloop.");
    EEE.Update();

    window.addEventListener("resize", function(){
        EEE.renderer.OnResize();
    });
    EEE.renderer.OnResize();
}

/* src/core/Update.js */

EEE.Update = function(){
    EEE.deltaTime = Date.now()/1000 - EEE.time;
    EEE.time = Date.now() / 1000;
    EEE.scene.Update();
    EEE.gui.Update();
    EEE.input.Update();
    EEE.renderer.Render( EEE.scene, EEE.scene.activeCamera );
    EEE.renderer.RenderGUI(EEE.gui);
    requestAnimationFrame( EEE.Update );    
}

/* src/core/Input.js */

EEE.Input = class Input{
    constructor(){
        this.mouse = {
            position : new EEE.Vec2(),
            delta : new EEE.Vec2() 
        };
        this.bindings = {
            up:[87,38],
            down:[83,40],
            left:[65,37],
            right:[68,39],
            jump:[32],
            crouch:[16]
        };
        this.keys = {};
        var self = this;
        
        // setup keyboard input
        window.addEventListener("keydown", function( e ){
            self.keys[ e.keyCode ] = true;
        });
        window.addEventListener("keyup", function( e ){
            self.keys[ e.keyCode ] = false;
        });
        
        // setup mouse input
        EEE.renderer.canvas.requestPointerLock = EEE.renderer.canvas.requestPointerLock || EEE.renderer.canvas.mozRequestPointerLock;
        EEE.renderer.canvas.onclick = function(){
            EEE.renderer.canvas.requestPointerLock();
        };
        document.onmousemove = function(e){
            self.mouse.position.x += e.movementX;
            self.mouse.position.y += e.movementY;
            self.mouse.position.x = Math.min(
                EEE.renderer.canvas.width,
                Math.max( 0, self.mouse.position.x )
            );
            self.mouse.position.y = Math.min(
                EEE.renderer.canvas.height,
                Math.max( 0, self.mouse.position.y )
            );
            self.mouse.delta.x = e.movementX;
            self.mouse.delta.y = e.movementY;
            //console.log( self.mouse.position.data );
        }
    }

    Update(){
        this.mouse.delta.Set(0,0);
    }

    GetBindingState( bindingName ){
        var b = this.bindings[bindingName];
        if(b != undefined){
            for(var i = 0; i < b.length; i++){
                if( this.keys[b[i]] ){
                    return true;
                }
            }
        }
        return false;
    }
};

/* src/core/Scene.js */

EEE.Scene = class Scene{
    constructor(){
        this.objects = [];
        this.activeCamera = new EEE.Camera();
        this.AddObj(this.activeCamera);

        this.backgroundColor = new EEE.Color(0,0,0,1);
    }

    AddObj( o ){
        this.objects.push(o);
    }

    Update(){
        for(var i = 0 ; i < this.objects.length; i++){
            this.objects[i].Update();
        }
    }
    
};

/* src/core/Obj.js */

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

/* src/core/Camera.js */

EEE.Camera = class Camera extends EEE.Obj{
    constructor(){
        super();
        this.width = 0;
        this.height = 0;
        this.fov = 90;
        this.near = 0.1;
        this.far = 100.0;
        this.aspect = 1;
        this.matrix_projection = new EEE.Mat4().PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
        this.matrix_view = new EEE.Mat4().Identity();
    }

    UpdateProjectionMatrix(){
        this.aspect = this.width / this.height;
        this.matrix_projection.PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
    }

    UpdateMatrix(){
        super.UpdateMatrix();
        this.matrix_view.Set([
            1,0,0,0,
            0,1,0,0,
            0,0,-1,0,
            -this.position.x,-this.position.y, this.position.z
        ]).Multiply( this.rotation.GetMat4() );
    }
}

/* src/rendering/SHADERS.js */

EEE.SHADERLIB = {};
EEE.SHADERLIB.vertex = {
    default : [
        "#version 300 es",
        "precision mediump float;",
        "layout(location = 0) in vec3 a_vertex;",
        "layout(location = 1) in vec3 a_normal;",
        "layout(location = 2) in vec4 a_color;",
        "layout(location = 3) in vec2 a_uv0;",
        "layout(location = 4) in vec2 a_uv1;",

        "out vec3 v_vertex;",
        "out vec3 v_normal;",
        "out vec4 v_color;",
        "out vec2 v_uv0;",

        "uniform vec2 u_time;",
        "uniform mat4 u_matrix_model;",
        "uniform mat4 u_matrix_view;",
        "uniform mat4 u_matrix_projection;",

        "void main(){",
        "	v_vertex = a_vertex;",
        "	v_normal = normalize(a_normal);",
        "	v_color = a_color;",
        "	v_uv0 = a_uv0;",
        "	gl_Position = u_matrix_projection * u_matrix_view * u_matrix_model * vec4( a_vertex, 1.0 );",
        "	gl_PointSize = 10.0;",
        "}"
    ].join("\n"),
};
EEE.SHADERLIB.fragment = {
    default:[
        "#version 300 es",
        "precision mediump float;",
        "in vec3 v_vertex;",
        "in vec3 v_normal;",
        "in vec4 v_color;",
        "in vec2 v_uv0;",
        "out vec4 out_color;",

        "uniform vec4 u_diffuse_color;",

        "void main(){",
        "	out_color = u_diffuse_color;",
        "}"
    ].join("\n")
};

/* src/rendering/GLUniformBlock.js */

EEE.GLUniformBlock = class{
    constructor( props ){
        /*
            example properties object
            {
                u_time : new Float32Array(1),
                u_matrix_view : new Float32Array(16),
                u_matrix_projection : new Float32Array(16)
            }

            this would be in GLSL as:

            uniform blockName{
                float u_time;
                mat4 u_matrix_view;
                mat4 u_matrix_projection;
            }

            NB
            ! Values must be instance of js TypedArray, even if only 1 component !
            ! Resizing the uniform buffer is not allowed( nor reasonable )!
        */
        this.properties = props;
        this.offsets = {};
        this.array = null;        
        this.buffer = null;
        this.needsUpdate = true; // updates should be done as infrequently as possible!
    }
    Use(gl){
        if(this.needsUpdate == true){ this.Update(gl); }
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
    }
    Update(gl){
        if(this.buffer == null){
            this.buffer = gl.createBuffer();
        }
        if(this.array == null){
            var bytecount = 0;
            for(var name in this.properties){
                this.offsets[name] = [0,0];
                this.offsets[name][0] = bytecount; // starting offset in buffer
                bytecount += this.properties[name].BYTES_PER_ELEMENT * this.properties[name].length;
                this.offsets[name][1] = bytecount; // end offset in buffer
            }
            this.array = new ArrayBuffer( bytecount );
        }
        for(var name in this.properties){
            var val = this.properties[name];
            var view = null;
            switch(val.name){
                case "Int8Array": view = new Int8Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint8Array": view = new Uint8Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Int16Array": view = new Int16Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint16Array": view = new Uint16Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Int32Array": view = new Int32Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint32Array": view = new Uint32Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Float32Array":view = new Float32Array(this.array,this.offsets[name][0], this.offsets[name][1]); break;
            }
            for(var i = 0; i < val.length; i++){
                view[i] = val[i];
            }
        }
        // finally update gl buffer on gpu
        gl.bindBuffer(gl.UNIFORM_BUFFER);
        gl.bufferData(gl.UNIFORM_BUFFER, this.array, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    }
}

/* src/rendering/GLProgram.js */

EEE.GLProgram = class GLProgram{
    constructor(vsSource, fsSource){
        this.vsSource = vsSource;
        this.fsSource = fsSource;
        this.vs = null;
        this.fs = null;
        this.uniformLocations = {};
        this.program = null;
    }

    Use(gl){
        if(this.program == null){
            this.Initialize(gl);
        }
        gl.useProgram(this.program);
    }

    Initialize( gl ){
        // assign vertex shader source and compile it
        this.vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(this.vs, this.vsSource);
        gl.compileShader(this.vs);
        var error = gl.getShaderInfoLog(this.vs);
        if (error.length > 0) {
            throw error;
        }

        // assign fragment shader source and compile it
        this.fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(this.fs, this.fsSource);
        gl.compileShader(this.fs);
        var error = gl.getShaderInfoLog(this.fs);
        if (error.length > 0) {
            throw error;
        }

        //create and setup shader program
        this.program = gl.createProgram();
        gl.attachShader( this.program, this.vs );
        gl.attachShader( this.program, this.fs );
        gl.linkProgram( this.program );
        this.GetUniformLocations(gl);
    }

    SetUniform( gl, name, value, type){
        if(value == null){return;}
        if(this.uniformLocations[name]){
            switch(type){
                case EEE.UNIFORM_MATRIX4: gl.uniformMatrix4fv( this.uniformLocations[name], false, value );
                case EEE.UNIFORM_VEC4: gl.uniform4fv( this.uniformLocations[name], value ); break;
            }
        }
    }

    GetUniformLocations(gl){
        var re = new RegExp( /uniform .* (.*);/g, "m");
        var lines = this.vsSource.split("\n");
        for(var i = 0; i < lines.length; i++){
            var e = re.exec( lines[i]);
            if(e != null){
                this.uniformLocations[e[1]] = gl.getUniformLocation(this.program, e[1]);
            }
        }
        console.log( this.uniformLocations );
    }
}

/* src/rendering/MaterialPass.js */

EEE.MaterialPass = class MaterialPass{
    constructor( glProgram ){
        this.glProgram = glProgram;
        this.enableDepth = true;
        this.drawMode = EEE.GL_TRIANGLES;
    }
    
    Use(gl){
        this.glProgram.Use(gl);
    }
}

/* src/rendering/Material.js */

EEE.Material = class Material{
    constructor(){
        this.passes = [];
        this.uniforms = {
            u_diffuse_color : {value : new Float32Array([1,1,1,1]), type : EEE.UNIFORM_VEC4 },
            u_diffuse_texture : {value : null, type : EEE.UNIFORM_SAMPLER2D }
        };
    }

    Update( gl ){
        
    }
}

/* src/rendering/Renderer.js */

EEE.Renderer = class Renderer{
	constructor(){
		this.matrix_model = new EEE.Mat4().Identity(); 
		this.matrix_view = new EEE.Mat4().Identity();
		this.matrix_projection = new EEE.Mat4().Identity();

		this.pixelScale = 1;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.gl = this.canvas.getContext("webgl2", {antialias:0});
		if(!this.gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild( this.canvas );

		this.activeProgram = null;
		this.defaultMaterial = new EEE.Material();
		this.defaultMaterial.passes.push(
			new EEE.MaterialPass(
				new EEE.GLProgram(
					EEE.SHADERLIB.vertex.default,
					EEE.SHADERLIB.fragment.default
				)
			)
		);
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth / this.pixelScale);
		this.canvas.height = Math.round(window.innerHeight / this.pixelScale);
	}

	InitializeTexture( tex ){
		tex.glTexture = this.gl.createTexture();
		this.gl.bindTexture( this.gl.TEXTRUE_2D, tex.glTexture );
		this.gl.texImage2D( this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0,0,255,255]) );
	}

	CreateGLProgram( vs, fs ){
		var v = this.gl.createShader(this.gl.VERTEX_SHADER);
		var f = this.gl.createShader(this.gl.FRAGMENT_SHADER);
		this.gl.shaderSource( v, vs );
		this.gl.compileShader(v);

		this.gl.shaderSource( f, fs );
		this.gl.compileShader(f);

		var p = this.gl.createProgram();
		this.gl.attachShader(p, v);
		this.gl.attachShader(p, f);
		this.gl.bindAttribLocation(p, 0, "a_vertex");
		this.gl.bindAttribLocation(p, 1, "a_normal");
		this.gl.bindAttribLocation(p, 2, "a_color");
		this.gl.bindAttribLocation(p, 3, "a_uv0");
		this.gl.linkProgram(p);
		return p;
	}

	CreateMaterialPass(p){
		var _p = p;
		var o = {
			program   : p.program,
			depthTest : true, // wether to gl.enable(gl.DEPTH_TEST)
			drawMode  : EEE.GL_TRIANGLES, // 0:points, 1:edges, 2:triangles
			cullFace  : 1 // 0:off, 1:cull back, 2:cull front
		};
		// add default values
		for(var k in o){
			if(!_p.hasOwnProperty(k)){
				_p[k] = o[k];
			}
		}

		return _p;
	}

	RenderGUI( gui ){
		for(var i = 0; i < gui.elements.length; i++){
			gui.elements[i].Draw();
		}
	}

	Render( scene, camera ){

		this.matrix_view = camera.matrix_view;
		if( this.canvas.width != camera.width || this.canvas.height != camera.height ){
			camera.width = this.canvas.width;
			camera.height = this.canvas.height;
			camera.UpdateProjectionMatrix();
		} 
		this.matrix_projection = camera.matrix_projection;

		this.gl.clearColor( 
			scene.backgroundColor.r,
			scene.backgroundColor.g,
			scene.backgroundColor.b,
			scene.backgroundColor.a
		);
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.clear( this.gl.COLOR_BUFFER_BIT, this.gl.DEPTH_BUFFER_BIT );

		for(var i = 0; i < scene.objects.length; i++){
			var o = scene.objects[i];
			if(o.drawable){
				this.matrix_model = o.localToWorld;
				this.RenderDrawable( o.drawable );
			}
		}
	}

	RenderDrawable( drawable, material){
		var mat = material || this.defaultMaterial;
		for(var i = 0; i < mat.passes.length; i++){
			if(mat.passes[i].enableDepth == true){
				this.gl.enable(this.gl.DEPTH_TEST);
			}
			this.gl.enable(this.gl.CULL_FACE);
			switch(mat.passes[i].cullFace){
				case 0: this.gl.cullFace(this.gl.FRONT_AND_BACK); break;
				case 1: this.gl.cullFace(this.gl.BACK); break;
				case 2: this.gl.cullFace(this.gl.FRONT); break;
			}

			mat.passes[i].Use(this.gl);

			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_model", this.matrix_model.data, EEE.UNIFORM_MATRIX4);
			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_view", this.matrix_view.data, EEE.UNIFORM_MATRIX4);
			mat.passes[i].glProgram.SetUniform(this.gl, "u_matrix_projection", this.matrix_projection.data, EEE.UNIFORM_MATRIX4);
			
			for( var u_name in mat.uniforms ){
				mat.passes[i].glProgram.SetUniform( 
					mat.passes[i].glProgram, 
					u_name,
					mat.uniforms[u_name].value, 
					mat.uniforms[u_name].type 
				);
			}

			drawable.Draw(this.gl, mat.passes[i]);
		}
	}
};

/* src/loader/Loader.js */

EEE.Loader = class Loader{
    constructor(){
        
    }
}
