import {combineReducers} from 'redux';
import {robotSettingsDataReducer} from "./robot-settings/reducers";
import {currentRobotReducer} from "./current-robot/reducers";
import {otherDataReducer} from "./other-data/reducers";


export default combineReducers({
  robotSettingsData: robotSettingsDataReducer,
  currentRobot: currentRobotReducer,
  otherData: otherDataReducer
});