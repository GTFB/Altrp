import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

let store = createStore(rootReducer, composeWithDevTools());

export default store;

export function getCurrentElement() {
  return store.getState().currentElement.currentElement;
}
