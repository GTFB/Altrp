import modelManager from "../../../../editor/src/js/classes/modules/ModelsManager";
import conditionsChecker from "../functions/conditionsChecker";
import getConverter from "../functions/getConverter";
import getDataByPath from "../functions/getDataByPath";
import isEditor from "../functions/isEditor";
import prepareContext from "../functions/prepareContext";
import replaceContentWithData from "../functions/replaceContentWithData";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {addSettings} from "../store/elements-settings/actions";
import ELEMENTS_IGNORES_FORM_UPDATE from "../constants/ELEMENTS_IGNORES_FORM_UPDATE";

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
  this.props.element.beforeUnmount()
  if(_.isFunction(this._componentWillUnmount)){
    this._componentWillUnmount();
  }
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
 * @param locked
 * @return {*}
 */
function getContent(settingName, returnRaw = false, locked = false) {
  /**
   * @member {FrontElement} element
   */
  const element = this.props.element;

  let content = this.props.element.getSettings(settingName, '', locked);
  if(content && content.dynamic && this.props.currentModel.getProperty('altrpModelUpdated')){
    let model = element.hasCardModel() ? element.getCardModel() : this.props.currentModel;
    content = model ? model.getProperty(content.fieldName) : ' ';
  }
  if((! isEditor())){
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
    }
     else if(returnRaw){
       content = content.trim().replace('{{', '').replace('}}', '');
       content = getDataByPath(content, '', model);
     } else {
       content = replaceContentWithData(content, model);
     }
    if(locked && ! content && this.getContent(settingName)){
      content = this.getContent(settingName)
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


function getLockedContent(settingName, returnRaw = false) {
  return this.getContent(settingName, returnRaw, true)
}

/**
 * Компоненте загрузился в DOM
 */
function componentDidMount() {
  /**
   * Если есть определен метод _componentDidMount вызываем его
   */
  this.elementName = this.props.element.getName();
  if(typeof this._componentDidMount === 'function'){
    this._componentDidMount();
  }
  // this.subscribeToModels(this.getModelId());
}

/**
 *
 * @param nextProps
 */
function shouldComponentUpdate(nextProps) {
  // console.log(this.elementName);
  if(this.props.formsStore !== nextProps.formsStore
    && ELEMENTS_IGNORES_FORM_UPDATE.indexOf(this.elementName) !== -1){
    return  false
  }
  return true;
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
  if(this.props.element !== prevProps.element && ! this.props.element.component){
    this.props.element.component = this;
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
 * true если выполняются условия
 * @return {boolean}
 */
function isActive(){
  if(isEditor()){
    return false;
  }
  const { element } = this.props;
  const active_enable = element.getSettings('active_enable');
  if(! active_enable){
    return false
  }
  const conditional_active_choose = element.getSettings('conditional_active_choose');
  /**
   * @var {AltrpUser} currentUser
   */
  const currentUser = appStore.getState().currentUser;
  let authCondition = true;
  switch (conditional_active_choose){
    case 'guest':{
      if(! currentUser.isGuest()){
        authCondition = false;
      }
    }
    break;
    case 'auth':{
      const roles = element.getSettings('conditional_active_roles') || [];
      const permissions = element.getSettings('conditional_active_permissions') || [];
      if(! currentUser.hasRoles(roles)){
        authCondition = false;
        break;
      }
      if(! currentUser.hasPermissions(permissions)){
        authCondition = false;
        break;
      }
    }
    break;
  }
  if(! element.getSettings('active_conditional_other')){
    return authCondition;
  }
  let conditions = element.getSettings("active_conditions", []);
  conditions = conditions.map(c => {
    const {
      conditional_model_field: modelField,
      conditional_other_operator: operator,
      conditional_other_condition_value: value
    } = c;
    return {
      modelField,
      operator,
      value
    };
  });
  const active_conditional_other_display = element.getSettings("active_conditional_other_display") || 'AND';
  let active = conditionsChecker(
    conditions,
    active_conditional_other_display === "AND",
    this.props.element.getCurrentModel(),
    true
  );
  if(active_conditional_other_display === "AND"){
    return active && authCondition;
  }
  return active || authCondition;
}
/**
 * true если выполняются условия
 * @return {boolean}
 */
function isDisabled(){
  if(isEditor()){
    return false;
  }
  const { element } = this.props;
  const disabled_enable = element.getSettings('disabled_enable');
  if(! disabled_enable){
    return false
  }
  const conditional_disabled_choose = element.getSettings('conditional_disabled_choose');
  /**
   * @var {AltrpUser} currentUser
   */
  const currentUser = appStore.getState().currentUser;
  let authCondition = true;
  switch (conditional_disabled_choose){
    case 'guest':{
      if(! currentUser.isGuest()){
        authCondition = false;
      }
    }
    break;
    case 'auth':{
      const roles = element.getSettings('conditional_disabled_roles') || [];
      const permissions = element.getSettings('conditional_disabled_permissions') || [];
      if(! currentUser.hasRoles(roles)){
        authCondition = false;
        break;
      }
      if(! currentUser.hasPermissions(permissions)){
        authCondition = false;
        break;
      }
    }
    break;
  }
  if(! element.getSettings('disabled_conditional_other')){
    return authCondition;
  }
  let conditions = element.getSettings("disabled_conditions", []);
  conditions = conditions.map(c => {
    const {
      conditional_model_field: modelField,
      conditional_other_operator: operator,
      conditional_other_condition_value: value
    } = c;
    return {
      modelField,
      operator,
      value
    };
  });
  const disabled_conditional_other_display = element.getSettings("disabled_conditional_other_display") || 'AND';
  let disabled = conditionsChecker(
    conditions,
    disabled_conditional_other_display === "AND",
    this.props.element.getCurrentModel(),
    true
  );
  if(disabled_conditional_other_display === "AND"){
    return disabled && authCondition;
  }
  return disabled || authCondition;
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
  component.getLockedContent = getLockedContent.bind(component);
  component.getModelId = getModelId.bind(component);
  component.updateModelData = updateModelData.bind(component);
  component.isActive = isActive.bind(component);
  component.isDisabled = isDisabled.bind(component);
  component.shouldComponentUpdate = shouldComponentUpdate.bind(component);
}
