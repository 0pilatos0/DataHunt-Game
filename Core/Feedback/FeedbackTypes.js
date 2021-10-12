/**
 * Created by Jan on 05 Oct 2021
 * No part of this publication may be reproduced, distributed, or transmitted in any form or by any means.
 * Copyright © EpicGodLight
 */


export default class FeedbackTypes {

    static SUCCESS = {
        NAME: "success",
        TYPE: "feedback",
        DEFAULT_TIMEOUT: 5,
        COLOR: "feedback-success"
    };
    static GAMESUCCESS = {
        NAME: "success",
        TYPE: "game-feedback",
        DEFAULT_TIMEOUT: 5,
        COLOR: "feedback-success"
    };
    static ERROR = {
        NAME: "error",
        TYPE: "feedback",
        DEFAULT_TIMEOUT: 5,
        COLOR: "feedback-error"
    }


}