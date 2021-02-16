import {
  ADD_HISTORY_STORE_ITEM,
  DELETE_LAST_HISTORY_STORE_ITEMS,
  UNDO,
  REDO
} from "./actions";

const initialState = {
  history: [],
  current: -1
};

export const historyStoreReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ADD_HISTORY_STORE_ITEM:
      if(state.history.length === 0) {
        return {
          history: [payload],
          current: 0,
        }
      } else if(state.current < state.history.length - 1) {
        let newHistory = state.history;
        if(state.current === -1) {
          newHistory = [payload];
        } else if(state.current === 0) {
          newHistory = [newHistory[0], payload];
        } else {
          newHistory.splice(state.current - 1, newHistory.length - state.current - 1, payload);
        }
        return {
          history: newHistory,
          current: newHistory.length - 1
        }
      } else {
        return {
          history: [...state.history, payload],
          current: state.current + 1
        };
      }

    case UNDO:
      return {
        ...state,
        current: state.current - payload.count
      }
    
    case REDO:
      return {
        ...state,
        current: state.current + payload.count
      }

    case DELETE_LAST_HISTORY_STORE_ITEMS:
      const newHistory = [...state.history];
      newHistory.splice(newHistory.length - payload.count, payload.count);
      return {
        history: newHistory,
        current: state.current - payload.count
      };

    default:
      return state;
  }
};
