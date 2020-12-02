export const ADD_FONT = 'ADD_FONT';
export const REMOVE_FONT = 'REMOVE_FONT';

/**
 *
 * @param {string} elementId
 * @param {string} controllerName
 * @param {string} fontName
 * @return {{}} -
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function addFont(elementId, controllerName, fontName) {
  return {
    type: ADD_FONT,
    elementId,
    controllerName,
    fontName
  };
}

/**
 *
 * @param {string} elementId
 * @param {string} controllerName
 * @return {{}} -
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function removeFont(elementId, controllerName, ) {
  return {
    type: REMOVE_FONT,
    elementId,
    controllerName,

  };
}
