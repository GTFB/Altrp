import {
  changeCurrentDataStorage,
  clearCurrentDataStorage,
  currentDataStorageLoaded
} from "../../store/current-data-storage/actions";
import Resource from "../../../../../editor/src/js/classes/Resource";
import appStore from "../../store/store";
import {clearFormStorage} from "../../store/forms-data-storage/actions";
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";

/**
 * @class DataStorageUpdater
 */
class DataStorageUpdater extends AltrpModel{

  constructor(data){
    super(data);
    this.setProperty('dataSourcesFormsDependent', []);
    appStore.subscribe(this.onStoreUpdate)
  }

  /**
   *  обновление currentDataStorage
   *  @param {Datasource[]} dataSources
   */
  async updateCurrent(dataSources = []){
    dataSources = _.sortBy(dataSources, data_source => data_source.priority);
    this.setProperty('currentDataSources', dataSources);
    /**
     * @member {Datasource} datasource
     */
    for(let datasource of dataSources){
      if(datasource.getWebUrl()){
        let params = datasource.getParams(window.currentRouterMatch.params, 'altrpforms.');
        let needUpdateFromForms = false;
        _.each(params, (paramValue, paramName) => {
          if(paramValue.indexOf('altrpforms.') === 0){
            params[paramName] = '';
            needUpdateFromForms = true;
          }
        });
        /**
         * Если нужно взять параметры из формы, то подписываемся на изменения полуeй формы
         * и сохраняем параметры, с которыми уже получили данные
         */
        if(needUpdateFromForms){
          this.subscribeToFormsUpdate(datasource, _.cloneDeep(params));
        }
        let res = {};
        if(datasource.getType() === 'show') {
          let id = _.get(params, 'id', _.get(this.props, 'match.params.id'));
          if(id){
            res = await (new Resource({route: datasource.getWebUrl()})).get(id);
          }
        } else if(! _.isEmpty(params)) {
          res = await (new Resource({route: datasource.getWebUrl()})).getQueried(params);
        } else {
          res = await (new Resource({route: datasource.getWebUrl()})).getAll();
        }
        res = _.get(res, 'data', res);
        appStore.dispatch(changeCurrentDataStorage(datasource.getAlias(), res));
      }
    }
    appStore.dispatch(currentDataStorageLoaded());
  }
  /**
   * Обнуляем текущее хранилище dataStorage
   */
  clearCurrent(){
    this.unsetProperty('currentDataSources');
    this.setProperty('dataSourcesFormsDependent', []);
    appStore.dispatch(clearCurrentDataStorage())
  }
  /**
    * подписывает какой либо источник данных на обновление от формы
   * @param {Datasource} datasource
   * @param {{}} params
   */
  subscribeToFormsUpdate(datasource, params) {
    let dataSources = this.getProperty('dataSourcesFormsDependent', []);

    // if(dataSources.indexOf(datasource) === -1){
    //   dataSources.push(datasource);
    // }
    if(_.findIndex(dataSources, ds =>{
      return ds.datasource === datasource;
    }) === -1){
      dataSources.push({
        datasource,
        params
      });
    }
  }
  /**
   * Вызывается, когда обновляется redux-хранилище
   */
  onStoreUpdate(){

  }
  /**
   * Вызывается, когда обновляется поле формы для того,
   * чтобы сделать новый запрос по тем datasource,
   * которые зависят от полей формы
   */
  async onFormsUpdate(){
    let dataSources = this.getProperty('dataSourcesFormsDependent', []);

    for(let {dataSource, params: oldParams} of dataSources) {
      /**
       * @member {Datasource} datasource
       */
      console.log(dataSource);
      console.log(oldParams);
    }
  }
}
window.dataStorageUpdater = window.dataStorageUpdater || new DataStorageUpdater();
export default window.dataStorageUpdater