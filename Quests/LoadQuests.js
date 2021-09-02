/**
 * Created by Jan on 02 Sep 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */


import Quest from "./Quest.js";
import ActiveQuest from "./ActiveQuest.js";

export default class LoadQuests{


    static loadQuests(player, quest){
        let activeQuest = quest.Quests;
        let QuestList = [];
        for(let i = 0; i < activeQuest.length; i++){
            let newQuest = new Quest(
                activeQuest[i].Progress,
                activeQuest[i].QuestID,
                activeQuest[i].Amount,
                activeQuest[i].QuestListener,
                activeQuest[i].QuestDescription.replace("{Amount}", activeQuest[i].Amount));
            QuestList.push(new ActiveQuest(newQuest, player));
        }
        return QuestList;
    }
}

