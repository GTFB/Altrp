class ModelsManager {
  constructor(){
    this.modelsStorage = {};

  }

  /**
   *
   */
  updateModel(){

  }

  /**
   * @param {AltrpModel} altrpModel
   */
  addModel(altrpModel){

  }

  /**
   * @param {string} modelName
   * @param {int} modelId
   * @return {AltrpModel}
   */
  getModel(modelName, modelId){

  }

  /**
   * Подписывается на изменения модели
   * @param {string} modelName
   * @param {int} modelId
   * @param {function} callback
   */
  subscribeToModelUpdates(modelName, modelId, callback){

  }
}
const modelManager =  new ModelsManager();
export default modelManager;