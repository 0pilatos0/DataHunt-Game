export default class Clock{
    static clocks = []

    paused = false
    passedMiliseconds = 0
    passedSeconds = 0
    passedMinutes = 0
    passedHours = 0

    constructor() {
        Clock.clocks.push(this)
    }

    Reset(){
        let tPassedMS = this.passedMiliseconds
        let tPassedS = this.passedSeconds
        let tPassedM = this.passedMinutes
        let tPassedH = this.passedHours
        this.passedMiliseconds = 0
        this.passedSeconds = 0
        this.passedMinutes = 0
        this.passedHours = 0
        return {
            passedMiliseconds: tPassedMS,
            passedSeconds: tPassedS,
            passedMinutes: tPassedM,
            passedHours: tPassedH
        }
    }
}