import {GET_MODEL_ID, MODELS_TOGGLE} from "./actions";

const initialState = {
  toggleModels: false,
  modelID: null
}

export const modelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODELS_TOGGLE:
      return {
        ...state,
        toggleModels: action.payload
      }
    case GET_MODEL_ID:
      return {
        ...state,
        modelID: action.payload
      }
    default:
      return state;
  }
}
