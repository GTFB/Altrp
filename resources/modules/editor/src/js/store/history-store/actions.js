export const ADD_HISTORY_STORE_ITEM = "ADD_HISTORY_STORE_ITEM";
export const DELETE_LAST_HISTORY_STORE_ITEMS = "DELETE_LAST_HISTORY_STORE_ITEM";
export const UNDO = "UNDO";
export const REDO = "REDO";

export const addHistoryStoreItem = (type, data) => ({
  type: ADD_HISTORY_STORE_ITEM,
  payload: {
    type,
    data
  }
});

export const undoHistoryStore = count => ({
  type: UNDO,
  payload: { count }
});

export const redoHistoryStore = count => ({
  type: REDO,
  payload: { count }
});

export const deleteLastHistoryStoreItems = count => ({
  type: DELETE_LAST_HISTORY_STORE_ITEMS,
  payload: { count }
});
