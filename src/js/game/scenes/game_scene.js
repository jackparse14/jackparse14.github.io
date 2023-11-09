import button from "../button.js";
import {Player} from "../game_objects/player.js";
import scene from "./scene.js";

export default class game_scene extends scene {
    constructor(width, height, context, input){
        super(width, height, context, input);

        //Instantiate GameObjects
        this.player = new Player(this);

        this.buttons = [];
    }
    update(){
        this.player.update();
    }
    draw(){
        this.drawBackground('/src/assets/game/game_background.png');
        this.player.draw();
    }
}
