import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class InventoryMenu extends Menu{
    constructor() {
        super()
        this.menu = document.querySelector('#inventory');
        this.menucontext = HtmlLoader.Load('./assets/elements/Inventory.html');

        this.menucontext.then(data =>{
            let context = data;
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            this.Hide()

            let script = document.createElement('script');
            script.onload = () => {
                this.Trigger('ready')
            }
            script.src = "./Inventory/inventory.js";
            script.type = "module"

            document.head.appendChild(script);
        });
    }
}