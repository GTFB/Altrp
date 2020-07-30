import { SET_CURRENT_SCREEN } from './actions'
import CONSTANTS from "../../consts";

const defaultState = CONSTANTS.SCREENS[0];

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
}