import {combineReducers} from 'redux';
import {appRoutesReducer} from "./routes/reducers";
import {currentModelReducer} from "./current-model/reducers";


export default combineReducers({
  appRoutes: appRoutesReducer,
  currentModel: currentModelReducer,
});
