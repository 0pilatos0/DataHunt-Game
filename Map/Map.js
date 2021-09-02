import JsonLoader from "../Core/Loaders/JsonLoader.js"
import Tileset from "../Core/Tileset.js";
import Event from "../Core/Event.js";
import Sprite from "../Core/Drawables/Sprite.js";
import Vector2 from "../Core/Vector2.js";

export default class Map {
    constructor() {
        
    }

    static async Load(pathToMainJsonFile){
        return new Promise(async (resolve, reject) => {
            let event = new Event()
            let jsonData = await JsonLoader.Load(pathToMainJsonFile)
            let allTiles = new Array()
            let totalTiles = 0
            //Safety check, sets the amount of tiles
            jsonData.tilesets.map(async t => {
                let tilesetData = await JsonLoader.Load(`./Map/${t.source}`)
                totalTiles += tilesetData.tilecount
            })
            jsonData.tilesets.map(async t => {
                let tilesetData = await JsonLoader.Load(`./Map/${t.source}`)
                tilesetData.offset = t.firstgid
                let tiles = await Tileset.Load(tilesetData)
                allTiles = tiles.concat(allTiles)
                //Check required, so all it continues when all the tiles are loaded
                if(totalTiles == allTiles.length){
                    event.Trigger('loaded tilesets')
                }
            });
            event.On('loaded tilesets', () => {
                let map = []
                jsonData.layers.map(async l => {
                    switch (l.type) {
                        case "objectgroup":
                            console.log(l.objects)
                            //TODO register gameobjects
                            break;
                        case "tilelayer":
                            for (let y = 0; y < l.height; y++) {
                                for (let x = 0; x < l.width; x++) {
                                    let tileIndex = l.data[y * l.height + x]
                                    if(tileIndex - 1 > -1){
                                        let tile = allTiles.find(t => {
                                            return t.index == tileIndex - 1
                                        }).tile
                                        let tilePos = new Vector2(x * tile.width, y * tile.height)
                                        let tileSize = new Vector2(tile.width, tile.height)
                                        map.push(new Sprite(tilePos, tileSize, tile.src))
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                })
                return resolve(map)
            })
        })
    }
}