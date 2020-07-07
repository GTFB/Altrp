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
   * @return {AltrpModelUpdater}
   */
  subscribeToModelUpdates(modelName, modelId, callback){
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
}
const modelManager =  new ModelsManager();
export default modelManager;