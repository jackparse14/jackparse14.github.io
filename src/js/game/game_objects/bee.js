export default class bee{
    constructor(game,x,y){
        this.game = game;
        this.x = x;
        this.y = y;

        this.maxY = y - 50;
        this.minY = y + 50;

        this.player = this.game.player;

        this.yMovementState = "DOWN";

        this.width = 60;
        this.height = 48;

        this.movespeed = 2;

        this.sprite = new Image();
        this.sprite.src = "/src/assets/game/bee.png";

        this.hasCollidedWithPLayer = false;
        this.isOutOfBounds = false;
    }

    update(){
        this.move();
        this.checkPlayerCollision();
        this.checkOutOfBounds();
    }
    checkPlayerCollision(){
        if(this.x + this.width >= this.player.x && this.x <= this.player.x + this.player.width && this.y + this.height >= this.player.y && this.y <= this.player.y + this.player.height){
            this.hasCollidedWithPlayer = true;
        }
    }
    checkOutOfBounds(){ 
        if(this.x < -100 || this.x > this.game.width - this.width + 100 || this.y < -100 || this.y > this.game.height - this.height + 100){
            this.isOutOfBounds = true;
        }
    }
    draw(){
        this.game.context.drawImage(this.sprite,this.x,this.y, this.width,this.height);
    }
    move(){
        this.x += this.movespeed;

        if(this.yMovementState == "DOWN"){
            this.y += 1;
            if(this.y >= this.minY){
                this.yMovementState = "UP";
            }
        } else if(this.yMovementState == "UP"){
            this.y -= 1;
            if(this.y <= this.maxY){
                this.yMovementState ="DOWN";
            }
        }
    }
}