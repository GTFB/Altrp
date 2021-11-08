import {combineReducers} from 'redux';
import {customizerSettingsDataReducer} from "./customizer-settings/reducers";
import {currentCustomizerReducer} from "./current-customizer/reducers";
import {otherDataReducer} from "./other-data/reducers";


export default combineReducers({
  customizerSettingsData: customizerSettingsDataReducer,
  currentCustomizer: currentCustomizerReducer,
  otherData: otherDataReducer
});
