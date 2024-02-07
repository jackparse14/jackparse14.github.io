import animated_object from "./animated_object.js";

export default class frog extends animated_object{
    constructor(game,x,reversed, maxX, jumpSpeed){
        super(x,(game.height - 44),46,44,game, 23, 22, 5);
        
        this.reversed = reversed;
        this.player = this.game.player;

        if(this.reversed == 0){
            this.sprite.src = "../assets/game/frog-sheet.png";
            this.moveSpeed = 0.5;
            this.maxX = maxX - this.width;
        } else {
            this.sprite.src = "../assets/game/frog-reversed-sheet.png";
            this.moveSpeed = -0.5;
            this.x = x + this.game.width;
            this.maxX = this.game.width - maxX;
        }
        
        this.jumpSpeed = jumpSpeed;
        this.fallSpeed = 0.5;
        this.jumpModifier = 1;
        this.jumpInterval = null;
        this.canJump = false;
        this.canJumpProgress = 0;

        this.timeBetweenAnimChange = 5;
        this.hasInit = false;
    }

    init(){
        if(!this.hasInit){
            
            //setInterval(()=> this.changeAnimationFrame(),100);
            this.hasInit = true;
        }
    }

    drawSelf(){
        /* HIT BOX OUTLINE
        this.game.context.beginPath();
        this.game.context.rect(this.x,this.y,this.width,this.height);
        this.game.context.stroke();*/
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

    update(){

        //this.init();
        this.move();
        this.checkPlayerCollision();
        this.checkOutOfBounds();
    }

    move(){ 
        
        if((this.reversed == 0 && this.x <= this.maxX) || (this.reversed == 1 && this.x >= this.maxX)){
            this.animateWalk();
            this.x += this.moveSpeed;
        } else{
            if(!this.canJump){
                this.currentFrame = 2;
                //this.jumpInterval = setInterval(() => this.changeCanJump(), 1000);
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
        //clearInterval(this.jumpInterval);
        if(this.canJumpProgress > 50){
            this.canJump = true;
        } else {
            this.canJumpProgress++;
        }
    }
    jump(){
        this.y -= this.jumpSpeed * this.jumpModifier;
        this.decreaseJumpMod();
        this.x += this.moveSpeed;
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