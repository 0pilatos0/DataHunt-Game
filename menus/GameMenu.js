import Canvas from "../Core/Canvas.js";
import Clock from "../Core/Clock.js";
import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class GameMenu extends Menu{
    #paused = false
    #canvas =  new Canvas();

    constructor() {
        super()
        window.deltaTime = 1 / 60;
        let startTime = Date.now();
        window.fps = 60;
        window.spriteScaleFactor = 4;

        let loop = () => {
            window.requestAnimationFrame(loop);
            if(this.#paused) return
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

            this.#canvas.Update();
            
            this.#canvas.Draw();
            
            window.deltaTime = (Date.now() - startTime) / 1000;
            window.fps = 1 / window.deltaTime;
            startTime = Date.now();

            this.#canvas.ctx.fillStyle = '#fff';
            this.#canvas.ctx.fillText(window.fps.toFixed(0), 10, 50);
        };

        window.requestAnimationFrame(loop);

        this.Hide()

        this.Trigger('ready', null, true)
        //this.menucontext = HtmlLoader.Load('./assets/elements/AccountMenu.html')

        // this.menucontext.then(data =>{
        //     let context = data;
        //     let script = context.split('<script>')[1].split('</script>')[0];
        //     let html = context.split('<script>')[0];

        //     this.menu.innerHTML = html;

        //     eval(script);

        //     this.Hide()
            
        //     this.Trigger('ready')
        // })
    }

    Hide(){
        this.#canvas.canvas.style.display = "none"
        this.Pause()
    }

    Show(){
        this.#canvas.canvas.style.display = "block"
        this.Resume()
    }

    Pause(){
        this.#paused = true
    }

    Resume(){
        this.#paused = false
    }
}