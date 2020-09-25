import Resource from "./Resource";
import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";
import {parseParamsFromString} from "../../../../front-app/src/js/helpers";

class Query {

  constructor(data, component){
    this.component = component;
    this.modelName = data.modelName || '';
    this.dataSource = data.dataSource;
    if(data.dataSource && data.dataSource.type === 'model_query'){
      this.dataSourceName = data.dataSource.value || '';
    }
    this.pageSize = data.pageSize || 10;
    this.paginationType = data.paginationType || 'pages';
    this.orderingField = data.orderingField || 'name';
    this.order = data.order || 'ASC';
    this.route = `/ajax/models/${this.modelName || (data.dataSource ? data.dataSource.value : '')}`;
    if(data.dataSource && data.dataSource.type === 'sql_datasource'){
      this.route = data.dataSource.value;
      this.dataSourceName = data.dataSource.sql_name || '';
    }
    /**
     * @member {AltrpModel} context
     */
    let context = _.cloneDeep(component.props.currentModel);
    context.setProperty('altrpdata', component.props.currentDataStorage.getData());
    this.setDefaultParams(parseParamsFromString(data.defaultParams, context));
  }
  /**
   *
   * @return {Resource}
   */
  getResource(){
    return new Resource({route: this.route});
  }


  /**
   * Поулчить данные с модели, которая хранится в компоненте
   * @param {{}} modelData
   * @return {array}
   */
  getFromModel(modelData){
    if(! modelData){
      return [];
    }
    if(_.isArray(modelData[this.dataSource.value])){
      return [...modelData[this.dataSource.value]];
    } else {
      return [{...modelData[this.dataSource.value]}]
    }
  }
  /**
   * Делает запрос с параметрами
   * @param params
   * @return {Promise}
   */
  async getQueried(params){
    if(this.dataSource && (this.dataSource.type === 'has_many_relation')){
      if(!this.modelUpdater){
        this.modelUpdater = modelManager.subscribeToModelUpdates(this.dataSource.model_name, this.component.getModelId(), this.component);
      } else {
        console.log(this.modelUpdater);
      }
    } else {
      this.lastQuery = (await this.getResource().getQueried(this.getParams(params)));
      let res;
      if(_.isArray(this.lastQuery)){
        res = [...this.lastQuery];
      } else if(_.isArray(this.lastQuery.data)){
        res = this.lastQuery.data;
      }
      res.hasMore = this.lastQuery.hasMore;
      return res;
    }
  }

  /**
   * Проверка есть ли еще
   */
  hasMore(){
    if(! this.lastQuery){
      return false;
    }
    return this.lastQuery.hasMore;
  }

  /**
   * Задать параметры по умолчанию
   * @params {{}} defaultParams
   */
  setDefaultParams(defaultParams = {}){
    this.defaultParams = defaultParams;
  }

  /**
   * Вернуть значения по умолчанию
   * @return {{}}
   */
  getDefaultParams(){
    this.defaultParams = this.defaultParams || {};
    this.defaultParams.pageSize = this.pageSize;
    return this.defaultParams;
  }

  /**
   * Сливает параметры с параметрами по умолчанию
   * @param {object} params
   * @return {object}
   */
  getParams(params) {
    params = {..._.assign(this.getDefaultParams(), params)};
    params.page = params.page || 1;
    return params;
  }

  /**
   * Получить стартовое значение для счетчика, если нужно показать номер по порядку в таблице
   * @param {int} page
   */
  getCounterStart(page){
    let counterStart = 1;
    if(this.pageSize < 1){
      return counterStart;
    }
    page = parseInt(page) || 1;
    counterStart = this.pageSize * (page - 1) + 1;
    return counterStart;
  }
}

export default Query