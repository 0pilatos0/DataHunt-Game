import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Vector2 from './Core/Vector2.js';

import AccountMenu from './Menus/AccountMenu.js';
import InventoryMenu from './Menus/InventoryMenu.js';
import CharacterMenu from './Menus/CharacterMenu.js';
import GameMenu from './Menus/GameMenu.js';
import LoadingScreen from './Menus/LoadingScreen.js';
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

window.spriteSize = new Vector2(16, 16);

window.LoadingScreen = new LoadingScreen();

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

window.LoadingScreen.On('ready', start)

let amountReady = 0

window.client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

window.client.on('connect', () => {
    window.client.emit('tilesets')
})

window.client.on('map', (data) => {
    GameObject.gameObjects = []
    data.map(gameObject => {
        let tile = Object.values(window.tiles)[Object.keys(window.tiles).find(tile => tile == gameObject.tileIndex - 1)].tile
        gameObject = new GameObject(new Sprite(new Vector2(gameObject.position.x, gameObject.position.y), new Vector2(16 * window.spriteScaleFactor, 16 * window.spriteScaleFactor), tile.src))
    })
})

window.client.on('tilesets', (data) => {
    console.log("Started loading tiles")
    window.tiles = {}
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
                }
            }
            if(Object.keys(window.tiles).length == data.count){
                console.log("Done with loading tiles")
                console.log(window.tiles)
                window.client.emit('map')
            }
        }
        img.src = tileset.image
    })
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
    window.LoadingScreen.Show()

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
    window.LoadingScreen.Hide()
    window.GameMenu.Show()
}

// window.player = new Player();
