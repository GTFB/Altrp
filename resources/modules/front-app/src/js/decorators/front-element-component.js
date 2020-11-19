import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";
import {conditionsChecker, getDataByPath, isEditor, replaceContentWithData} from "../helpers";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

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
  if(_.isFunction(this._componentWillUnmount)){
    this._componentWillUnmount();
  }
}

/**
 * Вернуть класс активного/неактивного состояния
 */
function classStateDisabled(){
  const { element, currentUser } = this.props;
  let conditional_disabled_choose = element.getSettings('conditional_disabled_choose');
  if(conditional_disabled_choose){
    switch(conditional_disabled_choose){
      case 'guest':{
        if(currentUser.isGuest()){
          return ' state-disabled ';
        }
      }
      break;
      case 'auth':{
        if(currentUser.checkUserAllowed(
            element.getSettings('conditional_disabled_permissions'),
            element.getSettings('conditional_disabled_roles')
        )){
          return ' state-disabled ';
        }
      }
      break;
    }
  }
  let conditions = element.getSettings('disabled_conditions',[]);
  conditions = conditions.map(c=>{
    const {
      conditional_model_field: modelField,
      conditional_other_operator: operator,
      conditional_other_condition_value: value,
    } = c;
    return {
      modelField,
      operator,
      value,
    };
  });
  if(element.getSettings('disabled_conditional_other', false)) {
    let model = element.getCurrentModel();

    if (conditionsChecker(conditions,
        element.getSettings('disabled_conditional_other_display') === 'AND',
        model, true)) {

      return ' state-disabled ';
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
   * @member {FrontElement} element
   */
  const element = this.props.element;
  /**
   * @property this.props.element
   * @type {FrontElement}
   */
 // return this.props.element.getContent(settingName);

  let content = this.props.element.getSettings(settingName);
  if(content && content.dynamic && this.props.currentModel.getProperty('altrpModelUpdated')){
    // console.log(element.getRoot());
    let model = element.hasCardModel() ? element.getCardModel() : this.props.currentModel;
    // console.log(model);
    content = model ? model.getProperty(content.fieldName) : ' ';
  }
  if((! isEditor())){//todo: сделать подгрузку данных и в редакторе
    let model = element.hasCardModel() ? element.getCardModel() : this.props.currentModel;
    content = replaceContentWithData(content, model);
    // let paths = _.isString(content) ? content.match(/{{([\s\S]+?)(?=}})/g) : null;
    // if(_.isArray(paths)){
    //   paths.forEach(path => {
    //     path = path.replace('{{', '');
    //     let value = getDataByPath(path, '', model);
    //     content = content.replace(new RegExp(`{{${path}}}`, 'g'), value)
    //   });
    // }
  }
  if(content && content.dynamic){
    content = '';
  }
  
  return content === 'null' ? '' : content;
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
  // this.subscribeToModels(this.getModelId());
}
/**
 * Компоненте обновился
 * @params {
 *  {
 *    match: {}
 *  }
 * } prevProps
 * @params {{}} prevState
 */
function componentDidUpdate(prevProps, prevState) {
  if(_.isFunction(this._componentDidUpdate)){
    this._componentDidUpdate(prevProps, prevState);
  }
  /**
   * Если сменился url но сама страница та же надо обновить компоненты элементов
   */
  if(! _.isEqual(this.props.match, prevProps.match)){
    if(_.isFunction(this._componentDidMount)){
      this._componentDidMount();
    }
  }
  /**
   * После загрузки хранилища данных текущей страницы надо обновить некоторые виджеты
   */
  let currentDataStorage = _.get(this.props,'currentDataStorage', new AltrpModel({}));
  let prevDataStorage = _.get(prevProps,'currentDataStorage', new AltrpModel({}));
  if(currentDataStorage.getProperty('currentDataStorageLoaded')
      && (currentDataStorage.getProperty('currentDataStorageLoaded') !== prevDataStorage.getProperty('currentDataStorageLoaded'))){
    if(_.isFunction(this._componentDidMount)){
      this._componentDidMount();
    }
  }
  /**
   * После загрузки модели надо обновить некоторые виджеты
   */
  let currentModel = _.get(this.props,'currentModel', new AltrpModel({}));
  let prevModel = _.get(prevProps,'currentModel', new AltrpModel({}));
  if(currentModel.getProperty('altrpModelUpdated')
      && (currentModel.getProperty('altrpModelUpdated') !== prevModel.getProperty('altrpModelUpdated'))){
    if(_.isFunction(this._componentDidMount)){
      this._componentDidMount();
    }
  }
  // this.subscribeToModels(this.getModelId());
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
  component.componentDidUpdate = componentDidUpdate.bind(component);
  component.getContent = getContent.bind(component);
  component.getModelId = getModelId.bind(component);
  component.updateModelData = updateModelData.bind(component);
  component.classStateDisabled = classStateDisabled.bind(component);
}