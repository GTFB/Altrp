export const ADD_NODE = "ADD_NODE";
export const ADD_NODES = "ADD_NODES";
export const FILTER_NODE = "FILTER_NODE";

export const addNode = (obj) => ({
  type: ADD_NODE,
  payload: obj
})
/**
 *
 * @param {{}[]}nodes
 * @returns {{payload, type: string}}
 */
export const addNodes = (nodes) => ({
  type: ADD_NODES,
  payload: nodes
})

export const filterNode = (func) => ({
  type: FILTER_NODE,
  payload: func
})

window.storeActions = window.storeActions || {}
window.storeActions.filterNode = filterNode
window.storeActions.addNode = addNode
window.storeActions.addNodes = addNodes
