export const MODELS_TOGGLE = "MODELS_TOGGLE";
export const GET_MODEL_ID = "GET_MODEL_ID";
export const GET_MODEL_RELATION_ID = "GET_MODEL_RELATION_ID";
export const GET_MODEL_STATIC_PROP = "GET_MODEL_STATIC_PROP";

export const modelsToggle = (toggle) => ({
  type: MODELS_TOGGLE,
  payload: toggle
})

export const getModelId = (id) => ({
  type: GET_MODEL_ID,
  payload: id
})

export const getModelRelationId = (id) => ({
  type: GET_MODEL_RELATION_ID,
  payload: id
})

export const getModelStaticProp = (modelID= null, prop_name= null) => ({
  type: GET_MODEL_STATIC_PROP,
  payload: {prop_name, modelID}
})

