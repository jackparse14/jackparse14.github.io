import leaf from "../game_objects/leaf.js";
import bee from "../game_objects/bee.js";
import frog from "../game_objects/frog.js";
import player from "../game_objects/player.js";
import smoke from "../game_objects/smoke.js";
import scene from "./scene.js";
import progress_bar from "../user_interface/progress_bar.js";

//import upgrade_manager from "../upgrade_manager.js";
export default class game_scene extends scene {
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.currSceneIndex = currSceneIndex;

        this.player = new player(60,48,this); 
        this.health = 5;
        this.healthBar = new progress_bar((this.width/1.5) - 50,60,this.player.width,5,"#FF0000", "#dad7cd", this.health, false);

        this.exp = 0;
        this.expForLevel = 30;
        this.expPerLevelMod = 1.5;
        this.expBar = new progress_bar(0,0, this.width,10,"#0000FF","#344e41",this.expForLevel, true);

        //this.upgradeManager = new upgrade_manager(this);
        //this.upgradeManager.pickAnUpgrade(Math.floor(this.randomNumGen(0,4)));    
        //this.buttons = this.upgradeManager.buttons;
        
        this.buttons = [];

        this.isPaused = false;

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

        this.playerLevel = 1;
    }
    startSpawningEnemies(){
        //  Starts the timers for spawning enemies
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
        //  Makes the health bar follow the player
        this.healthBar.x = this.player.x - (this.healthBar.width - this.player.width)/2;
        this.healthBar.y = this.player.y + this.player.height + 10;
        
        this.updateSmokes();
        this.updateEnemies(this.leaves);
        this.updateEnemies(this.frogs);
        this.updateEnemies(this.bees);
    }
    updateSmokes(){
        for(let i = 0; i < this.smokes.length; i++){
            this.smokes[i].update();
            if(this.smokes[i].destroySelf){
                this.smokes.splice(i,1);
            }
        }
    }
    updateEnemies(enemyArray){
        for(let i = 0; i < enemyArray.length; i++){
            enemyArray[i].update();
            if(enemyArray[i].hasCollidedWithPlayer){
                //  When an enemy collides with the player it is removed from the game and a smoke is spawned
                this.spawnSmoke(enemyArray[i].x,enemyArray[i].y,enemyArray[i].width,enemyArray[i].height);
                enemyArray.splice(i,1);
                //  The player loses health
                this.loseHealth();
            }else if(enemyArray[i].hasCollidedWithBullet){
                enemyArray[i].hasCollidedWithBullet = false;
                //  Enemy loses health when it collides with a bullet
                enemyArray[i].loseHealth();
                //  Checks if the enemy is dead
                if(enemyArray[i].isDead){
                    //  Removes enemy, spawns a smoke, adds score and exp
                    this.spawnSmoke(enemyArray[i].x,enemyArray[i].y,enemyArray[i].width,enemyArray[i].height);
                    this.addScore(enemyArray[i].score);
                    this.addExp(enemyArray[i].exp);
                    enemyArray.splice(i,1);
                }
            } else if(enemyArray[i].isOutOfBounds){
                // If an enemy goes off the screen it is removed from the game
                enemyArray.splice(i,1);
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
        this.drawText('center','middle','bold', '25', 'arial','Score: ' + this.score + " (x" + this.playerLevel + ")", this.width/2, 30);
        this.healthBar.draw(this.context);
        this.expBar.draw(this.context);
        this.drawText('center','middle','bold', '25', 'arial','Level: ' + this.playerLevel, 60, 30);

        /*if(this.isLevelUp){
            this.pauseGame();
            this.upgradeManager.buttons.forEach(button=>{
                button.isActive = true;
                button.draw(this.context);
            });
        }*/
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
        this.frog = new frog(this, -50, Math.round(this.randomNumGen(0,1)),this.randomNumGen(0,(this.width/2)), this.randomNumGen(3,14));
        this.frogs.push(this.frog);
    }

    //  Returns a random number within min and max constraints
    randomNumGen(min,max){
        let ranNum = (Math.random() * (max - min)) + min;
        return ranNum;
    }

    addExp(addedEXP){
        this.exp += addedEXP;
        this.expBar.increaseFill(addedEXP);
        if(this.exp >= this.expForLevel){
            //  If the amount of exp collected is more than exp needed then level up
            this.levelUp();
            this.expBar.resetBar();
        }
    }

    levelUp(){
        //  Makes it harder to level up each time you level up
        this.expForLevel *= this.expPerLevelMod;
        this.expBar.maxProgress = this.expForLevel;
        this.exp = 0;
        this.playerLevel++;

        //  Makes enemies spawn quicker
        this.timeBetweenProjectileSpawn /= 1.1;
        this.timeBetweenBeeSpawn /= 1.1;
        this.timeBetweenFrogSpawn /= 1.1;
    }

    addScore(scoreToAdd){
        this.score += scoreToAdd;
    }
    loseHealth(){
        this.player.startDamagedTimer();
        //  Reduces health
        this.healthBar.reduceFill(1);
        this.health -= 1;
        if(this.health <= 0){
            //  If player has no health then the score is calculated and the game ends
            this.score *= this.playerLevel;
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
        this.health = 5;
        this.playerLevel = 1;
        this.expForLevel = 30;
        this.healthBar.resetBar();
        this.expBar.resetBar();
        this.score = 0;
        this.player.resetPlayer();
        this.leaves = [];
        this.bees = [];
        this.frogs = [];
        this.player.playerBullets = [];
        this.hasInit = false;
        this.hasReset = true;

        this.timeBetweenProjectileSpawn = 50;
        this.projectileSpawnProgress = 0;

        this.timeBetweenBeeSpawn = 100;
        this.beeSpawnProgress = 0;

        this.timeBetweenFrogSpawn = 100;
        this.frogSpawnProgress = 0;
    }
}
