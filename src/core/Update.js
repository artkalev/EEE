EEE.Update = function(){
    EEE.renderer.Render( EEE.scene, EEE.scene.activeCamera );   
    requestAnimationFrame( EEE.Update );    
}