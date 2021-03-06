import {
  WEBSOCKETS_SERVER_ENABLED,
  WEBSOCKETS_SERVER_KEY,
  WEBSOCKETS_SERVER_PORT
} from './actions'

const initialState = {};

export const websocketsReducer = (state = initialState, { type, item }) => {
  switch (type) {
    case WEBSOCKETS_SERVER_ENABLED:{

      state = { ...state,
        enabled: item,
      };

    }break;
    case WEBSOCKETS_SERVER_KEY:{

      state = { ...state,
        key: item
      };

    }break;
    case WEBSOCKETS_SERVER_PORT:{

      state = { ...state,
        port: item,
      };

    }break;
  }
  return state;
}