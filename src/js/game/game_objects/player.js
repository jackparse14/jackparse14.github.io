import playerBullet from "./player_bullet.js";

export default class Player {
    constructor(game){
        this.game = game;
        this.inputKeys = game.input.keys;

        this.width = 60;
        this.height = 48;
        this.x = this.game.width/2 - this.width/2;
        this.y = this.game.height/2 - this.height/2;
        
        this.currYSpeed = 0;
        this.currXSpeed = 0;
        this.maxSpeed = 1;

        this.sprite = new Image();
        this.sprite.src = "/src/assets/game/butterfly.png";

        this.canBulletSpawn = true;
        this.timeBetweenBulletSpawn = 1000;
        this.playerBullets = [];
    }

    draw(){
        this.game.context.strokeStyle = "White";
        this.game.context.strokeRect(this.x,this.y,this.width,this.height);
        this.rotate();
        this.playerBullets.forEach(bullet =>{
            bullet.draw();
        });
    }
    drawSelf(){
        this.game.context.drawImage(this.sprite,-this.x - this.width,-this.y, this.width,this.height);
    }
    
    rotate(){
        this.game.context.save();
        this.game.context.translate(this.x + this.width/2,this.y + this.height/2);
        this.game.context.rotate(Math.PI/2);
        this.drawSelf();
        this.game.context.restore();
    }

    update(){
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
