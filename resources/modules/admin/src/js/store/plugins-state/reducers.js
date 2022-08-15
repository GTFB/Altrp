const initialState = {
  alt_seo: null
}

export const pluginsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVATE_ALT_SEO":
      return {
        ...state,
        alt_seo: action.payload
      }
    default:
      return state;
  }
}
