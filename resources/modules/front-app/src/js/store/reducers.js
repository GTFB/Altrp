import {combineReducers} from 'redux';
import {appRoutesReducer} from "./routes/reducers";


export default combineReducers({
  appRoutes: appRoutesReducer,
});
