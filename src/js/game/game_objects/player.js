import animatedObject from "./animated_object.js";
import playerBullet from "./player_bullet.js";

export default class Player extends animatedObject{
    constructor(width,height,game){
        super((game.width/2 - width/2),(game.height/2 - height/2), width, height,game, 15,12,7);
        this.inputKeys = game.input.keys;
        
        this.currYSpeed = 0;
        this.currXSpeed = 0;
        this.maxSpeed = 1;

        this.angleToRotate = 0;

        this.undamagedSprite = "../assets/game/butterfly-Sheet.png";
        this.damagedSprite = "../assets/game/butterfly-sheet-damaged.png";
        this.sprite.src = this.undamagedSprite;

        this.damageTimer = null;
        this.isDamagedTimerRunning = false;

        this.hasInit = false;

        this.canBulletSpawn = true;
        this.timeBetweenBulletSpawn = 1000;
        this.playerBullets = [];
    }

    init(){
        if(!this.hasInit){
            setInterval(()=> this.changeAnimationFrame(),100);
            this.hasInit = true; 
        }
    }

    startDamagedTimer(){
        if(!this.isDamagedTimerRunning){
            this.sprite.src = this.damagedSprite;
            this.isDamagedTimerRunning = true;
        } else {
            clearInterval(this.damageTimer);
        }
        this.damageTimer = setInterval(() => this.changeToUndamagedSpriteSheet(), 1000);
    }

    changeToUndamagedSpriteSheet(){
        this.sprite.src = this.undamagedSprite;
        this.isDamagedTimerRunning = false;
        clearInterval(this.damageTimer);
    }

  

    drawSelf(){
          //HITBOX DISPLAY
        this.game.context.strokeStyle = "White";
        this.game.context.strokeRect(this.x,this.y,this.width,this.height);

        this.rotate();
        this.playerBullets.forEach(bullet =>{
            bullet.draw();
        });
    }
    rotate(){
        this.game.context.save();
        this.game.context.translate(this.x + this.width/2,this.y + this.height/2);
        this.game.context.rotate(this.angleToRotate);
        this.drawFrameRotate();
        if(this.currentFrame == this.maxFrame){
            this.currentFrame = 0;
        }
        this.game.context.restore();
    }

    update(){
        this.init();
        this.updateRotatationAngle();
        this.startSpawningBullets();
        this.updateXAxisMovement();
        this.updateYAxisMovement();
        if(this.canBulletSpawn && this.game.input.clickCoord.length != 0){
            
            this.spawnPlayerBullet();
            clearInterval(this.bulletSpawnTimer);
            this.bulletSpawnTimer = setInterval(() => this.setCanBulletSpawn(), this.timeBetweenBulletSpawn);
        }
        for(let i = 0;i < this.playerBullets.length;i++){
            this.playerBullets[i].update();
            if(this.playerBullets[i].hasHitEnemy || this.playerBullets[i].isOutOfBounds){
                this.playerBullets.splice(i,1);
            }
        }
    }

    updateRotatationAngle(){
        this.mouseCoordX = this.game.input.getLastMouseXCoord();
        this.mouseCoordY = this.game.input.getLastMouseYCoord();
        var deltaX = this.mouseCoordX - this.x - this.width/2;
        var deltaY = this.mouseCoordY - this.y - this.height/2;

        this.angleToRotate = Math.atan2(deltaY,deltaX) + Math.PI/2;
    }

    startSpawningBullets(){
        if(!this.hasInit){
            this.bulletSpawnTimer = setInterval(() => this.setCanBulletSpawn(), this.timeBetweenBulletSpawn);
            this.hasInit = true;
        }
    }
    setCanBulletSpawn(){
        if(this.canBulletSpawn == false){
            this.canBulletSpawn = true;
        }
    }

    spawnPlayerBullet(){
        this.bullet = new playerBullet(this.x + this.width/2,this.y + this.height/2, this.game);
        this.playerBullets.push(this.bullet);
        this.canBulletSpawn = false;
    }
    updateYAxisMovement(){
        this.y += this.currYSpeed;

        if(this.inputKeys.includes('w')){
            this.currYSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('s')){
            this.currYSpeed = this.maxSpeed;
        } else {
            this.currYSpeed = 0;
        };
        
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y > this.game.height - this.height){
            this.y = this.game.height - this.height;
        }
    }
    updateXAxisMovement(){
        this.x += this.currXSpeed;

        if(this.inputKeys.includes('a')){
            this.currXSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('d')){
            this.currXSpeed = this.maxSpeed;
        } else {
            this.currXSpeed = 0;
        };

        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
    }

    resetPlayer(){
        this.x = this.game.width/2 - this.width/2;
        this.y = this.game.height/2 - this.height/2;
    }
}

