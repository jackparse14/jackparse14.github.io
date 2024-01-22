export default class input_manager{
    constructor(canvas){
        this.isActive = true;
        this.keys = [];
        this.clickCoord = [];
        this.mouseXCoord = null;
        this.mouseYCoord = null;
        
        
            window.addEventListener('keydown', e => {
                if(!this.isActive){return;};
                if((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === '/') && this.keys.indexOf(e.key) === -1){
                    this.keys.push(e.key);
                }
                
            })
            window.addEventListener('keyup', e => {
                if(!this.isActive){return;};
                if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === '/'){
                    this.keys.splice(this.keys.indexOf(e.key), 1)
                }   
            })
            canvas.addEventListener('mousedown', e => {
                //if(!this.isActive){return;};
                this.clickCoord.push(e.pageX - (canvas.clientLeft + canvas.offsetLeft));
                this.clickCoord.push(e.pageY - (canvas.clientTop + canvas.offsetTop));
            })
            canvas.addEventListener('mouseup', e => {
                //if(!this.isActive){return;};
                this.clearClickCoord();
            })
            canvas.addEventListener("mousemove", e =>{
                if(!this.isActive){return;};
                
                this.mouseXCoord = e.pageX - (canvas.clientLeft + canvas.offsetLeft);
                this.mouseYCoord = e.pageY - (canvas.clientTop + canvas.offsetTop);
            })
        
    }   
    pauseInput(){ 
        console.log("pause input");
        this.isActive = false;
    }
    unpauseInput(){
        console.log("unpause input");
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