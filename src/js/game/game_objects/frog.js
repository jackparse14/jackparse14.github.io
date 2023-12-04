export default class frog{
    constructor(game,x,reversed, maxX){
        this.game = game;
        this.reversed = reversed;

        this.player = this.game.player;

        this.width = 46;
        this.height = 44;
        this.y = this.game.height - this.height;
        this.maxY = this.y - 100;

        this.sprite = new Image();
        if(this.reversed == 0){
            this.sprite.src = "/src/assets/game/frog-sheet.png";
            this.moveSpeed = 0.5;
            this.x = x;
            this.maxX = maxX - this.width;
        } else {
            this.sprite.src = "/src/assets/game/frog-reversed-sheet.png";
            this.moveSpeed = -0.5;
            this.x = x + this.game.width;
            this.maxX = this.game.width - maxX;
        }
        
        this.jumpSpeed = 0.5;
        

        this.currentFrame = 0;
        this.maxFrame = 5;
        this.frameWidth = 23;
        this.frameHeight = 22;

        this.hasInit = false;

        
    }

    init(){
        if(!this.hasInit){
            setInterval(()=> this.changeAnimationFrame(),100);
            this.hasInit = true;
        }
    }

    changeAnimationFrame(){
        this.currentFrame++;
    }

    draw(){
        /* HIT BOX OUTLINE
        this.game.context.beginPath();
        this.game.context.rect(this.x,this.y,this.width,this.height);
        this.game.context.stroke();*/
        this.game.context.drawImage(this.sprite,this.currentFrame * this.frameWidth,0,this.frameWidth,this.frameHeight,this.x,this.y, this.width,this.height);
        if(this.currentFrame == this.maxFrame){
            this.currentFrame = 0;
        }
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
            this.jump();
        }
    }

    jump(){
        if(this. y >= this.maxY){
            this.y -= this.jumpSpeed;
            
        }
        this.x += this.moveSpeed;
    }
}