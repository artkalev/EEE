EEE.Material = class Material{
    constructor( passes ){
        this.passes = passes || [];
        this.uniforms = {
            /* 64 bytes */ "u_matrix_model" : new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
            /* 64 bytes */ "u_matrix_view" : new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
            /* 64 bytes */ "u_matrix_projection" : new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]),
            /*  4 bytes */ "u_time" : new Float32Array(1),
            /*  4 bytes */ "u_delta_time" : new Float32Array(1),
            /* 16 bytes */ "u_diffuse_color" : new Float32Array([1,1,1,1]),
            /* 12 bytes */ "u_emission_color" : new Float32Array([0,0,0]),
            /*  4 bytes */ "u_smoothness" : new Float32Array([0.5]),
            /*  4 bytes */ "u_metallic" : new Float32Array([0.5]),
            /*  4 bytes */ "u_normal_strength" : new Float32Array([1.0])
        };
        this.UBOData = new ArrayBuffer();
        this.UBO = null;
    }
}