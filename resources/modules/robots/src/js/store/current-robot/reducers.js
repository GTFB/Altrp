import {
  SET_CURRENT_ROBOT,
  SET_CHART_IN_CURRENT_ROBOT
 } from "./actions";

export function currentRobotReducer(state, action) {
  state = state || [];

  switch (action.type) {
    case SET_CURRENT_ROBOT:
      state = action.data;
      break;
    case SET_CHART_IN_CURRENT_ROBOT:
      state.chart = action.data;
      break;
  }
  return state;
}
