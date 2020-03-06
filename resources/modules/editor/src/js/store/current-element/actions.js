export const SET_CURRENT_ELEMENT = 'SET_CURRENT_ELEMENT';
export const DROP_ELEMENT = 'ADD_CURRENT_ELEMENT';

export function setCurrentElement(element) {
  return {
    type: SET_CURRENT_ELEMENT,
    element
  };
}

export function dropCurrentElement(element) {
  return {
    type: DROP_ELEMENT,
    element
  };
}

