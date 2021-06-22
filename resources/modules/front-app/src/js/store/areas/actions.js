export const SET_AREAS = 'SET_AREAS';

/**
 *
 * @param {Area[]} areas
 * @return {{}} - {
 *     type: {string},
 *     areas: {Area[]},
 *   }
 */
export function setAreas(areas) {
  return {
    type: SET_AREAS,
    areas,
  };
}
