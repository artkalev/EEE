EEE.GLUniformBlock = class{
    constructor( props ){
        /*
            example properties object
            {
                u_time : new Float32Array(1),
                u_matrix_view : new Float32Array(16),
                u_matrix_projection : new Float32Array(16)
            }

            this would be in GLSL as:

            uniform blockName{
                float u_time;
                mat4 u_matrix_view;
                mat4 u_matrix_projection;
            }

            NB
            ! Values must be instance of js TypedArray, even if only 1 component !
            ! Resizing the uniform buffer is not allowed( nor reasonable )!
        */
        this.properties = props;
        this.offsets = {};
        this.array = null;        
        this.buffer = null;
        this.needsUpdate = true; // updates should be done as infrequently as possible!
    }
    Use(gl){
        if(this.needsUpdate == true){ this.Update(gl); }
        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
    }
    Update(gl){
        if(this.buffer == null){
            this.buffer = gl.createBuffer();
        }
        if(this.array == null){
            var bytecount = 0;
            for(var name in this.properties){
                this.offsets[name] = [0,0];
                this.offsets[name][0] = bytecount; // starting offset in buffer
                bytecount += this.properties[name].BYTES_PER_ELEMENT * this.properties[name].length;
                this.offsets[name][1] = bytecount; // end offset in buffer
            }
            this.array = new ArrayBuffer( bytecount );
        }
        for(var name in this.properties){
            var val = this.properties[name];
            var view = null;
            switch(val.name){
                case "Int8Array": view = new Int8Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint8Array": view = new Uint8Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Int16Array": view = new Int16Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint16Array": view = new Uint16Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Int32Array": view = new Int32Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Uint32Array": view = new Uint32Array(this.array, this.offsets[name][0], this.offsets[name][1]); break;
                case "Float32Array":view = new Float32Array(this.array,this.offsets[name][0], this.offsets[name][1]); break;
            }
            for(var i = 0; i < val.length; i++){
                view[i] = val[i];
            }
        }
        // finally update gl buffer on gpu
        gl.bindBuffer(gl.UNIFORM_BUFFER);
        gl.bufferData(gl.UNIFORM_BUFFER, this.array, gl.DYNAMIC_DRAW);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    }
}