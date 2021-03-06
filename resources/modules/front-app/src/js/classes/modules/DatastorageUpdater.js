import {
  changeCurrentDataStorage,
  clearCurrentDataStorage,
  currentDataStorageLoaded, currentDataStorageLoading
} from "../../store/current-data-storage/actions";
import Resource from "../../../../../editor/src/js/classes/Resource";
import AltrpModel from "../../../../../editor/src/js/classes/AltrpModel";
import {isJSON, mbParseJSON, replaceContentWithData} from "../../helpers";

/**
 * @class DataStorageUpdater
 */
class DataStorageUpdater extends AltrpModel {

  constructor(data) {
    super(data);
    this.setProperty('dataSourcesFormsDependent', []);
    this.setProperty('formsStore', appStore.getState().formsStore);
    appStore.subscribe(this.onStoreUpdate)
  }

  /**
   *  обновление currentDataStorage
   *  @param {Datasource[]} dataSources
   *  @param {boolean} initialUpdate
   */
  async updateCurrent(dataSources = null, initialUpdate = true) {
    if(! _.get(dataSources, 'length')){
      dataSources = this.getProperty('currentDataSources');
    }
    if(! dataSources){
      dataSources = [];
    }
    if(initialUpdate){
      this.setProperty('currentDataSources', dataSources);
      dataSources = dataSources.filter(dataSource => dataSource.getProperty('autoload'));
    }

    /**
     * Фильтруем проверяя на наличие обязательных параметров
     */
    dataSources = dataSources.filter(dataSource => {
      let parameters = dataSource.getProperty('parameters');
      if(! isJSON(parameters)){
        return true;
      }
      parameters = mbParseJSON(parameters, []);
      /**
       * Находим хотя бы один обзяательный параметр, который не имеет значения
       */
      return ! (parameters && parameters.find(param=>{
        if (param.paramValue.toString().indexOf('altrpforms.') !== -1) {
          let params = dataSource.getParams(window.currentRouterMatch.params, 'altrpforms.');
          this.subscribeToFormsUpdate(dataSource, params);
        }
        if(! param.required){
          return false;
        }
        let value = param.paramValue || '';
        if(value.indexOf('{{') !== -1){
          value = replaceContentWithData(value);
        }
        return ! value;
      }));
    });
    // dataSources = _.sortBy(dataSources, ['data.priority']);
    /**
     * @member {Datasource} dataSource
     */
    const groupedDataSources = {};
    dataSources.forEach(dataSource => {
      groupedDataSources[dataSource.getProperty('priority')] = groupedDataSources[dataSource.getProperty('priority')] || [];
      groupedDataSources[dataSource.getProperty('priority')].push(dataSource);
    });
    initialUpdate && appStore.dispatch(currentDataStorageLoading());
    for (let groupPriority in groupedDataSources){
      if(! groupedDataSources.hasOwnProperty(groupPriority)){
        continue;
      }
      initialUpdate && appStore.dispatch(currentDataStorageLoading());
      let requests = groupedDataSources[groupPriority].map(async dataSource => {

        if (dataSource.getWebUrl()) {
          let params = dataSource.getParams(window.currentRouterMatch.params, 'altrpforms.');
          let defaultParams = _.cloneDeep(params);
          let needUpdateFromForms = false;
          _.each(params, (paramValue, paramName) => {
            if (paramValue.toString().indexOf('altrpforms.') === 0) {
              params[paramName] = _.get(appStore.getState().formsStore, paramValue.toString().replace('altrpforms.', ''), '');
              needUpdateFromForms = true;
            }
          });
          /**
           * Если нужно взять параметры из формы, то подписываемся на изменения полуeй формы
           * и сохраняем параметры, с которыми уже получили данные
           */
          if (needUpdateFromForms) {
            this.subscribeToFormsUpdate(dataSource, _.cloneDeep(defaultParams));
          }
          let res = {};
          try {
            if (dataSource.getType() === 'show') {
              let id = _.get(params, 'id', _.get(this.props, 'match.params.id'));
              if (id) {
                res = await (new Resource({ route: dataSource.getWebUrl() })).get(id);
              }
            } else if (!_.isEmpty(params)) {
              res = await (new Resource({ route: dataSource.getWebUrl() })).getQueried(params);
              dataSource.params = _.cloneDeep(params);
            } else {
              res = await (new Resource({ route: dataSource.getWebUrl() })).getAll();
            }
          } catch (err) {
            if(err instanceof Promise){
              err = await err.then();
            }
            console.error(err);
          }
          res = _.get(res, 'data', res);
          appStore.dispatch(changeCurrentDataStorage(dataSource.getAlias(), res));
          return res;
        }
      });
      let responses = await Promise.all(requests);
      initialUpdate && appStore.dispatch(currentDataStorageLoaded());
    }
    // appStore.dispatch(currentDataStorageLoaded());
  }
  /**
   * Обнуляем текущее хранилище dataStorage
   */
  clearCurrent() {
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
    let dataSources = this.getProperty('dataSourcesFormsDependent');
    // if(dataSources.indexOf(dataSource) === -1){
    //   dataSources.push(dataSource);
    // }
    if (_.findIndex(dataSources, ds => {
      return ds.dataSource === dataSource;
    }) === -1) {
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

    if (!_.isEqual(this.getProperty('formsStore'), formsStore)) {
      await this.onFormsUpdate();
      this.setProperty('formsStore', formsStore);
    }
  };
  /**
   * Вызывается, когда обновляется поле формы для того,
   * чтобы сделать новый запрос по тем dataSource,
   * которые зависят от полей формы
   */
  async onFormsUpdate() {
    let dataSources = this.getProperty('dataSourcesFormsDependent', []);

    /**
     * Фильтруем проверяя на наличие обязательных параметров
     */
    dataSources = dataSources.filter(ds => {
      const {dataSource} = ds;
      let parameters = dataSource.getProperty('parameters');
      if(! isJSON(parameters)){
        return true;
      }
      parameters = mbParseJSON(parameters, []);
      /**
       * Находим хотя бы один обзяательный параметр, который не имеет значения
       */
      return ! parameters.find(param=>{
        if(! param.required){
          return false;
        }
        let value = param.paramValue || '';
        if(value.indexOf('{{') !== -1){
          value = replaceContentWithData(value);
        }
        return ! value;
      });
    });
    dataSources = _.sortBy(dataSources, data_source => data_source.priority);
    let formsStore = appStore.getState().formsStore;
    for (let ds of dataSources) {
      let { dataSource, updating } = ds;
      let oldParams = _.cloneDeep(dataSource.params);
      /**
       * @member {Datasource} dataSource
       */
      let params = dataSource.getParams(window.currentRouterMatch.params, 'altrpforms.');
      _.forEach(params, (paramValue, paramName) => {
        if (paramValue.toString().indexOf('altrpforms.') === 0) {
          params[paramName] = _.get(formsStore, paramValue.replace('altrpforms.', ''));
          // if(_.isArray(params[paramName])){
          //   params[paramName] = JSON.stringify(params[paramName]);
          // }
        }
      });
      if(updating){
        // console.error(params);
        // console.error(ds);
      }
      if (! _.isEqual(params, oldParams) && ! updating) {
        dataSource.params = _.cloneDeep(params);
        ds.updating = true;
        let res = {};
        try{
          res = await (new Resource({ route: dataSource.getWebUrl() })).getQueried(params);
          res = _.get(res, 'data', res);
          appStore.dispatch(changeCurrentDataStorage(dataSource.getAlias(), res));
        } catch (err) {
          if(err instanceof Promise){
            err = await err.then();
            err = mbParseJSON(err);
          }
          console.error(err);
        } finally {
          /**
           * В случае, если во время запроса возникла необходимость обновления с новыми параметрами,
           * сделаем новый запрос
           */
          if((ds.pendingParameters !== undefined) && ! _.isEqual(ds.pendingParameters, params)){
            try{
              res = await (new Resource({ route: dataSource.getWebUrl() })).getQueried(ds.pendingParameters);
              res = _.get(res, 'data', res);
              appStore.dispatch(changeCurrentDataStorage(dataSource.getAlias(), res));
              dataSource.params = _.cloneDeep(ds.pendingParameters);
            } catch (err) {
              if(err instanceof Promise){
                err = await err.then();
                err = mbParseJSON(err);
              }
              console.error(err);
            } finally {
              _.unset(ds, 'pendingParameters');
            }
          }
          ds.updating = false;
        }
        /**
         * В случае, если во время запроса возникла необходимость обновления с новыми параметрами,
         * сохраним эти параметры
         */
      } else if((! _.isEqual(params, oldParams)) && updating){
        ds.pendingParameters = _.cloneDeep(params);
      }
    }
  }
}
window.dataStorageUpdater = window.dataStorageUpdater || new DataStorageUpdater();
export default window.dataStorageUpdater