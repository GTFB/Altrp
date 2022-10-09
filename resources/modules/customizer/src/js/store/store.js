import { createStore,  } from "redux";
import {  connect } from "react-redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.customizerEditorStore = store;
window.customizerEditorStoreConnect = connect;
const loadStoreEvent = new Event('load-store');
document.dispatchEvent(loadStoreEvent)
export default store;
