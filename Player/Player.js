import Canvas from "../Core/Canvas.js";
import Drawable from "../Core/Drawable.js";
import Sprite from "../Core/Drawables/Sprite.js";
import GameObject from "../Core/GameObject.js";

export default class Player extends GameObject {
    //input = []

    constructor(position, size) {
        super(new Sprite(position, size, './Player/Player.png'));
        // window.addEventListener('keydown', (e) => {
        //     if(this.input.indexOf(e.key) == -1){
        //         this.input.push(e.key);
        //     }
        // })

        // window.addEventListener('keyup', (e) => {
        //     if(this.input.indexOf(e.key) > -1){
        //         this.input.splice(this.input.indexOf(e.key), 1);
        //     }
        // })
    }

    Draw(ctx){
        super.Draw(ctx)
    }

    Update(){
        super.Update()
        // let speed = 100
        // if(this.input.indexOf('w') > -1){
        //     this.drawable.position.Y -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf('a') > -1){
        //     this.drawable.position.X -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf('s') > -1){
        //     this.drawable.position.Y += speed * window.deltaTime;
        // }
        // if(this.input.indexOf('d') > -1){
        //     this.drawable.position.X += speed * window.deltaTime;
        // }
    }
}