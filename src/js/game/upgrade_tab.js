import button from "./button.js";
export default class upgrade_tab extends button{
    constructor(x, canvasWidth){ 
        super(x,100, "UPGRADE");
        this.backgroundColor = "#dad7cd";
        this.width = (canvasWidth / 2);
        this.height = 100;
    }
    handleClick(){
        console.log("click upgrade");
    }
}