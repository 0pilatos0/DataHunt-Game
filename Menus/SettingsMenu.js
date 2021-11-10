import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";


export default class SettingsMenu extends Menu {
    constructor() {
        super();
        this.menu = document.querySelector('#settingsM');
        this.menucontext = HtmlLoader.Load('./assets/elements/SettingsMenu.html');

        this.menucontext.then(data => {
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

    Show() {
        super.Show();
        this.GenerateList();
    }
    Hide() {
        super.Hide();
        this.menu.querySelector('#keybinds').innerHTML = '';
    }

    GenerateList() {
        let keybinds = window.KeybindsManager.GetAllKeybinds()
        for (let i = 0; i < keybinds.length; i++) {
            let keybind = keybinds[i];
            let keybindElement = document.createElement('div');
            keybindElement.classList.add('keybind');
            keybindElement.innerHTML = `<div class="keybind-name">${keybind.description}</div>
                                        <div class="keybind-key">${keybind.key}</div>
                                        <div class="keybind-button">
                                            <button class="keybind-edit">Edit</button>
                                            <button class="keybind-reset">Reset</button>
                                        </div>`;
            keybindElement.querySelector('.keybind-edit').addEventListener('click', () => {
                this.menu.querySelector('#keyinput').style.display = 'block';
                this.menu.querySelector('#keyinput p:last-child').innerHTML = `Changing the key: ${keybind.description  }`;
                this.menu.addEventListener('keydown', (e) => {
                    if(window.KeybindsManager.GetKeybindByKey(e.key) === null) {
                        window.KeybindsManager.UpdateKeybind(keybind.action, e.key);
                        this.menu.querySelector('#keyinput').style.display = 'none';
                        this.menu.querySelector('#keybinds').innerHTML = '';
                        this.GenerateList();
                    } else{
                        this.menu.querySelector('#keyinput').style.display = 'none';
                        this.menu.querySelector('#keybinds').innerHTML = '';
                        window.Feedback.ShowFeedback(window.FeedbackTypes.ERROR, `Keybind already in use`);
                        this.GenerateList();
                    }

                }, { once: true });

            })
            keybindElement.querySelector('.keybind-reset').addEventListener('click', () => {
                window.KeybindsManager.ResetKeybind(keybind.action);
                this.menu.querySelector('#keybinds').innerHTML = '';
                this.GenerateList();
            })
            this.menu.querySelector('#keybinds').appendChild(keybindElement);
        }
    }

    get Volume() {
        if (localStorage.getItem('volume') != null) {
            return localStorage.getItem('volume');
        }
    }
}