import {ADD_MESSAGES_CONTAINER} from "./actions";

const defaultState = {};

export function exportDashboard(state, action) {
  switch (action.type) {
    case ADD_MESSAGES_CONTAINER:
      const newState = _.cloneDeep(state);

      if(!newState[action.payload.name]) {
        newState[action.payload.name] = []
      }
      break
  }
  return state;
}
