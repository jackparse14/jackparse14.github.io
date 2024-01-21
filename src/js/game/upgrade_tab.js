import button from "./button.js";
export default class upgrade_tab extends button{
    constructor(x,y, canvasWidth, canvasHeight){ 
        super(x,y, "UPGRADE");
        this.backgroundColor = "#dad7cd";
        this.textColor = "#0000FF"
        this.width = (canvasWidth / 2) - 100;
        this.height = canvasHeight - 50 - y;
    }
    chooseUpgrade(){

    }
    handleClick(){
        console.log("click upgrade");
    }
}