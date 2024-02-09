import animated_object from "./animated_object.js";

export default class bee extends animated_object{
    constructor(game,x,y, reversedInt){
        super(x,y,60,48,game, 15,12,1);

        if(reversedInt == 0){
            this.sprite.src = "../assets/game/bee-reversed-sheet.png";
            this.movespeed = 6;
        } else {
            this.sprite.src = "../assets/game/bee-Sheet.png";
            this.x = x + game.width;
            this.movespeed = -6;
        }

        this.health = 1;
        this.isDead = false;
        this.score = 10;
        this.exp = 5;

        this.yMoveSpeed = 3;

        // Bee will only move up and down by 50 pixels from where the b starts on the y axis
        this.maxY = y - 50;
        this.minY = y + 50;

        this.yPreviousState = "DOWN";
        this.yMovementState = "DOWN";

        this.hasStateTimerStarted = false;
        this.timeBetweenAnimChange = 50;
        
        this.moveTimer = null;
        this.moveStraight = false;
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
    loseHealth(){
        this.health--;
        if(this.health <= 0 ){
            this.isDead = true;
        }
    }

    move(){
        this.moveXDirection();
        this.moveYDirection();
    }
    moveYDirection(){
        switch(this.yMovementState){
            case "UP":
                this.currentFrame = 1;
                // Bee moves upwards in y direction
                this.y -= this.yMoveSpeed;
                if(this.y <= this.maxY){
                    this.changeToStraightState();
                }
                break;
            case "DOWN":
                this.currentFrame = 1;
                //  Bee moves downwards in y direction
                this.y += this.yMoveSpeed;
                if(this.y >= this.minY){
                    this.changeToStraightState();
                }
                break;
            case "STRAIGHT":
                this.currentFrame = 0;
                //  Bee doesn't move in y direction
                if(this.animProgress > this.timeBetweenAnimChange){
                    this.animProgress = 0;
                    this.changeToUpOrDownState();
                } else {
                    this.animProgress++;
                }
                
                break;
        }
    }

    changeToStraightState(){
        this.yPreviousState = this.yMovementState;
        this.yMovementState = "STRAIGHT";
    }
    changeToUpOrDownState(){
        if(this.yPreviousState == "DOWN"){
            this.yMovementState = "UP";
        } else if(this.yPreviousState == "UP"){
            this.yMovementState = "DOWN";
        }
        
    }

    moveXDirection(){
        // Bee constantly moves the same speed in the x direction
        this.x += this.movespeed;
    }
}