import {CONTROLLER_COLWIDTH} from "./actions";

const defaultState = {
  width: 100
};

export function columnWidthReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case CONTROLLER_COLWIDTH:{
      state = {
        ...action.data
      };
    }break;
  }
  return state;
}
