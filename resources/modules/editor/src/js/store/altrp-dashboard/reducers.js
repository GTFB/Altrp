import { EDIT_ELEMENT } from './actions';

const defaultState = null;

export function elementReducer(state, action) {
      state = state || defaultState;
      switch (action.type) {
            case EDIT_ELEMENT: {
                  state = {
                        ...action.payload,
                  };
            } break;
      }
      return state;
}