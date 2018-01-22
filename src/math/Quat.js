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