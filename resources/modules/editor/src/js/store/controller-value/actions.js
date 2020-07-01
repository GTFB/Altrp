export const CONTROLLER_VALUE = 'CONTROLLER_VALUE';
/**
 *
 * @param {*} value
 * @param {string} controlId
 * @returns {{data: {controlId: *, value: *}, type: string}}
 */
export function controllerValue(value, controlId) {
  return {
    type: CONTROLLER_VALUE,
    data: {
      controlId,
      value
    }
  };
}

