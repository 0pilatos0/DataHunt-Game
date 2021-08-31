import Canvas from './Core/Canvas.js';

let canvas = new Canvas();

setInterval(() => {
    canvas.Update();
    canvas.Draw();
}, 1000 / 60);