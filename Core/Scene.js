import Map from "../Map/Map.js";
import Camera from "./Camera.js";
import Vector2 from "./Vector2.js";

export default class Scene{
    camera = new Camera(new Vector2(0, 0), new Vector2(window.innerWidth, window.innerHeight));
    input = []
    
    constructor() {
        Map.Load('../Map/Map.json').then(m => {
            this.map = m
        })

        window.addEventListener('resize', () => {
            this.camera.size = new Vector2(window.innerWidth, window.innerHeight)
        })

        window.addEventListener('keydown', (e) => {
            if(this.input.indexOf(e.key) == -1){
                this.input.push(e.key);
            }
        })

        window.addEventListener('keyup', (e) => {
            if(this.input.indexOf(e.key) > -1){
                this.input.splice(this.input.indexOf(e.key), 1);
            }
        })
    }

    Draw(ctx){
        if(this.map != null){
            this.map.forEach(tile => {
                if(tile.position.X + tile.size.X * tile.scale.X >= this.camera.position.X &&
                    tile.position.X < this.camera.position.X + this.camera.size.X * this.camera.scale.X &&
                    tile.position.Y + tile.size.Y * tile.scale.Y >= this.camera.position.Y &&
                    tile.position.Y < this.camera.position.Y + this.camera.size.Y * this.camera.scale.Y){
                    tile.Draw(ctx, new Vector2(-this.camera.position.X, -this.camera.position.Y))
                }
            });
        }
        
    }

    Update(){
        let speed = 100
        if(this.input.indexOf('w') > -1){
            this.camera.position.Y -= speed * window.deltaTime;
        }
        if(this.input.indexOf('a') > -1){
            this.camera.position.X -= speed * window.deltaTime;
        }
        if(this.input.indexOf('s') > -1){
            this.camera.position.Y += speed * window.deltaTime;
        }
        if(this.input.indexOf('d') > -1){
            this.camera.position.X += speed * window.deltaTime;
        }
    }
}