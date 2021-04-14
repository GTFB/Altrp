import { DASHBOARD_EXPORT } from "./actions";
import _ from "lodash";

const defaultState = {};

export function exportDashboard(state, action) {
  state = state || defaultState;
  const data = _.cloneDeep(action.payload);
  switch (action.type) {
    case DASHBOARD_EXPORT:
      {
        state = data;
      }
      break;
  }
  return state;
}
