// drawable is the core class for drawing meshes
// this will be used as base for Mesh, Sprite, Particle and more.
EEE.Drawable = class Drawable{
    
    constructor(){
        this.material = null; // can be overriden by obj.material, reeplaced with default if null
        this.drawMode = EEE.GL_TRIANGLES;
        this.isInitialized = false;
    }

    Initialize(){
        // creating and initializing gl buffers here.
        this.isInitialized = true;
    }

    Draw( pass ){
        if(!this.isInitialized){
            this.Initialize();
        }
        // glsl program is setup by renderer before calling this function!
        // only drawing function for this specific object here
        // for standard mesh it would be something like this:
        //      
        //  bind : attribute buffers and pointers
        //  draw : gl.drawElements() or gl.drawArrays()
    }
}