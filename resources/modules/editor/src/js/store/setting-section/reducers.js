import {SET_ACTIVE_SECTION} from './actions';

const defaultState = {};

export function settingSectionMenuReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      let newState = {...state};
      newState[action.elementName] = newState[action.elementName] || {};
      newState[action.elementName][action.tab] = action.sectionID;
      return newState;
    default:
      return state
  }
  return state;
}
