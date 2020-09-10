import {combineReducers} from 'redux';
import {appRoutesReducer} from "./routes/reducers";
import {currentModelReducer} from "./current-model/reducers";
import {formsStoreReducer} from "./forms-data-storage/reducers";


export default combineReducers({
  appRoutes: appRoutesReducer,
  currentModel: currentModelReducer,
  formsStore: formsStoreReducer,
});
