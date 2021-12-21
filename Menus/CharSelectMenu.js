import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class CharSelectMenu extends Menu{
    constructor() {
        super();
        this.menu = document.querySelector('#charSelect');
        this.menucontext = HtmlLoader.Load('./assets/elements/CharSelect.html');

        this.menucontext.then(data =>{
            window.client.emit('getCharacters', window.user.id)
            let charData = "";
            window.client.on('Characters', (chars) =>{
                chars.forEach(char =>{
                    charData += `<div><p>Lv. <span>${char.level}</span> ${char.name}</p></div>`
                })
                data = data.replace('{{characters}}', charData)

                this.menu.innerHTML = data;
                this.newChar = document.querySelector('#newChar');

                this.Hide()


                this.newChar.addEventListener('click', () =>{
                    this.Hide()
                    window.CharacterMenu.Show()
                });

                let back = document.querySelector('#charSelectBackButton')
                back.onclick = () => {
                    this.Hide()
                    window.MainMenu.Show()
                }

                this.Trigger('ready')

                window.addEventListener('keydown', this.#keydownCallback)
            })

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