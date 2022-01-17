import {SET_COPY_NODE} from "./action";


const initialState = {
  copyNodeState: null
}

export const copyNodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COPY_NODE:
      return {
        ...state,
        copyNodeState: action.payload
      }
    default:
      return state;
  }
}
