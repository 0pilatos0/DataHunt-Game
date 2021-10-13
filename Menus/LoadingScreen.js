import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class LoadingScreen extends Menu {
    constructor() {
        super();
        this.menu = document.querySelector('#loader');
        this.menucontext = HtmlLoader.Load('./assets/elements/LoadingScreen.html');

        this.menucontext.then(data => {
            let context = data;
            //let script = context.split('<script>')[1].split('</script>')[0];
            let html = context.split('<script>')[0];

            this.menu.innerHTML = html;

            super.Hide()

            // this.Show()

            //eval(script);

            this.Trigger('ready')
        })
    }

    Hide(){
        this.menu.classList.remove("loaderenabled");
        this.menu.classList.add("loaderdisabled");
        setTimeout(() => {
            super.Hide()
        }, 1500)
    }

    Show(){
        super.Show()
        this.menu.classList.remove("loaderdisabled");
        this.menu.classList.add("loaderenabled");
    }
}
