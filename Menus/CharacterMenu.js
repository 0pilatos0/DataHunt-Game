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
            script.type = "module"

            document.head.appendChild(script);

            let back = document.querySelector('#characterBackButton')
            back.onclick = () => {
                this.Hide()
                window.MainMenu.Show()
            }

            window.addEventListener('keydown', this.#keydownCallback)
        });
    }

    Show(){
        super.Show()
        window.addEventListener('keydown', this.#keydownCallback)
    }

    Hide(){
        super.Hide()
        window.removeEventListener('keydown', this.#keydownCallback)
    }

    #keydownCallback = (e) => {
        switch (e.key) {
            case "m":
                window.MainMenu.Show()
                this.Hide()
                break;
            default:
                break;
        }
    }
}
