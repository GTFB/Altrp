import { EDIT_ELEMENT } from "./actions";

const defaultState = {};

export function elementReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case EDIT_ELEMENT:
      {
        state = _.cloneDeep(action.payload, []);
      }
      break;
  }
  return state;
}
