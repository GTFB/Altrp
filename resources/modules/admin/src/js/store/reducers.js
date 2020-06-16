import {combineReducers} from 'redux';
import {modalSettingsReducer} from "./modal-settings/reducers";
import {changeEnableState} from "./admin-state/reducers";


export default combineReducers({
  modalSettings: modalSettingsReducer,
  adminState: changeEnableState,
});
