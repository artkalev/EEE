EEE.Scene = class Scene{
    constructor(){
        this.objects = [];
        this.activeCamera = new EEE.Camera();
        this.AddObj(this.activeCamera);

        this.backgroundColor = new EEE.Color(0,0,0,1);
    }

    AddObj( o ){
        this.objects.push(o);
    }
    
};