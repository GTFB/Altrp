/**
 * Имеет интерфейс для доступы к свойствам data (любой вложенности)
 * @class AltrpModel
 */
import {cloneDeep, get} from "lodash";

class AltrpModel {
  constructor(data = {}) {
    this.data = cloneDeep(data);
  }

  /**
   * Возваращает объект данных
   * @return {*}
   */
  getData() {
    return this.data;
  }

  /**
   * Возврашает значение свойства name
   * @params {string} name
   * @params {*} defaultValue
   * @return {*}
   */
  getProperty(name, defaultValue = '') {
    return get(this.data, name, defaultValue);
  }
}

export default AltrpModel