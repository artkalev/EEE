EEE.Input = class Input{
    constructor(){
        this.mouse = {
            position : new EEE.Vec2(),
            delta : new EEE.Vec2() 
        };
        this.bindings = {
            up:[87,38],
            down:[83,40],
            left:[65,37],
            right:[68,39],
            jump:[32],
            crouch:[16]
        };
        this.keys = {};
        var self = this;
        
        // setup keyboard input
        window.addEventListener("keydown", function( e ){
            self.keys[ e.keyCode ] = true;
        });
        window.addEventListener("keyup", function( e ){
            self.keys[ e.keyCode ] = false;
        });
        
        // setup mouse input
        EEE.renderer.canvas.requestPointerLock = EEE.renderer.canvas.requestPointerLock || EEE.renderer.canvas.mozRequestPointerLock;
        EEE.renderer.canvas.onclick = function(){
            EEE.renderer.canvas.requestPointerLock();
        };
        document.onmousemove = function(e){
            self.mouse.position.x += e.movementX;
            self.mouse.position.y += e.movementY;
            self.mouse.position.x = Math.min(
                EEE.renderer.canvas.width,
                Math.max( 0, self.mouse.position.x )
            );
            self.mouse.position.y = Math.min(
                EEE.renderer.canvas.height,
                Math.max( 0, self.mouse.position.y )
            );
            self.mouse.delta.x = e.movementX;
            self.mouse.delta.y = e.movementY;
            //console.log( self.mouse.position.data );
        }
    }

    Update(){
        this.mouse.delta.Set(0,0);
    }

    GetBindingState( bindingName ){
        var b = this.bindings[bindingName];
        if(b != undefined){
            for(var i = 0; i < b.length; i++){
                if( this.keys[b[i]] ){
                    return true;
                }
            }
        }
        return false;
    }
};