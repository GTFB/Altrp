import AltrpModelUpdater from "../AltrpModelUpdater";

class ModelsManager {
  constructor(){
    this.modelsStorage = {};

  }

  /**
   *
   */
  updateModel(modelName, modelId){
    if(! this.modelsStorage[`${modelName}::${modelId}`]) {
      this.modelsStorage[`${modelName}::${modelId}`].updateData();
    }
  }

  /**
   * @param {AltrpModelUpdater} altrpModel
   */
  addModel(altrpModel){

  }

  /**
   * @param {string} modelName
   * @param {int} modelId
   * @return {AltrpModelUpdater}
   */
  getModel(modelName, modelId){

  }

  /**
   * Подписывается на изменения модели
   * @param {string} modelName
   * @param {int} modelId
   * @param {function} callback
   * @return {AltrpModelUpdater | null}
   */
  subscribeToModelUpdates(modelName, modelId, callback){
    if(! modelId){
      return null;
    }
    /**
     * model
     * @type {AltrpModelUpdater}
     */
    let model;
    if(! this.modelsStorage[`${modelName}::${modelId}`]){
      this.modelsStorage[`${modelName}::${modelId}`] = new AltrpModelUpdater(modelName, modelId);
    }
    model = this.modelsStorage[`${modelName}::${modelId}`];
    model.subscribeToUpdates(callback);
    return model;
  }
  /**
   * удаляем подписчика
   * @param {string} modelName
   * @param {int} modelId
   * @param {function} callback
   * @return {AltrpModelUpdater | null}
   */
  unsubscribe(modelName, modelId, callback){
    if(! modelId){
      return null;
    }
    /**
     * model
     * @type {AltrpModelUpdater}
     */
    let model;
    if(! this.modelsStorage[`${modelName}::${modelId}`]){
      return
    }
    model = this.modelsStorage[`${modelName}::${modelId}`];
    model.unsubscribe(callback);
    return model;
  }

  /**
   * Обновить названию и ИД модель данными
   * @param {string} modelName
   * @param {int} modelId
   * @param {{}} data
   * @return void
   */
  updateModelWithData(modelName, modelId, data){
    if(! this.modelsStorage[`${modelName}::${modelId}`]) {
      return;
    }
    this.modelsStorage[`${modelName}::${modelId}`].updateWithData(data);
  }
}
const modelManager =  new ModelsManager();
export default modelManager;