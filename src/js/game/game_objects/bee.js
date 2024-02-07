import animated_object from "./animated_object.js";

export default class bee extends animated_object{
    constructor(game,x,y, reversedInt){
        super(x,y,60,48,game, 15,12,1);

        if(reversedInt == 0){
            this.sprite.src = "../assets/game/bee-reversed-sheet.png";
            this.movespeed = 2;
        } else {
            this.sprite.src = "../assets/game/bee-Sheet.png";
            this.x = x + game.width;
            this.movespeed = -2;
        }

        this.maxY = y - 50;
        this.minY = y + 50;

        this.yPreviousState = "DOWN";
        this.yMovementState = "DOWN";

        this.hasStateTimerStarted = false;
        this.timeBetweenAnimChange = 100;
        this.animProgress = 0;
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

    move(){
        this.moveXDirection();
        this.moveYDirection();
        
    }
    moveYDirection(){
        switch(this.yMovementState){
            case "UP":
                this.currentFrame = 1;
                this.y -= 1;
                if(this.y <= this.maxY){
                    this.changeToStraightState();
                }
                break;
            case "DOWN":
                this.currentFrame = 1;
                this.y += 1;
                if(this.y >= this.minY){
                    this.changeToStraightState();
                }
                break;
            case "STRAIGHT":
                this.currentFrame = 0;
                /*if(!this.hasStateTimerStarted){
                    this.hasStateTimerStarted = true;
                    this.moveTimer = setInterval(()=> this.moveStraightTimer(), 750);
                    
                }*/
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
        this.x += this.movespeed;
    }
    /*moveStraightTimer(){
        this.changeToUpOrDownState();
        this.hasStateTimerStarted = false;
        clearInterval(this.moveTimer);
    }*/
}