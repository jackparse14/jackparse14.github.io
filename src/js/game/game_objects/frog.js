import animated_object from "./animated_object.js";

export default class frog extends animated_object{
    constructor(game,x,reversed, maxX, jumpSpeed){
        super(x,(game.height - 44),46,44,game, 23, 22, 5);
        
        this.reversed = reversed;
        this.player = this.game.player;

        if(this.reversed == 0){
            this.sprite.src = "../assets/game/frog-sheet.png";
            this.moveSpeed = 1.5;
            this.maxX = maxX - this.width;
        } else {
            this.sprite.src = "../assets/game/frog-reversed-sheet.png";
            this.moveSpeed = -1.5;
            this.x = x + this.game.width;
            this.maxX = this.game.width - maxX;
        }
        
        this.jumpSpeed = jumpSpeed;
        this.fallSpeed = 1.5;
        this.jumpModifier = 0.5;
        this.jumpInterval = null;
        this.canJump = false;
        this.canJumpProgress = 0;

        this.health = 5;
        this.score = 50;
        this.exp = 25;
        this.isDead = false;

        this.timeBetweenAnimChange = 5;
        this.hasInit = false;
    }

    drawSelf(){
        this.drawFrame();
        if(this.currentFrame == this.maxFrame){
            this.currentFrame = 0;
        }
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

    update(){
        this.move();
        this.checkPlayerCollision();
        this.checkOutOfBounds();
    }

    move(){ 
        if((this.reversed == 0 && this.x <= this.maxX) || (this.reversed == 1 && this.x >= this.maxX)){
            //  Walk state
            this.animateWalk();
            this.x += this.moveSpeed;
        } else{
            //  Jump state
            if(!this.canJump){
                // Stops the frog before it jumps so player knows when it will jump
                this.currentFrame = 2;
                this.changeCanJump();
                
            } else if(this.canJump){
                this.jump();
            }
        }
    }
    animateWalk(){
        if(this.animProgress > this.timeBetweenAnimChange){
            this.animProgress = 0;
            this.changeAnimationFrame();
        } else {
            this.animProgress++;
        }
    }

    changeCanJump(){
        if(this.canJumpProgress > 50){
            this.canJump = true;
        } else {
            this.canJumpProgress++;
        }
    }
    jump(){
        //  Makes the frogs jump slow down towards to the top and speed up as its falling
        this.y -= this.jumpSpeed * this.jumpModifier;
        this.decreaseJumpMod();
        this.x += this.moveSpeed;
        //  Changes frogs look depending on whether frog is moving upwards or downwards in the y direction
        if(this.jumpModifier >= 0){
            this.currentFrame = 3;
        }else{
            this.currentFrame = 5;
        }
    }

    decreaseJumpMod(){
        this.jumpModifier -= 0.004;
    }
}