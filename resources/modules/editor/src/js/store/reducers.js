import {combineReducers} from 'redux';
import {currentElementReducer} from './current-element/reducers';
import {templateStatusReducer} from "./template-status/reducers";
import {elementDragReducer} from "./element-drag/reducers";
import {assetsSettingsReducer} from "./assets-browser/reducers";
import {currentElementContextReducer} from "./current-context-element/reducers";
import {controllerReducer} from "./controller-value/reducers";
import {columnWidthReducer} from "./column-width/reducers";


export default combineReducers({
  currentElement: currentElementReducer,
  currentContextElement: currentElementContextReducer,
  templateStatus: templateStatusReducer,
  elementDrag: elementDragReducer,
  assetsManagerSettings: assetsSettingsReducer,
  controllerValue: controllerReducer,
  columnWidth: columnWidthReducer
});
