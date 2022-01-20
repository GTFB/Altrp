export const ADD_NODE = "ADD_NODE";
export const FILTER_NODE = "FILTER_NODE";

export const addNode = (obj) => ({
  type: ADD_NODE,
  payload: obj
})

export const filterNode = (func) => ({
  type: FILTER_NODE,
  payload: func
})
