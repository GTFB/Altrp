import {START_DRAG, STOP_DRAG} from './actions'

const defaultState = {
  dragState: STOP_DRAG
};

export function elementDragReducer(state, action) {
  if(! state){
    return defaultState;
  }
  if(! action){
    return{dragState: STOP_DRAG}
  }
  switch (action.type) {
    case STOP_DRAG:{
      state = {
        dragState: STOP_DRAG,
        element:null,
      };
    }break;
    case START_DRAG:{
      state = {
        dragState: START_DRAG,
        element: action.element
      };
    }break;
  }
  return state;
}