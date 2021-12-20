import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Vector2 from './Core/Vector2.js';

import AccountMenu from './Menus/AccountMenu.js';
import InventoryMenu from './Menus/InventoryMenu.js';
import CharacterMenu from './Menus/CharacterMenu.js';
import GameMenu from './Menus/GameMenu.js';
import LoadingScreen from './Menus/LoadingScreen.js';
import LoaderScreen from './Menus/LoaderMenu.js';
import MainMenu from './Menus/MainMenu.js';
import SettingsMenu from './Menus/SettingsMenu.js';
import JsonLoader from "./Core/Loaders/JsonLoader.js";

import Player from './Player/Player.js';

import Feedback from "./Core/Feedback/Feedback.js";
import FeedbackTypes from "./Core/Feedback/FeedbackTypes.js";

import Tutorial from './Tutorial/Tutorial.js';

import Storage from './Core/Storage.js';

import KeybindsManager from './Core/KeybindsManager.js';

window.Feedback = Feedback
window.FeedbackTypes = FeedbackTypes

import Inventory from "./Inventory/inventory.js";
import GameObject from './Core/GameObject.js';
import Sprite from './Core/Drawables/Sprite.js';
import Scene from './Core/Scene.js';
import MultiplayerObject from './Core/MultiplayerObject.js';

window.spriteSize = new Vector2(16, 16);

window.LoadingScreen = new LoadingScreen();
window.LoaderScreen = new LoaderScreen();


//TODO update this manualy once changes to map happened
//to get all new values enable following line
let getNewProgressStats = false;
window.LoaderScreen.increaseMaxProgress(781) //client.on('tileset')


window.inventory = new Inventory();

window.addEventListener('keydown', (e) => {
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
    }
    if (e.key === 'R' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
    }
    if (e.key === 'F5') {
        e.preventDefault();
    }
});

window.LoadingScreen.On('ready', () => {
    window.LoadingScreen.Show()
})

window.LoaderScreen.On('ready', start)

let amountReady = 0

//localhost
//datahunt.duckdns.org
window.client = io('datahunt.duckdns.org:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

window.client.on('connect', () => {
    window.LoadingScreen.Hide()
    window.AccountMenu.Show()
})

window.client.on('entities', (data) => {
    MultiplayerObject.multiplayerObjects = []
    data.entities.map(entity => {
        new MultiplayerObject(new Sprite(new Vector2(entity.position.x, entity.position.y), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), playerTile))
        // let gameObject = GameObject.gameObjects.find(gameObject => {
        //     return gameObject.id == entity.id
        // })
        // if(typeof gameObject !== "undefined"){
        //     // if(gameObject.type == "Player"){
        //         gameObject.position = new Vector2(entity.position.x, entity.position.y)
        //     // }
        // }
        // else{
        //     gameObject = new GameObject(new Sprite(new Vector2(entity.position.x, entity.position.y), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), playerTile))
        //     gameObject.id = entity.id
        // }
    })
    Scene.activeScene.camera.position = new Vector2(data.camera.position.x, data.camera.position.y)
})

window.client.on('map', (data) => {
    Scene.activeScene.camera.position = new Vector2(data.camera.position.x, data.camera.position.y)
    GameObject.gameObjects = []
    data.map.map(gameObject => {
        let tile = Object.values(window.tiles)[Object.keys(window.tiles).find(tile => tile == gameObject.tileIndex - 1)]
        if(!tile) return
        tile = tile.tile
        gameObject = new GameObject(new Sprite(new Vector2(gameObject.position.x, gameObject.position.y), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), tile))
    })
    window.LoadingScreen.Hide()
    window.GameMenu.Show()

    // window.startLength = data.map.length
    // data.map.map(gameObject => {
    //     if(gameObject.type == "Player"){
    //         new GameObject(new Sprite(new Vector2(gameObject.position.x, gameObject.position.y), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), playerTile))
    //     }
    // })
})

let playerTile

