export const SET_CURRENT_ELEMENT = 'SET_CURRENT_ELEMENT';

export function setCurrentElement(element) {
  console.log(element);
  return {
    type: SET_CURRENT_ELEMENT,
    element
  };
}