import {CONTROLLER_VALUE} from "./actions";

const defaultState = {
  value: '',
  controlId: ''

};

export function controllerReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case CONTROLLER_VALUE:{
      state = {
        ...action.data,
      };
    }break;
  }
  return state;
}
