import button from "../button.js";
import scene from "./scene.js";

export default class menu_scene extends scene{
    constructor(width, height, context, input){
        super(width, height, context, input);

        this.playButton = new button(this.width/2 - 100,
                                     this.height/2,
                                     200,
                                     50,
                                     "blue", 
                                     "red", 
                                     "Start Game!",
                                     1);
        
        this.controlsButton = new button(this.width/2 - 100,
                                         this.height/2 + 60,
                                         200,
                                         50,
                                         "blue", 
                                         "red", 
                                         "Controls",
                                         4);
          
        this.optionsButton = new button(this.width/2 - 100,
                                        this.height/2 + 120,
                                        200,
                                        50,
                                        "blue", 
                                        "red", 
                                        "Options",
                                        3);

        this.buttons = [this.playButton,this.controlsButton,this.optionsButton];
        
    }
    update(){

    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawText(this.textColor,'center','middle','bold 100px arial','MY GAME', this.width/2, 150);
        
        this.context.closePath();
    }
};
