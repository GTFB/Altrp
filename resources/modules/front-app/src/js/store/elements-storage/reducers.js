import {CLEAR_ELEMENTS, ADD_ELEMENT} from "./actions";

const defaultElementStorage = [];

export function elementsStorageReducer(elementStorage, action) {
  elementStorage = elementStorage || defaultElementStorage;
  switch (action.type) {
    case CLEAR_ELEMENTS: {
      elementStorage = defaultElementStorage;
    }
    break;
    case ADD_ELEMENT: {
      if(! _.isArray(elementStorage)){
        elementStorage = defaultElementStorage;
      }
      if(elementStorage.indexOf(action.elementComponent)){
        elementStorage.push(action.elementComponent);
        elementStorage = [...elementStorage];
      }
    }
    break;
  }
  return elementStorage;
}
