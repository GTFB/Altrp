const initialState = {
  elementTable: {}
}

export const elementTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_GLOBAL_ELEMENT_TABLE_ACTION":
      return {
        ...state,
        elementTable: action.payload
      }
    default:
      return state;
  }
}
