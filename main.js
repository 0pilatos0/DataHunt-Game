import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import MainMenu from './menus/MainMenu.js';
import SettingsMenu from './menus/SettingsMenu.js';

let canvas = new Canvas();

window.MainMenu = new MainMenu();
window.SettingsMenu = new SettingsMenu();


window.deltaTime = 1 / 60;
let startTime = Date.now();
window.fps = 60;
window.spriteScaleFactor = 4

let loop = () => {
    Clock.clocks.forEach(clock => {
        if(!clock.paused){
            clock.passedMiliseconds += window.deltaTime * 1000
            if(clock.passedMiliseconds >= 1000){
                //clock.passedMiliseconds -= 1000
                clock.passedSeconds += 1
            }
            if(clock.passedSeconds >= 60){
                //clock.passedSeconds -= 60
                clock.passedMinutes += 1
            }
            if(clock.passedMinutes >= 60){
                //clock.passedMinutes -= 60
                clock.passedHours += 1
            }
        }
        
    })

    canvas.Update();
    
    canvas.Draw();
    
    window.deltaTime = (Date.now() - startTime) / 1000;
    window.fps = 1 / window.deltaTime;
    startTime = Date.now();
   
    canvas.ctx.fillStyle = '#fff';
    canvas.ctx.fillText(window.fps.toFixed(0), 10, 50);

    window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);

let client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

client.on('connect', () => {
    console.log("connected to server")
})

client.on('disconnect', () => {
    console.log('disconnected from server')
})