export const CHANGE_PAGE_STATE = 'CHANGE_PAGE_STATE';
export const CLEAR_PAGE_STATE = 'CLEAR_PAGE_STATE';

/**
 *
 * @param {string}stateName
 * @param {*} stateValue
 * @return {{}} -
 *   {
 *     type: {string},
 *     stateValue: {},
 *     stateName: {string},
 *   }
 */
export function changePageState(stateName, stateValue = {}) {
  return {
    type: CHANGE_PAGE_STATE,
    stateName,
    stateValue
  };
}
/**
 * Очищает состояние страницы
 */
export function clearPageState() {
  return {
    type: CLEAR_PAGE_STATE,
  };
}
