import scene from "./scene.js";
import navButton from "../user_interface/nav_button.js";

export default class menu_scene extends scene{
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);


        this.playButton = new navButton(this.width/2 - 100,
                                        this.height/2 - 40,
                                        "Start Game!", 
                                        currSceneIndex, 
                                        1);

        
        this.controlsButton = new navButton(this.width/2 - 100,
                                            this.height/2 + 20,
                                            "Controls",
                                            currSceneIndex,
                                            4);
          
        this.optionsButton = new navButton(this.width/2 - 100,
                                           this.height/2 + 80,
                                           "Options",
                                           currSceneIndex,
                                           3);
        
        this.creditsButton = new navButton(this.width/2 - 100,
                                           this.height/2 + 140,
                                           "Credits",
                                           currSceneIndex,
                                           5);

        this.buttons = [this.playButton,this.controlsButton,this.optionsButton,this.creditsButton];
        
    }
    update(){
        
    }
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawTitle('center','middle','','110', 'Plante',"NATURE'S TRIAL", this.width/2, 120);
        
        this.context.closePath();
    }
};
