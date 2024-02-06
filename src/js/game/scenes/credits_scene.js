import navButton from "../user_interface/nav_button.js";
import scene from "./scene.js";

export default class lose_scene extends scene{
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        //Instantiate Buttons
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
        this.drawTitle('center','middle','','110','Plante','CREDITS', this.width/2, 120);
        this.context.closePath();
    }
};