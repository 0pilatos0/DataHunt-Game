import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class CharacterMenu extends Menu{
    constructor() {
        super()
        this.menu = document.querySelector('#characterCreator');
        this.menucontext = HtmlLoader.Load('./assets/elements/CharacterCreator.html');

        this.menucontext.then(data =>{
            let context = data;
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            this.Hide()

            let script = document.createElement('script');
            script.onload = () => {
                this.Trigger('ready')
            }
            script.src = "./CharacterCreator/CharacterCreator.js";
            script.type="module"

            document.head.appendChild(script);
        });
    }
}