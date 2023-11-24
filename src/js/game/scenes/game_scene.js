import projectile from "../game_objects/projectile.js";
import bee from "../game_objects/bee.js";
import player from "../game_objects/player.js";
import scene from "./scene.js";

export default class game_scene extends scene {
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.currSceneIndex = currSceneIndex;

        //Instantiate GameObjects
        this.player = new player(this);

        this.projectiles = [];
        this.bees = [];
        this.buttons = [];

        this.timeBetweenProjectileSpawn = 1000;
        this.timeBetweenBeeSpawn = 2000;
        this.hasInit = false;

        this.hasReset = false;

        this.health = 3;
        this.score = 0;
    }
    init(){
        if(!this.hasInit){
            this.projectileTimer = setInterval(() => this.spawnProjectiles(), this.timeBetweenProjectileSpawn);
            this.beeTimer = setInterval(() => this.spawnBees(), this.timeBetweenBeeSpawn);
            this.hasInit = true;
        }
    }
    
    update(){
        this.init();
        this.player.update();
        for(let i = 0; i < this.projectiles.length ;i++){
            this.projectiles[i].update();
            if(this.projectiles[i].hasCollidedWithPlayer){
                this.projectiles.splice(i,1);
                this.loseHealth();
            }else if(this.projectiles[i].hasCollidedWithBullet){
                this.projectiles.splice(i,1);
                this.addScore();
            } else if(this.projectiles[i].isOutOfBounds){
                this.projectiles.splice(i,1);
            }
        }
        for(let i = 0; i < this.bees.length ;i++){
            this.bees[i].update();
            if(this.bees[i].hasCollidedWithPlayer){
                this.bees.splice(i,1);
                this.loseHealth();
            }else if(this.bees[i].hasCollidedWithBullet){
                this.bees.splice(i,1);
                this.addScore();
            } else if(this.bees[i].isOutOfBounds){
                this.bees.splice(i,1);
            }
        }
    }
    draw(){
        this.drawBackground('/src/assets/game/game_background.png');
        this.player.draw();

        this.bees.forEach(bee =>{
            bee.draw();
        });
        this.projectiles.forEach(projectile =>{
            projectile.draw();
        });
        this.drawText('center','middle','bold', '25', 'arial','Score: ' + this.score, this.width/2, 30);
        this.drawText('center','middle','bold', '25', 'arial','Health: ' + this.health, this.width/2, 60);
    }

    spawnBees(){
        this.bee = new bee(this,-50,this.randomNumGen(0,this.height - 50));
        this.bees.push(this.bee);
    }
    
    spawnProjectiles(){
        this.projectile = new projectile(this, this.randomNumGen(0,this.width - 20),-50);
        this.projectiles.push(this.projectile);
    } 

    randomNumGen(min,max){
        let ranNum = (Math.random() * max) + min;
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
        this.health = 3;
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
