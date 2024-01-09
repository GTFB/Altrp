import {SET_CATEGORY} from "./actions"



export function currentCategoryReducer(state, action) {
  state = state || {}
  switch (action.type) {
    case SET_CATEGORY:{
      state = action.category
    }break;
  }
  return state;
}
