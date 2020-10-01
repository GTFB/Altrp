import { SET_SCROLL_TOP } from "./actions";

const initialState = { topPosition: undefined }

export const scrollReduser = (state = initialState, { type, topPosition }) => {
  switch (type) {
    case SET_SCROLL_TOP:
      return { ...state, topPosition };

    default:
      return state;
  }
}