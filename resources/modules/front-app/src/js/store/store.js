import { createStore } from "redux";
import rootReducer from "./reducers";
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
let appStore = createStore(rootReducer, preloadedState);
window.appStore = appStore;
if (window.ALTRP_DEBUG) {
  let _dis = appStore.dispatch;
  appStore.dispatch = function(action) {
    _dis.bind(appStore)(action);
  };
}
export default appStore;

appStore.subscribe(()=>{
  window.dispatchEvent(new Event('altrp-store-updates'))
  document.dispatchEvent(new Event('altrp-store-updates'))
})
