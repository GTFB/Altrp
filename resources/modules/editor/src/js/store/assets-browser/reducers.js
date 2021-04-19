import { ASSETS_SHOW, ASSETS_TOGGLE } from "./actions";

const defaultState = {
  onChoose: function (media) {
    // console.log(media);
  },
  active: false,
};

export function assetsSettingsReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case ASSETS_SHOW: {
      state = {
        ...action.settings,
      };
    } break;
    case ASSETS_TOGGLE: {
      state = { ...state };
      state.active = false;
    } break;
  }
  return state;
}