import leaf from "../game_objects/leaf.js";
import bee from "../game_objects/bee.js";
import frog from "../game_objects/frog.js";
import player from "../game_objects/player.js";
import smoke from "../game_objects/smoke.js";
import scene from "./scene.js";
import progress_bar from "../user_interface/progress_bar.js";

import upgrade_manager from "../upgrade_manager.js";
export default class game_scene extends scene {
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.currSceneIndex = currSceneIndex;

        //Instantiate GameObjects
        this.player = new player(60,48,this); 
        this.health = 30;
        this.healthBar = new progress_bar((this.width/2) - 50,60,this.player.width,10,"#FF0000", "#dad7cd", this.health, false);

        this.exp = 0;
        this.expForLevel = 30;
        this.expPerLevelMod = 1.5;
        this.expBar = new progress_bar(0,0, this.width,10,"#0000FF","#344e41",this.expForLevel, true);

        this.upgradeManager = new upgrade_manager(this);
        this.upgradeManager.pickAnUpgrade(Math.floor(this.randomNumGen(0,4)));    
        
        this.buttons = this.upgradeManager.buttons;

        this.isPaused = false;
        this.isLevelUp = false;

        this.leaves = [];
        this.bees = [];
        this.frogs = [];
        
        this.smokes = [];

        this.timeBetweenProjectileSpawn = 50;
        this.projectileSpawnProgress = 0;

        this.timeBetweenBeeSpawn = 100;
        this.beeSpawnProgress = 0;

        this.timeBetweenFrogSpawn = 100;
        this.frogSpawnProgress = 0;

        this.hasInit = false;

        this.hasReset = false;

        
        this.score = 0;
        
        

