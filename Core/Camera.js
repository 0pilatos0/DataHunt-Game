import Transformable from "./Transformable.js";

export default class Camera extends Transformable {
    constructor(position, size) {
        super()
        this.position = position
        this.size = size
    }
}