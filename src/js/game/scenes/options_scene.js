import navButton from "../user_interface/nav_button.js";
import volumeButton from "../user_interface/volume_button.js";
import scene from "./scene.js";

export default class options_scene extends scene{
    constructor(width, height, context, input,audio, currSceneIndex, canvas){
        super(width,height,context,input);

        this.audio = audio;
        
        this.mainMenuButton = new navButton(this.width/2 - 100,
                                            this.height/2 + 140,
                                            "Main Menu",
                                            currSceneIndex,
                                            0);
        this.volumeUpButton = new volumeButton(this.width/2 + 150,
                                               this.height/2 - 42 ,
                                               "⇧", 
                                               audio, 
                                               true);
        this.volumeDownButton = new volumeButton(this.width/2+150,
                                                 this.height/2 ,
                                                 "⇩", 
                                                 audio, 
                                                 false);
        
        this.buttons = [this.mainMenuButton, this.volumeUpButton, this.volumeDownButton];

    }
    update(){
        this.updateVolumeText();
    }
    updateVolumeText(){
        this.volume = this.audio.masterVolume * 100;
    }
    draw(){
        this.context.beginPath();

        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawTitle('center','middle','', '110', 'Plante','Options', this.width/2, 120);
        this.drawText('center','middle','bold', '50' ,'arial','Volume: ' + this.volume , this.width/2, 270);
        this.context.closePath();
    }
};