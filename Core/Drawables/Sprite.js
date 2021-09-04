import Transformable from "../Transformable.js";
import Vector2 from "../Vector2.js";

export default class Sprite extends Transformable {
    image = document.createElement('img');
    offset = Vector2.Zero();

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
        this.offset = offset
        ctx.drawImage(this.image, this.position.X + offset.X, this.position.Y + offset.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
    }

    IsPointColliding(point){
        let ctx = document.createElement('canvas').getContext('2d')
        ctx.drawImage(this.image, this.position.X + this.offset.X, this.position.Y + this.offset.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
        return ctx.isPointInPath(point.X, point.Y);
    }
}