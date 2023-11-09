import button from "../button.js";
import scene from "./scene.js";

export default class controls_scene extends scene{
    constructor(width, height, context, input){
        super(width,height,context,input);
          
        this.mainMenuButton = new button(this.width/2 - 100,
                                        this.height/2 + 120,
                                        200,
                                        50,
                                        "blue", 
                                        "red", 
                                        "Main Menu",
                                        0);
        
        this.buttons = [this.mainMenuButton];

    }
    update(){

    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawText(this.textColor,'center','middle','bold 100px arial','Controls:', this.width/2, 150);

        this.context.closePath();
    }

};