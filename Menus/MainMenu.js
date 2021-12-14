import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";
import CharSelectMenu from './CharSelectMenu.js';


export default class MainMenu extends Menu{
    constructor(){
        super();
        this.menu = document.querySelector('#menu');
        this.menucontext = HtmlLoader.Load('./assets/elements/MainMenu.html');

        this.menucontext.then(data =>{
            this.menu.innerHTML = data;
            this.play = document.querySelector('div#play > h1');
            this.settings = document.querySelector('#settings > h2');
            this.quit = document.querySelector('#quit > h2');

            this.Hide()

            this.play.addEventListener('click', () =>{
                window.CharSelectMenu = new CharSelectMenu();
                this.Hide()
                window.CharSelectMenu.Show()
            });
            
            this.settings.addEventListener('click', () =>{
                this.Hide()
                window.SettingsMenu.Show();
            });

            this.quit.addEventListener('click', () =>{
                window.close();
            });

            this.Trigger('ready')
        });
    }
}
