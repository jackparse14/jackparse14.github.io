export default class scene{
    constructor(width, height, context, input){
        this.width = width;
        this.height = height;
        this.context = context;
        this.input = input;

        this.background = new Image();
    }

    drawBackground(backgroundSrc){
        this.background.src = backgroundSrc;
        this.context.drawImage(this.background,0,0, this.width,this.height);
    }

    drawText(fillStyle, textAlign, textBaseline, font, text, x, y){
        this.context.fillStyle = fillStyle;
        this.context.textAlign = textAlign;
        this.context.textBaseline = textBaseline;
        this.context.font = font;
        this.context.fillText(text, x , y);
    }

    drawButtons(){
        this.buttons.forEach(button => {
            button.draw(this.context);
        });
    }
}