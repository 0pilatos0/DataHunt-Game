import Transformable from "../Transformable.js";
import Vector2 from "../Vector2.js";

export default class Sprite extends Transformable {
    image = document.createElement('img');

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
        ctx.drawImage(this.image, this.position.X + offset.X, this.position.Y + offset.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
    }
}