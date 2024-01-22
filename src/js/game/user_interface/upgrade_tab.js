import button from "./button.js";
export default class upgrade_tab extends button{
    constructor(x,y, canvasWidth, canvasHeight, upgrade, game){ 
        super(x,y, upgrade);
        this.game = game;
        this.textColor = "#0000FF"
        this.fillColor = "#dad7cd";
        
        this.width = (canvasWidth / 2) - 100;
        this.height = canvasHeight - 50 - y;
    }
    chooseUpgrade(){
        
    }
    handleClick(){
        this.game.isLevelUp = false;
        this.game.unpauseGame();
    }
}