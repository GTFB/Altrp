class DataObserver {
    constructor() {
        this.observers = [];
    }
    subscribe(fn) {
        this.observers.push(fn);
    }
    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }
}
export default DataObserver;
//# sourceMappingURL=DataObserver.js.map