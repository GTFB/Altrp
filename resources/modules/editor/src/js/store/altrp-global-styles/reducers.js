import { createGlobalColor } from "../../helpers";
import {
  ADD_UPDATE_GLOBAL_STYLES_PRESET
} from "./actions";
import {
  SET_GLOBAL_STYLES_PRESET,
  UPDATE_GLOBAL_STYLES_PRESET,
  DELETE_GLOBAL_STYLES_PRESET,
} from "./actions";

const defaultState = {};

export function globalStylesPresetsReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_GLOBAL_STYLES_PRESET:
      {
        state = { ...state, styles: action.styles };
      }
      break;
    case UPDATE_GLOBAL_STYLES_PRESET:
    {
      state = { ...state, styles: {
        ...state.styles,
        [action.widgetName]: {
          ...state.styles[action.widgetName],
          [action.name]: action.settings
        },
      }};
    }
    break;
    case DELETE_GLOBAL_STYLES_PRESET:
      {
      const styles = state.styles;

      delete styles[action.widgetName][action.name];

      state = { ...state, styles};
    }
    break;
  }
  return state;
}
