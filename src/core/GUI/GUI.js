EEE.GUI = class GUI extends EEE.Drawable{
    constructor(){
        super();
        this.showCursor = true;
        this.elements = [];
    }
    Update(){
        if(this.showCursor){

        }
    }
    Draw(gl){
        // renderer will not have program and uniforms set for rendering GUI!
        if(this.showCursor){
            
        }
    }
};