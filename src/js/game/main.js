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

    var targetFPS = 30;
    var fpsInterval, startTime, lastTime, firstTime, elapsed;
    var frameCount = 0;
    
    function init(){
        //  Runs the initalising before update
        scene_manager.init();
        fpsInterval = 1000/ targetFPS;
        firstTime = Date.now();
        startTime = firstTime;
        update();
    }

    function update(){
        //  Recursive loop being called as fast as the computer can process it
        requestAnimationFrame(update);

        lastTime = Date.now();
        elapsed = lastTime - firstTime;

        //  Bottlenecks the game to run at 30 frames per second consistently
        if(elapsed > fpsInterval){
            firstTime = lastTime - (elapsed % fpsInterval);

            //  Clears the canvas completely and updates and draws on it every frame
            ctx.clearRect(0,0, canvas.width,canvas.height);
            scene_manager.updateScene();
            scene_manager.drawScene();
        }
    };

    init();
});
