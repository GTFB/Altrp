export const ADD_ELEMENT = 'ADD_ELEMENT';
export const CLEAR_ELEMENTS = 'CLEAR_ELEMENTS';

/**
 *
 * @param {React.Component}elementComponent
 * @return {{}} - {
 *     type: {string},
 *     sectionComponent: {React.Component},
 *   }
 */
export function addElement(elementComponent) {
  return {
    type: ADD_ELEMENT,
    elementComponent
  };
}

/**
 * Перед загрузкой новых данных, старые удаляем
 * @return {{type: string}}
 */
export function clearElements() {
  return {
    type: CLEAR_ELEMENTS,
  };
}

