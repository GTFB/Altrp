import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";

/**
 * Срабатываает перед удалением компонента элемента
 */
function componentWillUnmount(){
  // if(this.model){
  //   this.model.uns
  // }
}
/**
 * Подписываемся на изменеия моделей
 */
function subscribeToModels(){
  /**
   * ЕСли в элементе нет настроек для динамического контента, то на изменения моделей не подписываемся
   */
  if(! this.props.element.dynamicContentSettings){
    return
  }

  this.props.element.dynamicContentSettings.forEach(modelsSetting=>{
    let modelInfo = this.props.element.getModelsInfoByModelName(modelsSetting.modelName);
    console.log(modelsSetting);
    if(modelInfo)
    this.model = modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId, modelData => {
      this.setState(state=>{
        /**
         * state.modelsData
         * @type {{}}
         */
        let modelsData = state.modelsData || {};
        modelsData = {...modelsData};
        console.log(modelsSetting.fieldName);
        modelsData[modelsSetting.settingName] = modelData[modelsSetting.fieldName] || '';
        return{...state, modelsData}
      });
    });
  });
  // modelsList.forEach(modelInfo=>{
  //   modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId, modelData => {
  //     this.setState(state=>{
  //       /**
  //        * state.modelsData
  //        * @type {{}}
  //        */
  //       let modelsData = state.modelsData || {};
  //       modelsData = {...modelsData};
  //       modelsData[modelInfo.modelName] = modelData;
  //       return{...state, modelsData: {...modelsData}}
  //     })
  //   });
  // });
}

/**
 * Получает данные для контента элемента
 * Проверяет явлется ли свойство настроек динамическим контентом, если да берет это свойство из this.state.modelsData
 * (делегирут на FrontElement.getContent())
 * @param {string} settingName
 * @return {*}
 */
function getContent(settingName) {
  /**
   * @property this.props.element
   * @type {FrontElement}
   */
 // return this.props.element.getContent(settingName);

  let content = this.props.element.getSettings(settingName);
  if(content && content.dynamic){
    /**
     * Если this.state.modelsData еще не ициинировано или текущее свойство не загруженно
     */
    if((! this.state.modelsData) || !this.state.modelsData[settingName]){
      content = '';
    } else {
      content = this.state.modelsData[settingName] || '';
    }
  }
  return content;
}
/**
 * Декорирует компонент элемента методами необходимыми на фронте и в редакторе
 * @param component
 */
export default function frontDecorate(component) {
  component.componentWillUnmount = componentWillUnmount.bind(component);
  component.subscribeToModels = subscribeToModels.bind(component);
  component.subscribeToModels();
  component.getContent = getContent.bind(component);
}