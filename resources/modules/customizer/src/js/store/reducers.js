import {combineReducers} from 'redux';
import {customizerSettingsDataReducer} from "./customizer-settings/reducers";
import {currentCustomizerReducer} from "./current-customizer/reducers";
import {otherDataReducer} from "./other-data/reducers";
import {copyNodeReducer} from "./copy-node/reducers";
import {nodeStateReducer} from "./node-store/reducers";
import {assetsSettingsReducer} from "../../../../editor/src/js/store/assets-browser/reducers";
import {connectionLineTypeReducer} from "./connection-line-type/reducers";


export default combineReducers({
  customizerSettingsData: customizerSettingsDataReducer,
  currentCustomizer: currentCustomizerReducer,
  otherData: otherDataReducer,
  copyNodeData: copyNodeReducer,
  assetsManagerSettings: assetsSettingsReducer,
  nodeStoreData: nodeStateReducer,
  connectionLineTypeData: connectionLineTypeReducer
});
