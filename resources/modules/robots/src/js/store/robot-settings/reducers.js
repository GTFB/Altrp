import {
  SET_ROBOT_SETTINGS,
  SET_ROBOT_EMAIL_TO,
  SET_ROBOT_EMAIL_MSG,
  SET_NODE_POSITION
} from "./actions";
import { defaultData } from "../../components/sidebar/data/data";

export function robotSettingsDataReducer(state, action) {
  state = state || [];

  switch (action.type) {
    case SET_NODE_POSITION:
      const nodeIndex = state.findIndex(node => node.id == action.value.id);
      state[nodeIndex].position = action.value.position;
      break;
    case SET_ROBOT_SETTINGS:
      state = action.data;
      break;
    case SET_ROBOT_EMAIL_TO:
      {
        state = state.map(i => {
          if (i.type === "send_mail") i.data.to = action.value;
          return i;
        });
      }
      break;
    case SET_ROBOT_EMAIL_MSG:
      {
        state = state.map(i => {
          if (i.type === "send_mail") i.data.message = action.value;
          return i;
        });
      }
      break;
    // case TOGGLE_MODAL:{
    //   state = {
    //     ...defaultState,
    //     active: ! state.active,
    //   };
    // }break;
  }
  return state;
}
