import {SET_ACTIVE_SECTION} from './actions';

const defaultState = {};

export function settingSectionMenuReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ACTIVE_SECTION:
      let newState = {...state};
      newState[action.elementName] = newState[action.elementName] || {};
      /**
       * При повторном клике сохраним null, чтобы ни одна не была открыта
       */
      if(newState[action.elementName][action.tab] !== action.sectionID){
        newState[action.elementName][action.tab] = action.sectionID;
      } else {
        newState[action.elementName][action.tab] = null;
      }
      return newState;
    default:
      return state
  }
}
