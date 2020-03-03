import {combineReducers} from 'redux';
import {currentElementReducer} from './current-element/reducers';


export default combineReducers({
  currentElement: currentElementReducer
});
