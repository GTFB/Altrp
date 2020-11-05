import { TOGGLE_TRIGGER } from "./actions";
import { SET_DEFAULT_TRIGGERS } from "./actions";

const initialState = [];

export const hideTriggersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_TRIGGER:      
      return state.includes(payload) ? state.filter(item => item !== payload) : [...state, payload];
    case SET_DEFAULT_TRIGGERS:
      return state.concat(payload);

    default:
      return state;
  }
};