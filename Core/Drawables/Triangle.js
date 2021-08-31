import Transformable from "../Transformable.js";

export default class Triangle extends Transformable {
    color = '#0f0';

    constructor(position, size) {
        super()
        this.position = position
        this.size = size
    }

    Draw(ctx){
        this.path = new Path2D();
        this.path.moveTo(0, 0 - this.size.Y * this.scale.Y / 2);
        this.path.lineTo(0 + this.size.X * this.scale.X / 2, 0 + this.size.Y * this.scale.Y / 2);
        this.path.lineTo(0 - this.size.X * this.scale.X / 2, 0 + this.size.Y * this.scale.Y / 2);
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.position.X, this.position.Y)
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.fill(this.path);
        ctx.restore();
    }

    IsPointColliding(point){
        let ctx = document.createElement('canvas').getContext('2d')
        ctx.translate(this.position.X, this.position.Y)
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.moveTo(0, 0 - this.size.Y * this.scale.Y / 2);
        ctx.lineTo(0 + this.size.X * this.scale.X / 2, 0 + this.size.Y * this.scale.Y / 2);
        ctx.lineTo(0 - this.size.X * this.scale.X / 2, 0 + this.size.Y * this.scale.Y / 2);
        return ctx.isPointInPath(point.X, point.Y)
    }
}