export const SET_CURRENT_SCREEN = "SET_CURRENT_SCREEN";

export function setCurrentScreen({ icon, width }) {
  return {
    type: SET_CURRENT_SCREEN,
    icon,
    width
  }
}