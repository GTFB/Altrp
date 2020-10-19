export const TOGGLE_TRIGGER = "TOGGLE_TRIGGER";
export const SET_DEFAULT_TRIGGERS = "SET_DEFAULT_TRIGGERS";

export const toggleTrigger = payload => ({
  type: TOGGLE_TRIGGER,
  payload
})

export const setDefaultTriggers = payload => ({
  type: SET_DEFAULT_TRIGGERS,
  payload
})
