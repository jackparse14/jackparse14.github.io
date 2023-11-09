export default class input_manager{
    constructor(canvas){
        this.keys = [];
        this.clickCoord = [];

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
            
        })
        canvas.addEventListener('mouseup', e => {
            this.clickCoord = [];
        })
    }
}