import {CHANGE_PAGE_STATE, CLEAR_PAGE_STATE} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

const defaultPageState = {
  
};
/**
 *
 * @param {{}|AltrpModel} altrpPageState
 * @param {{}}  action
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 * @return {AltrpModel}
 */
export function altrpPageStateReducer(altrpPageState, action) {
  altrpPageState = altrpPageState || new AltrpModel(defaultPageState);
  switch (action.type) {
    case CHANGE_PAGE_STATE:{
      let stateValue = action.stateValue;
      altrpPageState = _.cloneDeep(altrpPageState);
      altrpPageState.setProperty(action.stateName, stateValue);
    }break;
    case CLEAR_PAGE_STATE:{
      altrpPageState = new AltrpModel(defaultPageState);
    }break;
  }
  if(altrpPageState instanceof AltrpModel){
    return altrpPageState;
  }
  return new AltrpModel(altrpPageState);
}