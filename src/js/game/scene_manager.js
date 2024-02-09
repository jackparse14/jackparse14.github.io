import MenuScene from "./scenes/menu_scene.js";
import GameScene from "./scenes/game_scene.js";
import LoseScene from "./scenes/lose_scene.js";
import OptionsScene from "./scenes/options_scene.js";
import ControlsScene from "./scenes/controls_scene.js";
import CreditsScene from "./scenes/credits_scene.js";

export default class scene_manager{
    constructor(canvasWidth, canvasHeight, context, input, audio, canvas){
        this.input = input;
        this.audio = audio;
        this.currSceneIndex = [0];

        this.hasUserClickedWindow = false;

        //Instantiate Scenes
        this.menu_scene = new MenuScene(canvasWidth, canvasHeight, context, input, this.currSceneIndex);
        this.game_scene = new GameScene(canvasWidth, canvasHeight, context, input, this.currSceneIndex);
        this.lose_scene = new LoseScene(canvasWidth,canvasHeight,context,input, this.currSceneIndex);
        this.options_scene = new OptionsScene(canvasWidth,canvasHeight,context,input, audio, this.currSceneIndex, canvas);
        this.controls_scene = new ControlsScene(canvasWidth,canvasHeight,context,input, this.currSceneIndex);
        this.credits_scene = new CreditsScene(canvasWidth,canvasHeight,context,input, this.currSceneIndex);

        this.scenes = [this.menu_scene,this.game_scene, this.lose_scene, this.options_scene,this.controls_scene, this.credits_scene];
    }

    init(){}

    updateScene(){
        //  When game scene starts it resets the game
        if(this.currSceneIndex == 1 && !this.scenes[this.currSceneIndex].hasReset){
            this.scenes[this.currSceneIndex].resetGame();
        } else if (this.currSceneIndex == 2){
            //  When the player loses it updates the score
            this.scenes[this.currSceneIndex].updateScore(this.scenes[1].score);
        }
    
        this.scenes[this.currSceneIndex].update();

        this.scenes[this.currSceneIndex].buttons.forEach(button => {
            //  Checks if any buttons have been clicked
            if(button.isClickInBounds(this.input.clickCoord) && this.input.clickCoord.length != 0){
                this.audio.playButtonSound();
                button.handleClick();
                this.input.clickCoord = [];
             }
        });

        // If the user interacts with the window then music starts playing
        if(navigator.userActivation.isActive){
            this.audio.chooseMusic(this.currSceneIndex);
        };
    }

    drawScene(){
        this.scenes[this.currSceneIndex].draw();
    }
}
