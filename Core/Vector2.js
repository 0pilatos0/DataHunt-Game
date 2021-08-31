export default class Vector2{
    X = 0;
    Y = 0;
    constructor(x, y) {
        this.X = x
        this.Y = y
    }

    static Zero(){
        return new Vector2(0, 0)
    }
}