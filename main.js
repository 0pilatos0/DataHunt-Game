import Canvas from './Core/Canvas.js';

let canvas = new Canvas();

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