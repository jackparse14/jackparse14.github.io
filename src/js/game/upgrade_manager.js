import upgrade_tab from "../game/user_interface/upgrade_tab.js";
export default class upgrade_manager{
    constructor(game){ 
        this.headingText = null;
        this.mainText = null;
        this.upgradeIndex = null;

        this.game = game;
        this.player = game.player;
        this.upgradeTab1 = new upgrade_tab(75,50, game.width, game.height, "N/A", game);
        this.upgradeTab2 = new upgrade_tab((game.width/2) + 25,50, game.width, game.height, "N/A", game);   

        this.buttons = [this.upgradeTab1,this.upgradeTab2];
        this.buttons.forEach(button => {
            button.isActive = false;
        });
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
    handleUpgradeClick(){
        switch(this.upgradeIndex){
            case 0:
                this.handleFireRateUpgrade();
                break;
            case 1:
                this.handleDamageUpgrade();
                break;
            case 2:
                this.handleBulletUpgrade();
                break;
            case 3:
                this.handleButterflyUpgrade();
                break;
        }
    }
    handleFireRateUpgrade(){
        this.player.timeBetweenBulletSpawn /= 1.1;
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