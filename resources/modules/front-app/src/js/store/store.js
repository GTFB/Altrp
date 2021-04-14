import { createStore } from "redux";
import rootReducer from "./reducers";

if (typeof window === "undefined") {
  global.window = {};
}

let appStore = createStore(rootReducer);
window.appStore = appStore;
if (window.ALTRP_DEBUG) {
  let _dis = appStore.dispatch;
  appStore.dispatch = function(action) {
    console.trace(action);
    _dis.bind(appStore)(action);
  };
}
export default appStore;
