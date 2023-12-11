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

        this.hasInit = false;
    }

    init(){
        if(!this.hasInit){
            setInterval(()=> this.changeAnimationFrame(),100);
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
        if(this.x + this.width >= this.player.x && this.x <= this.player.x + this.player.width && this.y + this.height >= this.player.y && this.y <= this.player.y + this.player.height){
            this.hasCollidedWithPlayer = true;
        }
    }

    update(){
        this.init();
        this.move();
        this.checkPlayerCollision();
        this.checkOutOfBounds();
    }

    move(){ 
        if(this.reversed == 0 && this.x <= this.maxX){
            this.x += this.moveSpeed;
        } else if (this.reversed == 1 && this.x >= this.maxX){
            this.x += this.moveSpeed;
        } else{
            if(!this.canJump){
                this.currentFrame = 2;
                this.jumpInterval = setInterval(() => this.changeCanJump(), 1000);
            } else if(this.canJump){
                this.jump();
            }
        }
    }

    changeCanJump(){
        this.canJump = true;
        clearInterval(this.jumpInterval);
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