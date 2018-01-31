EEE.Material = class Material{
    constructor( passes ){
        this.passes = passes || 
            [
                new EEE.MaterialPass( 
                    EEE.SHADERLIB.vertex.default, 
                    EEE.SHADERLIB.fragment.default 
                )
            ];
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
        this.UBOData = new ArrayBuffer(240);
        this.UBO = null;
    }

    Update( gl ){
        if(this.UBO == null){
            this.UBO = gl.createBuffer();
            gl.bindBuffer( gl.UNIFORM_BUFFER, this.UBO );
            gl.bufferData(gl.UNIFORM_BUFFER, this.UBOData, gl.DYNAMIC_DRAW);
            gl.bindBuffer( gl.UNIFORM_BUFFER, null);
        }
    }
}