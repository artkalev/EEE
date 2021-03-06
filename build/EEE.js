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

// GL data types
EEE.GL_BYTE = 0x1400;
EEE.GL_UNSIGNED_BYTE = 0x1401;
EEE.GL_SHORT = 0x1402;
EEE.GL_UNSIGNED_SHORT = 0x1403;
EEE.GL_INT = 0x1404;
EEE.GL_UNSIGNED_INT = 0x1405;
EEE.GL_FLOAT = 0x1406;

// GL Pixel formats
EEE.GL_DEPTH_COMPONENT = 0x1902;
EEE.GL_ALPHA = 0x1906;
EEE.GL_RGB = 0x1907;
EEE.GL_RGBA = 0x1908;
EEE.GL_LUMINANCE = 0x1909;
EEE.GL_LUMINANCE_ALPHA = 0x910A;

EEE.GL_DEPTH_COMPONENT24 = 0x81A6;

// GL Pixel Types
EEE.GL_UNSIGNED_BYTE = 0x1401;
EEE.GL_UNSIGNED_SHORT_4444 = 0x8033;
EEE.GL_UNSIGNED_SHORT_5551 = 0x8034;
EEE.GL_UNSIGNED_SHORT_565 = 0x8063;
EEE.GL_UNSIGNED_INT_2_10_10_10_REV = 0x8368;
EEE.GL_UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
EEE.GL_UNSIGNED_INT_5_9_9_9_REV = 0x8C3E;
EEE.GL_FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
EEE.GL_UNSIGNED_INT_24_8 = 0x84FA;
EEE.GL_HALF_FLOAT = 0x140B;
EEE.GL_RG = 0x8227;
EEE.GL_RG_INTEGER = 0x8228;
EEE.GL_INT_2_10_10_10_REV = 0x8D9F;

// primitive drawtypes
EEE.GL_POINTS = 0x0000;
EEE.GL_LINES = 0x0001;
EEE.GL_LINE_LOOP = 0x0002;
EEE.GL_LINE_STRIP = 0x0003;
EEE.GL_TRIANGLES = 0x0004;
EEE.GL_TRIANGLE_STRIP = 0x0005;
EEE.GL_TRIANGLE_FAN = 0x0006;

EEE.GL_CULL_BACK = 0x0405;
EEE.GL_CULL_FRONT = 0x0404;
EEE.GL_CULL_BOTH = 0x0408;

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
EEE.UNIFORM_INT = 0x0001;
EEE.UNIFORM_MAT4 = 0x0002;
EEE.UNIFORM_VEC2 = 0x0003;
EEE.UNIFORM_VEC3 = 0x0004;
EEE.UNIFORM_VEC4 = 0x0005;

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

/* src/math/Misc.js */

function IsPowerOfTwo(n) {
    return n && (n & (n - 1)) === 0;
}

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

/* src/math/Vec4.js */

