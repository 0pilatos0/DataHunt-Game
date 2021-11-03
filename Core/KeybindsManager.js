import Storage from "./Storage.js";
import JsonLoader from "../Core/Loaders/JsonLoader.js";
import Event from "./Event.js";

export default class KeybindsManager extends Event {
    constructor() {
        super()
        //TODO Debugging line, remove on production branch. This line Clears user keybinds from local storage
        Storage.Remove("keybinds");

        JsonLoader.Load('../Settings/Keybinds.json').then(data => {
            this.keybinds = Storage.Get("keybinds")
            this.keybinds = JSON.parse(this.keybinds)

            this.currentDefaultKeybinds = data;

            //check if keybinds have been set before

            if (this.keybinds == null) {

                //if not, set default keybinds

                data = JSON.stringify(data);
                this.keybinds = data;
                Storage.Set("keybinds", this.keybinds);
                this.keybinds = JSON.parse(this.keybinds)
            } else if (this.keybinds.length != data.length) {

                //if they have, check if they are the same length and if not, set default keybinds

                data = JSON.stringify(data);
                this.keybinds = data;
                Storage.Set("keybinds", this.keybinds);
                this.keybinds = JSON.parse(this.keybinds)
            }
            this.Trigger("ready")
        })
    }

    //Get Specific keybind from user by action
    GetKeybindByAction(action) {
        for (let i = 0; i < this.keybinds.length; i++) {
            if (this.keybinds[i].action == action) {
                return this.keybinds[i];
            } else if (i == this.keybinds.length - 1) {
                return null;
            }
        }
    }

    //Get Specific keybind from user by key
    GetKeybindByKey(key) {
        for (let i = 0; i < this.keybinds.length; i++) {
            if (this.keybinds[i].key == key) {
                return this.keybinds[i];
            } else if (i == this.keybinds.length - 1) {
                return null;
            }
        }
    }

    //Get Specific keybind from user by the original key
    GetKeyBindByOriginalKey(key) {
        for (let i = 0; i < this.keybinds.length; i++) {
            if (this.keybinds[i].originalKey == key) {
                return this.keybinds[i];
            } else if (i == this.keybinds.length - 1) {
                return null;
            }
        }
    }
    

    //Update keybind for an specific action
    UpdateKeybind(action, key) {
        for (let i = 0; i < this.keybinds.length; i++) {
            if (this.keybinds[i].action == action) {
                this.keybinds[i].key = key;
                Storage.Set("keybinds", JSON.stringify(this.keybinds));
                return;
            } else if (i == this.keybinds.length - 1) {
                return null;
            }
        }
    }

    //Reset all keybinds to games default configured in the Keybinds.json file
    ResetKeybinds() {
        this.keybinds = this.currentDefaultKeybinds;
        Storage.Set("keybinds", JSON.stringify(this.keybinds));
        return;
    }

    GetAllKeybinds() {
        return this.keybinds;
    }
}