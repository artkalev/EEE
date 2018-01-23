EEE.Camera = class Camera extends EEE.Obj{
    constructor(){
        super();
        this.fov = 90;
        this.near = 0.1;
        this.far = 100.0;
        this.aspect = 1;
        this.matrix_projection = new EEE.Mat4().PerspectiveProjection(
            this.fov,
            this.aspect,
            this.near,
            this.far
        );
        this.matrix_view = new EEE.Mat4().Identity();
    }

    UpdateMatrix(){
        super.UpdateMatrix();
        this.matrix_view.Copy( this.localToWorld );
        //this.matrix_view.data[10] *= -1;
    }
}