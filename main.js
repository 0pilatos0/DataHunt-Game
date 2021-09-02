import Canvas from './Core/Canvas.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';

import LoadQuest from './Quests/LoadQuests.js';
import Quest from "./Quests/Quest.js";
import ActiveQuest from "./Quests/ActiveQuest.js";


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


let pauper = LoadQuest.loadQuests("player", testQuest);
console.log(pauper);

let deltaTime = 1 / 60;
let startTime = Date.now();
let fps = 60;

let loop = () => {
    canvas.Update();
    
    canvas.Draw();
    
    deltaTime = (Date.now() - startTime) / 1000;
    fps = 1 / deltaTime;
    startTime = Date.now();

    canvas.ctx.font = '48px serif';
    canvas.ctx.fillStyle = '#fff';
    canvas.ctx.fillText(fps.toFixed(0), 10, 50);

    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
