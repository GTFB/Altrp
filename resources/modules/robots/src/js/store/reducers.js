import {combineReducers} from 'redux';
import {robotSettingsDataReducer} from "./robot-settings/reducers";


export default combineReducers({
  robotSettingsData: robotSettingsDataReducer,
});
