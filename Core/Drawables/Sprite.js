import Drawable from "../Drawable.js";
import Vector2 from "../Vector2.js";

export default class Sprite extends Drawable {
    image = document.createElement('img');
    offset = Vector2.Zero();
    animation = null;
    color = 'red'

    /**
     * 
     * @param {Vector2} position 
     * @param {Vector2} size 
     * @param {string} imageSrc 
     */
    constructor(position, size, imageSrc) {
        super();
        this.position = position;
        this.size = size;
        this.image.src = imageSrc;
    }

    Draw(ctx, offset = Vector2.Zero()){
        super.Draw(ctx)
        this.offset = offset
        ctx.save()
        //TODO add the functionality to color sprites
        // ctx.fillStyle = '#f00';
        // ctx.globalAlpha = 0.5;
        // ctx.fillRect(0, 0, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
        // ctx.globalCompositeOperation = "destination-atop";
        // ctx.globalAlpha = 1;
        ctx.drawImage(this.image, this.position.X + offset.X, this.position.Y + offset.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y)
        ctx.restore()
    }

    Update(){
        super.Update()
        if(this.animation){
            this.animation.Update()
            this.image = this.animation.frames[this.animation.activeFrame].sprite
        }
    }

    IsPointColliding(point){
        let ctx = document.createElement('canvas').getContext('2d')
        ctx.drawImage(this.image, this.position.X + this.offset.X, this.position.Y + this.offset.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
        return ctx.isPointInPath(point.X, point.Y);
    }
}