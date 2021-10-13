import Drawable from "../Drawable.js";
import Vector2 from "../Vector2.js";

export default class Ellipse extends Drawable {
    color = '#00f';

    constructor(position, size) {
        super();
        this.position = position;
        this.size = size;
    }

    Draw(ctx, offset = Vector2.Zero()){
        super.Draw(ctx)
        this.offset = offset
        this.path = new Path2D();
        this.path.ellipse(this.position.X + offset.X + this.size.X * this.scale.X / 2, this.position.Y + offset.Y + this.size.Y * this.scale.Y / 2, this.size.X * this.scale.X / 2, this.size.Y * this.scale.Y / 2, this.rotation * Math.PI / 180, 0, 360);
        ctx.fillStyle = this.color;
        ctx.fill(this.path);
    }

    IsPointColliding(point){
        let ctx = document.createElement('canvas').getContext('2d');
        ctx.ellipse(this.position.X + this.offset.X + this.size.X * this.scale.X / 2, this.position.Y + this.offset.Y + this.size.Y * this.scale.Y / 2, this.size.X * this.scale.X / 2, this.size.Y * this.scale.Y / 2, this.rotation * Math.PI / 180, 0, 360);
        return ctx.isPointInPath(point.X, point.Y);
    }
}