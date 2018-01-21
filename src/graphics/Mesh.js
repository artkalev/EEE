EEE.Mesh = class Mesh{
    constructor( vertices, normals, uvs ){
        this.vertices = new Float32Array(vertices);
        this.normals = new Float32Array(normals);
        this.uvs = new Float32Array(uvs);
    }
}