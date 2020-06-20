import {SET_LOGO} from "./actions";

const defaultState = window.admin_logo ? window.admin_logo : {};

export function adminLogoReducer(state, action) {
  state = state || defaultState;
  switch (action.type){
    case SET_LOGO:{
      state = {
          ...action.logoData
      };
    }break;
  }
  return state;
}