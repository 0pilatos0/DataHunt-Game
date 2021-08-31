import Canvas from './Core/Canvas.js';

let canvas = new Canvas();

let loop = () => {
    canvas.Update();
    
    canvas.Draw();
    
    window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);