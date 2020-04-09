import {CHANGE_TEMPLATE_STATUS} from './actions'
import {CONSTANTS} from "../../helpers";

const defaultState = {
  status: CONSTANTS.TEMPLATE_UPDATED,
};

export function templateStatusReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case CHANGE_TEMPLATE_STATUS:{
      state = {
        status: action.status,
      };
    }break;
  }
  return state;
}