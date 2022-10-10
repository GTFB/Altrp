import {ADD_NODE, ADD_NODES, FILTER_NODE} from "./action";
import {initialState} from "./initialState";


export const nodeStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        nodes: [...state.nodes, action.payload]
      }
    case ADD_NODES:
      return {
        ...state,
        nodes: [...state.nodes, ...action.payload]
      }
    case FILTER_NODE:
      let node = [...state.nodes]
      let filterNode = node.filter(item => {
        if (action.payload()) {
          return true
        }
      })
      return {
        ...state,
        nodes: filterNode
      }
    default:
      return state;
  }
}
