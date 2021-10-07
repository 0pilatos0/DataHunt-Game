import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Vector2 from './Core/Vector2.js';
import AccountMenu from './Menus/AccountMenu.js';
import CharacterMenu from './menus/CharacterMenu.js';
import LoadingScreen from './Menus/LoadingScreen.js';
import MainMenu from './Menus/MainMenu.js';
import SettingsMenu from './Menus/SettingsMenu.js';
import Player from './Player/Player.js';
import Feedback from "./Core/Feedback/Feedback.js";
import FeedbackTypes from "./Core/Feedback/FeedbackTypes.js";

window.spriteSize = new Vector2(16, 16);

window.LoadingScreen = new LoadingScreen();

window.LoadingScreen.On('ready', start);

let amountReady = 0;

window.client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

window.client.on('connect', () => {
    console.log("connected to server");
    window.LoadingScreen.Hide();
    window.AccountMenu.Show()
})

window.client.on('disconnect', () => {
    console.log('disconnected from server');
    window.LoadingScreen.Show();
    window.AccountMenu.Hide()
})

async function start(){
    //TODO add feedback to loader
    window.LoadingScreen.Show();

    window.MainMenu = new MainMenu();
    window.SettingsMenu = new SettingsMenu();
    window.AccountMenu = new AccountMenu();
    window.CharacterMenu = new CharacterMenu();

    window.CharacterMenu.On('ready', () => {
        runAfterLoad()
    })
    window.MainMenu.On('ready', () => {
        runAfterLoad()
    })
    window.SettingsMenu.On('ready', () => {
        runAfterLoad()
    })
    window.AccountMenu.On('ready', () => {
        runAfterLoad()
    })
    
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
}



function runAfterLoad(){
    amountReady++;
    if(amountReady != 4) return;
    console.log("Everything loaded");
    Feedback.showFeedback(FeedbackTypes.GAMESUCCESS, "test message");
    Feedback.showFeedback(FeedbackTypes.SUCCESS, "test message");
    //TODO fix bug with account page which requires client
    //TODO load client at this point
    window.MainMenu.Show();
    window.LoadingScreen.Hide()
}

//TODO makes this load after user logged in and pressed play and make it able to unload
// let canvas = new Canvas();

// window.deltaTime = 1 / 60;
// window.player = new Player();
// let startTime = Date.now();
// window.fps = 60;
// window.spriteScaleFactor = 4;

// let loop = () => {
//     Clock.clocks.forEach(clock => {
//         if(!clock.paused){
//             clock.passedMiliseconds += window.deltaTime * 1000;
//             if(clock.passedMiliseconds >= 1000){
//                 //clock.passedMiliseconds -= 1000
//                 clock.passedSeconds += 1
//             }
//             if(clock.passedSeconds >= 60){
//                 //clock.passedSeconds -= 60
//                 clock.passedMinutes += 1
//             }
//             if(clock.passedMinutes >= 60){
//                 //clock.passedMinutes -= 60
//                 clock.passedHours += 1
//             }
//         }

//     });

//     canvas.Update();
    
//     canvas.Draw();
    
//     window.deltaTime = (Date.now() - startTime) / 1000;
//     window.fps = 1 / window.deltaTime;
//     startTime = Date.now();

//     canvas.ctx.fillStyle = '#fff';
//     canvas.ctx.fillText(window.fps.toFixed(0), 10, 50);

//     window.requestAnimationFrame(loop);
// };

// window.requestAnimationFrame(loop);