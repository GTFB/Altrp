import { window } from "global";
import { SET_CURRENT_SCREEN } from "./actions";
import CONSTANTS from "../../../../../editor/src/js/consts";

const defaultScreen =
  CONSTANTS.SCREENS.find(screen => {
    const isBrowser = () => typeof window !== "undefined" && window;
    if (!isBrowser) {
      return false;
    }
    if (!screen.fullMediaQuery) {
      return false;
    }
    let query = screen.fullMediaQuery;
    query = query.replace("@media", "");
    return isBrowser ? window?.matchMedia(query).matches : false;
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
