export default class Storage {
    constructor() {}

    static Get(key) {
        if (window.localStorage.getItem(`DataHunt:${key}`)) {
            return window.localStorage.getItem(`DataHunt:${key}`);
        } else {
            return null;
        }
    }

    static Set(key, value) {
        return window.localStorage.setItem(`DataHunt:${key}`, value);
    }

    static Remove(key) {
        if (window.localStorage.getItem(`DataHunt:${key}`)) {
            return window.localStorage.removeItem(`DataHunt:${key}`);
        } else {
            return null;
        }
    }
}