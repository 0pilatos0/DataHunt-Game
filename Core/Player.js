import Scene from "./Scene.js"
import Vector2 from "./Vector2.js";
import GameObject from "./GameObject.js";

export default class Player{
    position = new Vector2(0, 0)
    scale = new Vector2(1, 1)
    size = new Vector2(parseInt(16 * 4), parseInt(16 * 4))
    sprites = []
    speed = 500

    constructor() {
        this.type = "Player"
    }

    Update(){
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('foward').key) > -1){
            //this.camera.position.Y -= speed * window.deltaTime;
            this.position.Y -= this.speed * window.deltaTime;
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('left').key) > -1){
            //this.camera.position.X -= speed * window.deltaTime;
            this.position.X -= this.speed * window.deltaTime;
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('backward').key) > -1){
            //this.camera.position.Y += speed * window.deltaTime;
            this.position.Y += this.speed * window.deltaTime;
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('right').key) > -1){
            //this.camera.position.X += speed * window.deltaTime;
            this.position.X += this.speed * window.deltaTime;
        }

        if(this.position.X + this.size.X * this.scale.X / 2 >= Scene.activeScene.camera.size.X * Scene.activeScene.camera.scale.X / 2){
            Scene.activeScene.camera.position.X = this.position.X - Scene.activeScene.camera.size.X * Scene.activeScene.camera.scale.X / 2 + this.size.X * this.scale.X / 2
        }
        else{
            Scene.activeScene.camera.position.X = 0
        }
        if(this.position.Y + this.size.Y * this.scale.Y / 2 >= Scene.activeScene.camera.size.Y * Scene.activeScene.camera.scale.Y / 2){
            Scene.activeScene.camera.position.Y = this.position.Y - Scene.activeScene.camera.size.Y * Scene.activeScene.camera.scale.Y / 2 + this.size.Y * this.scale.Y / 2
        }
        else{
            Scene.activeScene.camera.position.Y = 0
        }

        this.sprites.map(sprite => {
            sprite.position = this.position
            sprite.size = this.size
            sprite.scale = this.scale
        })

    }

    Draw(){

    }
}