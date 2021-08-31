import Vector2 from './Vector2.js'

export default class Transformable{
    position = Vector2.Zero();
    size = Vector2.Zero();
    rotation = 0;
    scale = new Vector2(1, 1);

    constructor() {
        
    }
}