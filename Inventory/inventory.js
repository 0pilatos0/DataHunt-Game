import Event from "../Core/Event.js";

export default class Inventory extends Event {


    /**
     * @param {int} id characterId
     * @return {object} inventorydata
     */
    get(id) {
        window.client.emit('getInventory', id)
        window.client.on('returnedInventory', (data) => {
            Object.entries(data).map(entry=>{
                console.log(entry);
            })
        })
    }
}