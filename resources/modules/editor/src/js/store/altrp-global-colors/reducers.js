import Resource from "../../classes/Resource";
import { createGlobalColor } from "../../helpers";
import {
  SET_GLOBAL_COLORS,
  ADD_GLOBAL_COLOR,
  SET_GLOBAL_EFFECTS,
  ADD_GLOBAL_EFFECT,
  EDIT_GLOBAL_EFFECT,
  DELETE_GLOBAL_EFFECT
} from "./actions";

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
    case SET_GLOBAL_EFFECTS:
      {
        state = { ...state, effects: action.effects };
      }
      break;
    case ADD_GLOBAL_EFFECT:
      {
        state = { ...state, effects: [...state.effects, action.effect] };
      }
      break;
    case EDIT_GLOBAL_EFFECT:
      {
        const editedEffect = action.effect;
        state = {
          ...state,
          effects: state.effects.map(effect => {
            if (effect.guid === editedEffect.guid) {
              effect = editedEffect;
            }
            return effect;
          })
        };
      }
      break;
    case DELETE_GLOBAL_EFFECT:
      {
        const deletedEffect = action.effect;
        state = {
          ...state,
          effects: state.effects.filter(
            effect => effect.guid == deletedEffect.guid
          )
        };
      }
      break;
  }
  return state;
}
