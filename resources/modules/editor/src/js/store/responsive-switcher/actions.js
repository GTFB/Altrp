export const SET_CURRENT_SCREEN = "SET_CURRENT_SCREEN";

export function setCurrentScreen(screen) {
  return {
    type: SET_CURRENT_SCREEN,
    screen
  }
}