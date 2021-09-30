import Hitbox from "./Hitbox.js";
import Tileset from "./Tileset.js";
import Transformable from "./Transformable.js";
import Vector2 from "./Vector2.js";

export default class GameObject extends Hitbox{
    static gameObjects = []
    type = null

    constructor(drawable) {
        super()
        GameObject.gameObjects.push(this)
        this.drawable = drawable
    }

    get position(){
        return this.drawable.position
    }

    set position(position){
        this.drawable.position = position
    }

    get size(){
        return this.drawable.size
    }

    set size(size){
        this.drawable.size = size
    }

    get scale(){
        return this.drawable.scale
    }

    set scale(scale){
        this.drawable.scale = scale
    }

    get rotation(){
        return this.drawable.rotation
    }

    set rotation(rotation){
        this.drawable.rotation = rotation
    }

    set color(color){
        this.drawable.color = color
    }

    get color(){
        return this.drawable.color
    }

    Draw(ctx, offset = Vector2.Zero()){
        if(!this.drawable.visible) return
        this.drawable.Draw(ctx, offset)
    }

    Update(){
        if(!this.drawable.visible) return
        super.Update()
        this.drawable.Update()
    }

    IsColliding(drawable){
        return this.drawable.IsColliding(drawable)
    }
}