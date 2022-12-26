export const SET_CURRENT_CONTEXT_ELEMENT = 'SET_CURRENT_CONTEXT_ELEMENT';

export function setCurrentContextElement(element, inMainWindow =false) {
  return {
    type: SET_CURRENT_CONTEXT_ELEMENT,
    element,
    inMainWindow
  };
}

