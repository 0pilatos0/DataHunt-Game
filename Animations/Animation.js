import Clock from "../Core/Clock.js"

export default class Animation{
    frames = []
    activeFrame = 0
    clock = new Clock()

    constructor(frames) {
        this.frames = frames
    }

    Update(){
        if(this.clock.passedMiliseconds >= this.frames[this.activeFrame].duration){
            this.activeFrame++
            this.clock.Reset()
        }
        if(this.activeFrame >= this.frames.length){
            this.activeFrame = 0
        }
    }
}