import game_object from "./game_object.js";

export default class leaf extends game_object{
    constructor(game, x, y, spriteInt){
        super(x,y,20,20,game);

        //  spriteInt is a random number and chooses which sprite we use for the leaf
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

        this.movespeed = 3;
        this.isDead = false;
        this.health = 2;
        this.exp = 10;
        this.score = 20;
    }
    update(){
        this.move();
        if(this.checkCollision(this.game.player)){
            this.hasCollidedWithPlayer = true;
        }
        this.checkOutOfBounds();
    }

    loseHealth(){
        this.health--;
        if(this.health <= 0 ){
            this.isDead = true;
        }
    }

    move(){
        // Leaf falls from the top of the screen in a vertical line
        this.y += this.movespeed;
    }

}