const initialState = {
  globalStylesCss: "",
}

export const globalStylesCssReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GLOBAL_STYLES_CSS":
      return {
        ...state,
        globalStylesCss: action.payload
      }
    default:
      return state;
  }
}
