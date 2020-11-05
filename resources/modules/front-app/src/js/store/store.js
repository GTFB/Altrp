import {createStore} from 'redux';
import rootReducer from './reducers'

let appStore = createStore(rootReducer);
window.appStore = appStore;
let _t = appStore.dispatch;
appStore.dispatch = (_f) => {
  // console.log(_f);
  return _t(_f);
};
export default appStore;