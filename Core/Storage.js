export default class Storage {
    constructor() {}

    static Get(key) {
        return window.localStorage.getItem(`DataHunt:${key}`);
    }

    static Set(key, value) {
        return window.localStorage.setItem(`DataHunt:${key}`, value);
    }

    static Remove(key) {
        return window.localStorage.removeItem(`DataHunt:${key}`);
    }
}