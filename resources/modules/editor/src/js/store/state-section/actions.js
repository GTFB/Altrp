export const SET_CURRENT_STATE = "SET_CURRENT_STATE";

export function setCurrentState(title, value) {
  return {
    type: SET_CURRENT_STATE,
    title,
    value,
  };
}
