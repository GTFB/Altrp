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
    this.setProperty('formsStore', appStore.getState().formsStore);
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
     * @member {Datasource} dataSource
     */
    for(let dataSource of dataSources){
      if(dataSource.getWebUrl()){
        let params = dataSource.getParams(window.currentRouterMatch.params, 'altrpforms.');
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
          this.subscribeToFormsUpdate(dataSource, _.cloneDeep(params));
        }
        let res = {};
        if(dataSource.getType() === 'show') {
          let id = _.get(params, 'id', _.get(this.props, 'match.params.id'));
          if(id){
            res = await (new Resource({route: dataSource.getWebUrl()})).get(id);
          }
        } else if(! _.isEmpty(params)) {
          res = await (new Resource({route: dataSource.getWebUrl()})).getQueried(params);
        } else {
          res = await (new Resource({route: dataSource.getWebUrl()})).getAll();
        }
        res = _.get(res, 'data', res);
        appStore.dispatch(changeCurrentDataStorage(dataSource.getAlias(), res));
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
   * @param {Datasource} dataSource
   * @param {{}} params
   */
  subscribeToFormsUpdate(dataSource, params) {
    let dataSources = this.getProperty('dataSourcesFormsDependent', []);

    // if(dataSources.indexOf(dataSource) === -1){
    //   dataSources.push(dataSource);
    // }
    if(_.findIndex(dataSources, ds =>{
      return ds.dataSource === dataSource;
    }) === -1){
      dataSources.push({
        dataSource,
        params
      });
    }
  }
  /**
   * Вызывается, когда обновляется redux-хранилище
   */
  onStoreUpdate = async () => {
    /**
     * Проверяем обновились ли формы
     * @type {formsStore}
     */
    let formsStore = appStore.getState().formsStore;
    if(this.getProperty('formsStore') !== formsStore){
      await this.onFormsUpdate();
      this.setProperty('formsStore', formsStore);
    }
  };
  /**
   * Вызывается, когда обновляется поле формы для того,
   * чтобы сделать новый запрос по тем dataSource,
   * которые зависят от полей формы
   */
  async onFormsUpdate(){
    let dataSources = this.getProperty('dataSourcesFormsDependent', []);
    let formsStore = appStore.getState().formsStore;
    for(let ds of dataSources) {
      let {dataSource, params: oldParams, updating} = ds;
      /**
       * @member {Datasource} dataSource
       */
      let params = dataSource.getParams(window.currentRouterMatch.params, 'altrpforms.');
      _.forEach(params, (paramValue, paramName)=>{
        if(paramValue.indexOf('altrpforms.') === 0){
          params[paramName] = _.get(formsStore, paramValue.replace('altrpforms.', ''))
        }
      });
      if(! _.isEqual(params, oldParams) && ! updating){
        ds.updating = true;
        let res = {};
        res = await (new Resource({route: dataSource.getWebUrl()})).getQueried(params);
        res = _.get(res, 'data', res);
        appStore.dispatch(changeCurrentDataStorage(dataSource.getAlias(), res));
        ds.params = params;
        ds.updating = false;
      }
    }
  }
}
window.dataStorageUpdater = window.dataStorageUpdater || new DataStorageUpdater();
export default window.dataStorageUpdater