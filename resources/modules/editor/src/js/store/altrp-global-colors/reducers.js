import Resource from "../../classes/Resource";
import { createGlobalColor } from "../../helpers";
import {
  SET_GLOBAL_COLORS,
  ADD_GLOBAL_COLOR,
  SET_GLOBAL_EFFECTS,
  ADD_GLOBAL_EFFECT,
  EDIT_GLOBAL_EFFECT,
  DELETE_GLOBAL_EFFECT,
  SET_GLOBAL_FONTS,
  ADD_GLOBAL_FONT,
  EDIT_GLOBAL_FONT,
  DELETE_GLOBAL_FONT,
  EDIT_GLOBAL_COLOR
} from "./actions";
import getCssVarFromGlobalStyle from "../../helpers/get-css-var-from-global-style";

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
    case EDIT_GLOBAL_COLOR:
      {
        const editedColor = action.color;
        state = {
          ...state,
          colors: state.colors.map(color => {
            if (color.guid == editedColor.guid) {
              color = editedColor;
            }
            return color;
          })
        };
      }
      break;
    case ADD_GLOBAL_COLOR:
      {
        let color = {};
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
    case DELETE_GLOBAL_EFFECT: {
      const deletedEffect = action.effect;
      state = {
        ...state,
        effects: state.effects.filter(effect => effect.id !== deletedEffect.id)
      };
    }
    case SET_GLOBAL_FONTS:
      {
        state = { ...state, fonts: action.fonts };
      }
      break;
    case ADD_GLOBAL_FONT:
      {
        state = { ...state, fonts: [...state.fonts, action.font] };
      }
      break;
    case EDIT_GLOBAL_FONT:
      {
        const editedFont = action.font;
        state = {
          ...state,
          fonts: state.fonts.map(font => {
            if (font.guid === editedFont.guid) {
              font = editedFont;
            }
            return font;
          })
        };
      }
      break;
    case DELETE_GLOBAL_FONT:
      {
        const deletedFont = action.font;
        state = {
          ...state,
          fonts: state.fonts.filter(font => font.guid != deletedFont.guid)
        };
      }
      break;
  }
  return state;
}
