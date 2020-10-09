import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

let store = createStore(rootReducer, composeWithDevTools());
window.appStore = store;
export default store;

/**
 * Возвращает текущий элемент (тот который в данный момент редлактируется)
 * @return {BaseElement}
 */
export function getCurrentElement() {
  return store.getState().currentElement.currentElement;
}

export function getCurrentTab() {
  return store.getState().currentTab.currentTab;
}

export function getElementState() {
  return store.getState().currentState;
}

/**
 * Возвращает текущие настройки окна редактора
 *
 * @return {{}} - объект содержит свойства:
 * name
 * icon
 * id
 * width
 * css
 *
 */
export function getCurrentScreen() {
  return store.getState().currentScreen;
}
