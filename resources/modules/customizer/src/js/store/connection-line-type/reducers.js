import {SET_ANIMATE_LINE, SET_COLOR_LINE, SET_TYPE_LINE} from "./actions";

const initialState = {
  typeLine: 'default',
  animateLine: true,
  colorLine: '#8E94AA'
}

export const connectionLineTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE_LINE:
      return {
        ...state,
        typeLine: action.payload
      }
    case SET_ANIMATE_LINE:
      return {
        ...state,
        animateLine: action.payload
      }
    case SET_COLOR_LINE:
      return {
        ...state,
        colorLine: action.payload
      }
    default:
      return state;
  }
}
