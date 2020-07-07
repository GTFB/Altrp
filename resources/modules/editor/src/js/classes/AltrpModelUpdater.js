/**
 * @class AltrpModelUpdater
 */
import Resource from "./Resource";

class AltrpModelUpdater {
  /**
   *
   * @param {string} modelName
   * @param {int} modelId
   */
  constructor(modelName, modelId){
    this.modelName = modelName;
    this.modelId = modelId;
    this.data = null;
    this.subscribers = [];
    this.resource = new Resource({route: `/ajax/models/${this.modelName}`});
  }

  /**
   * Подписывает функцию на обновления
   * @param {function} callback
   */
  subscribeToUpdates(callback){
    this.subscribers.push(callback);
    if(this.data){
      this.callSubscribers();
    } else {
      this.updateData();
    }
  }

  /**
   * Обновляет модель с сервера
   */
  async updateData(){
    this.data = await this.resource.get(this.modelId);
    this.callSubscribers();
  }

  /**
   * Передать данные всем подписчикам
   */
  callSubscribers(){
    this.subscribers.forEach(subscriber=>{
      subscriber(this.getData());
    })
  }

  /**
   * Отписаться (отписываемся перед удалением компонента)
   * @param callback
   */
  unsubscribe(callback){
    this.subscribers = _.remove(this.subscribers, (idx, item)=>{
      console.log(item);
      return callback === item;
    })
  }

  /**
   * Получить данные модели
   * @return {object | null}
   */
  getData(){
    return this.data;
  }
}

export default AltrpModelUpdater