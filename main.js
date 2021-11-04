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

window.client = io('datahunt.duckdns.org:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

window.client.on('connect', () => {
    console.log("connected to server")
    window.LoadingScreen.Hide()
    window.AccountMenu.Show()
})

window.client.on('disconnect', () => {
    console.log('disconnected from server')
    window.LoadingScreen.Show()
    window.AccountMenu.Hide()
})

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
    // window.LoadingScreen.Hide()
}

// window.player = new Player();