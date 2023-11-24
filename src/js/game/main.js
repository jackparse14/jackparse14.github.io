import SceneManager from "./scene_manager.js";
import InputManager from "./input_manager.js";
import AudioManager from "./audio_manager.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");

    const input_manager = new InputManager(canvas);
    const audio_manager = new AudioManager();
    const scene_manager = new SceneManager(canvas.width,canvas.height,ctx,input_manager,audio_manager, canvas);
    
    ctx.imageSmoothingEnabled = false;
    
    function init(){
        scene_manager.init();
        update();
    }

    function update(){
        ctx.clearRect(0,0, canvas.width,canvas.height);
        scene_manager.updateScene();
        scene_manager.drawScene();
        
        requestAnimationFrame(update);
    };

    init();
});
