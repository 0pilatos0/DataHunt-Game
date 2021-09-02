import Transformable from "../Transformable.js";

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

    Draw(ctx){
        ctx.drawImage(this.image, this.position.X, this.position.Y, this.size.X * this.scale.X, this.size.Y * this.scale.Y);
    }
}