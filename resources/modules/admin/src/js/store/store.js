import {createStore} from 'redux';
import rootReducer from './reducers'

const store = createStore(rootReducer);
window.adminStore = store
export default store;
