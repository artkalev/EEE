// built with python

/* src/core/header.js */

////////
// EEE //
////////

var EEE = {};

// type enums
EEE.MATH_VECTOR2 = 0x000002;
EEE.MATH_VECTOR3 = 0x000003;
EEE.MATH_VECTOR4 = 0x000004;
EEE.MATH_QUATERNION = 0x000005;
EEE.MATH_MATRIX3 = 0x000006;
EEE.MATH_MATRIX4 = 0x000007;

EEE.GRAPHICS_MESH = 0x000010;
EEE.GRAPHICS_SPRITE = 0x000011;

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

	LengthSqr(){
		return this.data[0]*this.data[0] + this.data[1]*this.data[1] + this.data[2]*this.data[2];
	}
	
	Length(){
		return Math.sqrt( this.LengthSqr() );
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
        c1 = Math.cos(x);
        c2 = Math.cos(y);
        c3 = Math.cos(z);
        s1 = Math.sin(x);
        s2 = Math.sin(y);
        s3 = Math.sin(z);

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

        result.m00 = 1 - 2*(yy+zz);
        result.m01 =     2*(xy-zw);
        result.m02 =     2*(xz+yw);

        // todo........

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
        //todo
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
    }

    MultiplyVec2( other ){

    }

    MultiplyVec3( other ){

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
    
    constructor(){
        this.type = EEE.MATH_MATRIX4;
        this.data = new Float32Array(16);
    }

    get m00(){ return this.data[0]; }   get m10(){ return this.data[4]; }   get m20(){ return this.data[8]; }    get m30(){ return this.data[12]; }
    get m01(){ return this.data[1]; }   get m11(){ return this.data[5]; }   get m21(){ return this.data[9]; }    get m31(){ return this.data[13]; }
    get m02(){ return this.data[2]; }   get m12(){ return this.data[6]; }   get m22(){ return this.data[10]; }   get m32(){ return this.data[14]; }
    get m03(){ return this.data[3]; }   get m13(){ return this.data[7]; }   get m23(){ return this.data[11]; }   get m33(){ return this.data[15]; }

    set m00(v){ this.data[0] = v; } set m10(v){ this.data[4] = v; } set m20(v){ this.data[8] = v; }  set m30(v){ this.data[12] = v; }
    set m01(v){ this.data[1] = v; } set m11(v){ this.data[5] = v; } set m21(v){ this.data[9] = v; }  set m31(v){ this.data[13] = v; }
    set m02(v){ this.data[2] = v; } set m12(v){ this.data[6] = v; } set m22(v){ this.data[10] = v; } set m32(v){ this.data[14] = v; }
    set m02(v){ this.data[3] = v; } set m13(v){ this.data[7] = v; } set m23(v){ this.data[11] = v; } set m33(v){ this.data[15] = v; }

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

    PerspectiveProjection( fov, aspect, near, far ){
        // todo
        return this;
    }
};

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

EEE.Mesh = class Mesh{
    constructor( name, vertices, normals, colors, uvs, indices ){
        this.type = EEE.GRAPHICS_MESH;
        this.name = name;
        this.vertices = new Float32Array(vertices);
        this.normals = new Int8Array(normals);
        this.colors = new Uint8Array(colors);
        this.uvs = new Float32Array(uvs);
        this.indices = new Uint16Array(indices);
    }
}

EEE.ASSETS.meshes["triangle"] = new EEE.Mesh(
    "triangle",
    [ -0.5,-0.5, 0.0,     0.0, 0.5, 0.0,     0.5,-0.5, 0.0,  ],
    [ 0,0,128, 0,0,128, 0,0,128 ],
    [ 255,0,0,255,  0,255,0,255,  0,0,255,255 ],
    [ 0.0,0.0,  0.5,1.0,  1.0,0.0 ],
    [ 0,1,2 ]
);

/* src/core/Init.js */

EEE.Init = function(){
    console.log("Started 'EEE' Initialization");
    EEE.loader = new EEE.Loader();
    EEE.renderer = new EEE.WebGLRenderer();
    EEE.scene = new EEE.Scene();
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
    EEE.renderer.Render( EEE.scene, EEE.scene.activeCamera );   
    requestAnimationFrame( EEE.Update );    
}

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
    
};

/* src/core/Obj.js */

EEE.Obj = class Obj{
	constructor(){
		this.name = "node";
		this.uid = Math.random()*1000000000000;
		this.children = [];
		this.parent = null;
		this.modules = [];
		this.graphics = null;
	}
	
	AddModule( module ){
		var m = new module( this );
		this.modules.push( m );
		return m;
	}
};

/* src/core/Camera.js */

