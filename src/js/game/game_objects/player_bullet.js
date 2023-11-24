
export default class player_bullet{
    constructor(x,y, game){
        this.x = x;
        this.y = y;

        this.game = game;

        
        this.mouseCoordX = this.game.input.getLastMouseXCoord();
        this.mouseCoordY = this.game.input.getLastMouseYCoord();

        this.hasHitEnemy = false;
        this.isOutOfBounds = false;

        this.width = 10;
        this.height = 10;

        this.sprite = new Image();
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
        this.game.projectiles.forEach(projectile => {
            if(this.x + this.width >= projectile.x && this.x <= projectile.x + projectile.width && this.y + this.height >= projectile.y && this.y <= projectile.y + projectile.height){
                projectile.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
        this.game.bees.forEach(bee => {
            if(this.x + this.width >= bee.x && this.x <= bee.x + bee.width && this.y + this.height >= bee.y && this.y <= bee.y + bee.height){
                bee.hasCollidedWithBullet = true;
                this.hasHitEnemy = true;
            }
        });
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
        
        var deltaX = this.mouseCoordX - this.startingX;
        var deltaY = this.mouseCoordY - this.startingY;

        var angle = Math.atan2(deltaY,deltaX);

        this.x += Math.cos(angle) * this.moveSpeed;
        this.y += Math.sin(angle) * this.moveSpeed;
    }aw
}   
