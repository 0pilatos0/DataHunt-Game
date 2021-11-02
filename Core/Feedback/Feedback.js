export default class Feedback{

    constructor() {

    }

    static ShowFeedback(enumType, message, timeout = enumType.DEFAULT_TIMEOUT){
        let div = document.createElement("div");
        div.id = enumType.TYPE;
        div.classList.add(enumType.COLOR);
        document.body.appendChild(div);

        let text = document.createElement("p");
        text.innerHTML = message;
        div.appendChild(text);

        setTimeout(function(){
            document.body.removeChild(div);
        }, timeout*1000);
    }

}