import Canvas from './Core/Canvas.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';

let canvas = new Canvas();
let htmlLoader = new HtmlLoader();

let menu = document.getElementById('menu');
let menucontext = htmlLoader.load('./assets/elements/MainMenu.html');

//get value of promise object menucontext
menucontext.then(function(value){
    menu.innerHTML = value;
    let play = document.getElementById('play');
    //onclick on play set display of menu to none
    play.onclick = () => {
        menu.style.display = 'none';
    }   

});


window.deltaTime = 1 / 60;
let startTime = Date.now();
window.fps = 60;

let loop = () => {
    canvas.Update();
    
    canvas.Draw();
    
    window.deltaTime = (Date.now() - startTime) / 1000;
    window.fps = 1 / window.deltaTime;
    startTime = Date.now();

    canvas.ctx.font = '48px serif';
    canvas.ctx.fillStyle = '#fff';
    canvas.ctx.fillText(window.fps.toFixed(0), 10, 50);

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
