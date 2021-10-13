import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";


export default class SettingsMenu extends Menu{
    constructor(){
        super();
        this.menu = document.querySelector('#settingsM');
        this.menucontext = HtmlLoader.Load('./assets/elements/SettingsMenu.html');

        this.menucontext.then(data =>{
            let context = data;
            let script = context.split('<script>')[1].split('</script>')[0];
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            eval(script);

            this.Hide()

            this.menu.querySelector('#back').addEventListener('click', () => {
                this.Hide();
                window.MainMenu.Show();
            });

            this.Trigger('ready')
        });
    }
    
    
    get Volume(){
        return this.menu.querySelector('#volumeS').value;
    }
}