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

    Update(){
        for(var i = 0 ; i < this.objects.length; i++){
            this.objects[i].Update();
        }
    }
};