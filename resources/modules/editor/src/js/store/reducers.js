import {combineReducers} from 'redux';
import {currentElementReducer} from './current-element/reducers';
import {templateStatusReducer} from "./template-status/reducers";
import {elementDragReducer} from "./element-drag/reducers";
import {assetsSettingsReducer} from "./assets-browser/reducers";
import {currentElementContextReducer} from "./current-context-element/reducers";


export default combineReducers({
  currentElement: currentElementReducer,
  currentContextElement: currentElementContextReducer,
  templateStatus: templateStatusReducer,
  elementDrag: elementDragReducer,
  assetsManagerSettings: assetsSettingsReducer,
});
