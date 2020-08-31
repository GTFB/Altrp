/**
 * Имеет интерфейс для доступы к свойствам data (любой вложенности)
 * @class AltrpModel
 */
class AltrpModel {
  constructor(data = {}) {
    console.log(data);
    this.data = _.cloneDeep(data);
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
    return _.get(this.data, name, defaultValue);
  }
}

export default AltrpModel