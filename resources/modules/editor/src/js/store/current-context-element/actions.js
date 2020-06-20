export const SET_CURRENT_CONTEXT_ELEMENT = 'SET_CURRENT_CONTEXT_ELEMENT';

export function setCurrentContextElement(element) {
  return {
    type: SET_CURRENT_CONTEXT_ELEMENT,
    element
  };
}

