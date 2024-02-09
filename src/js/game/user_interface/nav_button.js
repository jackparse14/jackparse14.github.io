import button from "./button.js";
export default class nav_button extends button{
    constructor(x,y, text, currSceneIndex, nextSceneIndex){
        super(x,y, text)

        this.width = 200;
        this.height = 50;

        this.fillColor = "#dad7cd";
        this.textColor = "#344E41";

        this.nextSceneIndex = nextSceneIndex;
        this.currSceneIndex = currSceneIndex;
    }

    handleClick(){
        //  Changes the scene when clicked
        this.currSceneIndex[0] = this.nextSceneIndex;
    }
}