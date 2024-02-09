import navButton from "../user_interface/nav_button.js";
import scene from "./scene.js";

export default class lose_scene extends scene{
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.score = null;

        this.restartButton = new navButton(this.width/2 - 100,
                                           this.height/2 + 20,
                                           "Restart!",
                                           currSceneIndex,
                                           1);
        
        this.mainMenuButton = new navButton(this.width/2 - 100,
                                            this.height/2 + 140,
                                            "Main Menu",
                                            currSceneIndex,
                                            0);
          
        this.optionsButton = new navButton(this.width/2 - 100,
                                           this.height/2 + 80,
                                           "Options",
                                           currSceneIndex,
                                           3);

        this.buttons = [this.restartButton,this.mainMenuButton,this.optionsButton];
    }
    update(){}
    updateScore(newScore){
        this.score = newScore;
    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawTitle('center','middle','', '110', 'Plante','GAME OVER', this.width/2, 120);
        this.drawText('center','middle','bold', '50', 'arial','Score: ' + this.score, this.width/2, 225);
        
        this.context.closePath();
    }
};