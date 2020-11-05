import { TRIGGER_POPUP } from "./actions";

const initialState = { popupID: null };

export const popupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TRIGGER_POPUP: {
      return {popupID: state.popupID === payload ? null : payload};
    }
    default:
      return state;
  }
};