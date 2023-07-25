if (typeof window === "undefined") {
  global.window = {};
}
import { SET_CURRENT_SCREEN } from "./actions";
import CONSTANTS from "../../../../../editor/src/js/consts";

const defaultScreen =
  CONSTANTS.SCREENS.find(screen => {
    if (!screen.fullMediaQuery) {
      return false;
    }
    let query = screen.fullMediaQuery;
    query = query.replace("@media", "");
    return typeof window.matchMedia !== "undefined"
      ? window?.matchMedia(query).matches
      : false;
  }) || CONSTANTS.SCREENS[0];
if(!window.altrpHelpers.isEditor()){
  window.Cookies.set('__altrp_current_device', defaultScreen.name, { expires: 365 });
}
export function mediaScreenReducer(currentScreen, action) {
  currentScreen = currentScreen || defaultScreen;
  switch (action.type) {
    case SET_CURRENT_SCREEN:
      {
        window.Cookies.set('__altrp_current_device', action.screen.name, { expires: 365 });
        currentScreen = action.screen;
      }
      break;
  }
  return currentScreen;
}
