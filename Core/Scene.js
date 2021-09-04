import Map from "../Map/Map.js";
import Camera from "./Camera.js";
import Rectangle from "./Drawables/Rectangle.js";
import Vector2 from "./Vector2.js";

export default class Scene{
    camera = new Camera(new Vector2(0, 0), new Vector2(window.innerWidth, window.innerHeight));
    input = []
    rectangle1 = new Rectangle(new Vector2(100, 100), new Vector2(25, 25))

    rectangle2 = new Rectangle(new Vector2(200, 200), new Vector2(50, 50))
    
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

        window.addEventListener('mousemove', (e) => {
            if(this.rectangle1.IsPointColliding(new Vector2(e.clientX, e.clientY))){
                this.rectangle1.color = '#f0f';
            }
            else{
                this.rectangle1.color = '#f00';
            }
        })

        this.rectangle2.color = '#0f0';
    }

    Draw(ctx){
        let offset = new Vector2(-this.camera.position.X, -this.camera.position.Y)
        
        if(this.map != null){
            this.map.forEach(tile => {
                if(this.IsInRange(tile)){
                    tile.Draw(ctx, offset)
                }
            });
        }

        this.rectangle2.Draw(ctx, offset)
        this.rectangle1.Draw(ctx, offset)
    }

    Update(){
        let speed = 100
        if(this.input.indexOf('w') > -1){
            //this.camera.position.Y -= speed * window.deltaTime;
            this.rectangle1.position.Y -= speed * window.deltaTime;
        }
        if(this.input.indexOf('a') > -1){
            //this.camera.position.X -= speed * window.deltaTime;
            this.rectangle1.position.X -= speed * window.deltaTime;
        }
        if(this.input.indexOf('s') > -1){
            //this.camera.position.Y += speed * window.deltaTime;
            this.rectangle1.position.Y += speed * window.deltaTime;
        }
        if(this.input.indexOf('d') > -1){
            //this.camera.position.X += speed * window.deltaTime;
            this.rectangle1.position.X += speed * window.deltaTime;
        }
        if(this.input.indexOf('e') > -1){
            //this.camera.position.Y += speed * window.deltaTime;
            this.rectangle1.rotation += speed * window.deltaTime;
        }
        if(this.input.indexOf('q') > -1){
            //this.camera.position.X += speed * window.deltaTime;
            this.rectangle1.rotation -= speed * window.deltaTime;
        }

        // if(this.rectangle1.IsColliding(this.rectangle2)){
        //     this.rectangle1.color = '#00f'
        // }
        // else{
        //     this.rectangle1.color = '#f00'
        // }
        
        this.rectangle1.color = '#f00'
        if(this.map){
            this.map.forEach(tile => {
                if(this.IsInRange(tile)){
                    if(this.rectangle1.IsColliding(tile)){
                        this.rectangle1.color = '#00f'
                    }
                }
            })
        }
    }

    IsInRange(transformable){
        if(transformable.position.X + transformable.size.X * transformable.scale.X >= this.camera.position.X &&
            transformable.position.X < this.camera.position.X + this.camera.size.X * this.camera.scale.X &&
            transformable.position.Y + transformable.size.Y * transformable.scale.Y >= this.camera.position.Y &&
            transformable.position.Y < this.camera.position.Y + this.camera.size.Y * this.camera.scale.Y){
            return true;
        }
        return false;
    }
}