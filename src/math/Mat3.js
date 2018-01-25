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