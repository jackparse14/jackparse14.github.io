import navButton from "../nav_button.js";
import scene from "./scene.js";

export default class controls_scene extends scene{
    constructor(width, height, context, input, currSceneIndex){
        super(width,height,context,input);
          
        this.mainMenuButton = new navButton(this.width/2 - 100,
                                            this.height/2 + 140,
                                            "Main Menu", 
                                            currSceneIndex,
                                            0);
        
        this.buttons = [this.mainMenuButton];

    }
    update(){

    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawTitle('center','middle','', '110', 'Plante','Controls', this.width/2, 120);

        this.context.closePath();
    }

};