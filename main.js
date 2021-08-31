import Canvas from './Core/Canvas.js';

let canvas = new Canvas();

// setInterval(() => {
//     c
// }, 1000 / 60);

window.requestAnimationFrame(() => {
    canvas.Update();
    canvas.Draw();
})