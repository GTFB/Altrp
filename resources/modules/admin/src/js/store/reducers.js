import {combineReducers} from 'redux';
import {modalSettingsReducer} from "./modal-settings/reducers";
import {changeEnableState} from "./admin-state/reducers";
import {adminLogoReducer} from "./admin-logo/reducers";
import {assetsSettingsReducer} from "../../../../editor/src/js/store/assets-browser/reducers";
import {aceEditorReducer} from "./ace-editor/reducers";
import {currentUserReducer} from "../../../../front-app/src/js/store/current-user/reducers";
import { websocketsReducer } from "./websockets-storage/reducers";
import {customFontsReduser} from "./custom-fonts/reducers";
import {modelsReducer} from "./models-state/reducers";
import {routesReducer} from "./routes-state/reducers";
import {pluginsReducer} from "./plugins-state/reducers";


export default combineReducers({
  modalSettings: modalSettingsReducer,
  adminState: changeEnableState,
  adminLogo: adminLogoReducer,
  assetsManagerSettings: assetsSettingsReducer,
  aceEditorReducer: aceEditorReducer,
  currentUser: currentUserReducer,
  websocketStore: websocketsReducer,
  customFonts: customFontsReduser,
  modelsState: modelsReducer,
  routesState: routesReducer,
  pluginsState: pluginsReducer
});
