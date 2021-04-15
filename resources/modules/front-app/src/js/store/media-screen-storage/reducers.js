import { SET_CURRENT_SCREEN } from "./actions";
import CONSTANTS from "../../../../../editor/src/js/consts";
if (typeof window === "undefined") {
  global.window = {};
}
const defaultScreen =
  CONSTANTS.SCREENS.find(screen => {
    if (!screen.fullMediaQuery) {
      return false;
    }
    let query = screen.fullMediaQuery;
    query = query.replace("@media", "");
    if (typeof window === "undefined") {
      return false;
    }
    return typeof window.matchMedia !== "undefined"
      ? window?.matchMedia(query).matches
      : false;
  }) || CONSTANTS.SCREENS[0];

export function mediaScreenReducer(currentScreen, action) {
  currentScreen = currentScreen || defaultScreen;
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      {
        currentScreen = action.screen;
      }
      break;
  }
  return currentScreen;
}
