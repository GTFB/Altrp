
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
// import ArrayConverter from "./ArrayConverter";
/**
 * @class DataConverter
 */
class DataConverter extends AltrpModel{
  /**
   * Изменяем данные
   * если тип не соответствует, то возращаем исходные данные
   * @param {*} data
   * @return {*}
   */
  convertData(data){
    if(! this.checkData(data)){
      return data;
    }
    return this.doConvert(data)
  }

  /**
   * Выполняем изменение данных
   */
  doConvert(data){
    const convertType = this.getConvertType();
    if(_.isFunction(this[convertType])){
      return this[convertType](data);
    }
    return data;
  }

  checkData(){
    return false;
  }

  /**
   * Тип получаемых данных
   * @return {string}
   */
  getDataType(){
    return this.getProperty('data_type');
  }
  /**
   * Тип получаемых данных
   * @return {string}
   */
  getConvertType(){
    return this.getProperty('convert_type');
  }
  /**
   * Тип получаемых данных
   * @param {number} index
   * @return {string}
   */
  getArgument(index = 1){
    return this.getProperty(`argument${index || 1}`);
  }
}

export default DataConverter