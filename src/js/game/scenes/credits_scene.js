import navButton from "../user_interface/nav_button.js";
import scene from "./scene.js";

export default class lose_scene extends scene{
    constructor(width, height, context, input, currSceneIndex){
        super(width, height, context, input);

        this.mainMenuButton = new navButton(this.width/2 - 100,
                                            this.height/2 + 200,
                                            "Main Menu",
                                            currSceneIndex,
                                            0);
          
        this.buttons = [this.mainMenuButton];
    }
    update(){}
    draw(){
        this.context.beginPath();
        this.drawBackground('/src/assets/game/game_background.png');
        this.drawButtons();
        this.drawTitle('center','middle','','90','Plante','CREDITS', this.width/2, 60);

        this.drawText('center','middle','bold', '13' ,'arial','MAIN MENU BACKGROUND MUSIC:', this.width/2, 120);

        this.drawText('center','middle','bold', '12' ,'arial','Small Town Boy by | e s c p | https://escp-music.bandcamp.com', this.width/2, 142);
        this.drawText('center','middle','bold', '12' ,'arial','Music promoted by https://www.free-stock-music.com', this.width/2, 153);
        this.drawText('center','middle','bold', '12' ,'arial','Creative Commons / Attribution 4.0 International (CC BY 4.0)', this.width/2, 164);
        this.drawText('center','middle','bold', '12' ,'arial','https://creativecommons.org/licenses/by/4.0/', this.width/2, 175);

        this.drawText('center','middle','bold', '13' ,'arial','GAME BACKGROUND MUSIC:', this.width/2, 197);

        this.drawText('center','middle','bold', '12' ,'arial','"QUIRKY PUZZLE GAME MENU"', this.width/2, 219);
        this.drawText('center','middle','bold', '12' ,'arial','by Eric Matyas', this.width/2, 230);
        this.drawText('center','middle','bold', '12' ,'arial','www.soundimage.org', this.width/2, 241);

        this.drawText('center','middle','bold', '13' ,'arial','ART ASSETS:', this.width/2, 263);

        this.drawText('center','middle','bold', '12' ,'arial','100 Nature Things', this.width/2, 285);
        this.drawText('center','middle','bold', '12' ,'arial','by shubibubi', this.width/2, 296);
        this.drawText('center','middle','bold', '12' ,'arial','https://shubibubi.itch.io/nature-things', this.width/2, 305);

        this.drawText('center','middle','bold', '12' ,'arial','Bee-enemy-game-character', this.width/2, 327);
        this.drawText('center','middle','bold', '12' ,'arial','by bevouliin.com', this.width/2, 338);
        this.drawText('center','middle','bold', '12' ,'arial','https://opengameart.org/content/grumpy-bee-enemy-game-character', this.width/2, 349);    

        this.drawText('center','middle','bold', '12' ,'arial','"Toxic Frog"', this.width/2, 371);
        this.drawText('center','middle','bold', '12' ,'arial','by Dagon', this.width/2, 382);
        this.drawText('center','middle','bold', '12' ,'arial','https://im-dagon.itch.io/', this.width/2, 393);

        this.drawText('center','middle','bold', '12' ,'arial','Smoke Pixel Art', this.width/2, 415);
        this.drawText('center','middle','bold', '12' ,'arial','https://www.freepik.com/free-vector/pixel-art-smoke-animation-frames-game-pixel-game-smoke-cloud-pixel-smoke-video-animation-pixel-', this.width/2, 426);
        this.drawText('center','middle','bold', '12' ,'arial','smoke-illustration_13437693.htm#query=pixel%20smoke&position=0&from_view=keyword&track=ais&uuid=a391f3c9-256b-4032-8cba-f4aa3fbef008', this.width/2, 437);
        this.drawText('center','middle','bold', '12' ,'arial','Image by macrovector on Freepik', this.width/2, 448);

        this.context.closePath();
    }
};