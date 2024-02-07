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

    var targetFPS = 60;
    var fpsInterval, startTime, lastTime, firstTime, elapsed;
    var frameCount = 0;
    
    function init(){
        scene_manager.init();
        fpsInterval = 1000/ targetFPS;
        firstTime = Date.now();
        startTime = firstTime;
        update();
    }

    function update(){
        requestAnimationFrame(update);

        lastTime = Date.now();
        elapsed = lastTime - firstTime;

        if(elapsed > fpsInterval){
            firstTime = lastTime - (elapsed % fpsInterval);

            ctx.clearRect(0,0, canvas.width,canvas.height);
            scene_manager.updateScene();
            scene_manager.drawScene();

            var sinceStart = lastTime - startTime;
            var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
            console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
        }
    };

    init();
});
