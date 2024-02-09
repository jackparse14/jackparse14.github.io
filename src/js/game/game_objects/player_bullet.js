import game_object from "./game_object.js";

export default class player_bullet extends game_object{
    constructor(x,y, game){
        super(x,y,10,10,game);

        this.mouseCoordX = this.game.input.getLastMouseXCoord();
        this.mouseCoordY = this.game.input.getLastMouseYCoord();

        this.hasHitEnemy = false;

        this.sprite.src = "/src/assets/game/bullet.png";

        this.moveSpeed = 6;

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
        this.checkArrayCollision(this.game.leaves);
        this.checkArrayCollision(this.game.bees);
        this.checkArrayCollision(this.game.frogs);
    }
    checkArrayCollision(array){
        array.forEach(element => {
            //  Checks for collision against enemies
            if(this.checkCollision(element)){
                element.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
    }
    move(){
        //  Calculates the angle from where the bullet spawns to where the user clicked
        var deltaX = this.mouseCoordX - this.startingX;
        var deltaY = this.mouseCoordY - this.startingY;
        var angle = Math.atan2(deltaY,deltaX);

        //  Moves the bullet in the direction of the angle
        this.x += Math.cos(angle) * this.moveSpeed;
        this.y += Math.sin(angle) * this.moveSpeed;
    }aw
}   
