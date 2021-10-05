/**
 * Created by Jan on 05 Oct 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

export default class Feedback{

    type;
    message;
    timeout;


    constructor(errorType, message, timeout = errorType.DEFAULTTIMEOUT) {
        this.type = errorType;
        this.message = message;
        this.timeout = timeout;

        Feedback.showFeedback(this);


    }

    static showFeedback(feedback){
        let div = document.createElement("div");
        div.id = "feedback";
        div.classList.add(feedback.type.COLOR);
        document.body.appendChild(div);

        let text = document.createElement("p");
        text.innerHTML = feedback.message;
        div.appendChild(text);

        setTimeout(function(){
            document.body.removeChild(div);
            }, feedback.timeout*1000);
    }

}