import {SET_ROBOT_SETTINGS, SET_ROBOT_EMAIL_TO, SET_ROBOT_EMAIL_MSG} from "./actions";
import {defaultData} from "../../components/sidebar/data/data";

const defaultState = defaultData;

export function robotSettingsDataReducer(state, action) {
  state = state || defaultState;
  
  switch (action.type){
    case SET_ROBOT_SETTINGS:{
      state = action.data;
    }break;
    case SET_ROBOT_EMAIL_TO:{
      state = state.map(i =>{
        if(i.type === "send_mail") i.data.to = action.value;
        return i;
      });
    }break;
    case SET_ROBOT_EMAIL_MSG:{
      state = state.map(i =>{
        if(i.type === "send_mail") i.data.message = action.value;
        return i;
      });
    }break;
    // case TOGGLE_MODAL:{
    //   state = {
    //     ...defaultState,
    //     active: ! state.active,
    //   };
    // }break;
  }
  return state;
}