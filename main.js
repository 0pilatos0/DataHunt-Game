import Canvas from './Core/Canvas.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';

let canvas = new Canvas();
let htmlLoader = new HtmlLoader();

let menu = document.getElementById('menu');
let menucontext = htmlLoader.load('./assets/elements/MainMenu.html');

//get value of promise object menucontext
menucontext.then(function(value){
    menu.innerHTML = value;
});

setInterval(() => {
    canvas.Update();
    canvas.Draw();
}, 1000 / 60);