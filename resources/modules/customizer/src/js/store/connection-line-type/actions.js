export const SET_TYPE_LINE = "SET_TYPE_LINE";
export const SET_ANIMATE_LINE = "SET_ANIMATE_LINE";
export const SET_COLOR_LINE = "SET_COLOR_LINE";

export const setTypeLine = (type) => ({
  type: SET_TYPE_LINE,
  payload: type
})
export const setAnimateLine = (boolean) => ({
  type: SET_ANIMATE_LINE,
  payload: boolean
})

export const setColorLine = (color) => ({
  type: SET_COLOR_LINE,
  payload: color
})

