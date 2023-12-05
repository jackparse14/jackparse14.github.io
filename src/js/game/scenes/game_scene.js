import projectile from "../game_objects/projectile.js";
import bee from "../game_objects/bee.js";
import frog from "../game_objects/frog.js";
import player from "../game_objects/player.js";
import smoke from "../game_objects/smoke.js";
import scene from "./scene.js";

export default class game_scene extends scene {
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.currSceneIndex = currSceneIndex;

        //Instantiate GameObjects
        this.player = new player(this);

        this.projectiles = [];
        this.bees = [];
        this.frogs = [];
        this.buttons = [];
        this.smokes = [];

        this.timeBetweenProjectileSpawn = 1000;
        this.timeBetweenBeeSpawn = 2000;
        this.timeBetweenFrogSpawn = 2000;
        this.hasInit = false;

        this.hasReset = false;

        this.health = 3000;
        this.score = 0;
    }
    init(){
        if(!this.hasInit){
            this.projectileTimer = setInterval(() => this.spawnProjectiles(), this.timeBetweenProjectileSpawn);
            this.beeTimer = setInterval(() => this.spawnBees(), this.timeBetweenBeeSpawn);
            this.frogTimer = setInterval(() => this.spawnFrogs(), this.timeBetweenFrogSpawn);
            this.hasInit = true;
        }
    }
    
    update(){
        this.init();
        this.player.update();
        for(let i = 0; i < this.smokes.length; i++){
            if(this.smokes[i].destroySelf){
                this.smokes.splice(i,1);
            }
        }
        for(let i = 0; i < this.projectiles.length ;i++){
            this.projectiles[i].update();
            if(this.projectiles[i].hasCollidedWithPlayer){
                this.spawnSmoke(this.projectiles[i].x,this.projectiles[i].y,this.projectiles[i].width,this.projectiles[i].height);
                this.projectiles.splice(i,1);
                this.loseHealth();
            }else if(this.projectiles[i].hasCollidedWithBullet){
                this.spawnSmoke(this.projectiles[i].x,this.projectiles[i].y,this.projectiles[i].width,this.projectiles[i].height);
                this.projectiles.splice(i,1);
                this.addScore();
            } else if(this.projectiles[i].isOutOfBounds){
                this.projectiles.splice(i,1);
            }
        }
        for(let i = 0; i < this.bees.length ;i++){
            this.bees[i].update();
            if(this.bees[i].hasCollidedWithPlayer){
                this.spawnSmoke(this.bees[i].x,this.bees[i].y,this.bees[i].width,this.bees[i].height);
                this.bees.splice(i,1);
                this.loseHealth();
            }else if(this.bees[i].hasCollidedWithBullet){
                this.spawnSmoke(this.bees[i].x,this.bees[i].y,this.bees[i].width,this.bees[i].height);
                this.bees.splice(i,1);
                this.addScore();
            } else if(this.bees[i].isOutOfBounds){
                this.bees.splice(i,1);
            }
        }
        for(let i = 0; i < this.frogs.length ;i++){
            this.frogs[i].update();
            if(this.frogs[i].hasCollidedWithPlayer){
                this.spawnSmoke(this.frogs[i].x,this.frogs[i].y,this.frogs[i].width,this.frogs[i].height);
                this.frogs.splice(i,1);
                this.loseHealth();
            }else if(this.frogs[i].hasCollidedWithBullet){
                this.spawnSmoke(this.frogs[i].x,this.frogs[i].y,this.frogs[i].width,this.frogs[i].height);
                this.frogs.splice(i,1);
                this.addScore();
            } else if(this.frogs[i].isOutOfBounds){
                this.frogs.splice(i,1);
            }
        }
    }
    draw(){
        this.drawBackground('/src/assets/game/game_background.png');
        this.player.draw();

        this.smokes.forEach(smoke=>{
            smoke.draw();
        });

        this.bees.forEach(bee =>{
            bee.draw();
        });
        this.projectiles.forEach(projectile =>{
            projectile.draw();
        });
        this.frogs.forEach(frog =>{
            frog.draw();
        });
        this.drawText('center','middle','bold', '25', 'arial','Score: ' + this.score, this.width/2, 30);
        this.drawText('center','middle','bold', '25', 'arial','Health: ' + this.health, this.width/2, 60);
    }

    spawnSmoke(x,y,width,height){
        this.smoke = new smoke(x,y,width,height,this);
        this.smokes.push(this.smoke);
    }

    spawnBees(){
        this.bee = new bee(this,-50,this.randomNumGen(48,(this.height - 96)),Math.round(this.randomNumGen(0,1)));
        this.bees.push(this.bee);
    }
    
    spawnProjectiles(){
        this.projectile = new projectile(this, this.randomNumGen(0,this.width - 20),-50, Math.round(this.randomNumGen(0,5)));
        this.projectiles.push(this.projectile);
    } 

    spawnFrogs(){
        this.frog = new frog(this, -50, Math.round(this.randomNumGen(0,1)),this.randomNumGen(0,(this.width/2)), this.randomNumGen(1,3.5));
        this.frogs.push(this.frog);
    }

    randomNumGen(min,max){
        let ranNum = (Math.random() * (max - min)) + min;
        return ranNum;
    }

    addScore(){
        this.score += 1;
    }

    loseHealth(){
        this.health -= 1;
        if(this.health <= 0){
            console.log("dead - change scene");
            this.currSceneIndex[0] = 2;
            this.hasReset = false;
        }
    }
    resetGame(){
        this.health = 3000;
        this.score = 0;
        this.player.resetPlayer();
        clearInterval(this.projectileTimer);
        clearInterval(this.beeTimer);
        this.projectiles = [];
        this.bees = [];
        this.player.playerBullets = [];
        this.hasInit = false;
        this.hasReset = true;
    }
}
