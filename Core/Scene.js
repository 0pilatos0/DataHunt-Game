import Map from "../Map/Map.js";
import Camera from "./Camera.js";
import Rectangle from "./Drawables/Rectangle.js";
import Vector2 from "./Vector2.js";
import GameObject from "./GameObject.js";

export default class Scene{
    static activeScene
    camera = new Camera(new Vector2(0, 0), new Vector2(window.innerWidth, window.innerHeight));
    input = []

    rectangle1

    // rectangle2

    constructor() {
        Scene.activeScene = this

        // Map.Load('../Map/graybox.json').then(m => {
        //     this.map = m
        //     this.rectangle1 = new GameObject(new Rectangle(new Vector2(250, 100), new Vector2(25, 25)))
        //     this.rectangle1.type = "Collidable"
        //     this.rectangle1.On('sC', (gameObject) => {
        //         //this.rectangle1.color = '#00f'
        //         gameObject.visible = false
        //         // console.log("?")
        //     })
    
        //     this.rectangle1.On('C', (gameObject) => {
        //         //this.rectangle1.color = '#00f'
        //         gameObject.visible = false
        //         // console.log("?")
        //     })
        //     this.rectangle1.On('eC', (gameObject) => {
        //         //this.rectangle1.color = '#f00'
        //         gameObject.visible = true
        //         // console.log("?stopped")
        //     })
        //     let spawnpoints = GameObject.gameObjects.filter(gameObject => gameObject.type == "SpawnPoint")

        //     let spawnpoint = spawnpoints[Math.floor(Math.random() * spawnpoints.length)]

        //     this.rectangle1.position = new Vector2(spawnpoint.position.X, spawnpoint.position.Y)

        //     console.log(spawnpoint.position)
        // })

       
        // this.rectangle2 = new GameObject(new Rectangle(new Vector2(200, 500), new Vector2(50, 50)))
        
        // this.rectangle2.type = "Collidable"

        
        window.addEventListener('resize', () => {
            this.camera.size = new Vector2(window.innerWidth, window.innerHeight)
            window.client.emit('resize', this.camera)
        })

        window.addEventListener('keydown', (e) => {
            if(this.input.indexOf(e.key) == -1){
                this.input.push(e.key);
            }
        })

        window.addEventListener('keyup', (e) => {
            if(this.input.indexOf(e.key) > -1){
                this.input.splice(this.input.indexOf(e.key), 1);
            }
        })

        window.addEventListener('mousemove', (e) => {
            // if(this.rectangle1.IsPointColliding(new Vector2(e.clientX, e.clientY))){
            //     this.rectangle1.color = '#f0f';
            // }
            // else{
            //     this.rectangle1.color = '#f00';
            // }
        })

        // this.rectangle2.color = '#0f0';

        // this.rectangle2.On('sC', () => {
        //     console.log("?")
        // })

        // this.rectangle2.On('eC', () => {
        //     console.log("?")
        // })

        // GameObject.gameObjects.map(gameObject => {
            
        // })
    }

    Draw(ctx){
        let offset = new Vector2(-this.camera.position.X, -this.camera.position.Y)

        GameObject.gameObjects.map(gameObject => {
            if(!this.IsInRange(gameObject)) return
            gameObject.Draw(ctx, offset)
        })

        // ctx.fillStyle = '#fff';
        // ctx.fillText(this.animation.clock.Reset().passedMiliseconds, 100, 100)
    }

    Update(){
        // if(this.rectangle1 == null){
        //     return
        // }
        GameObject.gameObjects.map(gameObject => {
            if(!this.IsInRange(gameObject)) return
            gameObject.Update()
        })
        // //console.log(this.#Colliding(this.rectangle1, this.rectangle2))
        // let speed = 500
        // if(this.input.indexOf(window.KeybindsManager.GetKeybindByAction('foward').key) > -1){
        //     //this.camera.position.Y -= speed * window.deltaTime;
        //     this.rectangle1.position.Y -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf(window.KeybindsManager.GetKeybindByAction('left').key) > -1){
        //     //this.camera.position.X -= speed * window.deltaTime;
        //     this.rectangle1.position.X -= speed * window.deltaTime;
        // }
        // if(this.input.indexOf(window.KeybindsManager.GetKeybindByAction('backward').key) > -1){
        //     //this.camera.position.Y += speed * window.deltaTime;
        //     this.rectangle1.position.Y += speed * window.deltaTime;
        // }
        // if(this.input.indexOf(window.KeybindsManager.GetKeybindByAction('right').key) > -1){
        //     //this.camera.position.X += speed * window.deltaTime;
        //     this.rectangle1.position.X += speed * window.deltaTime;
        // }
        // // if(this.input.indexOf('e') > -1){
        // //     //this.camera.position.Y += speed * window.deltaTime;
        // //     this.rectangle1.rotation += speed * window.deltaTime;
        // // }
        // // if(this.input.indexOf('q') > -1){
        // //     //this.camera.position.X += speed * window.deltaTime;
        // //     this.rectangle1.rotation -= speed * window.deltaTime;
        // // }

        // if(this.rectangle1.position.X + this.rectangle1.size.X * this.rectangle1.scale.X / 2 >= this.camera.size.X * this.camera.scale.X / 2){
        //     this.camera.position.X = this.rectangle1.position.X - this.camera.size.X * this.camera.scale.X / 2 + this.rectangle1.size.X * this.rectangle1.scale.X / 2
        // }
        // else{
        //     this.camera.position.X = 0
        // }
        // if(this.rectangle1.position.Y + this.rectangle1.size.Y * this.rectangle1.scale.Y / 2 >= this.camera.size.Y * this.camera.scale.Y / 2){
        //     this.camera.position.Y = this.rectangle1.position.Y - this.camera.size.Y * this.camera.scale.Y / 2 + this.rectangle1.size.Y * this.rectangle1.scale.Y / 2
        // }
        // else{
        //     this.camera.position.Y = 0
        // }
    }

    IsInRange(transformable){
        if(transformable.position.X + transformable.size.X * transformable.scale.X >= this.camera.position.X &&
            transformable.position.X < this.camera.position.X + this.camera.size.X * this.camera.scale.X &&
            transformable.position.Y + transformable.size.Y * transformable.scale.Y >= this.camera.position.Y &&
            transformable.position.Y < this.camera.position.Y + this.camera.size.Y * this.camera.scale.Y){
            return true;
        }
        return false;
    }

    #Colliding (a, b) {
        return a.position.X < b.position.X + b.size.X * b.scale.X &&
        a.position.X + a.size.X * a.scale.X > b.position.X &&
        a.position.Y < b.position.Y + b.size.Y * b.scale.Y &&
        a.position.Y + a.size.Y * a.scale.Y > b.position.Y
    }
}
