import Canvas from './Core/Canvas.js';
import HtmlLoader from './Core/Loaders/HtmlLoader.js';

let canvas = new Canvas();
let htmlLoader = new HtmlLoader();


setInterval(() => {
    canvas.Update();
    canvas.Draw();
}, 1000 / 60);