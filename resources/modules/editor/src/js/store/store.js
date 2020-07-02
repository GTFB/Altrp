import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

let store = createStore(rootReducer, composeWithDevTools());

export default store;

/**
 * Возвращает текущий элемент (тот который в данный момент редлактируется)
 * @return {BaseElement}
 */
export function getCurrentElement() {
  return store.getState().currentElement.currentElement;
}
