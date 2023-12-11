import animated_object from "./animated_object.js";

export default class bee extends animated_object{
    constructor(game,x,y, reversedInt){
        super(x,y,60,48,game, 15,12,1);

        if(reversedInt == 0){
            this.sprite.src = "../assets/game/bee-reversed-sheet.png";
            this.movespeed = 2;
        } else {
            this.sprite.src = "../assets/game/bee-Sheet.png";
            this.x = x + this.game.width;
            this.movespeed = -2;
        }

        this.maxY = y - 50;
        this.minY = y + 50;

        this.player = this.game.player;

        this.yMovementState = "DOWN";
        
        this.moveTimer = null;
    }

    update(){
        this.move();
        this.checkPlayerCollision();
        this.checkOutOfBounds();
    }
    checkPlayerCollision(){
        if(this.checkCollision(this.game.player)){
            this.hasCollidedWithPlayer = true;
        }
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
                if(this.drawY <= this.maxY){
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