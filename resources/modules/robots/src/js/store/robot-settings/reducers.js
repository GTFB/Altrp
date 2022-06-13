import {
  SET_ROBOT_SETTINGS,
  SET_UPDATED_NODE
} from "./actions";

export function robotSettingsDataReducer(state, action) {
  state = state || [];

  switch (action.type) {
    case SET_UPDATED_NODE:
      const index = state.findIndex(node => node.id == action.value.id);
      state[index] = action.value;
      break;
    case SET_ROBOT_SETTINGS:
      state = action.data;
      break;
  }
  return state;
}
