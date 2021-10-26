import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Vector2 from './Core/Vector2.js';

import AccountMenu from './Menus/AccountMenu.js';
import CharacterMenu from './Menus/CharacterMenu.js';
import GameMenu from './Menus/GameMenu.js';
import LoadingScreen from './Menus/LoadingScreen.js';
import MainMenu from './Menus/MainMenu.js';
import SettingsMenu from './Menus/SettingsMenu.js';

import Player from './Player/Player.js';

import Feedback from "./Core/Feedback/Feedback.js";
import FeedbackTypes from "./Core/Feedback/FeedbackTypes.js";

import Tutorial from './Tutorial/Tutorial.js';

import Storage from './Core/Storage.js';

window.spriteSize = new Vector2(16, 16);

window.LoadingScreen = new LoadingScreen();

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
    //TODO dont forget to comment this out
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
    window.Tutorial = new Tutorial();

    window.CharacterMenu.On('ready', runAfterLoad)
    window.MainMenu.On('ready', runAfterLoad)
    window.SettingsMenu.On('ready', runAfterLoad)
    window.AccountMenu.On('ready', runAfterLoad)
    window.GameMenu.On('ready', runAfterLoad)
    window.Tutorial.On('ready', runAfterLoad)

}

function runAfterLoad(){
    amountReady++
    if(amountReady != 5) return
    console.log("Everything loaded")

    //TODO remove this line for production branch
    Storage.Remove('tutorialcompleted')

    if (Storage.Get('tutorialcompleted') == null || Storage.Get('tutorialcompleted') == false) {
        window.Tutorial.Start()
    }

   
    window.LoadingScreen.Hide()

    // Feedback.showFeedback(FeedbackTypes.GAMESUCCESS, "test message");
    // Feedback.showFeedback(FeedbackTypes.SUCCESS, "test message");
    //TODO fix bug with account page which requires client
    //TODO load client at this point
    // window.MainMenu.Show()
    // window.LoadingScreen.Hide()
}

// window.player = new Player();