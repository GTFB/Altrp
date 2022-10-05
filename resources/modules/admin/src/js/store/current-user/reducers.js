import { SET_USER_DATA, SET_USERS_ONLINE } from "./actions";

const defaultState = {};

export function currentUserReducer(state, action) {
  state = state || defaultState;
  switch (action.type) {

    case SET_USER_DATA: {
      state = action.userData;
    } break;
    case SET_USERS_ONLINE:
    {
      state = { ...state, members: action.members };

    }
      break;

  }
  return state;
}