EEE.Vec4 = class Vec4{
    constructor(x,y,z,w){
		this.type = EEE.MATH_VECTOR4;
        this.data = new Float32Array([x||0,y||0,z||0,w||0]);
    }
    get x(){ return this.data[0]; }
    get y(){ return this.data[1]; }
    get z(){ return this.data[2]; }
    get w(){ return this.data[3]; }

    set x(v){ this.data[0] = v; }
    set y(v){ this.data[1] = v; }
    set z(v){ this.data[2] = v; }
    set w(v){ this.data[3] = v; }

	Set(x,y,z,w){
		this.data[0] = x;
		this.data[1] = y;
		this.data[2] = z;
		this.data[3] = w;
		return this;
	}
	
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

    Length(){
        return Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w );
    }

    Normalize(){
        var l = this.Length();
        this.x /= l;
        this.y /= l;
        this.z /= l;
        this.w /= l;
        return this;
    }

    Set(x,y,z,w){
        this.data[0] = x;
        this.data[1] = y;
        this.data[2] = z;
        this.data[3] = w;
        this.Normalize();
        return this;
    }

    Multiply( other ){
        this.x =  this.x * other.w + this.y * other.z - this.z * other.y + this.w * other.x;
        this.y = -this.x * other.z + this.y * other.w + this.z * other.x + this.w * other.y;
        this.z =  this.x * other.y - this.y * other.x + this.z * other.w + this.w * other.z;
        this.w = -this.x * other.x - this.y * other.y - this.z * other.z + this.w * other.w;
        this.Normalize();
        return this;
    }

    MultiplyVec4( other ){
        return new EEE.Vec4(
            other.x * this.x,
            other.y * this.y,
            other.z * this.z,
            other.w * this.w
        );
    }

    MultiplyVec3( other ){
        var x = other.x, y = other.y, z = other.z;
		var qx = this.x, qy = this.y, qz = this.z, qw = this.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		other.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		other.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		other.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return other;
    }

    GetEuler(){
        var result = [0,0,0];
        var test = this.data[0]*this.data[1] + this.data[2]*this.data[3];
        if (test > 0.499) { // singularity at north pole
            result[0] = 2 * Math.atan2(this.data[0],this.data[3]);
            result[1] = Math.PI/2;
            result[2] = 0;
            return result;
        }
        if (test < -0.499) { // singularity at south pole
            result[0] = -2 * Math.atan2(this.data[0],this.data[3]);
            result[1] = - Math.PI/2;
            result[2] = 0;
            return result;
        }
        var sqx = this.data[0]*this.data[0];
        var sqy = this.data[1]*this.data[1];
        var sqz = this.data[2]*this.data[2];
        result[0] = Math.atan2(2*this.data[1]*this.data[3]-2*this.data[0]*this.data[2] , 1 - 2*sqy - 2*sqz);
        result[1] = Math.asin(2*test);
        result[2] = Math.atan2(2*this.data[0]*this.data[3]-2*this.data[1]*this.data[2] , 1 - 2*sqx - 2*sqz)
        return result;
    }

    SetEuler(x,y,z, order){
        var cos = Math.cos;
		var sin = Math.sin;

		var c1 = cos( x / 2 );
		var c2 = cos( y / 2 );
		var c3 = cos( z / 2 );

		var s1 = sin( x / 2 );
		var s2 = sin( y / 2 );
        var s3 = sin( z / 2 );

		if ( order === 'XYZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'YXZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'ZXY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'ZYX' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'YZX' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'XZY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

        }
        
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
        var x = this.x, y = this.y, z = this.z, w = this.w;
		var x2 = x + x, y2 = y + y, z2 = z + z;
		var xx = x * x2, xy = x * y2, xz = x * z2;
		var yy = y * y2, yz = y * z2, zz = z * z2;
		var wx = w * x2, wy = w * y2, wz = w * z2;

        result.m00  = 1 - ( yy + zz );
        result.m01  =     ( xy - wz );
        result.m02  =     ( xz + wy );
        
        result.m10  =     ( xy + wz );
        result.m11  = 1 - ( xx + zz );
        result.m12  =     ( yz - wx );

        result.m20  =     ( xz - wy );
        result.m21  =     ( yz + wx );
        result.m22  = 1 - ( xx + yy );

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
    set m03(v){ this.data[3] = v; } set m13(v){ this.data[7] = v; } set m23(v){ this.data[11] = v; } set m33(v){ this.data[15] = v; }

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

    MultiplyVec3( v ){
        v.x = v.x * this.m00 + v.y * this.m10 + v.z * this.m20;
        v.y = v.x * this.m01 + v.y * this.m11 + v.z * this.m21;
        v.z = v.x * this.m02 + v.y * this.m12 + v.z * this.m22;
        return v;
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

    GetInverse(m){

        var te = this.data,
			me = m.data,

			n11 = me[ 0 ], n21 = me[ 1 ], n31 = me[ 2 ], n41 = me[ 3 ],
			n12 = me[ 4 ], n22 = me[ 5 ], n32 = me[ 6 ], n42 = me[ 7 ],
			n13 = me[ 8 ], n23 = me[ 9 ], n33 = me[ 10 ], n43 = me[ 11 ],
			n14 = me[ 12 ], n24 = me[ 13 ], n34 = me[ 14 ], n44 = me[ 15 ],

			t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
			t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
			t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
			t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;

		var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

        var detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44 ) * detInv;
		te[ 2 ] = ( n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44 ) * detInv;
		te[ 3 ] = ( n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43 ) * detInv;

		te[ 4 ] = t12 * detInv;
		te[ 5 ] = ( n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44 ) * detInv;
		te[ 6 ] = ( n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44 ) * detInv;
		te[ 7 ] = ( n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43 ) * detInv;

		te[ 8 ] = t13 * detInv;
		te[ 9 ] = ( n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44 ) * detInv;
		te[ 10 ] = ( n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44 ) * detInv;
		te[ 11 ] = ( n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43 ) * detInv;

		te[ 12 ] = t14 * detInv;
		te[ 13 ] = ( n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34 ) * detInv;
		te[ 14 ] = ( n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34 ) * detInv;
		te[ 15 ] = ( n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33 ) * detInv;

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

    Initialize(){
        // creating and initializing gl buffers here.
        this.isInitialized = true;
    }

    Draw( pass ){
        if(!this.isInitialized){
            this.Initialize();
        }
        // glsl program is setup by renderer before calling this function!
        // only drawing function for this specific object here
        // for standard mesh it would be something like this:
        //      
        //  bind : attribute buffers and pointers
        //  draw : gl.drawElements() or gl.drawArrays()
    }
}

/* src/graphics/Color.js */

EEE.Color = class Color{
    constructor(r,g,b,a){
        this.data = new Float32Array([r,g,b,a]);
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

    Initialize(){
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

    Draw( pass ){
        super.Draw(gl, pass);
        gl.bindVertexArray( this.VAO );
        gl.drawElements( pass.drawMode, this.indices.length, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray( null );
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
    /* position */[ -0.5,-0.5, 0.0,    -0.5, 0.5, 0.0,    0.5, 0.5, 0.0,    0.5, -0.5, 0.0  ],
    /* normal */[ 0,0,127, 0,0,127, 0,0,127, 0,0,127 ],
    /* color */[ 0,0,0,255,   0,255,0,255,  0,0,255,255,   255,0,0,255  ],
    /* uv0 */[ 0.0,0.0,  0.0,1.0,  1.0,1.0,  1.0,0.0 ],
    /* index */[ 0,1,2, 0,2,3 ]
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
    if(!gl){ alert("WebGL failed to initialize! Your browser/hardware does not support WebGL?"); return; }
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
        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
        if ("onpointerlockchange" in document) {
            document.addEventListener('pointerlockchange', lockChangeAlert, false);
        } else if ("onmozpointerlockchange" in document) {
            document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
        }
        
        function lockChangeAlert() {
            if(document.pointerLockElement === EEE.renderer.canvas.canvas ||
                document.mozPointerLockElement === EEE.renderer.canvas.canvas) {
                console.log('The pointer lock status is now locked');
                // Do something useful in response
            } else {
                console.log('The pointer lock status is now unlocked');      
                // Do something useful in response
            }
        }

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
		this.worldToLocal = new EEE.Mat4().Identity();
		this.matrixNeedsUpdate = true;
		
		this.right = new EEE.Vec3(1,0,0);
		this.up = new EEE.Vec3(0,1,0);
		this.forward = new EEE.Vec3(0,0,1);
		
		this.children = [];
		this.parent = null;
		this.modules = [];
		this.drawable = null;
		this.material = null; // overrides drawble's material
		this.u_modelBlock = null;
		this.opacity = 1;

		this._firstFrame = true;
	}

	Translate( offset ){
		var v = this.rotation.MultiplyVec3(offset.Clone());
		this.position.Add( v );
		this.matrixNeedsUpdate = true;
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

		this.worldToLocal.GetInverse( this.localToWorld );

		this.right.Set( this.localToWorld.data[0],this.localToWorld.data[4],this.localToWorld.data[8] ).Normalize();
		this.up.Set( this.localToWorld.data[1],this.localToWorld.data[5],this.localToWorld.data[9] ).Normalize();
		this.forward.Set( this.localToWorld.data[2],this.localToWorld.data[6],this.localToWorld.data[10] ).Normalize();

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
        this.far = 1000.0;
        this.aspect = 1;
        this.matrix_projection = new EEE.Mat4().PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
		this.matrix_projectionInverse = new EEE.Mat4().GetInverse( this.matrix_projection );
        this.matrix_view = new EEE.Mat4().Identity();
        this.matrix_viewInverse = new EEE.Mat4().GetInverse(this.matrix_view);
		
		this.postfx = [];
    }

    UpdateProjectionMatrix(){
        this.aspect = this.width / this.height;
        this.matrix_projection.PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
		this.matrix_projectionInverse = new EEE.Mat4().GetInverse( this.matrix_projection );
    }

    UpdateMatrix(){
        super.UpdateMatrix();
        this.matrix_view.Set([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            -this.position.x, -this.position.y, -this.position.z
        ]).Multiply( this.rotation.GetMat4() );
		this.matrix_viewInverse = new EEE.Mat4().GetInverse(this.matrix_view);

    }
}

/* src/rendering/DataTexture2D.js */



/* src/rendering/Texture2D.js */

EEE.Texture2D = class Texture2D{
	constructor( width, height, internalFormat, pixelFormat, pixelType, url ){
		this.width = 2;
		this.height = 2;
		this.internalFormat = internalFormat || EEE.GL_RGBA;
		this.pixelFormat = pixelFormat || EEE.GL_RGBA;
		this.pixelType = pixelType || EEE.GL_UNSIGNED_BYTE;
		this.glTexture = null;
		this.source = null;
		this.url = url;
		if(this.url != null){
			this.Load( this.url );
		}
	}
	
	Initialize(){
		this.glTexture = gl.createTexture();
		gl.bindTexture( gl.TEXTURE_2D, this.glTexture );
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			this.internalFormat,
			this.width,
			this.height,
			0,
			this.pixelFormat,
			this.pixelType,
			this.source
		);
		gl.pixelStorei(gl.UNPACK_ALIGNMENT, 2);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	}
	
	Resize(width, height){
		this.width = width;
		this.height = height;
		gl.bindTexture( gl.TEXTURE_2D, this.glTexture );
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			this.internalFormat,
			this.width,
			this.height,
			0,
			this.pixelFormat,
			this.pixelType,
			null
		);
	}
	
	Load( url ){
		this.source = new Image();
		var self = this;
		this.source.addEventListener("load",function(){
			self.width = self.source.width;
			self.height = self.source.height;
			
			if(self.glTexture == null){ self.glTexture = gl.createTexture(); }
			gl.bindTexture( gl.TEXTURE_2D, self.glTexture );
			gl.texImage2D(
				gl.TEXTURE_2D,
				0,
				self.internalFormat,
				self.width,
				self.height,
				0,
				self.pixelFormat,
				self.pixelType,
				self.source
			);
			if( IsPowerOfTwo(self.width) && IsPowerOfTwo(self.height)){
				gl.generateMipmap(gl.TEXTURE_2D);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			}
			console.log("texture loaded", self);
		});
		this.source.src = url;
		return this;
	}
}



/* src/rendering/GBuffer.js */

EEE.GBuffer = class GBuffer{
    constructor(width, height){
        this.width = width;
        this.height = height;
		this.depth = new EEE.Texture2D( this.width, this.height, EEE.GL_DEPTH_COMPONENT24, EEE.GL_DEPTH_COMPONENT, EEE.GL_UNSIGNED_INT );
        this.normalDepth = new EEE.Texture2D( this.width, this.height, gl.RGBA, gl.RGBA, EEE.GL_UNSIGNED_BYTE );
		this.diffuseColor = new EEE.Texture2D( this.width, this.height, EEE.GL_RGBA, EEE.GL_RGBA, EEE.GL_UNSIGNED_BYTE );
		this.metallicSmoothness = new EEE.Texture2D( this.width, this.height, EEE.GL_RGBA, EEE.GL_RGBA, EEE.GL_UNSIGNED_BYTE );
        this.glFramebuffer = null;
        this.isInitialized = false;
        this.needsUpdate = true;
    }

    Initialize(){
		this.depth.Initialize(gl);
		this.normalDepth.Initialize(gl);
		this.diffuseColor.Initialize(gl);
		this.metallicSmoothness.Initialize(gl);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture( gl.TEXTURE_2D, this.depth.glTexture );
		
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture( gl.TEXTURE_2D, this.normalDepth.glTexture );
		
		gl.activeTexture(gl.TEXTURE2);
		gl.bindTexture( gl.TEXTURE_2D, this.diffuseColor.glTexture );
		
		gl.activeTexture(gl.TEXTURE3);
		gl.bindTexture( gl.TEXTURE_2D, this.metallicSmoothness.glTexture );
		
        this.glFramebuffer = gl.createFramebuffer();
        gl.bindFramebuffer( gl.DRAW_FRAMEBUFFER, this.glFramebuffer );
		gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depth.glTexture, 0);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.normalDepth.glTexture, 0);
		gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, this.diffuseColor.glTexture, 0);
        gl.framebufferTexture2D(gl.DRAW_FRAMEBUFFER, gl.COLOR_ATTACHMENT2, gl.TEXTURE_2D, this.metallicSmoothness.glTexture, 0);
		
		var status = gl.checkFramebufferStatus(gl.DRAW_FRAMEBUFFER);
        if (status != gl.FRAMEBUFFER_COMPLETE) {
            console.log('fb status: ' + status.toString(16));
            return;
        }
		
		gl.drawBuffers([
            gl.COLOR_ATTACHMENT0,
            gl.COLOR_ATTACHMENT1,
			gl.COLOR_ATTACHMENT2
        ]);
		
		
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
    }
	
	ResizeTextures(){
		this.depth.Resize(this.width, this.height);
		this.normalDepth.Resize(this.width, this.height);
		this.diffuseColor.Resize(this.width, this.height);
		this.metallicSmoothness.Resize(this.width, this.height);
	}
	
	Resize( width, height ){
		this.width = width;
		this.height = height;
		this.needsUpdate = true;
	}

    Update(){
        if(this.needsUpdate){
            if(this.glFramebuffer == null){
                this.Initialize();
            }
			this.ResizeTextures();
            this.needsUpdate = false;
        }
    }
}

