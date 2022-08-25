export const CHANGE_CURRENT_DATASOURCE = "CHANGE_CURRENT_DATASOURCE";
export const CLEAR_CURRENT_DATASOURCE = "CLEAR_CURRENT_DATASOURCE";
export const SET_CURRENT_DATASOURCE_LOADED = "SET_CURRENT_DATASOURCE_LOADED";
export const SET_CURRENT_DATASOURCE_LOADING = "SET_CURRENT_DATASOURCE_LOADING";

/**
 *
 * @param {string}dataStorageName
 * @param {{}} data
 * @return {{}} -
 *   {
 *     type: {string},
 *     dataStorage: {},
 *     dataStorageName: {string},
 *   }
 */
export function changeCurrentDataStorage(
  dataStorageName,
  data = {},
  withOptions = false
) {
  const value = {
    type: CHANGE_CURRENT_DATASOURCE,
    data,
    dataStorageName,
  };

  if (withOptions) {
    value.data = _.get(data, "data", data);

    delete data.data;

    value.options = data;
  }
  return value;
}

/**
 * Перед загрузкой новых данных, старые удаляем
 * @return {{}} - type: string
 */
export function clearCurrentDataStorage() {
  return {
    type: CLEAR_CURRENT_DATASOURCE,
  };
}

/**
 * После загрузки сообщаем, что данный обновились, для вызовы _componentDidMount в компонентах элементов
 * @return {{type: string}}
 */
export function currentDataStorageLoaded() {
  return {
    type: SET_CURRENT_DATASOURCE_LOADED,
  };
}
/**
 * После загрузки сообщаем, что данный обновились, для вызовы _componentDidMount в компонентах элементов
 * @return {{type: string}}
 */
export function currentDataStorageLoading() {
  return {
    type: SET_CURRENT_DATASOURCE_LOADING,
  };
}
