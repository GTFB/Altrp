import { SET_USER_DATA } from "./actions";

const defaultState = {};

export function currentUserReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    
    case SET_USER_DATA: {
      state = action.userData;
    } break;
  }
  return state;
}