/* src/rendering/SHADERS.js */

// in order to optimise rendering(especially multipass rendering)
// shaders must adhere to explicit layout locationing.

// normally shaders should make use of : 
//      EEE.SHADERLIB.attributes
//      EEE.SHADERLIB.uniforms
// this ensures correct and consistent attribute and uniform references

EEE.SHADERLIB = {};
EEE.SHADERLIB.header = `#version 300 es
    precision mediump float;
`;
EEE.SHADERLIB.attributes = `
    layout(location = 0) in vec3 a_vertex;
    layout(location = 1) in vec3 a_normal;
    layout(location = 2) in vec4 a_color;
    layout(location = 3) in vec2 a_uv0;
    layout(location = 4) in vec2 a_uv1;
`;
EEE.SHADERLIB.uniforms = `
    uniform mat4 u_matrixView;
    uniform mat4 u_matrixProjection;
    uniform mat4 u_matrixModel;
	
	uniform sampler2D u_diffuseTexture;
	uniform vec4 u_diffuseTextureTS;
	
	uniform sampler2D u_normalTexture;
	uniform vec4 u_normalTextureTS;
	
	uniform sampler2D u_metallicSmoothnessTexture;
	uniform sampler2D u_lightmapTexture;
	uniform sampler2D u_lightmapDirTexture;
`;
EEE.SHADERLIB.vertex = {
    default :   
        EEE.SHADERLIB.header +
        EEE.SHADERLIB.attributes +
        EEE.SHADERLIB.uniforms + `

        out vec3 v_vertex;
		out vec4 v_vertexWorld;
        out vec3 v_normal;
        out vec3 v_normalWorld;
        out vec4 v_color;
        out vec2 v_uv0;
        out mat3 v_normalMatrix;
        
        void main(){
        	v_vertex = a_vertex;
			v_vertexWorld = u_matrixModel * vec4( a_vertex, 1.0 );
            v_normal = normalize(a_normal);
            v_normalWorld = normalize(mat3(u_matrixModel) * v_normal);
        	v_color = a_color;
        	v_uv0 = a_uv0;
			
        	gl_Position = u_matrixProjection * u_matrixView * u_matrixModel * vec4( a_vertex, 1.0 );
        	gl_PointSize = 10.0;
        }
    `,
    screenQuad : 
        EEE.SHADERLIB.header +
        EEE.SHADERLIB.attributes + `
        
        out vec3 v_vertex;
        out vec2 v_uv0;
        void main(){
            v_vertex = a_vertex;
            v_uv0 = a_uv0;
            gl_Position = vec4( a_vertex*2.0, 1.0 );
        }

    `
};
EEE.SHADERLIB.fragment = {
    default:
		EEE.SHADERLIB.header +
        `precision mediump float;
        in vec3 v_vertex;
		in vec4 v_vertexWorld;
        in vec3 v_normal;
        in vec3 v_normalWorld;
        in vec4 v_color;
        in vec2 v_uv0;
		in mat3 v_normalMatrix;`+

        EEE.SHADERLIB.uniforms+`
		
		layout(location = 0) out vec4 normalDepth;
        layout(location = 1) out vec4 diffuseColor;
		layout(location = 2) out vec4 metallicSmoothness;
		
		mat3 TBN( vec3 p, vec3 N, vec2 uv ){
			vec3 dp1 = dFdx(p);
			vec3 dp2 = dFdy(p);
			vec2 duv1 = dFdx(uv);
			vec2 duv2 = dFdy(uv);
			// solve the linear system
			vec3 dp2perp = cross(dp2, N);
			vec3 dp1perp = cross(N, dp1);
			vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
			vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;
			// construct a scale-invariant frame
			float invmax = inversesqrt(max(dot(T,T), dot(B,B)));
			return mat3(T * invmax, B * invmax, N);
		}
		
        void main(){
			mat3 tbn = TBN( v_vertexWorld.xyz, -v_normalWorld, v_uv0 );
			vec3 normalTex = texture( u_normalTexture, v_uv0 * u_normalTextureTS.zw ).xyz*2.0-1.0;
			normalTex.y *= -1.0;
			vec3 normal = -normalize( tbn * normalTex );
			
        	normalDepth = vec4( normal*0.5+0.5, gl_FragCoord.z );
			diffuseColor = texture( u_diffuseTexture, v_uv0 * u_diffuseTextureTS.zw );
			metallicSmoothness = vec4( v_vertexWorld.xyz , 1.0 );
        }
	`,
	deferredCompose:
		EEE.SHADERLIB.header + `
		in vec3 v_vertex;
		in vec2 v_uv0;
		
		uniform sampler2D u_depth;
		uniform sampler2D u_normalDepth;
		uniform sampler2D u_diffuseColor;
		uniform sampler2D u_normMetalSmoothness;
		
		uniform vec3 u_cameraPosition;
		uniform mat4 u_matrixView;
		uniform mat4 u_matrixViewInverse;
		uniform mat4 u_matrixProjection;
		uniform mat4 u_matrixProjectionInverse;
		uniform float u_near;
		uniform float u_far;
		
		out vec4 out_color;
		
		float LinearDepth( float depth ){
			return (2.0 * u_near) / (u_near + u_far - depth * (u_far - u_near));
		}
		
		vec3 WorldPositionFromDepth( float depth, vec2 uv ){
			vec4 p = u_matrixProjectionInverse * (vec4(uv, depth, 1.0) * 2.0 - 1.0);
			vec3 viewspace_position = p.xyz / p.w;
			return vec3(u_matrixViewInverse * vec4(viewspace_position, 1));
		}
		
		vec3 CalculateLight( vec3 worldPos, vec3 worldNormal, vec3 color, vec3 lightPos, float falloff ){
			vec3 L = vec3(0.0);
			vec3 lw = lightPos-worldPos;
			float f = max(0.0,(falloff - length(lw))/falloff);
			L = color * max( 0.0, dot( normalize(lw), worldNormal )) * f;
			return L;
		}
		
		vec3 AccumulateLight( vec3 worldPos, vec3 worldNormal ){
			vec3 L = vec3(0.0,0.0,0.0);
			
			L += CalculateLight(
				worldPos,
				worldNormal,
				vec3(1.0,1.0,1.0),
				vec3(0.0,2.0,3.0),
				10.0
			);
			
			L += CalculateLight(
				worldPos,
				worldNormal,
				vec3(0.0,1.0,1.0),
				vec3(2.0,2.0,-3.0),
				10.0
			);
			return L;
		}
		
		void main(){
			float depth = texture( u_depth, v_uv0 ).x;
			vec4 normalDepth = texture( u_normalDepth, v_uv0 );
			vec4 diffuseColor = texture( u_diffuseColor, v_uv0 );
			
			vec3 worldPos = WorldPositionFromDepth( depth, v_uv0 );
			vec3 worldNormal = normalDepth.xyz*2.0-1.0;
			
			vec3 lightPos = vec3(0.0,3.0,0.0);
			float lightRadius = 10.0;
			
			vec3 L = AccumulateLight( worldPos, worldNormal );
			
			out_color = vec4( diffuseColor.xyz * L, 1.0 );
			
			// draw debug views
			
			vec2 c = v_uv0*4.0;
			bool m0 = c.x < 1.0 && c.y < 1.0;
			vec3 debugNormal = texture( u_normalDepth, c ).xyz;
			
			bool m1 = c.x < 1.0 && c.y < 2.0 && c.y > 1.0;
			vec3 debugDiffuse = texture( u_diffuseColor, c - vec2(0.0,1.0) ).xyz;
			
			bool m2 =  c.x < 1.0 && c.y < 3.0 && c.y > 2.0;
			vec3 debugWorldPos = WorldPositionFromDepth( texture( u_depth, c - vec2(0.0,2.0) ).x, c - vec2(0.0,2.0) );
			
			bool m3 =  c.x < 1.0 && c.y < 4.0 && c.y > 3.0;
			vec3 debugLight = AccumulateLight( 
				WorldPositionFromDepth( texture( u_depth, c - vec2(0.0,3.0) ).x, c - vec2(0.0,3.0) ),
				texture( u_normalDepth, c - vec2(0.0,3.0) ).xyz 
			);
			
			if(m0 == true){
				out_color.xyz = debugNormal*2.0-1.0;
			}else if( m1 == true ){
				out_color.xyz = debugDiffuse;
			}else if( m2 == true ){
				out_color.xyz = debugWorldPos;
			}else if( m3 == true ){
				out_color.xyz = debugLight;
			}
		}
	`,
    screenQuad:
        EEE.SHADERLIB.header + `
        in vec3 v_vertex;
        in vec2 v_uv0;

        uniform sampler2D u_tex;

        out vec4 out_color;
        void main(){
            out_color = texture( u_tex, v_uv0 );
        }
    `
};

