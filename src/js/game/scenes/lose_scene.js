import button from "../button.js";
import scene from "./scene.js";

export default class lose_scene extends scene{
    constructor(width, height, context, input){
        super(width, height, context, input);

        this.score = 0;

        //Instantiate Buttons
        this.restartButton = new button(this.width/2 - 100,
                                        this.height/2,
                                        200,
                                        50,
                                        "blue", 
                                        "red", 
                                        "Restart!",
                                        1);
        
        this.mainMenuButton = new button(this.width/2 - 100,
                                         this.height/2 + 60,
                                         200,
                                         50,
                                         "blue", 
                                         "red", 
                                         "Main Menu",
                                         0);
          
        this.optionsButton = new button(this.width/2 - 100,
                                        this.height/2 + 120,
                                        200,
                                        50,
                                        "blue", 
                                        "red", 
                                        "Options",
                                        3);

        this.buttons = [this.restartButton,this.mainMenuButton,this.optionsButton];
    }
    update(){

    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawText(this.textColor,'center','middle','bold 100px arial','GAME OVER', this.width/2, 150);
        this.drawText(this.textColor,'center','middle','bold 50px arial','Score: ' + this.score, this.width/2, 225);
        
        this.context.closePath();
    }
};