import {createStore} from 'redux';
import rootReducer from './reducers'

let appStore = createStore(rootReducer);
window.appStore = appStore;
export default appStore;