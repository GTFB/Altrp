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
 * если есть id то укзываем его при подписке на модели при отсутствии в modelInfo id модели
 * @param {int} id
 */
function subscribeToModels(id){
  /**
   * ЕСли в элементе нет настроек для динамического контента, то на изменения моделей не подписываемся
   */
  if(! this.props.element.dynamicContentSettings){
    return
  }

  this.props.element.dynamicContentSettings.forEach(modelsSetting=>{
    let modelInfo = this.props.element.getModelsInfoByModelName(modelsSetting.modelName);
    if(modelInfo)
    this.model = modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId || id, modelData => {
      this.setState(state=>{
        /**
         * state.modelsData
         * @type {{}}
         */
        let modelsData = state.modelsData || {};
        modelsData = {...modelsData};
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
 * когда хочешь получить данные из state.settings
 * используй вот этот метод, он проверяет являются ли данные динамическими или статичными,
 * только учти, что пока данные не обновились с сервера, он вернет пустую строку,
 * так что лучше его использовать, если в данной настройке хранится строка
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
 * Компоненте загрузился в DOM
 */
function componentDidMount() {
  /**
   * Если есть определен метод _componentDidMount вызываем его
   */
  if(typeof this._componentDidMount === 'function'){
    this._componentDidMount();
  }
  this.subscribeToModels(this.getModelId());
}

/**
 * Возвращает id модели беря его из url если в роутере предусмтренно ид для текущего роута
 * @return {int}
 */
function getModelId() {
  let id = null;
  if(this.props.match && this.props.match.params && this.props.match.params.id){
    id = this.props.match.params.id;
  }
  return id;
}
/**
 * Декорирует компонент элемента методами необходимыми на фронте и в редакторе
 * @param component
 */
export default function frontDecorate(component) {
  component.componentWillUnmount = componentWillUnmount.bind(component);
  component.subscribeToModels = subscribeToModels.bind(component);
  component.componentDidMount = componentDidMount.bind(component);
  component.getContent = getContent.bind(component);
  component.getModelId = getModelId.bind(component);
}