import Ellipse from "./Drawables/Ellipse.js";
import Line from "./Drawables/Line.js";
import Rectangle from "./Drawables/Rectangle.js";
import Triangle from "./Drawables/Triangle.js";
import Vector2 from "./Vector2.js";

export default class Canvas{
    canvas = document.createElement('canvas');
    ctx = this.canvas.getContext('2d');
    rectangle = new Rectangle(new Vector2(0, 0), new Vector2(100, 100))
    line = new Line(new Vector2(0, 0), new Vector2(100, 100))
    triangle = new Triangle(new Vector2(0, 0), new Vector2(100, 100))
    ellipse = new Ellipse(new Vector2(0, 0), new Vector2(100, 100))

    constructor(){
        this.canvas.width = `${window.innerWidth}`;
        this.canvas.height = `${window.innerHeight}`;
        this.canvas.style.imageRendering = "pixelated";
        this.canvas.style.imageRendering = "-moz-crisp-edges";
        document.body.appendChild(this.canvas);
        window.addEventListener('resize', () => {
            this.canvas.width = `${window.innerWidth}`;
            this.canvas.height = `${window.innerHeight}`;
        })

        window.addEventListener('mousemove', (e) => {
            if(this.rectangle.IsPointColliding(new Vector2(e.clientX, e.clientY))){
                this.rectangle.color = '#f0f'
            }
            else{
                this.rectangle.color = '#f00'
            }
        })
    }

    Draw(){
        this.Clear()
        this.rectangle.Draw(this.ctx)
        
        this.triangle.Draw(this.ctx)
        this.ellipse.Draw(this.ctx)
        this.line.Draw(this.ctx)
    }

    Update(){
        
    }

    Clear(){
        this.ctx.fillStyle = "#000"
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        this.ctx.fill()
    }
}