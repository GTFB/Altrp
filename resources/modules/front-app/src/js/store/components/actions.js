export const SET_COMPONENTS = 'SET_COMPONENTS';
/**
 *
 * @param {{}} components
 * @return {{}} -
 *   {
 *     type: {string},
 *     metaValue: {},
 *     metaName: {string},
 *   }
 */
export function setComponents(components) {
  return {
    type: SET_COMPONENTS,
    components,
  };
}
