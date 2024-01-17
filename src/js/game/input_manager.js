export default class input_manager{
    constructor(canvas){
        this.keys = [];
        this.clickCoord = [];
        this.mouseXCoord = null;
        this.mouseYCoord = null;

        this.clickTimer = null;
        

        window.addEventListener('keydown', e => {
            if((e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === '/') && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        })
        window.addEventListener('keyup', e => {
            if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === '/'){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
        canvas.addEventListener('mousedown', e => {
            this.clickCoord.push(e.pageX - (canvas.clientLeft + canvas.offsetLeft));
            this.clickCoord.push(e.pageY - (canvas.clientTop + canvas.offsetTop));
            this.clickTimer = setInterval(()=> this.clearClickCoord(), 2000);
            console.log("start timer");
        })
        canvas.addEventListener('mouseup', e => {
            clearInterval(this.clickTimer);
            this.clearClickCoord();
        })
        canvas.addEventListener("mousemove", e =>{
            this.mouseXCoord = e.pageX - (canvas.clientLeft + canvas.offsetLeft);
            this.mouseYCoord = e.pageY - (canvas.clientTop + canvas.offsetTop);
        })
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