import Transformable from "./Transformable.js";
import Vector2 from "./Vector2.js";

export default class Drawable extends Transformable{
    offset = Vector2.Zero();
    points = []
    visible = true

    constructor() {
        super();
    }

    Draw(ctx){
        if(!this.visible) return
    }

    Update(){
        if(!this.visible) return
    }

    // IsColliding(drawable){
    //     if(this.position.X < drawable.position.X + drawable.size.X * drawable.scale.X &&
    //         this.position.X + this.size.X * this.scale.X > drawable.position.X &&
    //         this.position.Y < drawable.position.Y + drawable.size.Y * drawable.scale.Y &&
    //         this.position.Y + this.size.Y * this.scale.Y > drawable.position.Y){
    //             return true;
    //         }
    //     return false;
    // }
}