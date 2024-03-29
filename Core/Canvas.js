import Player from "../Player/Player.js";
import Ellipse from "./Drawables/Ellipse.js";
import Line from "./Drawables/Line.js";
import Rectangle from "./Drawables/Rectangle.js";
import Sprite from "./Drawables/Sprite.js";
import Triangle from "./Drawables/Triangle.js";
import Scene from "./Scene.js";
import Vector2 from "./Vector2.js";

export default class Canvas{
    canvas = document.createElement('canvas');
    ctx = this.canvas.getContext('2d');
    // rectangle = new Rectangle(new Vector2(0, 0), new Vector2(100, 100));
    // line = new Line(new Vector2(0, 0), new Vector2(100, 100));
    // triangle = new Triangle(new Vector2(0, 0), new Vector2(100, 100));
    // ellipse = new Ellipse(new Vector2(0, 0), new Vector2(100, 100));
    // image = new Sprite(new Vector2(0, 0), new Vector2(500, 500));
    //player = new Player(new Vector2(100, 100), new Vector2(100, 100));
    scenes = []

    constructor(){
        document.body.appendChild(this.canvas);
        this.#Init()
        window.addEventListener('resize', () => {
            this.#Init()
        })
        
        this.scenes.push(new Scene())
    }

    #Init(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.font = '48px serif';
        this.ctx.imageSmoothingEnabled = false;
    }

    Draw(){
        this.Clear();
        // this.rectangle.Draw(this.ctx);
        // this.triangle.Draw(this.ctx);
        // this.ellipse.Draw(this.ctx);
        // this.line.Draw(this.ctx);
        // this.image.Draw(this.ctx);
        this.scenes.forEach(s => {
            s.Draw(this.ctx)
        })
        //this.player.Draw(this.ctx);
    }

    Update(){
        //this.player.Update();
        this.scenes.forEach(s => {
            s.Update()
        })
    }

    Clear(){
        this.ctx.fillStyle = "#000";
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.ctx.fill();
    }
}