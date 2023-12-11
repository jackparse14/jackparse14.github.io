import game_object from "./game_object.js";

export default class leaf extends game_object{
    constructor(game, x, y, spriteInt){
        super(x,y,20,20,game);

        this.player = this.game.player;

        this.hasCollidedWithPlayer = false;
        this.hasCollidedWithBullet = false;

        switch(spriteInt){ 
            case 0:
                this.sprite.src = "../assets/game/leaf.png";
                break;
            case 1:
                this.sprite.src = "../assets/game/leaf-reversed.png";
                break;
            case 2:
                this.sprite.src = "../assets/game/leaf-red.png";
                break;
            case 3:
                this.sprite.src = "../assets/game/leaf-red-reversed.png";
                break;
            case 4:
                this.sprite.src = "../assets/game/leaf-yellow.png";
                break;
            case 5:
                this.sprite.src = "../assets/game/leaf-yellow-reversed.png";
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

    move(){
        this.y += this.movespeed;
    }

}