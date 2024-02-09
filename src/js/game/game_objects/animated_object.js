import game_object from "./game_object.js";

export default class animated_object extends game_object{
    constructor(x,y,width,height,game, frameWidth, frameHeight, maxFrame){
        super(x,y,width,height,game);
        
        this.animProgress = 0;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.currentFrame = 0;
        this.maxFrame = maxFrame;
    }

    drawFrame(){
        this.game.context.drawImage(this.sprite,this.currentFrame * this.frameWidth,0, this.frameWidth,this.frameHeight,this.x,this.y, this.width,this.height);
    }

    //  For drawing GameObjects that Rotate
    drawFrameRotate(){
        this.game.context.drawImage(this.sprite,this.currentFrame * this.frameWidth,0, this.frameWidth,this.frameHeight,this.width/-2,this.height/-2, this.width,this.height);
    }

    changeAnimationFrame(){
        if(this.game.isPaused){return;};
        this.currentFrame++;
    }
}