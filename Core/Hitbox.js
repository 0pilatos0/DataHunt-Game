import Scene from "./Scene.js";
import Event from "./Event.js";
import GameObject from "./GameObject.js";
import Vector2 from "./Vector2.js";

export default class Hitbox extends Event {
    #states = ['STARTED', 'COLLIDING', 'ENDED']
    #oldColliders = []

    /**
     * 
     * @param {Vector2} hitboxPosition 
     * @param {Vector2} hitboxSize 
     */
    constructor(hitboxPosition, hitboxSize){
        super()
        this.hitboxPosition = hitboxPosition
        this.hitboxSize = hitboxSize
    }

    Update() {
        // GameObject.gameObjects.map(gameObject => {
        //     if(gameObject == this) return
        //     if(!this.#InCameraRange(gameObject)){
        //         //if(this.startedCollisionBy === gameObject) this.startedCollisionBy = null
        //         // gameObject.Trigger('eC')
        //         return
        //     }
        //     else{
        //         let colliding = this.#Colliding(gameObject)
        //         if(colliding){ // && this.#state == this.#states[2] && this.startedCollisionBy == null
        //             //this.startedCollisionBy = gameObject
        //             //gameObject.startedCollisionBy = this
        //             gameObject.Trigger('sC')
        //         }
        //         else{
        //             gameObject.Trigger('eC')
        //         }
        //         //if(this.startedCollisionBy == gameObject){
        //             // if (colliding) {
        //             //     if(this.#oldState === this.#states[2]) 
        //             //         this.#state = this.#states[0]
        //             //     if(this.#oldState === this.#states[0]) 
        //             //         this.#state = this.#states[1]
        //             // }else {
        //             //     //if(this.#oldState === this.#states[0] || this.#oldState === this.#states[1]){
        //             //         this.#state = this.#states[2]
        //             //         //console.log("?")
        //             //         gameObject.Trigger('eC', this)
        //             //         //this.startedCollisionBy = null
        //             //     //}  
        //             // }   
        //         //}
        //     }
        // })
        // switch (this.#state) {
        //     case this.#states[0]:
        //         this.Trigger('sC', this.startedCollisionBy)
        //         break;
        //     case this.#states[1]:
        //         this.Trigger('C', this.startedCollisionBy)
        //         break;
        //     case this.#states[2]:
        //         //this.#oldState !== this.#state
        //             this.Trigger('eC', this.startedCollisionBy)
        //         break;
        //     default:
        //         break;
        // }
        // if(this.#oldState !== this.#state)
        //     this.#oldState = this.#state
        if(this.type != "Collidable") return
        let colliders = []
        GameObject.gameObjects.map(gameObject => {
            if(gameObject.type != "Collidable") return
            if(gameObject == this) return
            if(!this.#InCameraRange(gameObject)){
                if(this.#oldColliders.indexOf(gameObject) > -1)
                    this.Trigger('eC', gameObject)
                return
            }
            let colliding = this.#Colliding(gameObject)
            if(colliding) colliders.push(gameObject)
            else{
                if(this.#oldColliders.indexOf(gameObject) > -1)
                    this.Trigger('eC', gameObject)  
            }
        })
        colliders.map(gameObject => {
            gameObject.state = this.#oldColliders[this.#oldColliders.indexOf(gameObject)]?.state || this.#states[0]
            gameObject.oldState = this.#oldColliders[this.#oldColliders.indexOf(gameObject)]?.oldState || this.#states[2]

            if(gameObject.oldState == this.#states[0])
                gameObject.state = this.#states[1]

            switch (gameObject.state) {
                case this.#states[0]:
                    this.Trigger('sC', gameObject)
                    break;
                case this.#states[1]:
                    this.Trigger('C', gameObject)
                    break;
                default:
                    break;
            }

            gameObject.oldState = gameObject.state
        })

        this.#oldColliders = colliders
    }

    #Colliding (gameObject) {
        return this.hitboxPosition.X < gameObject.hitboxPosition.X + gameObject.hitboxSize.X &&
        this.hitboxPosition.X + this.hitboxSize.X > gameObject.hitboxPosition.X &&
        this.hitboxPosition.Y < gameObject.hitboxPosition.Y + gameObject.hitboxSize.Y &&
        this.hitboxPosition.Y + this.hitboxSize.Y > gameObject.hitboxPosition.Y
    }

    Colliding(){
        let colliding = false
        GameObject.gameObjects.map(gameObject => {
            if(gameObject == this) return
            if(!this.#InCameraRange(gameObject)) return
            if(this.#Colliding(gameObject)) colliding = true
            return
        })
        return colliding
    }

    #InCameraRange(gameObject){
        return Scene.activeScene.IsInRange(gameObject)
    }
}