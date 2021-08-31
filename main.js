import Canvas from './Core/Canvas.js';

let canvas = new Canvas();

setInterval(() => {
    canvas.Update();
    canvas.Draw();
}, 1000 / 60);

let game = document.getElementById('game')

game.style.width = `${window.innerWidth}px`
game.style.height = `${window.innerHeight}px`