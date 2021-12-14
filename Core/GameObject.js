import Drawable from "./Drawable.js";
import Hitbox from "./Hitbox.js";
import Tileset from "./Tileset.js";
import Transformable from "./Transformable.js";
import Vector2 from "./Vector2.js";

export default class GameObject extends Hitbox{
    static gameObjects = []
    type = null

    /**
     * 
     * @param {Drawable} drawable 
     */
    constructor(drawable) {
        super(drawable.position, drawable.size)
        GameObject.gameObjects.push(this)
        this.drawable = drawable
        // this.On('sC', (gameObject) => {
        //     gameObject.visible = false
        // })

        // this.On('C', (gameObject) => {
        //     gameObject.visible = false
        // })

        // this.On('eC', (gameObject) => {
        //     gameObject.visible = true
        // })
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

    get visible(){
        return this.drawable.visible
    }

    set visible(visible){
        this.drawable.visible = visible
    }

    Draw(ctx, offset = Vector2.Zero()){
        if(!this.drawable) return
        if(!this.drawable.visible) return
        this.drawable.Draw(ctx, offset)
    }

    Update(){
        super.Update()
        if(!this.drawable) return
        if(!this.drawable.visible) return
        this.drawable.Update()
    }
}