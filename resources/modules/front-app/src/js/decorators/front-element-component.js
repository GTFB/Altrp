import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";

/**
 * Срабатываает перед удалением компонента элемента
 */
function componentWillUnmount(){
}

/**
 * Подписываемся на изменеия моделей
 */
function subscribeToModels(){
  /**
   * ЕСли в пропсах нет настроек для динамического контента, то на изменения моделей не подписываемся
   */
  if((! this.props.modelsSettings) && ! this.props.modelsSettings.length){
    return
  }
  this.props.modelsSettings.forEach(modelsSetting=>{
    console.log(modelsSetting);
    let modelInfo = this.element.getModelsInfoByModelName(modelsSetting.modelName);
    modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId, modelData => {
      this.setState(state=>{
        /**
         * state.modelsData
         * @type {{}}
         */
        let modelsData = state.modelsData || {};
        modelsData = {...modelsData};
        modelsData[modelInfo.modelName] = modelData[modelsSetting.fieldName] || '';
        return{...state, modelsData: {...modelsData}}
      })
    });
  });
  modelsList.forEach(modelInfo=>{
    modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId, modelData => {
      this.setState(state=>{
        /**
         * state.modelsData
         * @type {{}}
         */
        let modelsData = state.modelsData || {};
        modelsData = {...modelsData};
        modelsData[modelInfo.modelName] = modelData;
        return{...state, modelsData: {...modelsData}}
      })
    });
  });
}
/**
 * Декорирует компонент элемента методами необходимыми на фронте и в редакторе
 * @param component
 */
export default function frontDecorate(component) {
  component.componentWillUnmount = componentWillUnmount.bind(component);
  component.subscribeToModels = subscribeToModels.bind(component);
}