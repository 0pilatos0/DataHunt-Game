export default class Canvas{
    canvas = document.createElement('canvas');
    ctx = this.canvas.getContext('2d');

    constructor(){
        this.canvas.style.width = `${window.innerWidth}px`;
        this.canvas.style.height = `${window.innerHeight}px`;
        document.body.appendChild(this.canvas);
    }

    Draw(){
        
    }

    Update(){
        
    }
}