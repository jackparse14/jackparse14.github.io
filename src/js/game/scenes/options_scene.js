import button from "../button.js";
import scene from "./scene.js";

export default class options_scene extends scene{
    constructor(width, height, context, input){
        super(width,height,context,input);

        this.volume = 50;
        
        this.mainMenuButton = new button(this.width/2 - 100,
                                         this.height/2 + 60,
                                         200,
                                         50,
                                         "blue", 
                                         "red", 
                                         "Main Menu",
                                         0);
        this.volumeUpButton = new button(this.width/2 + 150,
                                         this.height/2 - 60 ,
                                         50,
                                         50,
                                         "blue",
                                         "red",
                                         "⇧");
        this.volumeDownButton = new button(this.width/2+150,
                                           this.height/2 ,
                                           50,
                                           50,
                                           "blue",
                                           "red",
                                           "⇩");
        
        this.buttons = [this.mainMenuButton, this.volumeUpButton, this.volumeDownButton];

    }
    update(){

    }
    draw(){
        this.context.beginPath();

        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawText(this.textColor,'center','middle','bold 100px arial','Options:', this.width/2, 150);
        this.drawText(this.textColor,'center','middle','bold 50px arial','Volume: ' + this.volume , this.width/2, 270);
        this.context.closePath();
    }
};