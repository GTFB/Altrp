/**
 * @class ModelsStorage
 */
class ModelsStorage {
  /**
   * Возвращает текущую модель
   * @return {Promise}
   */
  getCurrentModel() {
    if(this.currentModel){
      return new Promise((resolve, reject) => {
        resolve(this.currentModel);
      });
    }
    if(this.currentModelFetching){
      return this.currentModelFetching;
    }
    return new Promise((resolve, reject) => {
      reject({message: 'Current Model not Found'});
    })
  }

  /**
   * Отправляем запрос на обновление текущей модели
   */
  fetchCurrentModel() {

  }
}
const modelsStorage = new ModelsStorage();
export default modelsStorage