import { SET_CURRENT_ROBOT } from "./actions";
import { SET_CHART_IN_CURRENT_ROBOT } from "./actions";

export function currentRobotReducer(state, action) {
  state = state || [];

  switch (action.type) {
    case SET_CURRENT_ROBOT:
      state = action.data;
      console.log(state);
      break;
    case SET_CHART_IN_CURRENT_ROBOT:
      state.chart = action.data;
      console.log(state);
      break;
  }
  return state;
}
