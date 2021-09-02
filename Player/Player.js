import Canvas from "../Core/Canvas.js";
import Drawable from "../Core/Drawable.js";
import Sprite from "../Core/Drawables/Sprite.js";

export default class Player extends Drawable {
    input = []

    constructor(position, size) {
        super();
        this.position = position;
        this.size = size;
        this.sprite = new Sprite(this.position, this.size, './Player/Player.png');
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
        this.sprite.Draw(ctx);
    }

    Update(){
        let speed = 100
        if(this.input.indexOf('w') > -1){
            this.sprite.position.Y -= speed * window.deltaTime;
        }
        if(this.input.indexOf('a') > -1){
            this.sprite.position.X -= speed * window.deltaTime;
        }
        if(this.input.indexOf('s') > -1){
            this.sprite.position.Y += speed * window.deltaTime;
        }
        if(this.input.indexOf('d') > -1){
            this.sprite.position.X += speed * window.deltaTime;
        }
    }
}