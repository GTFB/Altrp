import {CHANGE_STATE_BY_NAME} from "./actions";

const defaultState = {
  width: 100
};

export function editorStateReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case CHANGE_STATE_BY_NAME:{
      state = {
        ...state,
        ...action.data
      };
    }break;
  }
  return state;
}
