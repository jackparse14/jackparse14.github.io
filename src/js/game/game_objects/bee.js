export default class bee{
    constructor(game,x,y, reversedInt){
        this.game = game;

        this.sprite = new Image();

        if(reversedInt == 0){
            this.sprite.src = "../assets/game/bee-reversed-sheet.png";
            this.x = x;
            this.movespeed = 2;
        } else {
            this.sprite.src = "../assets/game/bee-Sheet.png";
            this.x = x + this.game.width;
            this.movespeed = -2;
        }

        this.y = y;

        this.maxY = y - 50;
        this.minY = y + 50;

        this.player = this.game.player;

        this.yMovementState = "DOWN";

        this.width = 60;
        this.height = 48;

        

        
        

        this.moveTimer = null;

        

        this.frameWidth = 15;
        this.frameHeight = 12;
        this.currentFrame = 0;
        this.maxFrame = 1;

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
        this.game.context.drawImage(this.sprite,this.currentFrame * this.frameWidth,0,this.frameWidth,this.frameHeight,this.x,this.y, this.width,this.height);
    }
    move(){
        this.x += this.movespeed;
        if(!this.moveStraight){
            this.currentFrame = 1;
            if(this.yMovementState == "DOWN"){
                this.y += 1;
                if(this.y >= this.minY){
                    this.currentFrame = 0;
                    this.moveStraight = true;
                    this.moveTimer = setInterval(()=> this.moveStraightTimer(), 750);
                    this.yMovementState = "UP";
                }
            } else if(this.yMovementState == "UP"){
                this.y -= 1; 
                if(this.y <= this.maxY){
                    this.currentFrame = 0;
                    this.moveStraight = true;
                    this.moveTimer = setInterval(()=> this.moveStraightTimer(), 750);
                    this.yMovementState ="DOWN";
                }
            }
        }
    }
    moveStraightTimer(){
        this.moveStraight = false;
        clearInterval(this.moveTimer);
    }
}