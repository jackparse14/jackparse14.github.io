import animatedObject from "./animated_object.js";
import playerBullet from "./player_bullet.js";

export default class Player extends animatedObject{
    constructor(width,height,game){
        super((game.width/2 - width/2),(game.height/2 - height/2), width, height,game, 15,12,7);
        this.inputKeys = game.input.keys;
        
        this.currYSpeed = 0;
        this.currXSpeed = 0;
        this.maxSpeed = 3;

        this.angleToRotate = 0;

        this.undamagedSprite = "../assets/game/butterfly-Sheet.png";
        this.damagedSprite = "../assets/game/butterfly-sheet-damaged.png";
        this.sprite.src = this.undamagedSprite;

        this.damageTimer = null;
        this.isDamagedTimerRunning = false;

        this.hasInit = false;

        this.timeBetweenAnimChange = 2;

        this.canBulletSpawn = true;
        this.timeBetweenBulletSpawn = 10;
        this.bulletSpawnProgress = 0;

        this.playerBullets = [];
    }

    startDamagedTimer(){
        if(!this.isDamagedTimerRunning){
            //  When player takes damage its spritesheet is changed to represent that
            this.sprite.src = this.damagedSprite;
            this.isDamagedTimerRunning = true;
        } else {
            clearInterval(this.damageTimer);
        }
        this.damageTimer = setInterval(() => this.changeToUndamagedSpriteSheet(), 1000);
    }

    changeToUndamagedSpriteSheet(){
        //  This changes spritesheet back to normal after a certain amount of time
        this.sprite.src = this.undamagedSprite;
        this.isDamagedTimerRunning = false;
        clearInterval(this.damageTimer);
    }

    drawSelf(){
        this.rotate();
        this.playerBullets.forEach(bullet =>{
            bullet.draw();
        });
    }
    rotate(){
        //  Saves the canvas state
        this.game.context.save();
        //  Moves canvas so we can rotate about the player
        this.game.context.translate(this.x + this.width/2,this.y + this.height/2);
        //  Rotates the canvas
        this.game.context.rotate(this.angleToRotate);
        //  Draws the player on the rotated canvas
        this.drawFrameRotate();
        if(this.currentFrame == this.maxFrame){
            this.currentFrame = 0;
        }
        //  Restores the canvas state back to normal
        this.game.context.restore();
    }
    animate(){
        if(this.animProgress > this.timeBetweenAnimChange){
            this.animProgress = 0;
            this.changeAnimationFrame();
        } else {
            this.animProgress++;
        }
    }
    update(){
        this.animate();
        this.updateRotatationAngle();
        this.updateXAxisMovement();
        this.updateYAxisMovement();
        if(this.canBulletSpawn && this.game.input.clickCoord.length != 0){
            this.spawnPlayerBullet();
        }
        if(this.canBulletSpawn == false){
            this.startSpawningBullets();
        }

        for(let i = 0;i < this.playerBullets.length;i++){
            this.playerBullets[i].update();
            //  Removes bullets when they are not needed
            if(this.playerBullets[i].hasHitEnemy || this.playerBullets[i].isOutOfBounds){
                this.playerBullets.splice(i,1);
            }
        }
    }

    updateRotatationAngle(){
        //  Finds the length of the mouse coordinates to the players coordinates
        this.mouseCoordX = this.game.input.getLastMouseXCoord();
        this.mouseCoordY = this.game.input.getLastMouseYCoord();
        var deltaX = this.mouseCoordX - this.x - this.width/2;
        var deltaY = this.mouseCoordY - this.y - this.height/2;

        //  Finds the angle needed to rotate for the player to be looking at the mouse
        this.angleToRotate = Math.atan2(deltaY,deltaX) + Math.PI/2;
    }

    startSpawningBullets(){
            if(this.bulletSpawnProgress > this.timeBetweenBulletSpawn){
                this.bulletSpawnProgress = 0;
                this.setCanBulletSpawn();
            } else {
                this.bulletSpawnProgress++;
            }
    }
    setCanBulletSpawn(){
        if(this.canBulletSpawn == false){
            this.canBulletSpawn = true;
        }
    }

    spawnPlayerBullet(){
        //  Bullet is spawned in front of player and is put into array
        this.bullet = new playerBullet(this.x + this.width/2,this.y + this.height/2, this.game);
        this.playerBullets.push(this.bullet);
        this.canBulletSpawn = false;
    }
    updateYAxisMovement(){
        this.y += this.currYSpeed;

        //  Moves player up and down
        if(this.inputKeys.includes('w')){
            this.currYSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('s')){
            this.currYSpeed = this.maxSpeed;
        } else {
            this.currYSpeed = 0;
        };
        
        //  Makes sure the player cant go out of bounds of the canvas
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y > this.game.height - this.height){
            this.y = this.game.height - this.height;
        }
    }
    updateXAxisMovement(){
        this.x += this.currXSpeed;

        //  Moves player left and right 
        if(this.inputKeys.includes('a')){
            this.currXSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('d')){
            this.currXSpeed = this.maxSpeed;
        } else {
            this.currXSpeed = 0;
        };

        //  Makes sure the player cant go out of bounds of the canvas
        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
    }

    resetPlayer(){
        //  When a new game is started player starts back in the middle of the screen
        this.x = this.game.width/2 - this.width/2;
        this.y = this.game.height/2 - this.height/2;
    }
}

