/**
 * Created by Jan on 02 Sep 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

testPlayer = [];

function LoadQuests(player){
    activeQuest = quest.Quests;

    for(let i = 0; i < activeQuest.length; i++){
        let quest = new Quest(
            activeQuest[i].Progress,
            activeQuest[i].QuestID,
            activeQuest[i].Amount,
            activeQuest[i].QuestListener,
            activeQuest[i].QuestDescription.replace("{Amount}", activeQuest[i].Amount));
        testPlayer.push(new ActiveQuest(quest, player));
    }
}
