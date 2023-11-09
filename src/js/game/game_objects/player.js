export class Player {
    constructor(game){
        this.game = game;
        this.inputKeys = game.input.keys;

        this.width = 100;
        this.height = 100;
        this.x = 0;
        this.y = this.game.height - this.height;
        
        this.currYSpeed = 0;
        this.currXSpeed = 0;
        this.maxSpeed = 5;
    }
    update(){
        this.updateXAxisMovement();
        this.updateYAxisMovement();
        
    }
    updateYAxisMovement(){
        this.y += this.currYSpeed;

        if(this.inputKeys.includes('w')){
            this.currYSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('s')){
            this.currYSpeed = this.maxSpeed;
        } else {
            this.currYSpeed = 0;
        };
        
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y > this.game.height - this.height){
            this.y = this.game.height - this.height;
        }
    }
    updateXAxisMovement(){
        this.x += this.currXSpeed;

        if(this.inputKeys.includes('a')){
            this.currXSpeed = -this.maxSpeed;
        } else if(this.inputKeys.includes('d')){
            this.currXSpeed = this.maxSpeed;
        } else {
            this.currXSpeed = 0;
        };

        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > this.game.width - this.width){
            this.x = this.game.width - this.width;
        }
    }
    draw(){
        this.game.context.fillStyle = "red";
        this.game.context.fillRect(this.x,this.y, this.width, this.height);
    }
}