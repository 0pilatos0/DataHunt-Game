import ActiveQuest from "./ActiveQuest.js";

/**
 * Created by Jan on 02 Sep 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

export default class Quest {

    questID;
    listenerID;
    amount;
    questDescription;


    constructor(questID, amount, listenerID, questDescription) {
        this.amount = amount;
        this.questID = questID;
        this.listenerID = listenerID;
        this.questDescription = questDescription;

    }

    static loadQuests(playerQuests){
        let activeQuest = playerQuests;
        console.log(activeQuest);
        let questList = [];
        for(let i = 0; i < activeQuest.length; i++){
            let newQuest = new Quest(
                activeQuest[i].QuestID,
                activeQuest[i].Amount,
                activeQuest[i].QuestListener,
                activeQuest[i].QuestDescription.replace("{Amount}", activeQuest[i].Amount));
            questList.push(new ActiveQuest(newQuest, activeQuest[i].Progress));
        }
        return questList;
    }

    static startQuest(){


        //TODO start quest logic


    }



}