/**
 * Created by Jan on 05 Oct 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

export default class Feedback{

    enum;
    message;
    timeout;


    constructor(enumType, message, timeout = enumType.DEFAULTTIMEOUT) {
        this.enum = enumType;
        this.message = message;
        this.timeout = timeout;

        Feedback.showFeedback(this);


    }

    static showFeedback(feedback){
        let div = document.createElement("div");
        div.id = feedback.enum.TYPE;
        div.classList.add(feedback.enum.COLOR);
        document.body.appendChild(div);

        let text = document.createElement("p");
        text.innerHTML = feedback.message;
        div.appendChild(text);

        setTimeout(function(){
            document.body.removeChild(div);
            }, feedback.timeout*1000);
    }

}