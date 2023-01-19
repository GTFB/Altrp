import {SET_CURRENT_CONTEXT_ELEMENT} from './actions'

const defaultState = {
  currentElement: {},
};

export function currentElementContextReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_CURRENT_CONTEXT_ELEMENT:{
      state = {
        currentElement: action.element,
        inMainWindow: action.inMainWindow
      };
    }break;
  }
  return state;
}
