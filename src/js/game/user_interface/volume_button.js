import button from "./button.js"

export default class volumeButton extends button{
    constructor(x,y, text, audio, isVolumeUpButton){
        super(x,y, text)
        
        this.width = 35;
        this.height = 35;

        this.fillColor = "#a3b18a";
        this.textColor = "#344E41";

        this.isVolumeUpButton = isVolumeUpButton;
        this.audio = audio;
    }
    handleClick(){
        if(this.isVolumeUpButton){
            this.audio.increaseVolume();
        } else{
            this.audio.decreaseVolume();
        }
    }
}