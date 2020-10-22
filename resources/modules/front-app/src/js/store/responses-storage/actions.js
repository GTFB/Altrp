export const ADD_RESPONSE_DATA = 'ADD_RESPONSE_DATA';
export const CLEAR_ALL_RESPONSE_DATA = 'CLEAR_ALL_RESPONSE_DATA';

/**
 * Сохраняет ответ сервера при отправке формы в хранилище
 * @param {string}formId
 * @param {{}} data
 * @return {
 *   {
 *     type: {string},
 *     dataStorage: {},
 *     dataStorageName: {string},
 *   }
 * }
 */
export function addResponseData(formId, data = {}) {
  if(data.data) {
    data = data.data;
  }
  return {
    type: ADD_RESPONSE_DATA,
    data,
    formId
  };
}


/**
 * Очищает хранилище
 * @return {{type: string}}
 */
export function clearAllResponseData(){
  return {
    type: CLEAR_ALL_RESPONSE_DATA,
  };
}

