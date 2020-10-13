import { TOGGLE_SECTION } from "./actions";

const initialState = [];

export const toggleSectionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_SECTION:      
      return state.includes(payload) ? state.filter(item => item !== payload) : [...state, payload];
    default:
      return state;
  }
}