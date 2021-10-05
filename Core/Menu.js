import Event from "../Core/Event.js";

export default class Menu extends Event{
    constructor() {
        super()
    }

    Show(){
        this.menu.style.display = 'block';
    }

    Hide(){
        this.menu.style.display = 'none';
    }
}