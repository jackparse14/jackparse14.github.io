export default class audio_manager{
    constructor(){
        //this.buttonSound = document.createElement("audio");
        //this.buttonSound.src = "/src/assets/game/audio/button_audio.wav";
    }
    play(){
        this.buttonSound = document.createElement("audio");
        this.buttonSound.src = "/src/assets/game/audio/button_audio.wav";
        this.buttonSound.play();
    }
    pause(){
        this.buttonSound.pause();
    }
    playMusic(){
        
    }
}