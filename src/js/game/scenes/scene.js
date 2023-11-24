export default class scene{
    constructor(width, height, context, input){
        this.width = width;
        this.height = height;
        this.context = context;
        this.input = input;

        this.textColor = "#344E41";
        this.fillColor = "#dad7cd";

        this.background = new Image();

        this.titleFont = new FontFace("Plante", "/src/assets/game/fonts/Plante.ttf");
    }

    drawBackground(backgroundSrc){
        this.background.src = backgroundSrc;
        this.context.drawImage(this.background,0,0, this.width,this.height);
    }

    drawText(textAlign, textBaseline,fontDec,fontSize, font, text, x, y){
        this.context.fillStyle = this.textColor;
        this.context.textAlign = textAlign;
        this.context.textBaseline = textBaseline;
        this.context.font = fontDec + " " + fontSize + "px " + font;
        this.context.fillText(text, x , y);
    }
    drawTitle(textAlign, textBaseline,fontDec,fontSize, font, text, x, y){
        this.context.fillStyle = this.fillColor;
        this.context.fillRect(0,y - (fontSize/2), this.width, fontSize);
        this.drawText(textAlign, textBaseline,fontDec,fontSize, font, text, x, y);
    }

    drawButtons(){
        this.buttons.forEach(button => {
            button.draw(this.context);
        });
    }
}