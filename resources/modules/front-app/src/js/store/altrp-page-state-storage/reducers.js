import {CHANGE_PAGE_STATE, CLEAR_PAGE_STATE} from './actions'
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {setAltrpIndex} from "../../helpers";
import getDataFromLocalStorage from "../../functions/getDataFromLocalStorage";
import saveDataToLocalStorage from "../../functions/saveDataToLocalStorage";

const STORAGE_KEY = '__altrpPageState__'
const PAGE_STATE_KEY = '__altrpPageState__'
const defaultPageState = {
  [PAGE_STATE_KEY]: getDataFromLocalStorage(STORAGE_KEY, {})
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
    case CHANGE_PAGE_STATE: {
      let stateValue = action.stateValue;
      altrpPageState = _.cloneDeep(altrpPageState);
      if (_.isArray(stateValue)) {
        setAltrpIndex(stateValue);
      }
      altrpPageState.setProperty(action.stateName, stateValue);
      if (!_.isEqual(altrpPageState.getProperty(PAGE_STATE_KEY) , getDataFromLocalStorage(STORAGE_KEY, {}))) {
        saveDataToLocalStorage(STORAGE_KEY, altrpPageState.getProperty(PAGE_STATE_KEY))
      }

    }
      break;
    case CLEAR_PAGE_STATE: {
      altrpPageState = new AltrpModel(defaultPageState);
      saveDataToLocalStorage(STORAGE_KEY, {})
    }
      break;
  }
  if (altrpPageState instanceof AltrpModel) {
    return altrpPageState;
  }
  return new AltrpModel(altrpPageState);
}
