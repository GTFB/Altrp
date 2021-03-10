/**
 * @class ArrayConverter
 */
import DataConverter from "./DataConverter";
import {extractPathFromString, getDataByPath, parseParamsFromString} from "../../helpers";

class ArrayConverter extends DataConverter {
  /**
   * возвращает массив значений указанного свойства для массива объектов
   * @param data
   * @return {*}
   */
  extract(data) {
    let argument = this.getArgument(1);
    if (! argument) {
      return data;
    }
    return data.map(item=>{
      return getDataByPath(extractPathFromString(argument), '', item)
    })
  }
  /**
   * возвращает массив значений указанного свойства для массива объектов
   * @param data
   * @return {*}
   */
  map(data) {
    let argument = this.getArgument(1);
    if (! argument) {
      return data;
    }
    return data.map(item=>{
      return parseParamsFromString(argument, item, true)
    })
  }

  /**
   * Проверим данные на соответствие типу
   * @param data
   * @return {boolean}
   */
  checkData(data){
    super.checkData(data);
    return _.isArray(data);
  }
}

export default ArrayConverter