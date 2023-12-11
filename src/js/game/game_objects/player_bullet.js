import game_object from "./game_object.js";

export default class player_bullet extends game_object{
    constructor(x,y, game){
        super(x,y,10,10,game);

        this.mouseCoordX = this.game.input.getLastMouseXCoord();
        this.mouseCoordY = this.game.input.getLastMouseYCoord();

        this.hasHitEnemy = false;

        this.sprite.src = "/src/assets/game/bullet.png";

        this.moveSpeed = 2;

        this.hasInit = false;
    }
    init(){
        if(!this.hasInit){
            this.startingX = this.x;
            this.startingY = this.y;
            this.hasInit = true;
        }
    }
    update(){
        this.init();
        this.move();
        
        this.checkEnemyCollision();
        this.checkOutOfBounds();
    }
    checkEnemyCollision(){
        this.game.leaves.forEach(leaf => {
            if(this.x + this.width >= leaf.x && this.x <= leaf.x + leaf.width && this.y + this.height >= leaf.y && this.y <= leaf.y + leaf.height){
                leaf.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
        this.game.bees.forEach(bee => {
            if(this.x + this.width >= bee.x && this.x <= bee.x + bee.width && this.y + this.height >= bee.y && this.y <= bee.y + bee.height){
                bee.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
        this.game.frogs.forEach(frog => {
            if(this.x + this.width >= frog.x && this.x <= frog.x + frog.width && this.y + this.height >= frog.y && this.y <= frog.y + frog.height){
                frog.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
    }
    move(){
        
        var deltaX = this.mouseCoordX - this.startingX;
        var deltaY = this.mouseCoordY - this.startingY;

        var angle = Math.atan2(deltaY,deltaX);

        this.x += Math.cos(angle) * this.moveSpeed;
        this.y += Math.sin(angle) * this.moveSpeed;
    }aw
}   
