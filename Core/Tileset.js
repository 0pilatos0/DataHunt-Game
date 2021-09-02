import Event from "./Event.js";
//import Event from "./Event.js";
import Vector2 from "./Vector2.js";

export default class Tileset extends Event {
    constructor() {
        super()
    }

    static async Load(tilesetData){
        return new Promise(async (resolve, reject) => {
            let img = document.createElement('img');
            img.src = `./Map/${tilesetData.image}`;
            let tiles = []
            img.onload = () => {
                for (let y = 0; y < tilesetData.imageheight / tilesetData.tileheight; y++) {
                    for (let x = 0; x < tilesetData.imagewidth / tilesetData.tilewidth; x++) {
                        let imgSize = new Vector2(tilesetData.tilewidth, tilesetData.tileheight)
                        let imgPos = new Vector2(x * imgSize.X, y * imgSize.Y)
                        let canvas = document.createElement('canvas')
                        let ctx = canvas.getContext('2d')
                        canvas.width = imgSize.X
                        canvas.height = imgSize.Y
                        ctx.drawImage(img, imgPos.X, imgPos.Y, imgSize.X, imgSize.Y, 0, 0, imgSize.X, imgSize.Y)
                        let tile = document.createElement('img')
                        tile.src = canvas.toDataURL('base64')
                        tiles.push(tile)
                    }
                }
            }
            return resolve(tiles)
        })
    }
}