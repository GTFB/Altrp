import Resource from "../../classes/Resource";
import { createGlobalColor } from "../../helpers";
import { SET_GLOBAL_COLORS, ADD_GLOBAL_COLOR } from "./actions";

const defaultState = [];

const globalColorsResource = new Resource({
  route: "/admin/ajax/global_template_styles"
});

export function globalStyleReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_GLOBAL_COLORS:
      {
        state = { ...state, colors: action.colors };
      }
      break;
    case ADD_GLOBAL_COLOR:
      {
        const color = {};
        color.settings = createGlobalColor();
        color.type = "color";
        globalColorsResource.post(color);
        state = { ...state, colors: [...state.colors, color] };
      }
      break;
  }
  return state;
}
