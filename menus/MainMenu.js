import Event from "../Core/Event.js";
import HtmlLoader from "../Core/Loaders/HtmlLoader.js";


export default class MainMenu extends Event{


    constructor(){
        super();
        this.menu = document.querySelector('#menu');
        this.menucontext = HtmlLoader.Load('./assets/elements/MainMenu.html');

        this.menucontext.then((value) =>{
            this.menu.innerHTML = value;
            this.play = document.querySelector('#play');
            this.settings = document.querySelector('#settings');
            this.quit = document.querySelector('#quit');
            this.Trigger('loadedHtml')
        });


        this.On('loadedHtml', () => {
            //onclick on this.play button
            this.play.addEventListener('click', () =>{
                this.menu.style.display = 'none';
            });
            
            //onclick on this.settings button
            this.settings.addEventListener('click', () =>{
                this.menu.style.display = 'none';
                window.SettingsMenu.Show();
            });

            //onclick quit button
            this.quit.addEventListener('click', () =>{
                window.close();
            });

            //on button press "m"
            window.addEventListener('keydown', (e) =>{
                if(e.keyCode == 77){
                    this.menu.style.display = 'block';
                }
            });
        })
    }

    Show(){
        this.menu.style.display = 'block';
    }

    Hide(){
        this.menu.style.display = 'none';
    }
    

}