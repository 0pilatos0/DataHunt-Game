import HtmlLoader from "../Core/Loaders/HtmlLoader.js";
import JsonLoader from "../Core/Loaders/JsonLoader.js";
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
    
    async Start(){
        this.menu.style.display = 'flex';
        this.menu.classList.add('tutorial-show');
        this.currentStep = 0;
        this.correctPressed = [];

        this.data = await JsonLoader.Load('./Tutorial/TutorialSteps.json')

        this.keys = this.data[this.currentStep].keys;
        this.keyscopy = this.keys;

        this.keysString = "";

        this.keys.map(key => {
            this.keysString += `<kbd id='tutorialKeybind-${key}'> ${window.KeybindsManager.GetKeyBindByOriginalKey(key).key} </kbd>`;
            if(this.keys.indexOf(key) != this.keys.length - 1){
                this.keysString += ' + ';
            }
        })


        this.menu.innerHTML = `<h5>${this.data[this.currentStep].title}</h5> <br> <span>${this.keysString}</span>`;

        document.addEventListener('keydown', (e) => {

            if(Storage.Get('tutorialcompleted') == null || Storage.Get('tutorialcompleted') == false){
                
                if(window.KeybindsManager.GetKeybindByKey(e.key)?.originalKey != null){

                    if(this.keys.includes(window.KeybindsManager.GetKeybindByKey(e.key).originalKey)){
                        this.correctPressed.push(window.KeybindsManager.GetKeybindByKey(e.key).originalKey);
                        this.keys = this.keys.filter(key => key !== window.KeybindsManager.GetKeybindByKey(e.key).originalKey);

                        let keybind = document.querySelector(`#tutorialKeybind-${window.KeybindsManager.GetKeybindByKey(e.key).originalKey}`);
                        if(keybind != null){
                            keybind.style.backgroundColor = '#00ff00';
                            keybind.style.color = '#000000';
                        }


                    } 
                    if(this.keys.length === 0){
                        this.currentStep++;
                        
                        if(this.currentStep < this.data.length){

                            this.keys = this.data[this.currentStep].keys;
                            this.keysString = "";
                            this.keys.map(key => {
                                this.keysString += `<kbd id='tutorialKeybind-${key}'> ${window.KeybindsManager.GetKeyBindByOriginalKey(key).key} </kbd>`;
                                if(this.keys.indexOf(key) != this.keys.length - 1){
                                    this.keysString += ' + ';
                                }
                            })

                            setTimeout(() => {
                                this.menu.innerHTML = `<h5>${this.data[this.currentStep].title}</h5> <br> <span>${this.keysString}</span>`;
                            }, 500);

                        } else{
                            setTimeout(() => {
                                this.Complete();
                            }, 500);
                            
                        } 
                    }
                }
            }
        })   
    }
    
    Complete(){
        
        let img = document.createElement('img');
        img.src = './assets/images/clipart-sword-soldier-3.png';
        img.classList.add('tutorial-complete');
        document.body.appendChild(img);

        this.menu.classList.add('tutorial-hide');
        setTimeout(() => {
            this.Hide();
            
        }, 1000);
        setTimeout(() => {
            document.body.removeChild(img);
        }, 5000);

        Storage.Set('tutorialcompleted', true);
    }

    Reset(){
        this.Start();
        Storage.Set('tutorialcompleted', false);
    }

}