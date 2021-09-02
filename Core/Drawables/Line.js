import Drawable from "../Drawable.js";
import Vector2 from "../Vector2.js";

export default class Line extends Drawable {
    color = '#fff';

    constructor(start, end) {
        super()
        this.position = start;
        let distance = Math.sqrt(Math.pow(start.X - end.X, 2) + Math.pow(start.Y - end.Y, 2));
        this.rotation = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
        this.size = new Vector2(distance, 1);
        this.end = end;
    }

    Draw(ctx){
        this.path = new Path2D();
        this.path.moveTo(this.position.X, this.position.Y);
        this.path.lineTo(this.end.X, this.end.Y);
        ctx.strokeStyle = this.color;
        ctx.stroke(this.path);
    }

    IsPointColliding(point){
        let ctx = document.createElement('canvas').getContext('2d')
        ctx.moveTo(this.position.X, this.position.Y);
        ctx.lineTo(this.end.X, this.end.Y);
        return ctx.isPointInStroke(point.X, point.Y);
    }
}