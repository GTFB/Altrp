import {initialState} from "./defaultState"

export const frontElementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FRONT_ELEMENT":
      let someName = state.frontElements.some(item => item.name === action.payload.name)

      if (!someName) {
        return {
          ...state,
          frontElements: [...state.frontElements, action.payload]
        }
      }
      break
    default:
      return state;
  }
}
