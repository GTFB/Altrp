import {SET_DISABLED, SET_ENABLE, SET_PROPERTY, SET_DISABLED_RESET, SET_ENABLE_RESET} from "./actions";

const defaultState = {
  adminEnable: true,
  resetEnable: false
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
    case SET_DISABLED_RESET:{
      state = {
        ...state,
        resetEnable: false
      };
    }break;
    case SET_ENABLE_RESET:{
      state = {
        ...state,
        resetEnable: true
      };
    }break;
    case SET_PROPERTY:{
      const {propertyName, value} = action;
      if(propertyName){

        state = {
          ...state,
        };
        _.set(state, propertyName, value);
      }
    }break;
  }
  return state;
}
