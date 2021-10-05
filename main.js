import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Vector2 from './Core/Vector2.js';
import AccountMenu from './Menus/AccountMenu.js';
import CharacterMenu from './menus/CharacterMenu.js';
import GameMenu from './Menus/GameMenu.js';
import LoadingScreen from './Menus/LoadingScreen.js';
import MainMenu from './Menus/MainMenu.js';
import SettingsMenu from './Menus/SettingsMenu.js';
import Player from './Player/Player.js';

window.spriteSize = new Vector2(16, 16);

window.LoadingScreen = new LoadingScreen();

window.LoadingScreen.On('ready', start)

let amountReady = 0

window.client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

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
    window.GameMenu = new GameMenu();

    window.CharacterMenu.On('ready', runAfterLoad)
    window.MainMenu.On('ready', runAfterLoad)
    window.SettingsMenu.On('ready', runAfterLoad)
    window.AccountMenu.On('ready', runAfterLoad)
    window.GameMenu.On('ready', runAfterLoad)
    
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
        //TODO fix this m key listener to prevent it from being pressable during login or registration or something. Maybe by creating an input class
        // if(e.key == 'm'){
        //     window.MainMenu.Show()
        //     window.GameMenu.Hide()
        //     window.CharacterMenu.Hide()
        //     window.SettingsMenu.Hide()
        //     window.AccountMenu.Hide()
        // }
    });
}

function runAfterLoad(){
    amountReady++
    if(amountReady != 5) return
    console.log("Everything loaded")
    //TODO fix bug with account page which requires client
    //TODO load client at this point
    window.MainMenu.Show()
    window.LoadingScreen.Hide()
}

// window.player = new Player();