window.client.on('tilesets', (data) => {
    console.log("Started loading tiles")
    window.tiles = {}
    playerTile = new Image()
    playerTile.src = "./Player/Player.png"
    playerTile.onload = () => {
        // document.body.appendChild(playerTile)
        // playerTile = new Sprite(new Vector2(0, 0), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), playerTile)
        let counted = 0
        window.LoaderScreen.UpdateActivity("Loading tiles")
        data.tilesets.map(tileset => {
            let img = new Image()
            img.onload = () => {
                let counter = 0
                for (let y = 0; y < tileset.height / tileset.tileHeight; y++) {
                    for (let x = 0; x < tileset.width / tileset.tileWidth; x++) {
                        let imgSize = new Vector2(tileset.tileWidth, tileset.tileHeight)
                        let imgPos = new Vector2(x * imgSize.X, y * imgSize.Y)
                        let canvas = document.createElement('canvas')
                        let ctx = canvas.getContext('2d')
                        canvas.width = imgSize.X
                        canvas.height = imgSize.Y
                        ctx.drawImage(img, imgPos.X, imgPos.Y, imgSize.X, imgSize.Y, 0, 0, imgSize.X, imgSize.Y)
                        let tile = document.createElement('img')
                        tile.src = canvas.toDataURL('base64')
                        window.tiles[tileset.index - 1 + counter] = {tile}
                        counter++
                        window.LoaderScreen.UpdateProgress()
                    }
                }
                counted += counter
                if(Object.keys(window.tiles).length == data.count){
                    console.log("Done with loading tiles")
                    // console.log(window.tiles)
                    window.client.emit('map')
                    if(getNewProgressStats){
                        console.log("New value for window.on('tileset') = " + counted)
                    }
                
                }
            }
            img.src = tileset.image
        })
        
    }
    
})

// window.client.on('connect', () => {
//     console.log("connected to server")
//     window.LoadingScreen.Hide()
//     window.AccountMenu.Show()
// })

// window.client.on('disconnect', () => {
//     console.log('disconnected from server')
//     window.LoadingScreen.Show()
//     window.AccountMenu.Hide()
// })

async function start(){
    //TODO add feedback to loader
    // window.LoadingScreen.Show()

    window.MainMenu = new MainMenu();
    window.SettingsMenu = new SettingsMenu();
    window.AccountMenu = new AccountMenu();
    window.CharacterMenu = new CharacterMenu();
    window.InventoryMenu = new InventoryMenu();
    window.GameMenu = new GameMenu();
    window.Tutorial = new Tutorial();
    window.KeybindsManager = new KeybindsManager();

    window.CharacterMenu.On('ready', runAfterLoad)
    window.MainMenu.On('ready', runAfterLoad)
    window.SettingsMenu.On('ready', runAfterLoad)
    window.AccountMenu.On('ready', runAfterLoad)
    window.InventoryMenu.On('ready', runAfterLoad)
    window.GameMenu.On('ready', runAfterLoad)
    window.Messages = await JsonLoader.Load("messages.json");
    window.Tutorial.On('ready', runAfterLoad)
    window.KeybindsManager.On('ready', runAfterLoad)
}

function runAfterLoad(){
    amountReady++
    if(amountReady != 5) return
    console.log("Everything loaded")

    // window.LoadingScreen.Hide()
    // window.GameMenu.Show()

    //TODO remove this line for production branch
    // Storage.Remove('tutorialcompleted')



    // Test KeybindsManager
    // console.log("Testing KeybindsManager...")
    // console.log("Current keybind: '"+ window.KeybindsManager.GetKeybindByAction("inventory").key +"'")
    // console.log("Updating Keybind...")
    // window.KeybindsManager.UpdateKeybind("inventory", "a")
    // console.log("New keybind: '"+ window.KeybindsManager.GetKeybindByAction("inventory").key +"'")
    // console.log("Resetting keybinds...")
    // window.KeybindsManager.ResetKeybinds()
    // console.log("New keybind: '"+ window.KeybindsManager.GetKeybindByAction("inventory").key +"'")
    // console.log("Testing KeybindsManager... Done")
   

    // Feedback.showFeedback(FeedbackTypes.GAMESUCCESS, "test message");
    // Feedback.showFeedback(FeedbackTypes.SUCCESS, "test message");
    //TODO fix bug with account page which requires client
    //TODO load client at this point
    // window.MainMenu.Show()
  
    // window.InventoryMenu.Show()

    // window.LoaderScreen.Hide()
    window.LoadingScreen.Hide()
    window.GameMenu.Show()
}

// window.player = new Player();
