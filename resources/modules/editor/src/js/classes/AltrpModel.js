/**
 * @class AltrpModel
 */
class AltrpModel {
  /**
   *
   * @param {string} modelName
   * @param {int} modelId
   */
  constructor(modelName, modelId){
    this.modelName = modelName;
    this.modelId = modelId;
    this.data = null;
    this.subscribers = []
  }

  /**
   * Подписывает функцию на обновления
   * @param {function} callback
   */
  subscribeToUpdates(callback){

  }

  /**
   * Обновляет модель с сервера
   */
  updateData(){

  }

  /**
   * Передать данные всем подписчикам
   */
  callSubscribers(){

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

export default AltrpModel