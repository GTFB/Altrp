import {
  SET_CURRENT_CUSTOMIZER,
  SET_CHART_IN_CURRENT_CUSTOMIZER
 } from "./actions";

export function currentCustomizerReducer(state, action) {
  state = state || {};

  switch (action.type) {
    case SET_CURRENT_CUSTOMIZER:
      state = action.data;
      break;
    case SET_CHART_IN_CURRENT_CUSTOMIZER:
      state.chart = action.data;
      break;
  }
  return state;
}
