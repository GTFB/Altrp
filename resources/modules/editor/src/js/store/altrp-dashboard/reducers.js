import { EDIT_ELEMENT } from "./actions";

const defaultState = {};

export function elementReducer(state, action) {
  state = state || defaultState;
  const data = _.cloneDeep(action.payload);
  switch (action.type) {
    case EDIT_ELEMENT:
      {
        state = data;
      }
      break;
  }
  return state;
}
