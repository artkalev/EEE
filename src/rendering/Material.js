EEE.Material = class Material{
    constructor(){
        this.passes = [];
        this.uniforms = {
            u_diffuse_color : {value : new Float32Array([0.8,0.8,0.8,1]), type : EEE.UNIFORM_VEC4 },
            u_diffuse_texture : {value : null, type : EEE.UNIFORM_SAMPLER2D, unit:0 }
        };
    }

    Update( gl ){
        
    }
}