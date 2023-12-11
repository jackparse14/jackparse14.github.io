import animated_object from "./animated_object.js";

export default class smoke extends animated_object{
    constructor(x,y, width, height, game){
        super(x,y,(width + height)/2,(width + height)/2, game, 35,34,6);

        this.sprite.src = "/src/assets/game/smoke-sheet.png";

        this.destroySelf = false;

        this.hasInit = false;
        this.smokeAnimationTimer = setInterval(()=> this.changeAnimationFrame(), 50);
    }
    drawSelf(){
        this.drawFrame();
        if(this.currentFrame == this.maxFrame){
            this.destroySelf = true;
        }
    }

}