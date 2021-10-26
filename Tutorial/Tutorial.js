import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import Menu from "../Core/Menu.js";
import Storage from "../Core/Storage.js";

export default class Tutorial extends Menu{

    constructor(){
        super();
        this.menu = document.querySelector('#tutorial');
        this.menucontext = HtmlLoader.Load('./assets/elements/TutorialWindow.html');
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
    
    Start(){
        this.menu.style.display = 'block';
        this.steps = this.menu.children;
        this.currentStep = 0;

        this.steps[0].style.display = 'block';

        this.keys = ['w', 'a', 's', 'd'];
        this.correctPressed = [];

        document.addEventListener('keydown', (e) => {
            if(this.keys.includes(e.key)){
                this.correctPressed.push(e.key);
                this.keys = this.keys.filter(key => key !== e.key);

            } 
            console.log(this.correctPressed);
            console.log(this.keys.length);
            if(this.keys.length === 0){
                if(this.currentStep == 0){
                    this.steps[0].style.display = 'none';
                    this.steps[1].style.display = 'block';
                    this.keys = ["i"]
                    this.correctPressed = [];
                    this.currentStep++;
                }
                else if(this.currentStep == 1){
                    this.steps[1].style.display = 'none';
                    this.steps[2].style.display = 'block';
                    this.keys = ["c"]
                    this.correctPressed = [];
                    this.currentStep++;
                }
                else if(this.currentStep == 2){
                    this.steps[2].style.display = 'none';
                    this.Complete();
                }
            }
        })   
    }
    
    Complete(){
        this.menu.style.display = 'none';
        this.currentStep = 0;

        Storage.Set('tutorialcompleted', true);
        
    }

    Reset(){
        this.currentStep = 0;
        
        Storage.Set('tutorialcompleted', false);
    }

}