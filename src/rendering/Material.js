EEE.Material = class Material{
    constructor( passes ){
        this.passes = passes;
        this.uniforms = {};
    }
    SetUniform( name, type, data ){
        this.uniforms[name] = {type:type, data:data};
    }
}