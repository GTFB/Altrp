import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";
import {
  conditionsChecker,
  getConverter,
  getDataByPath,
  isEditor,
  prepareContext,
  replaceContentWithData
} from "../helpers";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {addSettings} from "../store/elements-settings/actions";

/**
 * Срабатываает перед удалением компонента элемента
 */
function componentWillUnmount(){
  // if(this.model){
  //   this.model.uns
  // }
  window.actionsManager && actionsManager.unregisterWidgetActions(this.props.element.getIdForAction());
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
  appStore.dispatch(addSettings(this.props.element.getId(), this.props.element.getName(), {}))
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
        model,
        true)) {

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
 * @param {boolean} returnRaw - возврщать ли объект в том виде, в котором он хранится (если false, возвращаем строку)
 * @return {*}
 */
function getContent(settingName, returnRaw = false) {
  /**
   * @member {FrontElement} element
   */
  const element = this.props.element;
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

     if(settingName === 'content_default_value' && _.isString(content) && content.indexOf('{{{') !== -1){
      let context = this.props.element.getCurrentModel().getData();
      context = prepareContext(context);
      let replacedContent = content
          .replace(/}}}/g, "')")
          .replace(/{{{/g, "_.get(context, '");
      try{
        content = eval(replacedContent);
        if(_.isNumber(content) && ! _.isNaN(content)){
          content += '';
        }
        _.isString(content) && (content = content.replace(/NaN/g, ''));
        return content || '';
      } catch(e){
        console.error('Evaluate error in getContent for input default value' + e.message);
        return '';
      } finally {
      }
    } else if(returnRaw){
       content = content.trim().replace('{{', '').replace('}}', '');
       content = getDataByPath(content, '', model);
     } else {
       content = replaceContentWithData(content, model);
     }

    const contentDynamicSetting = this.props.element.getDynamicSetting(settingName);

    if(contentDynamicSetting){
      const converter = getConverter(contentDynamicSetting);
      content = converter.convertData(content);
    }
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
  if(this.props.element !== prevProps.element){
    // console.log('updated');
    this.setState(state => ({...state, children: this.props.element.children}));
  }
  if(_.isFunction(this._componentDidUpdate)){
    this._componentDidUpdate(prevProps, prevState);
  }
  /**
   * Если сменился url но сама страница та же надо обновить компоненты элементов
   * или обновился корневой элемент (для встраиваемых шаблонов)
   */
  if(! _.isEqual(this.props.match, prevProps.match)
      || prevProps.rootElement !== this.props.rootElement){
    if(_.isFunction(this._componentDidMount)){
      this._componentDidMount(prevProps, prevState);
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
      this._componentDidMount(prevProps, prevState);
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
      this._componentDidMount(prevProps, prevState);
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
