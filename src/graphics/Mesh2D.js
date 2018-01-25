EEE.Mesh2D = class Mesh2D extends EEE.Drawable{
    constructor( vertices ){
        super();
        this.vertices = new Float32Array(vertices);
        this.uvs = new Float32Array(vertices.length * (2/3));
        this.gl_vertices = null;
        this.gl_uvs = null;
    }
    Initialize(gl){
        super.Initialize(gl);
        this.gl_vertices = gl.createBuffer();
        this.gl_uvs = gl.createBuffer();

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW );
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs );
        gl.bufferData( gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW );

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    Draw(gl){
        super.Draw(gl);
        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_vertices );
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.gl_uvs );
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer( 1, 2, gl.FLOAT, false, 0, 0 );

        gl.drawArrays( gl.Triangle, 0, this.vertices.length / 3 );
    }
}