export default class smoke{
    constructor(x,y, width, height, game){
        this.sprite = new Image();
        this.sprite.src = "/src/assets/game/smoke-sheet.png";

        this.game = game;

        this.x = x;
        this.y = y;
        
        this.dimension = (height + width)/ 2;

        this.frameWidth = 35;
        this.frameHeight = 34;
        this.currentFrame = 0;
        this.maxFrame = 6;

        this.destroySelf = false;

        this.hasInit = false;
        this.smokeAnimationTimer = setInterval(()=> this.changeAnimationFrame(), 50);
    }
    draw(){
        this.game.context.drawImage(this.sprite,this.currentFrame * this.frameWidth,0,this.frameWidth,this.frameHeight,this.x,this.y, this.dimension,this.dimension);
        if(this.currentFrame == this.maxFrame){
            this.destroySelf = true;
        }
    }
    
    changeAnimationFrame(){
        this.currentFrame++;
    }
}