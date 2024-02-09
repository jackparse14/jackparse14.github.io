export default class progress_bar{
    constructor(x,y,width,height,fillColor,backgroundColor,maxProgress, isIncrease){
        this.x = x;
        this.y = y;

        this.width = width;

        // Determines whether the bar is filled or emptied
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
        // Draws the background of the bar
        context.fillStyle = this.backgroundColor;
        context.fillRect(this.x,this.y, this.width, this.height);
        //  Draws the fill of the bar
        this.drawFill(context);
    };

    drawFill(context){
        context.fillStyle = this.fillColor;
        context.fillRect(this.x,this.y, this.progressWidth, this.height);
    }

    reduceFill(reduceAmount){
        //  Finds the percentage of the bar we want to reduce by
        this.progress = reduceAmount / this.maxProgress;
        //  Reduces the bar by the progress amount
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