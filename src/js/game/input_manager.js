export default class input_manager{
    constructor(canvas){
        this.isActive = true;
        this.keys = [];
        this.clickCoord = [];
        this.mouseXCoord = null;
        this.mouseYCoord = null;
        
        
            window.addEventListener('keydown', e => {
                if(!this.isActive){return;};
                //  When a key is pressed if it is WASD it gets added to the keys array if the key hasn't already been added
                if((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
            })
            window.addEventListener('keyup', e => {
                if(!this.isActive){return;};
                //  Removes key from keys array when the key has stopped being pressed
                if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'){
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }   
            })
            canvas.addEventListener('mousedown', e => {
                //  When mouse is clicked the coordinates of the click are added to the clickCoord array
                this.clickCoord.push(e.pageX - (canvas.clientLeft + canvas.offsetLeft));
                this.clickCoord.push(e.pageY - (canvas.clientTop + canvas.offsetTop));
            })
            canvas.addEventListener('mouseup', e => {
                //  Clears the clickCoord array when mouse click has stopped
                this.clearClickCoord();
            })
            canvas.addEventListener("mousemove", e =>{
                if(!this.isActive){return;};
                //  When the mouse is moved at anypoint this saves the coordinates of the mouse at its most recent position
                this.mouseXCoord = e.pageX - (canvas.clientLeft + canvas.offsetLeft);
                this.mouseYCoord = e.pageY - (canvas.clientTop + canvas.offsetTop);
            })
        
    }   
    pauseInput(){ 
        this.isActive = false;
    }
    unpauseInput(){
        this.isActive = true;
    }
    startInput(){
        this.isActive = true;
    }
    clearClickCoord(){
        this.clickCoord = [];
    }
    getLastMouseXCoord(){
        return this.mouseXCoord;
    }
    getLastMouseYCoord(){
        return this.mouseYCoord;
    }
}