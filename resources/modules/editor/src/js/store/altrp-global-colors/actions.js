export const SET_GLOBAL_COLORS = "SET_GLOBAL_COLORS";
export const ADD_GLOBAL_COLOR = "ADD_GLOBAL_COLOR";
export const SET_GLOBAL_EFFECT = "ADD_GLOBAL_COLOR";

export function setGlobalColors(colors) {
  return {
    type: SET_GLOBAL_COLORS,
    colors
  };
}

export function addGlobalColor(colors) {
  return {
    type: ADD_GLOBAL_COLOR,
    colors
  };
}

export function setGlobalEffect(effect) {
  return {
    type: SET_GLOBAL_EFFECT,
    effect
  };
}
