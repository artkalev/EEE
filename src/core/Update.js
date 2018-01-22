EEE.Update = function(){
    EEE.time = Date.now() / 1000;
    EEE.scene.Update();
    EEE.renderer.Render( EEE.scene, EEE.scene.activeCamera );   
    requestAnimationFrame( EEE.Update );    
}