/**
 * Created by Jan on 02 Sep 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

class Quest {

    progress;
    questID;
    listenerID;
    amount;
    questDescription;


    constructor(progress, questID, amount, listenerID, questDescription) {
        this.progress = progress;
        this.amount = amount;
        this.questID = questID;
        this.listenerID = listenerID;
        this.questDescription = questDescription;

    }


}