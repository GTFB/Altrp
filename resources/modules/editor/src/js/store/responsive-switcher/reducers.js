import { SET_CURRENT_SCREEN } from './actions'

const defaultState = { icon: "wide_screen", name: "Desktop", id: 1, width: '100%', css: '' }

export function currentScreenReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_SCREEN: {
      state = {
        ...action.screen
      }
    }
    default:
      return state;
  }
  return state;
};