import Event from "../Core/Event.js";

export default class Inventory extends Event {


    /**
     * @param {int} id
     * @return {object} inventory data
     */
    get(id) {
        window.client.emit('getInventory', id)
        window.client.on('returnedInventory', (data) => {
            Object.entries(data).map(entry=>{
                console.log(entry);
            })
            // Object.entries(data).map(entry=>{
            //     console.log(entry);
            // })
            // this.createItem("DIV", "inventoryWindow", 'inventoryGearItems');
            // Object.entries(data).map(entry => {
            //     console.log(`${JSON.stringify(entry[1])}`)
            //     console.log(entry[1][name])
            //     this.createItem("DIV", `inventoryGearItems`, `inventory${entry[0]}`);
            //     this.createItem("IMG", `inventory${entry[0]}`, `${entry[0]}Image`, null, null);
            //     this.createItem("P", `inventory${entry[0]}`, `${entry[0]}Text`, `${entry[1].name}`);
            // })
        })
    }