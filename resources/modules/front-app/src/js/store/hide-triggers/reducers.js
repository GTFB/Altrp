import { TOGGLE_TRIGGER } from "./actions";

const initialState = [];

export const hideTriggersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_TRIGGER:      
      return state.includes(payload) ? state.filter(item => item !== payload) : [...state, payload];
    default:
      return state;
  }
}