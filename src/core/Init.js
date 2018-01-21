EEE.Init = function(){
    console.log("Started 'EEE' Initialization");
    EEE.loader = new EEE.Loader();
    EEE.renderer = new EEE.WebGLRenderer();
    EEE.scene = new EEE.Scene();
    console.log("'EEE' Initialization Completed!");
    console.log("Starting mainloop.");
    EEE.Update();

    window.addEventListener("resize", function(){
        EEE.renderer.OnResize();
    });
    EEE.renderer.OnResize();
}