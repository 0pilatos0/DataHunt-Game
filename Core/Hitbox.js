import Scene from "./Scene.js";
import Event from "./Event.js";
import GameObject from "./GameObject.js";

export default class Hitbox extends Event {
    #states = ['STARTED', 'COLLIDING', 'ENDED']
    #oldColliders = []
    constructor(){
        super()
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
        
        let colliders = []
        GameObject.gameObjects.map(gameObject => {
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
        return this.position.X < gameObject.position.X + gameObject.size.X * gameObject.scale.X &&
        this.position.X + this.size.X * this.scale.X > gameObject.position.X &&
        this.position.Y < gameObject.position.Y + gameObject.size.Y * gameObject.scale.Y &&
        this.position.Y + this.size.Y * this.scale.Y > gameObject.position.Y
    }

    #InCameraRange(gameObject){
        return Scene.activeScene.IsInRange(gameObject)
    }
}