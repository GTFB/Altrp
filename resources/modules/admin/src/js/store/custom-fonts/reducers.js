import {GET_CUSTOM_FONTS} from "./actions";

const defaultState = {
    metaValue: []
};

export function customFontsReduser(state, action) {
  state = state || defaultState;
  switch (action.type){
    case GET_CUSTOM_FONTS:{
      state = {
          ...state,
        metaValue: action.metaValue
      };
    }break;
  }
  return state;
}