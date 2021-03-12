import {createStore} from 'redux';
import rootReducer from './reducers'

let frontAppStore = createStore(rootReducer);
window.appStore = frontAppStore;

if(window.ALTRP_DEBUG){
  let _dis = frontAppStore.dispatch;
  frontAppStore.dispatch = (function(action){
    console.trace(action);
    _dis.bind(frontAppStore)(action);
  });
}
export default frontAppStore;