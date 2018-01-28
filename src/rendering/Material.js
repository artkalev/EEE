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