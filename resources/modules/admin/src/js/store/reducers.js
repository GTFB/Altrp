import {combineReducers} from 'redux';
import {modalSettingsReducer} from "./modal-settings/reducers";


export default combineReducers({
  modalSettings: modalSettingsReducer,
});
