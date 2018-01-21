EEE.Mesh = class Mesh{
    constructor( name, vertices, normals, colors, uvs, indices ){
        this.type = EEE.GRAPHICS_MESH;
        this.name = name;
        this.vertices = new Float32Array(vertices);
        this.normals = new Int8Array(normals);
        this.colors = new Uint8Array(colors);
        this.uvs = new Float32Array(uvs);
        this.indices = new Uint16Array(indices);
    }
}

EEE.ASSETS.meshes["triangle"] = new EEE.Mesh(
    "triangle",
    [ -0.5,-0.5, 0.0,     0.0, 0.5, 0.0,     0.5,-0.5, 0.0,  ],
    [ 0,0,128, 0,0,128, 0,0,128 ],
    [ 255,0,0,255,  0,255,0,255,  0,0,255,255 ],
    [ 0.0,0.0,  0.5,1.0,  1.0,0.0 ],
    [ 0,1,2 ]
);