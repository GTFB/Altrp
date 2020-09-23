import appStore from "../store/store"
/**
 * @class Datasource
 */
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

class Datasource extends AltrpModel{
  /**
   * получить url для вэба
   * @return {string}
   */
  getWebUrl(){
    return this.getProperty('source.web_url');
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
   * @return{null | {}}
   */
  getParams(urlParams = {}){
    const {currentModel, currentDataStorage} = appStore.getState();
    let parsedTemplate = this.getProperty('parameters');
    const params = {};
    if(! parsedTemplate){
      return null;
    }
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
    parsedTemplate.forEach(([left, right])=>{
      if(right.match(/(?<={{)([\s\S]+?)(?=}})/g)){
        right = right.match(/(?<={{)([\s\S]+?)(?=}})/g)[0];
        if(right.indexOf('datasource.') === 0){
          right = right.replace('datasource.', '');
          right = currentDataStorage.getProperty(right)
        } else {
          right = urlParams[right] ? urlParams[right] : currentModel.getProperty(right);
        }
      }
      if(right || right === 0){
        params[left] = right;
      }

    });
    return params;
  }
}

export default Datasource