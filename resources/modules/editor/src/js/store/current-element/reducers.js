import { SET_CURRENT_ELEMENT } from "./actions";

const defaultState = {
  currentElement: {}
};

export function currentElementReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_CURRENT_ELEMENT:
      {
        state = {
          currentElement: action.element
        };
      }
      break;
  }
  return state;
}
