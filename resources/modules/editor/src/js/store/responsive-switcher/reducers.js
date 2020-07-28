import { SET_CURRENT_SCREEN } from './actions'

const defaultState = {
  icon: '',
  width: '',
};

export function currentScreenReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      let newState = { ...state };
      newState.icon = action.icon;
      newState.width = action.width;
      return newState;

    default:
      return state;
  }
  return state;
};