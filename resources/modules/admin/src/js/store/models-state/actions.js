export const MODELS_TOGGLE = "MODELS_TOGGLE";
export const GET_MODEL_ID = "GET_MODEL_ID";

export const modelsToggle = (toggle) => ({
  type: MODELS_TOGGLE,
  payload: toggle
})

export const getModelId = (id) => ({
  type: GET_MODEL_ID,
  payload: id
})

