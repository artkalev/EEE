EEE.Input = class Input{
    constructor(){
        this.bindings = {
            up:[87,38],
            down:[83,40],
            left:[65,37],
            right:[68,39]
        };
        this.keys = {};
        var self = this;
        window.addEventListener("keydown", function( e ){
            self.keys[ e.keyCode ] = true;
        });
        window.addEventListener("keyup", function( e ){
            self.keys[ e.keyCode ] = false;
        });
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