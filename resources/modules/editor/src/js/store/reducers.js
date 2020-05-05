import {combineReducers} from 'redux';
import {currentElementReducer} from './current-element/reducers';
import {templateStatusReducer} from "./template-status/reducers";
import {elementDragReducer} from "./element-drag/reducers";


export default combineReducers({
  currentElement: currentElementReducer,
  templateStatus: templateStatusReducer,
  elementDrag: elementDragReducer,
});
