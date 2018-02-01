EEE.Material = class Material{
    constructor( passes ){
        this.diffuseColor = new EEE.Color(1,1,1,1);
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

    Update( gl ){
        if(this.u_blockMaterial == null){
            this.u_blockMaterial = gl.createBuffer();
            gl.bindBuffer( gl.UNIFORM_BUFFER, this.u_blockMaterial );
            gl.bufferData(gl.UNIFORM_BUFFER, 48, gl.DYNAMIC_DRAW);
            gl.bindBuffer( gl.UNIFORM_BUFFER, null);
        }
        gl.bindBuffer( gl.UNIFORM_BUFFER, this.u_blockMaterial );
        gl.bufferSubData( gl.UNIFORM_BUFFER, 0, this.diffuseColor.data );
        gl.bindBuffer( gl.UNIFORM_BUFFER, null);
    }
}