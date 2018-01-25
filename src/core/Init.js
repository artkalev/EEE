EEE.Init = function(){
    console.log("Started 'EEE' Initialization");
    EEE.loader = new EEE.Loader();
    EEE.renderer = new EEE.Renderer();
    if(!EEE.renderer.gl){ alert("WebGL failed to initialize! Your browser/hardware does not support WebGL?"); return; }
    EEE.input = new EEE.Input(); // input needs for renderer canvas to be present
    EEE.scene = new EEE.Scene();
    EEE.gui = new EEE.GUI();

    console.log("'EEE' Initialization Completed!");
    console.log("Starting mainloop.");
    EEE.Update();

    window.addEventListener("resize", function(){
        EEE.renderer.OnResize();
    });
    EEE.renderer.OnResize();
}