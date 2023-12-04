export default class projectile{
    constructor(game, x, y, spriteInt){
        this.game = game;
        
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;

        this.player = this.game.player;

        this.hasCollidedWithPlayer = false;
        this.hasCollidedWithBullet = false;
        this.isOutOfBounds = false;

        this.sprite = new Image();
        switch(spriteInt){ 
            case 0:
                this.sprite.src = "/src/assets/game/leaf.png";
                break;
            case 1:
                this.sprite.src = "/src/assets/game/leaf-reversed.png";
                break;
            case 2:
                this.sprite.src = "/src/assets/game/leaf-red.png";
                break;
            case 3:
                this.sprite.src = "/src/assets/game/leaf-red-reversed.png";
                break;
            case 4:
                this.sprite.src = "/src/assets/game/leaf-yellow.png";
                break;
            case 5:
                this.sprite.src = "/src/assets/game/leaf-yellow-reversed.png";
                break;
        }

        this.movespeed = 1;
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
        this.y += this.movespeed;
    }

}