EEE.Camera = class Camera extends EEE.Obj{
    constructor(){
        super();
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
}

/* src/rendering/Material.js */

EEE.Material = class Material{
    constructor(){
        this.passes = [
            EEE.renderer.programs.default
        ];
        this.uniforms = {};
    }
}

/* src/rendering/WebGLRenderer.js */

EEE.WebGLRenderer = class WebGLRenderer{
	constructor(){
		this.matrix_view = new EEE.Mat4().Identity();
		this.matrix_projection = new EEE.Mat4().Identity();

		this.pixelScale = 1;
		this.canvas = document.createElement("canvas");
		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = "100%";
		this.canvas.style.left = "0";
		this.canvas.style.top = "0";
		this.gl = this.canvas.getContext("webgl");
		if(!this.gl){ console.log("No WebGL Support!"); return; }
		document.body.appendChild( this.canvas );

		this.activeProgram = null;
		this.programs = {
			"default" : this.CreateGLProgram(
				[
					"precision mediump float;",
					"attribute vec3 a_vertex;",
					"attribute vec3 a_normal;",
					"attribute vec4 a_color;",
					"attribute vec2 a_uv0;",

					"varying vec3 v_vertex;",
					"varying vec3 v_normal;",
					"varying vec4 v_color;",
					"varying vec2 v_uv0;",

					"void main(){",
					"	v_vertex = a_vertex;",
					"	v_normal = a_normal;",
					"	v_color = a_color;",
					"	v_uv0 = a_uv0;",
					"	gl_Position = vec4( a_vertex, 1.0 );",
					"}"
				].join("\n"),
				[
					"precision mediump float;",
					"varying vec3 v_vertex;",
					"varying vec3 v_normal;",
					"varying vec4 v_color;",
					"varying vec2 v_uv0;",
					"void main(){",
					"	gl_FragColor = v_color;",
					"}"
				].join("\n")
			)
		};
	}

	OnResize(){
		this.canvas.width = Math.round(window.innerWidth / this.pixelScale);
		this.canvas.height = Math.round(window.innerHeight / this.pixelScale);
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

	Render( scene, camera ){
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
			if(o.graphics){
				switch( o.graphics.type ){
					case EEE.GRAPHICS_MESH:
						this.DrawMesh( o.graphics );
						break;
					// todo add more drawing functions for sprites, particles etc
				}
			}
		}
	}

	DrawMesh( mesh, material, modelMatrix){
		// if mesh does not have gl properties they must be created
		// gl attribute and index buffers will be added to mesh object
		// this can be a bit expensive bt it will only affect first frame the mesh is drawn on.
		// all scene meshes probably need to be initialized ( drawn the 1st time ) outside gameloop.
		if(!mesh.gl){
			console.log("creating GL attributes for mesh: "+mesh.name);
			mesh.gl = {
				// mesh must contain these 3 attributes to be usable!
				attributes : {
					a_vertex : this.gl.createBuffer(),
					a_normal : this.gl.createBuffer(),
					a_color : this.gl.createBuffer(),
					a_uv0 : this.gl.createBuffer()
				},
				indices : this.gl.createBuffer()
			};
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_vertex);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.vertices, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_normal);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.normals, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_color);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.colors, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_uv0);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh.uvs, this.gl.STATIC_DRAW);
			
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, mesh.gl.indices);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, mesh.indices, this.gl.STATIC_DRAW);

			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		}

		// setup shaderprogram
		if(!material){
			this.gl.useProgram( this.programs["default"] );
			this.activeProgram = this.programs["default"];
		}else{
			this.gl.useProgram( material.glProgram );
			this.activeProgram = material.glProgram;
		}


		// else if all attributes are already initialized
		// bind all attributes and draw triangles
		
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_vertex );
		this.gl.enableVertexAttribArray(0);
		this.gl.vertexAttribPointer( 0, 3, this.gl.FLOAT, false, 0, 0 );
		
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_normal );
		this.gl.enableVertexAttribArray(1);
		this.gl.vertexAttribPointer( 1, 3, this.gl.BYTE, true, 0, 0 );	
		
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_color );
		this.gl.enableVertexAttribArray(2);
		this.gl.vertexAttribPointer( 2, 4, this.gl.UNSIGNED_BYTE, true, 0, 0 );
		
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, mesh.gl.attributes.a_uv0 );
		this.gl.enableVertexAttribArray(3);
		this.gl.vertexAttribPointer( 3, 2, this.gl.FLOAT, false, 0, 0 );
		
		
		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, mesh.gl.indices );
		this.gl.drawElements( this.gl.TRIANGLES, mesh.indices.length, this.gl.UNSIGNED_SHORT, 0);

		this.gl.bindBuffer( this.gl.ELEMENT_ARRAY_BUFFER, null );
		this.gl.bindBuffer( this.gl.ARRAY_BUFFER, null );
	}
};

/* src/rendering/WebGL2Renderer.js */

EEE.WebGL2Renderer = class WebGL2Renderer{
	constructor(){

		this.matrix_projection = new EEE.Mat4();
		this.matrix_view = new EEE.Mat4();

		this.canvas = document.createElement("canvas");
		this.gl = this.canvas.getContext("webgl");
		if(!this.gl){ console.log("No WebGL2 Support!"); return; }
		document.body.appendChild(this.canvas);
	}
	Render( root ){

	}
	DrawMesh(){
		
	}
};

/* src/loader/Loader.js */

EEE.Loader = class Loader{
    constructor(){
        
    }
}
