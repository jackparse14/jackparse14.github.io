export default class progress_bar{
    constructor(x,y,width,height,fillColor,backgroundColor,maxProgress, isIncrease){
        this.x = x;
        this.y = y;

        this.width = width;

        
        if(isIncrease){
            this.progressWidth = 0;
            this.startingWidth = 0;
        }else{
            this.progressWidth = width;
            this.startingWidth = width;
        }
        
        this.height = height;

        this.fillColor = fillColor;
        this.backgroundColor = backgroundColor;

        this.progress = 0;
        this.maxProgress = maxProgress;


    };
    draw(context){
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.x,this.y, this.width, this.height);
        this.drawFill(context);
        /*context.lineWidth = 2;
        context.strokeStyle = this.fillColor;
        context.rect(this.x,this.y,this.width,this.height);*/
    };

    drawFill(context){
        context.fillStyle = this.fillColor;
        context.fillRect(this.x,this.y, this.progressWidth, this.height);
    }

    reduceFill(reduceAmount){
        this.progress = reduceAmount / this.maxProgress;
        this.progressWidth -= this.startingWidth * this.progress;
    }
    increaseFill(increaseAmount){
        this.progress = increaseAmount / this.maxProgress;
        this.progressWidth += this.width * this.progress;
    }

    resetBar(){
        this.progressWidth = this.startingWidth;
    }
}