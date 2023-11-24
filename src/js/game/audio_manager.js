export default class audio_manager{
    constructor(){
        this.buttonSound = document.createElement("audio");
        this.menuMusic = document.createElement("audio");
        this.gameMusic = document.createElement("audio");
       
        this.menuMusic.src = "/src/assets/game/audio/menu_background.mp3";
        this.gameMusic.src = "/src/assets/game/audio/game_background.mp3";

        this.masterVolume = 0.5;
    }
    playButtonSound(){
        this.buttonSound.src = "/src/assets/game/audio/button_audio.wav";
        this.buttonSound.play();
    }
    increaseVolume(){
        if(this.masterVolume < 1){
            this.masterVolume += 0.1;
            this.roundVolToOneDecimal();
            this.updateAudioVolume();
        }
    }
    decreaseVolume(){
        if(this.masterVolume > 0){
            this.masterVolume -= 0.1;
            this.roundVolToOneDecimal();
            this.updateAudioVolume();
        }
    }
    roundVolToOneDecimal(){
        this.masterVolume = Math.round((this.masterVolume + Number.EPSILON) * 10)/10;
    }
    updateAudioVolume(){
        this.buttonSound.volume = this.masterVolume;
        this.menuMusic.volume = this.masterVolume;
        this.gameMusic.volume = this.masterVolume;
    }

    chooseMusic(sceneIndex){
        if(sceneIndex == 1){
            this.playGameMusic();
            this.pauseMenuMusic();
        } else {
            this.playMenuMusic();
            this.pauseGameMusic();
        }
    }
    playGameMusic(){
        this.gameMusic.play();
    }
    pauseGameMusic(){
        this.gameMusic.pause();
        this.gameMusic.currentTime = 0;
    }
    playMenuMusic(){
        this.menuMusic.play();
        
    }
    pauseMenuMusic(){
        this.menuMusic.pause();
        this.menuMusic.currentTime = 0;
    }
}