import Scene from "./Scene.js"

export default class Player{
    constructor(sprites) {
        this.sprites = sprites
    }

    Update(){
        let speed = 500
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('foward').key) > -1){
            //this.camera.position.Y -= speed * window.deltaTime;
            this.sprites.map(sprite => {
                sprite.position.Y -= speed * window.deltaTime;
            })
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('left').key) > -1){
            //this.camera.position.X -= speed * window.deltaTime;
            this.sprites.map(sprite => {
                sprite.position.X -= speed * window.deltaTime;
            })
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('backward').key) > -1){
            //this.camera.position.Y += speed * window.deltaTime;
            this.sprites.map(sprite => {
                sprite.position.Y += speed * window.deltaTime;
            })
        }
        if(window.input.indexOf(window.KeybindsManager.GetKeybindByAction('right').key) > -1){
            //this.camera.position.X += speed * window.deltaTime;
            this.sprites.map(sprite => {
                sprite.position.X += speed * window.deltaTime;
            })
        }

        if(this.sprites[0].position.X + this.sprites[0].size.X * this.sprites[0].scale.X / 2 >= Scene.activeScene.camera.size.X * Scene.activeScene.camera.scale.X / 2){
            Scene.activeScene.camera.position.X = this.sprites[0].position.X - Scene.activeScene.camera.size.X * Scene.activeScene.camera.scale.X / 2 + this.sprites[0].size.X * this.sprites[0].scale.X / 2
        }
        else{
            Scene.activeScene.camera.position.X = 0
        }
        if(this.sprites[0].position.Y + this.sprites[0].size.Y * this.sprites[0].scale.Y / 2 >= Scene.activeScene.camera.size.Y * Scene.activeScene.camera.scale.Y / 2){
            Scene.activeScene.camera.position.Y = this.sprites[0].position.Y - Scene.activeScene.camera.size.Y * Scene.activeScene.camera.scale.Y / 2 + this.sprites[0].size.Y * this.sprites[0].scale.Y / 2
        }
        else{
            Scene.activeScene.camera.position.Y = 0
        }
    }


}