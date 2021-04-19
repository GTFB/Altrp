class DataObserver {
    observers: Array<Object>;

    constructor() {
        this.observers = [];
    }

    subscribe(fn: Object): void {
        this.observers.push(fn);
    }

    unsubscribe(fn: Object): void {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }
}
export default DataObserver;
