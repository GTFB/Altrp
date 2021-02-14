import {createStore} from 'redux';
import rootReducer from './reducers'

let appStore = createStore(rootReducer);
window.appStore = appStore;
console.error(window);
if(window.ALTRP_DEBUG){
  let _dis = appStore.dispatch;
  appStore.dispatch = (function(action){
    console.trace(action);
    _dis.bind(appStore)(action);
  });
}
export default appStore;