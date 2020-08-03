import { CHANGE_TEMPLATE_STATUS } from "./actions";
import  CONSTANTS  from "../../consts";

const defaultState = {
  status: CONSTANTS.TEMPLATE_UPDATED,
};

export function templateStatusReducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_TEMPLATE_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
}
