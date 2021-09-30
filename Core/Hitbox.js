import Scene from "./Scene.js";
import Event from "./Event.js";
import GameObject from "./GameObject.js";

export default class Hitbox extends Event {
    #states = ['STARTED', 'COLLIDING', 'ENDED']
    #state = this.#states[2];
    #oldState = this.#states[2];
    constructor(){
        super()
    }

    Update() {
        //TODO fix bug with overlapping states
        // if(!this.position || !this.size) return
        GameObject.gameObjects.map(gameObject => {
            if(gameObject == this) return
            // if(!gameObject.position || !gameObject.size) return
            if(!this.#InCameraRange(gameObject)) return
            let colliding = this.#Colliding(gameObject)
            if (colliding) {
                if(this.#oldState === this.#states[2]) 
                    this.#state = this.#states[0]
                if(this.#oldState === this.#states[0]) 
                    this.#state = this.#states[1]
            }else {
                if(this.#oldState === this.#states[0] || this.#oldState === this.#states[1])
                    this.#state = this.#states[2]
            }
                //console.log(this.#state)
                
                // this.oldState = this.state;
            // console.log(this.#state)
            switch (this.#state) {
                case this.#states[0]:
                    // console.log("?")
                    // if(this.#state == this.#oldState) break
                    this.Trigger('sC')
                    break;
                case this.#states[1]:
                    //console.log("?")
                    this.Trigger('C')
                    break;
                case this.#states[2]:
                    if(this.#oldState !== this.#state)
                        this.Trigger('eC')
                    // if(this.#state == this.#oldState) break
                    
                    //console.log("?stopped")
                    break;
                default:
                    break;
            }
            if(this.#oldState !== this.#state)
                this.#oldState = this.#state
        })
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