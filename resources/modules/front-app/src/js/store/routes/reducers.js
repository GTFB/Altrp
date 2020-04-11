import {CHANGE_APP_ROUTES} from './actions'

const defaultState = {
  routes: [],
};

export function appRoutesReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {
    case CHANGE_APP_ROUTES:{
      state = {
        routes: action.routes,
      };
    }break;
  }
  return state;
}