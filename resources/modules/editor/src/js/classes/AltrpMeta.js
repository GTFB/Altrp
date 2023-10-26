
import AltrpModel from './AltrpModel';
import {mbParseJSON} from "../../../../front-app/src/js/helpers";
/**
 * @class AltrpMeta
 */
class AltrpMeta extends AltrpModel{
  /**
   * Хранилище статусов получения данных, чтобы не делать много параллельных запросов
   * @type {{}}
   */
  static statuses = {};
  /**
   * Хранилище обратных вызовов, чтобы не делать много параллельных запросов
   * @type {{}}
   */
  static pendingCallbacks = {};
  /**
   * Кончтруктор
   * @param {string} metaName
   * @param {*} metaValue
   */
  constructor(metaName, metaValue){
    const data = {metaValue, metaName};

    super(data);
  }

  /**
   * Возвращает значение мета-свойства
   * @param {*} _default
   * @return {*}
   */
  getMetaValue(_default){
    return this.getProperty('metaValue') || _default;
  }
  /**
   * Сохраняет новое значение мета-свойства
   * @return {*}
   */
  setMetaValue(metaValue){
    return this.setProperty('metaValue', metaValue);
  }


  /**
   * Возвращает имя мета-свойства
   * @return {string}
   */
  getMetaName(){
    return this.getProperty('metaName');
  }
  async save(){
    const metaName = this.getMetaName();
    let metaValue = this.getMetaValue();
    if(_.isObject(metaValue)){
      metaValue = JSON.stringify(metaValue);
    }
    const Resource = (await import(/* webpackChunkName: 'Resource' */ './Resource')).default;
    const resource = new Resource({ route: `/admin/ajax/altrp_meta`});
    return (await resource.put(metaName, {meta_value:metaValue}));

  }

  static async saveGlobalStylesPresets(metaValue){
    const metaName = "global_styles";
    if(_.isObject(metaValue)){
      metaValue = JSON.stringify(metaValue);
    }
    const Resource = (await import(/* webpackChunkName: 'Resource' */ './Resource')).default;
    const resource = new Resource({ route: `/admin/ajax/altrp_meta`});
    return (await resource.put(metaName, {meta_value:metaValue}));

  }
  /**
   * Получить иета свойство с сервера
   *
   * @param {string} metaName
   * @return {Promise<AltrpMeta | null>}
   */
  static async getMetaByName(metaName) {
    if(! metaName){
      return null;
    }
    if(_.get(AltrpMeta, `statuses.${metaName}`) === 'loading'){
      return new Promise((resolve, reject) => {
        AltrpMeta.pendingCallbacks[metaName] = AltrpMeta.pendingCallbacks[metaName] || [];
        AltrpMeta.pendingCallbacks[metaName].push(resolve);
      })
    }
    AltrpMeta.statuses[metaName] = 'loading';
    const Resource = (await import(/* webpackChunkName: 'Resource' */ './Resource')).default;
    const resource = new Resource({ route: `/admin/ajax/altrp_meta`});
    try {
      let metaValue = _.get((await resource.get(metaName)), 'data.meta_value') || null;
      metaValue = mbParseJSON(metaValue);
      if(_.isArray(AltrpMeta.pendingCallbacks[metaName])){
        AltrpMeta.pendingCallbacks[metaName].forEach(callback=>{
          callback(new AltrpMeta(metaName, metaValue));
        });
      }
      AltrpMeta.statuses[metaName] = 'loaded';
      AltrpMeta.pendingCallbacks[metaName] = [];
      return new AltrpMeta(metaName, metaValue);
    }catch(error){
      if(_.isArray(AltrpMeta.pendingCallbacks[metaName])){
        AltrpMeta.pendingCallbacks[metaName].forEach(callback=>{
          callback(new AltrpMeta(metaName, null));
        });
      }
      AltrpMeta.statuses[metaName] = 'loaded';
      AltrpMeta.pendingCallbacks[metaName] = [];
      return new AltrpMeta(metaName, null);
    }
  }

  /**
   * Клонировать мета
   * @param {AltrpMeta} meta
   * @return {AltrpMeta}
   */
  static clone(meta){
    return new AltrpMeta(meta.getMetaName(), meta.getMetaValue());
  }
  /**
   * Клонировать мета
   */
  clone(){
    return new AltrpMeta(this.getMetaName(), this.getMetaValue());
  }
}
export default AltrpMeta
