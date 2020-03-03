export const SET_CURRENT_ELEMENT = 'SET_CURRENT_ELEMENT';

export function setCurrentElement(element) {
  return {
    type: SET_CURRENT_ELEMENT,
    element
  };
}