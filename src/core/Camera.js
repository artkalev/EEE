EEE.Camera = class Camera extends EEE.Obj{
    constructor(){
        super();
        this.width = 0;
        this.height = 0;
        this.fov = 90;
        this.near = 0.1;
        this.far = 1000.0;
        this.aspect = 1;
        this.matrix_projection = new EEE.Mat4().PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
		this.matrix_projectionInverse = new EEE.Mat4().GetInverse( this.matrix_projection );
        this.matrix_view = new EEE.Mat4().Identity();
        this.matrix_viewInverse = new EEE.Mat4().GetInverse(this.matrix_view);
		
		this.postfx = [];
    }

    UpdateProjectionMatrix(){
        this.aspect = this.width / this.height;
        this.matrix_projection.PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
		this.matrix_projectionInverse = new EEE.Mat4().GetInverse( this.matrix_projection );
    }

    UpdateMatrix(){
        super.UpdateMatrix();
        this.matrix_view.Set([
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            -this.position.x, -this.position.y, -this.position.z
        ]).Multiply( this.rotation.GetMat4() );
		this.matrix_viewInverse = new EEE.Mat4().GetInverse(this.matrix_view);

    }
}