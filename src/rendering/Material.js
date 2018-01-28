EEE.Material = class Material{
    constructor(){
        this.passes = [];
        this.uniformBlock = new EEE.GLUniformBlock({
            u_diffuseColor : new Float32Array( [1,1,1,1] ),
            u_diffuseTexture : new Uint8Array([0])
        });
    }

    Update( gl ){
        
    }
}