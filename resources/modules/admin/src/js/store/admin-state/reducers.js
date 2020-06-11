import {SET_DISABLED, SET_ENABLE} from "./actions";

const defaultState = {
  adminEnable: true
};

export function changeEnableState(state, action) {
  state = state || defaultState;
  switch (action.type){
    case SET_DISABLED:{
      state = {
          ...state,
        adminEnable: false
      };
    }break;
    case SET_ENABLE:{
      state = {
        ...state,
        adminEnable: true
      };
    }break;
  }
  return state;
}