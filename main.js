import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import Menu from './menus/menu.js';

let canvas = new Canvas();

let MainMenu = new Menu();


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