        this.playerLevel = 0;
    }
    startSpawningEnemies(){
        if(this.projectileSpawnProgress > this.timeBetweenProjectileSpawn){
            this.projectileSpawnProgress = 0;
            this.spawnProjectiles();
        } else {
            this.projectileSpawnProgress++;
        }

        if(this.beeSpawnProgress > this.timeBetweenBeeSpawn){
            this.beeSpawnProgress = 0;
            this.spawnBees();
        } else {
            this.beeSpawnProgress++;
        }

        if(this.frogSpawnProgress > this.timeBetweenFrogSpawn){
            this.frogSpawnProgress = 0;
            this.spawnFrogs();
        } else {
            this.frogSpawnProgress++;
        }
    }
    update(){
        if(this.isPaused){return;};
        this.startSpawningEnemies();
        this.player.update();
        this.healthBar.x = this.player.x - (this.healthBar.width - this.player.width)/2;
      
        this.healthBar.y = this.player.y + this.player.height + 10;
        for(let i = 0; i < this.smokes.length; i++){
            this.smokes[i].update();
            if(this.smokes[i].destroySelf){
                this.smokes.splice(i,1);
            }
        }
        for(let i = 0; i < this.leaves.length ;i++){
            this.leaves[i].update();
            if(this.leaves[i].hasCollidedWithPlayer){
                this.spawnSmoke(this.leaves[i].x,this.leaves[i].y,this.leaves[i].width,this.leaves[i].height);
                this.leaves.splice(i,1);
                this.loseHealth();
                this.loseScore();
            }else if(this.leaves[i].hasCollidedWithBullet){
                this.spawnSmoke(this.leaves[i].x,this.leaves[i].y,this.leaves[i].width,this.leaves[i].height);
                this.leaves.splice(i,1);
                this.addScore();
                this.addExp();
            } else if(this.leaves[i].isOutOfBounds){
                this.leaves.splice(i,1);
            }
        }
        for(let i = 0; i < this.bees.length ;i++){
            this.bees[i].update();
            if(this.bees[i].hasCollidedWithPlayer){
                this.spawnSmoke(this.bees[i].x,this.bees[i].y,this.bees[i].width,this.bees[i].height);
                this.bees.splice(i,1);
                this.loseHealth();
                this.loseScore();
            }else if(this.bees[i].hasCollidedWithBullet){
                this.spawnSmoke(this.bees[i].x,this.bees[i].y,this.bees[i].width,this.bees[i].height);
                this.bees.splice(i,1);
                this.addScore();
                this.addExp();
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
                this.loseScore();
            }else if(this.frogs[i].hasCollidedWithBullet){
                this.spawnSmoke(this.frogs[i].x,this.frogs[i].y,this.frogs[i].width,this.frogs[i].height);
                this.frogs.splice(i,1);
                this.addScore();
                this.addExp();
            } else if(this.frogs[i].isOutOfBounds){
                this.frogs.splice(i,1);
            }
        }
    }
    draw(){
        this.drawBackground('/src/assets/game/game_background.png');
        this.player.drawSelf();

        this.smokes.forEach(smoke=>{
            smoke.drawSelf();
        });

        this.bees.forEach(bee =>{
            bee.drawFrame();
        });
        this.leaves.forEach(leaf =>{
            leaf.draw();
        });
        this.frogs.forEach(frog =>{
            frog.drawSelf();
        });
       this.drawUI();
    }
    drawUI(){
        this.drawText('center','middle','bold', '25', 'arial','Score: ' + this.score, this.width/2, 30);
        this.healthBar.draw(this.context);
        this.expBar.draw(this.context);
        this.drawText('center','middle','bold', '25', 'arial','Level: ' + this.playerLevel, this.width/2, 120);

        if(this.isLevelUp){
            this.pauseGame();
            this.upgradeManager.buttons.forEach(button=>{
                button.isActive = true;
                button.draw(this.context);
            });
        }
    }

    spawnSmoke(x,y,width,height){
        this.smoke = new smoke(x,y,width,height,this);
        this.smokes.push(this.smoke);
    }

    spawnBees(){
        if(this.isPaused){return;};
        this.bee = new bee(this,-50,this.randomNumGen(48,(this.height - 96)),Math.round(this.randomNumGen(0,1)));
        this.bees.push(this.bee);
    }
    
    spawnProjectiles(){
        if(this.isPaused){return;};
        this.projectile = new leaf(this, this.randomNumGen(0,this.width - 20),-50, Math.round(this.randomNumGen(0,5)));
        this.leaves.push(this.projectile);
    } 

    spawnFrogs(){
        if(this.isPaused){return;};
        this.frog = new frog(this, -50, Math.round(this.randomNumGen(0,1)),this.randomNumGen(0,(this.width/2)), this.randomNumGen(1,3.5));
        this.frogs.push(this.frog);
    }

    chooseUpgrade(){

    }

    randomNumGen(min,max){
        let ranNum = (Math.random() * (max - min)) + min;
        return ranNum;
    }

    addExp(){
        this.exp += 10;
        this.expBar.increaseFill(10);
        if(this.exp >= this.expForLevel){
            this.levelUp();
            this.expBar.resetBar();
        }
    }

    levelUp(){
        this.expForLevel *= this.expPerLevelMod;
        this.expBar.maxProgress = this.expForLevel;
        this.exp = 0;
        this.playerLevel++;
        this.isLevelUp = true;
    }

    addScore(){
        this.score += 1;
    }
    loseScore(){
        if(this.score > 0 ){
            this.score -= 1;
        }
    }

    loseHealth(){
        this.player.startDamagedTimer();
        this.healthBar.reduceFill(1);
        this.health -= 1;
        if(this.health <= 0){
            this.currSceneIndex[0] = 2;
            this.hasReset = false;
        }
    }
    pauseGame(){
        if(!this.isPaused){
            this.input.pauseInput();
            this.isPaused = true;
        }
    }
    unpauseGame(){
        if(this.isPaused){
            this.input.unpauseInput();
            this.isPaused = false;
        }
    }
    resetGame(){
        this.health = 30;
        this.healthBar.resetBar();
        this.expBar.resetBar();
        this.score = 0;
        this.player.resetPlayer();
        this.leaves = [];
        this.bees = [];
        this.player.playerBullets = [];
        this.hasInit = false;
        this.hasReset = true;
    }
}
