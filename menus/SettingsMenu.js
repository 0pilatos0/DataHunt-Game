import Event from "../Core/Event.js";
import HtmlLoader from "../Core/Loaders/HtmlLoader.js";


export default class SettingsMenu extends Event{


    constructor(){
        super();
        this.menu = document.querySelector('#settingsM');
        this.menucontext = HtmlLoader.Load('./assets/elements/Settings.html');

        this.menucontext.then((value) =>{
            let context = value;
            //split context into script and html
            let script = context.split('<script>')[1].split('</script>')[0];
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            //execute script
            eval(script);

            //hide settings menu
            this.menu.style.display = 'none';

            this.menu.querySelector('#back').addEventListener('click', () => {
                this.Hide();
                window.MainMenu.Show();
            });
        });
    }
    Show(){
        this.menu.style.display = 'block';
    }
    Hide(){
        this.menu.style.display = 'none';
    }
    
    get Volume(){
        return this.menu.querySelector('#volumeS').value;
    }
}