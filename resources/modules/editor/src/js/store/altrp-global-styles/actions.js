export const SET_GLOBAL_STYLES_PRESET = "SET_GLOBAL_STYLES_PRESET";
export const UPDATE_GLOBAL_STYLES_PRESET = "UPDATE_GLOBAL_STYLES_PRESET";
export const DELETE_GLOBAL_STYLES_PRESET = "DELETE_GLOBAL_STYLES_PRESET";

export function setGlobalStylesPresets(styles) {
  return {
    type: SET_GLOBAL_STYLES_PRESET,
    styles
  };
}

export function updateGlobalStylesPresets(widgetName, name, settings) {
  return {
    type: UPDATE_GLOBAL_STYLES_PRESET,
    widgetName,
    name,
    settings,
  };
}

export function deleteGlobalStylesPresets(widgetName, name) {
  return {
    type: DELETE_GLOBAL_STYLES_PRESET,
    widgetName,
    name,
  };
}

