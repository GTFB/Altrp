import {WEBSOCKETS_SERVER_ENABLED} from './actions'

const initialState = {};

export const websocketsReducer = (state = initialState, { type, item }) => {
  switch (type) {
    case WEBSOCKETS_SERVER_ENABLED:{
      state = { ...state, serverEnabled: item };

    }break;
  }
  return state;
}