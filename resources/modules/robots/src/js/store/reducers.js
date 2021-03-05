import {combineReducers} from 'redux';
import {robotSettingsDataReducer} from "./robot-settings/reducers";
import {currentRobotReducer} from "./current-robot/reducers";


export default combineReducers({
  robotSettingsData: robotSettingsDataReducer,
  currentRobot: currentRobotReducer,
});