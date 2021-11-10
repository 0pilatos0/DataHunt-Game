import Event from "../Core/Event.js";
import Create from "../Core/ElementCreator.js";

export default class Inventory extends Event {
    constructor() {
        super();
        console.log('inventory')
    }
    /**
     * @param {int} id characterId
     * @return {object} inventorydata
     */
    Get(id) {
        window.client.emit('getInventory', id)
        window.client.on('returnedInventory', (data) => {
            console.log('data')
            // console.log(`inventory keybind is ${window.KeyBindManager.GetKeybindByAction('inventory')}`)
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
                            null
                            // [
                            //     {
                            //         element: null,
                            //         key: null,
                            //         type: 'click',
                            //         function: this.changeItem
                            //     },
                            //     {
                            //         element: document,
                            //         key: window.KeyBindManager.GetKeybindByAction('inventory'),
                            //         type: 'keydown',
                            //         function: this.StopchangeItem
                            //     }
                            // ]
                        )
                    }
                })

            })
            Object.entries(data).map(entry => {
                if ('weapons' == entry[0]) {
                    this.switchItem(data.weapons[1], data.weapons, 'weapons');
                    this.changeItem(data.weapons[0], data.weapons)
                    // this.switchItem(data.weapons[0], data.weapons, 'weapons');
                }
            })
        })
    }


    /**
     * @param {string} newOld
     * @param {object} element 
     */
    updateChangeItem(newOld, element) {
        document.getElementById('inventoryOverlayImage').src = element.texture;
        let stats = document.getElementById(`inventoryOverlayStats${newOld}`).childNodes;
        stats[1].innerHTML = element.name;
        stats[3].innerHTML = `${element.type}: ${element.value}`
        stats[5].innerHTML = `Rarity: ${this.CalculateRarity(element.rarity)}`

    }

    changeItem(oldItem, newItems) {
        document.getElementById('inventoryOverlay').style.display = "flex";
        let index = 0;
        this.updateChangeItem('Old', newItems[0])
        this.updateChangeItem('New', newItems[1])
    }

    StopchangeItem() {
        document.getElementById('inventoryOverlay').style.display = "none";
    }

    switchItem(newItem, array, name) {
        array[0].index = newItem.index;
        array[newItem.index].index = 0;

        let element = document.getElementById(`inventory${name}`).childNodes;

        element[0].innerHTML = `${newItem.name} - ${newItem.value} ${newItem.type}`;
        element[1].src = `${newItem.texture}`;
    }

    CalculateRarity(rarity) {
        switch (rarity) {
            case 1:
                return 'common'
            case 2:
                return 'uncommon'
            case 3:
                return 'rare'
            case 4:
                return 'legendary'
            case 5:
                return 'exotic'
            default:
                return 'common'
        }
    }

    //function calcalate difference return true or false
    calculateDifference(itemA, itemB) {
        if (itemA > itemB) {
            return true;
        } else if (itemA < itemB) {
            return false;
        }
    }
}