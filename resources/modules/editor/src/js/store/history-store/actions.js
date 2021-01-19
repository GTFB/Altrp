export const ADD_HISTORY_STORE_ITEM = "ADD_HISTORY_STORE_ITEM";
export const DELETE_LAST_HISTORY_STORE_ITEMS = "DELETE_LAST_HISTORY_STORE_ITEM";

export const addHistoryStoreItem = (type, data) => ({
  type: ADD_HISTORY_STORE_ITEM,
  payload: {
    type,
    data
  }
});

export const deleteLastHistoryStoreItems = count => ({
  type: DELETE_LAST_HISTORY_STORE_ITEMS,
  payload: { count }
});
