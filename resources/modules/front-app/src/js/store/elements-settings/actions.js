export const CHANGE_SETTINGS = 'CHANGE_SETTINGS';

/**
 *
 * @param {string}elementId
 * @param {string}elementName
 * @param {{}}settings
 * @return {{}} - {
 *     type: {string},
 *     sectionComponent: {React.Component},
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

