import Canvas from './Core/Canvas.js';
import Clock from './Core/Clock.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';
import MainMenu from './menus/MainMenu.js';
import SettingsMenu from './menus/SettingsMenu.js';
import Player from './Player/Player.js';

let canvas = new Canvas();

window.MainMenu = new MainMenu();
window.SettingsMenu = new SettingsMenu();

window.addEventListener('keydown', (e) => {
    if (e.keyCode === 82 && e.ctrlKey) {
        e.preventDefault();
    }
    if (e.keyCode === 82 && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
    }
    if (e.keyCode === 116) {
        e.preventDefault();
    }
});

HtmlLoader.Load("./assets/elements/Account.html").then(data => {
    let script = data.split('<script>')[1].split('</script>')[0];
    let html = data.split('<script>')[0];

    login.innerHTML = html;
    login.style.display = "none"
    //execute script
    eval(script);
})

//TODO makes this load after user logged in and pressed play and make it able to unload
window.deltaTime = 1 / 60;
window.player = new Player();
let startTime = Date.now();
window.fps = 60;
window.spriteScaleFactor = 4;

let loop = () => {
    Clock.clocks.forEach(clock => {
        if(!clock.paused){
            clock.passedMiliseconds += window.deltaTime * 1000;
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

    });

    canvas.Update();
    
    canvas.Draw();
    
    window.deltaTime = (Date.now() - startTime) / 1000;
    window.fps = 1 / window.deltaTime;
    startTime = Date.now();

    canvas.ctx.fillStyle = '#fff';
    canvas.ctx.fillText(window.fps.toFixed(0), 10, 50);

    window.requestAnimationFrame(loop);
};

window.requestAnimationFrame(loop);

let client = io('localhost:3000', {'reconnection': true, 'reconnectionDelay': 1000, 'reconnectionDelayMax': 2000})

client.on('connect', () => {
    console.log("connected to server")
    login.style.display = "block"
})

client.on('disconnect', () => {
    console.log('disconnected from server')
    login.style.display = "none"
})