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
    this.data = {};
    this.subscribers = []
  }

  /**
   * Подписывает функцию на обновления
   * @param callback
   */
  subscribeToUpdates(callback){

  }

  /**
   * Обновляет моделя с сервера
   */
  updateData(){

  }

  /**
   *
   */
  getData(){
    return this.data();
  }
}

export default AltrpModel