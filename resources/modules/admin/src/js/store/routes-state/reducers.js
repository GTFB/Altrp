import {initialState} from "./defaultState";

export const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROUTES":
      return {
        ...state,
        routes: action.payload
      }
    case "SET_MENU":
      return {
        ...state,
        mainMenu: action.payload
      }
    case "ADD_ROUTE":
      return {
        ...state,
        routes: [...state.routes, action.payload]
      }
    case "UPDATE_MODELS":
      return {
        ...state,
        models: action.payload
      }
    default:
      return state;
  }
}
