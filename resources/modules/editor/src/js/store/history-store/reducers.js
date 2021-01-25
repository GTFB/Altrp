import { ADD_HISTORY_STORE_ITEM, DELETE_LAST_HISTORY_STORE_ITEMS } from './actions';

const initialState = [];
// todo: сделать future  

export const historyStoreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_HISTORY_STORE_ITEM:
      return [ ...state, payload ]  
    case DELETE_LAST_HISTORY_STORE_ITEMS:
      const newState = [...state];
      newState.splice(newState.length - payload.count, payload.count);
      return newState;
    default:
      return state
  }
}