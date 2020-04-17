import {createStore} from 'redux';
import rootReducer from './reducers'

let store = createStore(rootReducer);
export default store;
export function getCurrentElement() {
  return store.getState().currentElement.currentElement;
}