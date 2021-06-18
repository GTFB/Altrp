export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';
export const REPLACE_SETTINGS = 'REPLACE_SETTINGS';

/**
 *
 * @param {string} elementId
 * @param {string} elementName
 * @param {{}}settings
 * @return {{}} - {
 *     type: {string},
 *     elementId: {string},
 *     settings: {{}},
 *     elementName: {string},
 *   }
 */
export function addSettings(elementId, elementName, settings) {
  return {
    type: CHANGE_SETTINGS,
    elementId,
    elementName,
    settings,
  };
}
/**
 *
 * @param {{}}settings
 * @return {{}} - {
 *     type: {string},
 *     elementId: {string},
 *     settings: {{}},
 *     elementName: {string},
 *   }
 */
export function replaceAllSettings(settings){
  return {
    type: REPLACE_SETTINGS,
    settings,
  };
}

