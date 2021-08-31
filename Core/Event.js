export default class Event {
    events = {};
    
    constructor(){

    }

    on(event, callback){
        if(!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    trigger(event, callbackData, keepFiringTillReceived = false){
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