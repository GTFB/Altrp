import {SET_COPY_NODE, SET_SELECT_NODE} from "./action";


const initialState = {
  copyNodeState: false,
  selectedNode: false,
  selectedNodeId: false,
}

export const copyNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COPY_NODE:
      return {
        ...state,
        copyNodeState: action.payload
      }
    case SET_SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
        selectedNodeId: action.payload_id
      }
    default:
      return state;
  }
}
