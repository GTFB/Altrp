import {SET_CURRENT_TAB} from "./actions"

const defaultState = {
  currentTab: ''
};

export function currentTabReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_CURRENT_TAB:{
      state = {
        currentTab: action.tab,
      };
    }break;
  }
  return state;
}
