import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";


export default class MainMenu extends Menu{
    constructor(){
        super();
        this.menu = document.querySelector('#menu');
        this.menucontext = HtmlLoader.Load('./assets/elements/MainMenu.html');

        this.menucontext.then(data =>{
            this.menu.innerHTML = data;
            this.play = document.querySelector('#play');
            this.settings = document.querySelector('#settings');
            this.quit = document.querySelector('#quit');

            this.Hide()

            this.play.addEventListener('click', () =>{
                this.Hide()
                window.CharacterMenu.Show()
            });
            
            this.settings.addEventListener('click', () =>{
                this.Hide()
                window.SettingsMenu.Show();
            });

            this.quit.addEventListener('click', () =>{
                window.close();
            });

            window.addEventListener('keydown', (e) =>{
                if(e.key == 'm'){
                    this.Show()
                }
            });

            this.Trigger('ready')
        });
    }
}