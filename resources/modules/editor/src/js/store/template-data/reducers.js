import {SET_TEMPLATE_DATA} from './actions'

const defaultState = {
};

export function templateDataReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case SET_TEMPLATE_DATA:{
      state = action.templateData;
    }break;
  }
  return state;
}