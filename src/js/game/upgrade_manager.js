import upgrade_tab from "../user_interface/upgrade_tab.js";
export default class upgrade_manager{
    constructor(game){ 
        this.headingText = null;
        this.mainText = null;
        this.upgradeIndex = null;

        this.game = game;
        this.player = game.player;
        this.upgradeTab1 = new upgrade_tab(75,50, this.width, this.height, this.upgradeManager.upgrades[0].headingText, this);
        this.upgradeTab2 = new upgrade_tab((this.width/2) + 25,50, this.width, this.height, this.upgrades[0].headingText, this);
    }
    pickAnUpgrade(rand){
        this.upgradeIndex = rand;
        switch(rand){
            case 0:
                this.headingText = "FIRE RATE";
                this.mainText = "Doubles the rate in which the butterfly shoots!";
                break;
            case 1:
                this.headingText = "DAMAGE";
                this.mainText = "Doubles the butterfly's damage!";
                break;
            case 2:
                this.headingText = "BULLET";
                this.mainText = "Doubles the size of the butterfly's bullets!";
                break;
            case 3:
                this.headingText = "BUTTERFLY";
                this.mainText = "Halves the size of the butterfly!";
                break;
        }
    }
    handleFireRateUpgrade(){
        this.player.timeBetweenBulletSpawn /= 2;
        console.log(this.player.timeBetweenBulletSpawn);
        console.log("FIRE RATE");
    }
    handleDamageUpgrade(){
        console.log("DAMAGE");
    }
    handleBulletUpgrade(){
        for(let i;i < this.player.playerBullets.length ;i++){
            this.player.playerBullets[i].width /= 2;
            this.player.playerBullets[i].height /= 2;
        }
        console.log("BULLET");
    }
    handleButterflyUpgrade(){
        this.player.width /= 2;
        this.player.height /=2;
        console.log("BUTTERFLY");
    }
}