import MenuScene from "./scenes/menu_scene.js";
import GameScene from "./scenes/game_scene.js";
import LoseScene from "./scenes/lose_scene.js";
import OptionsScene from "./scenes/options_scene.js";
import ControlsScene from "./scenes/controls_scene.js";

export default class scene_manager{
    constructor(canvasWidth, canvasHeight, context, input, audio){
        this.input = input;
        this.audio = audio;
        this.currSceneIndex = 0;

        //Instantiate Scenes
        this.menu_scene = new MenuScene(canvasWidth, canvasHeight, context, input, audio);
        this.game_scene = new GameScene(canvasWidth, canvasHeight, context, input, audio);
        this.lose_scene = new LoseScene(canvasWidth,canvasHeight,context,input, audio);
        this.options_scene = new OptionsScene(canvasWidth,canvasHeight,context,input, audio);
        this.controls_scene = new ControlsScene(canvasWidth,canvasHeight,context,input, audio);

        this.scenes = [this.menu_scene,this.game_scene, this.lose_scene, this.options_scene,this.controls_scene];
    }

    updateScene(){
        this.scenes[this.currSceneIndex].update();

        this.scenes[this.currSceneIndex].buttons.forEach(button => {
            if(button.isClickInBounds(this.input.clickCoord) && this.input.clickCoord.length != 0){
                this.audio.play();
                this.currSceneIndex = button.nextSceneIndex;
                this.input.clickCoord = [];
             }
        });

        // REMOVE WHEN FINISHED
        if(this.input.keys.includes('/')){
            this.currSceneIndex = 2;
        };
    }

    drawScene(){
        this.scenes[this.currSceneIndex].draw();
    }
}