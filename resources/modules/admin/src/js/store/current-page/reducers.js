import {SET_CURRENT_PAGE,} from "./actions";

const defaultState = null;

export function currentPageReducer(state, action) {
  state = state || defaultState;
  switch (action.type){
    case SET_CURRENT_PAGE:{
      state = action.pageData;
    }break;
  }
  return state;
}
