EEE.Update = function(){
    EEE.deltaTime = Date.now()/1000 - EEE.time;
    EEE.time = Date.now() / 1000;
    EEE.scene.Update();
    EEE.gui.Update();
    EEE.input.Update();
    EEE.renderer.Render( EEE.scene, EEE.scene.activeCamera );
    EEE.renderer.RenderGUI(EEE.gui);
    requestAnimationFrame( EEE.Update );    
}