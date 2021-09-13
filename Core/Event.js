export default class Event {
    events = {};
    
    /**
     * This needs to be inherited to be working properly
     */
    constructor(){

    }

    /**
     * Sets listener for an event
     * @param {string} event 
     * @param {Function} callback 
     */
    On(event, callback){
        if(!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    /**
     * Triggers event with data
     * @param {string} event 
     * @param {any} callbackData 
     * @param {boolean} keepFiringTillReceived 
     */
    Trigger(event, callbackData, keepFiringTillReceived = false){
        if(!this.events[event] && keepFiringTillReceived){
            setTimeout(() => {
                this.trigger(event, callbackData);
            }, 10);
        }
        else{
            if(!this.events[event]) return;
            this.events[event].map(e => e(callbackData));
        }
    }
}