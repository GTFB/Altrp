import { SET_CURRENT_SCREEN } from './actions'

const defaultState = {
};

export function currentScreenReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      let newState = { ...state };
      newState.screen = action.screen

    default:
      return state;
  }
  return state;
}