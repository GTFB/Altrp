import {SET_LOGO} from "./actions";

const defaultState = admin_logo ? admin_logo : {};

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