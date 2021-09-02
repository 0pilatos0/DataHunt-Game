import JsonLoader from "../Core/Loaders/JsonLoader.js"
import Tileset from "../Core/Tileset.js";

export default class Map{
    constructor() {
        
    }

    static async Load(pathToMainJsonFile){
        let jsonData = await JsonLoader.Load(pathToMainJsonFile)
        let allTiles = new Array()
        jsonData.tilesets.map(async t => {
            let tilesetData = await JsonLoader.Load(`./Map/${t.source}`)
            let tiles = await Tileset.Load(tilesetData)
            allTiles.push(tiles)
        });
        let map = []
        jsonData.layers.map(async l => {
            switch (l.type) {
                case "objectgroup":
                    console.log(l.objects)
                    break;
                case "tilelayer":
                    console.log(l.data)
                    l.data.map(t => {
                        if(t - 1 >= 0){
                            let tile = allTiles[t - 1]
                            console.log(tile)
                        }
                    })
                    break;
                default:
                    break;
            }
        })

        console.log(allTiles)
    }
}