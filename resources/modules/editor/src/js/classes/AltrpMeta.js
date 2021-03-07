
import AltrpModel from './AltrpModel';
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
   * @return {*}
   */
  getMetaValue(){
    return this.getProperty('metaValue');
  }
  /**
   * Возвращает значение мета-свойства
   * @return {*}
   */
  setMetaValue(metaValue){
    return this.getProperty('metaValue');
  }

  /**
   * Возвращает имя мета-свойства
   * @return {{}}
   */
  getMetaName(){
    return this.getProperty('metaName');
  }
  async save(){
    const metaName = this.getMetaName();
    const metaValue = this.getMetaValue();
    const Resource = (await import( './Resource')).default;
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
    const Resource = (await import( './Resource')).default;
    const resource = new Resource({ route: `/admin/ajax/altrp_meta`});
    try {
      const metaValue = _.get((await resource.get(metaName)), 'data.meta_value') || null;
      console.log(AltrpMeta.pendingCallbacks[metaName]);
      if(_.isArray(AltrpMeta.pendingCallbacks[metaName])){
        AltrpMeta.pendingCallbacks[metaName].forEach(callback=>{
          console.log(callback);
          callback(new AltrpMeta(metaName, metaValue));
        });
      }
      AltrpMeta.statuses[metaName] = 'loaded';
      AltrpMeta.pendingCallbacks[metaName] = [];
      return new AltrpMeta(metaName, metaValue);
    }catch(error){
      if(_.isArray(AltrpMeta.pendingCallbacks[metaName])){
        AltrpMeta.pendingCallbacks[metaName].forEach(callback=>{
          console.log(callback);
          callback(new AltrpMeta(metaName, null));
        });
      }
      AltrpMeta.statuses[metaName] = 'loaded';
      AltrpMeta.pendingCallbacks[metaName] = [];
      return new AltrpMeta(metaName, null);
    }
  }
}
export default AltrpMeta