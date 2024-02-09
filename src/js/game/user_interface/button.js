export default class button{
    constructor(x,y, text){
        this.x = x;
        this.y = y;

        this.isActive = true;

        this.text = text;
    }
    draw(context){
        context.fillStyle = this.fillColor;
        context.fillRect(this.x,this.y, this.width, this.height);

        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = this.textColor;
        context.rect(this.x,this.y,this.width,this.height);
        context.stroke();
        context.closePath();

        context.fillStyle = this.textColor;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold 25px arial';
        context.fillText(this.text, this.x + this.width/2 , this.y + this.height/2 , this.width);
    }

    isClickInBounds(clickCoord){
        if(this.isActive){  
            //  If the users click is within the coordinates of the button returns true
            if(clickCoord[0] < this.x || clickCoord[0] > this.x + this.width || clickCoord[1] < this.y || clickCoord[1] > this.y + this.height){
                return false;
            }else{
                return true;
            }
        }
    }
    
}