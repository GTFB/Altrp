export const CHANGE_CURRENT_DATASOURCE = 'CHANGE_CURRENT_DATASOURCE';
export const CLEAR_CURRENT_DATASOURCE = 'CLEAR_CURRENT_DATASOURCE';

/**
 *
 * @param {string}dataStorageName
 * @param {{}} data
 * @return {
 *   {
 *     type: {string},
 *     dataStorage: {},
 *     dataStorageName: {string},
 *   }
 * }
 */
export function changeCurrentDataStorage(dataStorageName, data = {}) {
  return {
    type: CHANGE_CURRENT_DATASOURCE,
    data,
    dataStorageName
  };
}
export function clearCurrentDataStorage() {
  return {
    type: CLEAR_CURRENT_DATASOURCE,
  };
}

