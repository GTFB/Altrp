import {
  SET_UPDATE_BUTTON,
 } from "./actions";

 let defaultState = {
  updateButton: '',
 }

export function otherDataReducer(state, action) {
  state = state || defaultState;

  switch (action.type) {
    case SET_UPDATE_BUTTON:
      state.updateButton = action.data;
      break;
  }
  return state;
}
