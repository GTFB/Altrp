import {CHANGE_APP_ROUTES,} from './actions'
import Route from "../../classes/Route";

let routes = [];
if(window.altrpPages){
  for (let _data of window.altrpPages) {
    routes.push(Route.routeFabric(_data));
  }
}
const defaultState = {
  routes,
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
