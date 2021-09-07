/**
 * Created by Jan on 02 Sep 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */

export default class ActiveQuest {

    quest;
    progress;

    constructor(quest, progress = 0) {
        this.quest = quest;
        this.progress = progress;
    }


}