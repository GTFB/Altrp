import { combineReducers } from 'redux';
import { modalSettingsReducer } from "./modal-settings/reducers";
import { changeEnableState } from "./admin-state/reducers";
import { adminLogoReducer } from "./admin-logo/reducers";
import { assetsSettingsReducer } from "../../../../editor/src/js/store/assets-browser/reducers";
import { aceEditorReducer } from "./ace-editor/reducers";
import { currentUserReducer } from "./current-user/reducers";


export default combineReducers({
  modalSettings: modalSettingsReducer,
  adminState: changeEnableState,
  adminLogo: adminLogoReducer,
  assetsManagerSettings: assetsSettingsReducer,
  aceEditorReducer: aceEditorReducer,
  currentUser: currentUserReducer
});
