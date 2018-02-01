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