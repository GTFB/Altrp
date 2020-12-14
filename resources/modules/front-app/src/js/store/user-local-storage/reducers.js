import { CHANGE_USER_LOCAL_STORAGE } from "./actions";

const defaultLocalStorage = {
  element: "test"
};

export function changeLocalStorageReducer(data, action) {
  let result = data || defaultLocalStorage;
  switch (action.type) {
    case CHANGE_USER_LOCAL_STORAGE:
      {
        result = data;
      }
      break;
  }
  return result;
}
