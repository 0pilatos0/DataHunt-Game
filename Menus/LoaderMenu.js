import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";

export default class LoaderScreen extends Menu {
    MaxProgress = 0
    constructor() {
        super();
        this.menu = document.getElementById('loaderScreen');
        this.menucontext = HtmlLoader.Load('./assets/elements/LoaderScreen.html');

        this.menucontext.then(data => {
            let context = data;
            let html = context.split('<script>')[0];
            this.menu.innerHTML = html;
            this.Trigger('ready')
            
            this.loadingMessages = [
                'Loading...',
                'Loading..',
                'Loading.',
                'Loading',
                'Loading.',
                'Loading..',
            ]
            this.progress = 0
            this.progressText = document.getElementById('progress-text')
            this.progressText.innerHTML = this.loadingMessages[0]

            this.textprogress = 0
            this.interval = setInterval(() => {
                this.progressText.innerHTML = this.loadingMessages[this.textprogress]
                this.textprogress++
                if (this.textprogress >= this.loadingMessages.length) {
                    this.textprogress = 0
                }
                if (Math.random() < 0.0001) {
                    this.progressText.innerHTML = "Secret message"
                }
            }, 500)

            this.progressActivity = document.getElementById('progress-activity')
            this.progressActivity.innerHTML = 'Searching Activity'

            

        })

    }
    UpdateProgress(activity = null){

        this.progress += (100 / this.MaxProgress)

        this.menu.getElementsByClassName('progressbar-fill')[0].style.width = this.progress + '%'
        if (activity) {
            this.progressActivity.innerHTML = activity
        }
        if (this.progress >= 100) {
            // console.log('Loading should be done')
            this.progressText.innerHTML = 'Loading done'
            clearInterval(this.interval)
            this.Hide()
        }
        
    }
    UpdateActivity(activity){
        this.progressActivity.innerHTML = activity
    }

    setMaxProgress(max){
        this.MaxProgress = max
    }
    increaseMaxProgress(amount){
        this.MaxProgress += amount
    }

    Hide(){
        super.Hide()
    }

    Show(){
        super.Show()
    }
}
