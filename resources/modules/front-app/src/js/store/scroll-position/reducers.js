import { SET_SCROLL_TOP } from "./actions";

const initialState = {}

export const scrollReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SCROLL_TOP:
      return payload;

    default:
      return state;
  }
}