import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class AccountMenu extends Menu{
    constructor() {
        super()
        this.menu = document.querySelector('#accountMenu');
        this.menucontext = HtmlLoader.Load('./assets/elements/AccountMenu.html')

        this.menucontext.then(data =>{
            let context = data;
            let script = context.split('<script>')[1].split('</script>')[0];
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            eval(script);

            this.Hide()
            
            this.Trigger('ready')
        })
    }
}