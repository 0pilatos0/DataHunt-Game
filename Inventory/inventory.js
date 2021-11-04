import Event from "../Core/Event.js";
import Create from "../Core/ElementCreator.js";

export default class Inventory extends Event {


    /**
     * @param {int} id characterId
     * @return {object} inventorydata
     */
    get(id) {
        window.client.emit('getInventory', id)
        window.client.on('returnedInventory', (data) => {
            Object.entries(data).map(entry => {
                entry[1].map(item => {
                    if (item.index == 0) {
                        Create("DIV", {
                                id: `inventory${entry[0]}`,
                            },
                            `inventoryWindow`,
                            null,
                            null
                        )
                        Create("H1", {
                                id: `inventory${entry[0]}TXT`,
                                innerHTML: `${item  .name} - ${item.value} ${item.type}`,
                                style: {
                                    'font-size': "30px",
                                    'margin-left': '3px'
                                }
                            },
                            `inventory${entry[0]}`,
                            null,
                            null
                        )
                        Create("IMG", {
                                id: `inventory${entry[0]}IMG`,
                                src: `${item.texture}`,
                                style: {
                                    width: '10vh',
                                    border: 'solid 2px black',
                                    padding: '2px',
                                    'background-color': '#F3F6F4',
                                    'margin-left': '3px'
                                }
                            },
                            `inventory${entry[0]}`,
                            null,
                            [
                                {
                                    element: null,
                                    key: null,
                                    type: 'click',
                                    function: this.changeItem
                                },
                                {
                                    element: document,
                                    key: 'i',
                                    type: 'keydown',
                                    function: this.StopchangeItem
                                }
                            ]
                        )
                    }
                })

            })
            Object.entries(data).map(entry => {
                if ('weapons' == entry[0]) {
                    this.switchItem(data.weapons[1], data.weapons, 'weapons');
                    // this.switchItem(data.weapons[0], data.weapons, 'weapons');
                }
            })
        })
    }

    changeItem(){
        document.getElementById('inventoryOverlay').style.display = "block";
    }

    StopchangeItem(){
        document.getElementById('inventoryOverlay').style.display = "none";
    }

    switchItem(newItem, array, name) {
        array[0].index = newItem.index;
        array[newItem.index].index = 0;

        let element = document.getElementById(`inventory${name}`).childNodes;

        element[0].innerHTML = `${newItem.name} - ${newItem.value} ${newItem.type}`;
        element[1].src = `${newItem.texture}`;
    }
}