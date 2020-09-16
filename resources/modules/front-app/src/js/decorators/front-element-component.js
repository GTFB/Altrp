import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";

/**
 * Срабатываает перед удалением компонента элемента
 */
function componentWillUnmount(){
  // if(this.model){
  //   this.model.uns
  // }
  if(! this.props.element.dynamicContentSettings){
    return
  }
  this.props.element.dynamicContentSettings.forEach(modelsSetting=>{
    let modelInfo = this.props.element.getModelsInfoByModelName(modelsSetting.modelName);
    if(modelInfo && ! modelInfo.relation) {
      modelManager.unsubscribe(modelInfo.modelName, modelInfo.modelId ||this.getModelId(), this);
    } else if( modelInfo && modelInfo.relation ){
      // console.log(modelInfo);
      // console.log(modelsSetting);
      // console.log(this.state.modelData);
    }
  });
}

/**
 * Вернуть класс активного/неактивного состояния
 */
function classStateDisabled(){
  let conditional_disabled_choose = this.props.element.getSettings('conditional_disabled_choose');
  if(conditional_disabled_choose){
    switch(conditional_disabled_choose){
      case 'guest':{
        if(this.props.currentUser.isGuest()){
          return ' state-disabled ';
        }
      }
      break;
      case 'auth':{
        if(this.props.currentUser.checkUserAllowed(
            this.props.element.getSettings('conditional_disabled_permissions'),
            this.props.element.getSettings('conditional_disabled_roles')
        )){
          return ' state-disabled ';
        }
      }
      break;
    }
  }

  return ' '
}
/**
 * обновить данные модели
 */
function updateModelData (modelData) {
  this.setState(state => {
    /**
     * state.modelsData
     * @type {{}}
     */
    return {...state,
      // modelsData,
     modelData}
  });

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
    if(modelInfo && ! modelInfo.relation) {
      this.model = modelManager.subscribeToModelUpdates(modelInfo.modelName, modelInfo.modelId || id, this);
    } else if( modelInfo && modelInfo.relation ){
      // console.log(modelInfo);
      // console.log(modelsSetting);
      // console.log(this.state.modelData);
    }
  });
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
    // if((! this.state.modelData) || ! _.get(this.props.modelData, content.fieldName)){
    // if((! this.props.currentModel) || ! this.props.currentModel.getProperty(content.fieldName)){
    //     content = ' ';
    // } else {
    //     content = _.get(this.state.modelData, content.fieldName) || ' ';
    // }
    content = this.props.currentModel ? this.props.currentModel.getProperty(content.fieldName) : ' ';
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
  component.updateModelData = updateModelData.bind(component);
  component.classStateDisabled = classStateDisabled.bind(component);
}