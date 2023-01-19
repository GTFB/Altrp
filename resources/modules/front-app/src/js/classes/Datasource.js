/**
 * @class Datasource
 */
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {getDataByPath, isJSON, mbParseJSON} from "../helpers";
import qs from "qs"
class Datasource extends AltrpModel{
  /**
   * получить url для вэба
   * @return {string}
   */
  getWebUrl(){
    return this.getProperty('source.web_url').replace(/{([\s\S]+?)}/g, '');
  }
  /**
   * получить тип ресурса
   * @return {string}
   */
  getType(){
    return this.getProperty('source.type');
  }
  /**
   * получить url для вэба
   * @return {string}
   */
  getAlias(){
    return this.getProperty('alias');
  }

  /**
   * Получить параметры для запроса к ресурсу
   * @params {{}} urlParams
   * @params {string} excludePath - исключение из параметров, которые должны браться динамически
   * @return{null | {}}
   */
  getParams(urlParams = {}, excludePath = ''){
    const {currentModel, currentDataStorage} = appStore.getState();
    let parsedTemplate = this.getProperty('parameters');
    let params = {};
    if(! parsedTemplate){
      return null;
    }
    if(isJSON(parsedTemplate)){
      parsedTemplate = mbParseJSON(parsedTemplate, []);
      parsedTemplate = parsedTemplate.map(param=>{
        return [param.paramName, param.paramValue];
      });

    } else {
      parsedTemplate = parsedTemplate.split('\n');
      parsedTemplate = parsedTemplate.filter(line => line);
      parsedTemplate = parsedTemplate.map(line=> {
        line = line.split('|');
        line[0] = line[0].trim();
        if(line.length === 1){
          line.push(line[0]);
        } else {
          line[1] = line[1].trim();
        }
        return line
      });
    }
    parsedTemplate.forEach(([left, right])=>{
      if(right.match(/{{([\s\S]+?)(?=}})/g)){
        right = right.trim();
        right = right.match(/{{([\s\S]+?)(?=}})/g)[0].replace('{{', '');
        if(excludePath && right.indexOf(excludePath) === 0){
          right = right;
        } else {
          right = getDataByPath(right);
        }

      }
      if(right || right === 0){
        params[left] = right;
      }

    });
    if(this.getProperty('query_sync')){
      const _qs = qs.parse(location.search.replace('?',''))
      params = {
        ...params,
        ..._qs,
      }
    }
    return params;
  }
}

export default Datasource
