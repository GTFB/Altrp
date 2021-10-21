import { MODELS_TOGGLE } from "./actions";

const initialState = {
  toggleModels: false
}

export const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODELS_TOGGLE:
      return {
        ...state,
        toggleModels: action.payload
      }
    default:
      return state;
  }
}