/* src/rendering/MaterialPass.js */

// pass information is used and referenced before drawcall is executed.
// to avoid binding attributes and uniforms multiple times,
// strict layouting must be followed in shaders!
// one uniform block is shared across all passes

EEE.MaterialPass = class MaterialPass{
    constructor( vertexShaderSource, fragmentShaderSource, useUniformBlocks, uniforms ){
        // shader sources
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        
        this.uniforms = uniforms || {
			"u_matrixModel":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_matrixView":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_matrixProjection":{ type : EEE.UNIFORM_MAT4, value:null, location:0 },
			"u_diffuseTexture":{ type : EEE.UNIFORM_INT, value:5, location:0 },
			"u_diffuseTextureTS":{ type : EEE.UNIFORM_VEC4, value:null, location:0 },
			"u_metallicSmoothnessTexture":{ type : EEE.UNIFORM_INT, value:6, location:0 },
			"u_normalTexture":{ type : EEE.UNIFORM_INT, value:7, location:0 },
			"u_normalTextureTS":{ type : EEE.UNIFORM_VEC4, value:null, location:0 },
			"u_lightmapTexture":{ type : EEE.UNIFORM_INT, value:8, location:0 },
			"u_lightmapDirTexture":{ type : EEE.UNIFORM_INT, value:9, location:0 }
		};
        this.useUniformBlocks = useUniformBlocks;
        // gl shaders and program
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        this.u_blockGlobalIndex = null;
        this.u_blockModelIndex = null;
        
        // drawing options
        this.enableDepth = true;
		this.enableStencil = true;
        this.cull = EEE.GL_CULL_FRONT;
        this.depthFunc = EEE.GL_DEPTH_LEQUAL;
        this.drawMode = EEE.GL_TRIANGLES;
    }

    Compile(){
        this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
        this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        gl.shaderSource( this.vertexShader, this.vertexShaderSource );
        gl.shaderSource( this.fragmentShader, this.fragmentShaderSource );

        gl.compileShader( this.vertexShader );
        var error = gl.getShaderInfoLog(this.vertexShader);
        if (error.length > 0) {
            console.error( this.vertexShaderSource );
            throw error;
        }

        gl.compileShader( this.fragmentShader );
        var error = gl.getShaderInfoLog(this.fragmentShader);
        if (error.length > 0) {
            console.error( this.fragmentShaderSource );
            throw error;
        }

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);

        gl.bindAttribLocation(this.program, 0, "a_vertex");
		gl.bindAttribLocation(this.program, 1, "a_normal");
		gl.bindAttribLocation(this.program, 2, "a_color");
        gl.bindAttribLocation(this.program, 3, "a_uv0");
        gl.bindAttribLocation(this.program, 4, "a_uv1");

        gl.linkProgram(this.program);
		
		for(var name in this.uniforms){
            this.uniforms[name].location = gl.getUniformLocation(this.program, name);
        }
    }

    ApplyOptions(){
        if(this.enableDepth){ gl.enable(gl.DEPTH_TEST); }
		if(this.enableStencil){ gl.enable(gl.DEPTH_TEST); }
        gl.enable(gl.CULL_FACE);
        gl.cullFace( this.cull );
    }

    Use(){
        if(this.program == null){
            this.Compile();
        }
        this.ApplyOptions();
        gl.useProgram( this.program );
		for(var name in this.uniforms){
			switch( this.uniforms[name].type ){
				case EEE.UNIFORM_MAT4:
					gl.uniformMatrix4fv( 
						this.uniforms[name].location, 
						false, 
						this.uniforms[name].value 
					);
					break;
				case EEE.UNIFORM_FLOAT:
					gl.uniform1f(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_INT:
					gl.uniform1i(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_VEC3:
					gl.uniform3fv(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
				case EEE.UNIFORM_VEC4:
					gl.uniform4fv(
						this.uniforms[name].location,
						this.uniforms[name].value
					);
					break;
			}
		}
    }
}

/* src/rendering/Material.js */

EEE.Material = class Material{
    constructor( passes ){
        this.diffuseColor = new EEE.Color(1,1,1,1);
		
		this.textures = [
			null, // gl.TEXTURE4 // diffuseTexture
			null, // gl.TEXTURE5 // metallicSmoothnessTexture
			null, // gl.TEXTURE6 // normalTexture
			null, // gl.TEXTURE7 // lightmap
			null  // gl.TEXTURE8 // lightmapDir
		];
		
		this.textureTransforms = [
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1),
			new EEE.Vec4(0,0,1,1)
		];
		
		this.lightmap = null;
		this.lightmapDir = null;
		
        this.passes = passes || 
            [
                new EEE.MaterialPass( 
                    EEE.SHADERLIB.vertex.default, 
                    EEE.SHADERLIB.fragment.default,
                    true
                )
            ];
        this.u_blockMaterial = null;
    }
		
	get diffuseTexture(){ return this.textures[0]; }
	set diffuseTexture(t){ this.textures[0] = t; }
	
	get diffuseTextureTS(){ return this.textureTransforms[0]; }
	set diffuseTextureTS(t){ this.textureTransforms[0] = t; }
	
	get metallicSmoothnessTexture(){ return this.textures[1]; }
	set metallicSmoothnessTexture(t){ this.textures[1] = t; }
	
	get normalTexture(){ return this.textures[2]; }
	set normalTexture(t){ this.textures[2] = t; }
	
	get normalTextureTS(){ return this.textureTransforms[2]; }
	set normalTextureTS(t){ this.textureTransforms[2] = t; }
	
	BindTextures(){
		for( var i = 0; i < this.textures.length; i++ ){
			if( this.textures[i] != null){
				if(this.textures[i].glTexture != null){
					gl.activeTexture( gl.TEXTURE5+i );
					gl.bindTexture( gl.TEXTURE_2D, this.textures[i].glTexture);
				}
			}
		}
	}
	
    Update(){
    
	}
}

/* src/rendering/Renderer.js */

var gl = null;
EEE.Renderer = class Renderer{
	constructor(){
		this.u_globalBlock = null;

		this.pixelScale = 1.0;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.canvas.style.imageRendering = "pixelated";
		gl = this.canvas.getContext("webgl2", {antialias:0});
		if(!gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild( this.canvas );
		
		this.gbuffer = new EEE.GBuffer(this.canvas.width, this.canvas.height);

		this.defaultTexture = new EEE.Texture2D();
		this.defaultTexture.width = 2;
		this.defaultTexture.height = 2;
		//this.defaultTexture.source = new Uint8Array([ 255,0,0,255 ]);
		this.defaultTexture.source = new Uint8Array([
			255,  0,  0,255,    0,255,  0,255,
			  0,  0,255,255,    255,255,255,255
		]);
		this.defaultTexture.Initialize();
		
		console.log(this.defaultTexture);	
		
		this.defaultMaterial = new EEE.Material();
		this.composePassesMaterial = new EEE.Material([
			new EEE.MaterialPass( 
				EEE.SHADERLIB.vertex.screenQuad, 
				EEE.SHADERLIB.fragment.deferredCompose,
				false,
				{
					"u_depth":{ type:EEE.UNIFORM_INT, value:0, location:null },
					"u_normalDepth":{ type:EEE.UNIFORM_INT, value:1, location:null },
					"u_diffuseColor":{ type:EEE.UNIFORM_INT, value:2, location:null },
					"u_normMetalSmoothness":{ type:EEE.UNIFORM_INT, value:3, location:null },
					"u_matrixView":{type:EEE.UNIFORM_MAT4},
					"u_matrixViewInverse":{type:EEE.UNIFORM_MAT4},
					"u_matrixProjection":{type:EEE.UNIFORM_MAT4},
					"u_matrixProjectionInverse":{type:EEE.UNIFORM_MAT4},
					"u_cameraPosition":{type:EEE.UNIFORM_VEC3},
					"u_near":{type:EEE.UNIFORM_FLOAT},
					"u_far":{type:EEE.UNIFORM_FLOAT},
					"u_pointLights":{}
				}
			)
		]);
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth);
		this.canvas.height = Math.round(window.innerHeight);
		this.gbuffer.Resize( this.canvas.width*this.pixelScale,this.canvas.height*this.pixelScale );
	}

	RenderGUI( gui ){
		for(var i = 0; i < gui.elements.length; i++){
			gui.elements[i].Draw();
		}
	}

	ComposePasses( camera ){
		gl.viewport(0,0,this.canvas.width,this.canvas.height);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
		var pass = this.composePassesMaterial.passes[0];
		
		pass.uniforms.u_cameraPosition.value = camera.position.data;
		pass.uniforms.u_near.value = camera.near;
		pass.uniforms.u_far.value = camera.far;
		pass.uniforms.u_matrixView.value = camera.matrix_view.data;
		pass.uniforms.u_matrixProjection.value = camera.matrix_projection.data;
		pass.uniforms.u_matrixViewInverse.value = camera.matrix_viewInverse.data;
		pass.uniforms.u_matrixProjectionInverse.value = camera.matrix_projectionInverse.data;
		pass.Use();
		
		EEE.ASSETS.meshes["quad"].Draw( pass );
	}

	RenderPostFX( material ){
		// todo
	}
	
	Blit( src, dst, program ){
		
	}
	
	Render( scene, camera ){
		
		if( this.canvas.width != camera.width || this.canvas.height != camera.height ){
			camera.width = this.canvas.width;
			camera.height = this.canvas.height;
			camera.UpdateProjectionMatrix();
		}

		// update and bind framebuffers
		this.gbuffer.Update();
		gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, this.gbuffer.glFramebuffer);

		gl.activeTexture( gl.TEXTURE5 );
		gl.bindTexture( gl.TEXTURE_2D, this.defaultTexture.glTexture );
		gl.activeTexture( gl.TEXTURE7 );
		gl.bindTexture( gl.TEXTURE_2D, this.defaultTexture.glTexture );
		
		gl.clearColor( 
			scene.backgroundColor.r,
			scene.backgroundColor.g,
			scene.backgroundColor.b,
			scene.backgroundColor.a
		);
		gl.viewport(0,0,this.gbuffer.width,this.gbuffer.height);
		gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

		for(var i = 0; i < scene.objects.length; i++){
			var o = scene.objects[i];
			if(o.drawable){
				var material = o.material || o.drawable.material || this.defaultMaterial;
				
				material.Update();
				material.BindTextures();
				
				for(var passIndex = 0; passIndex < material.passes.length; passIndex++){
					var pass = material.passes[passIndex];
					pass.uniforms.u_matrixModel.value = o.localToWorld.data;
					pass.uniforms.u_matrixView.value = camera.matrix_view.data;
					pass.uniforms.u_matrixProjection.value = camera.matrix_projection.data;
					
					pass.uniforms.u_diffuseTextureTS.value = material.diffuseTextureTS.data;
					pass.uniforms.u_normalTextureTS.value = material.normalTextureTS.data;
					
					pass.Use();
					
					o.drawable.Draw( pass );
				}
				gl.bindVertexArray( null );
			}
		}

		gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, null);
		this.ComposePasses(camera);
	}
};

/* src/loader/Loader.js */

EEE.Loader = class Loader{
    constructor(){
        
    }
}
