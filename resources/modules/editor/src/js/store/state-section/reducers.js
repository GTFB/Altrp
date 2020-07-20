import {SET_CURRENT_STATE} from "./actions"

const defaultState = {
  title: "Normal",
  value: "",
};

export function currentStateReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENT_STATE: {
      state = {
        ...state,
        title: action.title,
        value: action.value,
      };
    }
      break;
  }
  return state;
}
