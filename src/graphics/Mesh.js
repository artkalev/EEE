EEE.Mesh = class Mesh extends EEE.Drawable{
    constructor( name, vertices, normals, colors, uvs0, indices ){
        super();
        this.name = name;
        this.material = null;
        this.vertices = new Float32Array(vertices);
        this.normals = new Int8Array(normals);
        this.colors = new Uint8Array(colors);
        this.uvs0 = new Float32Array(uvs0);
        this.uvs1 = new Float32Array(uvs0);
        this.indices = new Uint16Array(indices);

        this.VAO = null;

        this.gl_vertices = null;
        this.gl_normals = null;
        this.gl_colors = null;
        this.gl_uvs0 = null;
        this.gl_uvs1 = null;
        this.gl_indices = null;
    }

    Initialize(gl){
        super.Initialize();

        this.VAO = gl.createVertexArray();

        this.gl_vertices = gl.createBuffer();
        this.gl_normals = gl.createBuffer();
        this.gl_colors = gl.createBuffer();
        this.gl_uvs0 = gl.createBuffer();
        this.gl_uvs1 = gl.createBuffer();
        this.gl_indices = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_vertices);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_normals);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_colors);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_uvs0);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs0, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_uvs1);
        gl.bufferData(gl.ARRAY_BUFFER, this.uvs1, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.gl_indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

        // creating VAO for faster drawing
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer( 0, 3, gl.FLOAT, false, 0, 0 );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_normals );
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer( 1, 3, gl.BYTE, true, 0, 0 );	
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_colors );
        gl.enableVertexAttribArray(2);
        gl.vertexAttribPointer( 2, 4, gl.UNSIGNED_BYTE, true, 0, 0 );
        
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs0 );
        gl.enableVertexAttribArray(3);
        gl.vertexAttribPointer( 3, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs1 );
        gl.enableVertexAttribArray(4);
        gl.vertexAttribPointer( 4, 2, gl.FLOAT, false, 0, 0 );
        
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.gl_indices );

        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        
    }
}

EEE.ASSETS.meshes["triangle"] = new EEE.Mesh(
    "triangle",
    [ -0.5,-0.5, 0.0,     0.0, 0.5, 0.0,     0.5,-0.5, 0.0,  ],
    [ 0,0,127, 0,0,127, 0,0,127 ],
    [ 255,0,0,255,  0,255,0,255,  0,0,255,255 ],
    [ 0.0,0.0,  0.5,1.0,  1.0,0.0 ],
    [ 0,1,2 ]
);

EEE.ASSETS.meshes["quad"] = new EEE.Mesh(
    "quad",
    [ -0.5,-0.5, 0.0,    -0.5, 0.5, 0.0,    0.5, 0.5, 0.0,    0.5, -0.5, 0.0  ],
    [ 0,0,127, 0,0,127, 0,0,127, 0,0,127 ],
    [ 0,0,0,255,   0,255,0,255,  0,0,255,255,   255,0,0,255  ],
    [ 0.0,0.0,  0.0,1.0,  1.0,1.0,  1.0,0.0 ],
    [ 0,1,2, 0,2,3 ]
);

EEE.ASSETS.meshes["cube"] = new EEE.Mesh(
    "cube",
    [ 
         -0.5,  0.5, -0.5,    -0.5, -0.5, -0.5,     0.5,  0.5, -0.5,  // z-
          0.5,  0.5, -0.5,    -0.5, -0.5, -0.5,     0.5, -0.5, -0.5,  // z-
         -0.5,  0.5,  0.5,     0.5, -0.5,  0.5,    -0.5, -0.5,  0.5,  // z+
          0.5,  0.5,  0.5,     0.5, -0.5,  0.5,    -0.5,  0.5,  0.5,  // z+

         -0.5, -0.5, -0.5,    -0.5, -0.5,  0.5,     0.5, -0.5,  0.5,  // y-
         -0.5, -0.5, -0.5,     0.5, -0.5,  0.5,     0.5, -0.5, -0.5,  // y-
         -0.5,  0.5, -0.5,     0.5,  0.5,  0.5,    -0.5,  0.5,  0.5,  // y+
         -0.5,  0.5, -0.5,     0.5,  0.5, -0.5,     0.5,  0.5,  0.5,  // y+

         -0.5, -0.5, -0.5,    -0.5,  0.5, -0.5,    -0.5,  0.5,  0.5,  // x-
         -0.5, -0.5, -0.5,    -0.5,  0.5,  0.5,    -0.5, -0.5,  0.5,  // x-
          0.5, -0.5, -0.5,     0.5, -0.5,  0.5,     0.5,  0.5,  0.5,  // x+
          0.5, -0.5, -0.5,     0.5,  0.5,  0.5,     0.5,  0.5, -0.5   // x+
    ],
    [ 
         0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,   0, 0,-128,  // z-
         0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,   0, 0, 127,  // z+

         0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,   0,-128, 0,  // y-
         0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,   0, 127, 0,  // y+

        -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  -128, 0, 0,  // x-
         127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0,   127, 0, 0   // x+
    ],
    [ 
          0,255,  0,255,    0,  0,  0,255,    255,255,  0,255, // z-
        255,255,  0,255,    0,  0,  0,255,    255,  0,  0,255, // z-
          0,255,255,255,  255,  0,255,255,      0,  0,255,255, // z+
        255,255,255,255,  255,  0,255,255,      0,255,255,255, // z+

          0,  0,  0,255,    0,  0,255,255,    255,  0,255,255, // y-
          0,  0,  0,255,  255,  0,255,255,    255,  0,  0,255, // y-
          0,255,  0,255,  255,255,255,255,      0,255,255,255, // y+
          0,255,  0,255,  255,255,  0,255,    255,255,255,255, // y+

          0,  0,  0,255,    0,255,  0,255,      0,255,255,255, // x-
          0,  0,  0,255,    0,255,255,255,      0,  0,255,255, // x-
        255,  0,  0,255,  255,  0,255,255,    255,255,255,255, // x+
        255,  0,  0,255,  255,255,255,255,    255,255,  0,255  // x+
    ],
    [ 
        1.0, 1.0,  1.0, 0.0,  0.0, 1.0, // z-
        0.0, 1.0,  1.0, 0.0,  0.0, 0.0, // z-
        0.0, 1.0,  1.0, 0.0,  0.0, 0.0, // z+
        1.0, 1.0,  1.0, 0.0,  0.0, 1.0, // z+

        0.0, 0.0,  0.0, 1.0,  1.0, 1.0, // y-
        0.0, 0.0,  1.0, 1.0,  1.0, 0.0, // y-
        0.0, 0.0,  1.0, 1.0,  0.0, 1.0, // y+
        0.0, 0.0,  1.0, 0.0,  1.0, 1.0, // y+

        0.0, 0.0,  0.0, 1.0,  1.0, 1.0, // x-
        0.0, 0.0,  1.0, 1.0,  1.0, 0.0, // x-
        1.0, 0.0,  0.0, 0.0,  0.0, 1.0, // x+
        1.0, 0.0,  0.0, 1.0,  1.0, 1.0  // x+
    ],
    [ 
         0, 1, 2,  3, 4, 5, // z-
         6, 7, 8,  9,10,11, // z+
        12,13,14, 15,16,17, // y-
        18,19,20, 21,22,23, // y+
        24,25,26, 27,28,29, // x-
        30,31,32, 33,34,35  // x+
    ]
);