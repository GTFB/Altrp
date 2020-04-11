import {createStore} from 'redux';
import rootReducer from './reducers'

let appStore = createStore(rootReducer);

export default appStore;