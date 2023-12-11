export default class game_object{
    constructor(x,y,width,height, game){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.game = game;

        this.isOutOfBounds = false;
        this.sprite = new Image();
    }

    draw(){
        this.game.context.drawImage(this.sprite,this.x,this.y, this.width,this.height);
    }

    checkOutOfBounds(){ 
        if(this.x < -100 || this.x > this.game.width - this.width + 100 || this.y < -100 || this.y > this.game.height - this.height + 100){
            this.isOutOfBounds = true;
        }
    }
    checkCollision(object){
        if(this.x + this.width >= object.x && this.x <= object.x + object.width && this.y + this.height >= object.y && this.y <= object.y + object.height){
            return true;
        } else {
            return false;
        }
    }
    
}