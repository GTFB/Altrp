export const SET_GLOBAL_COLORS = "SET_GLOBAL_COLORS";
export const ADD_GLOBAL_COLOR = "ADD_GLOBAL_COLOR";
export const SET_GLOBAL_EFFECTS = "SET_GLOBAL_EFFECTS";
export const ADD_GLOBAL_EFFECT = "ADD_GLOBAL_EFFECT";
export const EDIT_GLOBAL_EFFECT = "EDIT_GLOBAL_EFFECT";
export const DELETE_GLOBAL_EFFECT = "DELETE_GLOBAL_EFFECT";

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

export function setGlobalEffects(effects) {
  return {
    type: SET_GLOBAL_EFFECTS,
    effects
  };
}

export function addGlobalEffect(effect) {
  return {
    type: ADD_GLOBAL_EFFECT,
    effect
  };
}

export function editGlobalEffect(effect) {
  return {
    type: EDIT_GLOBAL_EFFECT,
    effect
  };
}
export function deleteGlobalEffect(effect) {
  return {
    type: DELETE_GLOBAL_EFFECT,
    effect
  };
}
