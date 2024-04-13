import CONSTANTS from "../../../../editor/src/js/consts";
import {
  altrpRandomId,
  getResponsiveSetting,
  isEditor,
  replaceContentWithData,
  valueReplacement
} from "../helpers";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {addFont} from "../store/fonts-storage/actions";
import INPUT_WIDGETS from "../constants/INPUT_WIDGETS";

window.elementsCount = 0
class FrontElement {

  constructor(data = {}, withoutComponent = false){
    this.name = data.name;
    this.settings = data.settings;
    this.settingsLock = data.settingsLock;
    this.lazySection = data.lazySection;
    this.dependencies = data.dependencies;
    window.elementsCount++
    this.cssClassStorage = data.cssClassStorage;
    this.type = data.type;
    this.id = data.id;
    if(isEditor() && ! withoutComponent && this.getName()){
      this.componentClass = window.elementsManager.getComponentClass(this.getName());
    } else if(window.frontElementsManager && ! withoutComponent && this.name !== 'repeater'){

      this.componentClass = window.frontElementsManager.getComponentClass(this.getName());
    }
    this.parent = null;
    /**
     * Список форм для текущего элемента (кнопки, интпута)
     * @type {AltrpForm[]}
     */
    this.forms = [];
    /**
     * Ссылка на компонент
     * @type {React.Component | null}
     */
    this.component = null;

    /**
     * Ссылка на родителя
     * @type {FrontElement}
     */
    /**
     * Ссылка на корневой элемент шаблона
     * @type {FrontElement}
     */
    this.root = null;

    /**
     * Список данных моделей для текущего шаблона. Например:
     *  {
     *      modelName: string
     *      modelId: 1,
     *  }
     *  Для каждого шаблона типа content устанавливается одна обязательная модель Page
     *  Для шаблонов header и footer нужно предусмотреть изменение данных моджели типа Page
     *  (при смене страницы header footer могут не меняться)
     *  * @type {array}
     */
    this.modelsList = []
    // if(this.getId()){
    //   appStore.dispatch(addSettings(this.getId(), this.getName(), {...this.settings}, this?.children?.length || 0))
    // }
  }

  /**
   * Устанавливаем ссылку на элемент-родитель
   * @param {FrontElement} parent
   */
  setParent(parent){
    if(! parent){
      console.error(this);
    }
    this.parent = parent;
  }


  /**
   * Возвращает ссылку на корневой элемент шаблона
   * @return {FrontElement}
   */
  getRoot(){
    if(!this.root){
      this.root = this.findClosestByType('root-element')
    }
    return this.root;
  }

  /**
   * Возвращает ссылку на первый элемент указанного типа (поиск идет к корню дерева)
   * @param {string} type
   * @return {FrontElement}
   */
  findClosestByType(type){
    if(type === 'widget' && (this.getType() !== 'widget')){
      return null;
    }
    if(type === 'column' && (['root-element', 'section', ].indexOf(this.getType()) !== -1)){
      return null;
    }
    if(type === 'section' && (this.getType() === 'root-element')){
      return null;
    }
    if (this.getType() === type){
      return this;
    }
    if(! this.parent){
      return null;
    }
    return this.parent.findClosestByType(type)
  }

  /**
   * Вызывается для обновления элемента
   */
  update(){
    this.updateStyles();
    let widgetsForForm = [
        'button',
      ...INPUT_WIDGETS
    ];
    // let widgetsWithActions = [
    //     'button',
    //   ...INPUT_WIDGETS
    // ];
    /**
     * Инициация событий в первую очередь
     */
    // if(widgetsWithActions.indexOf(this.getName()) >= 0 && this.getSettings('actions', []).length){
    //   try{
    //     // this.registerActions();
    //   } catch(e){
    //     console.error(e);
    //   }
    //   // if(this.getName() === 'button'){
    //   //   return;
    //   // }
    // }

    if(this.getName() === "input-date-range" &&
      this.getFormId("form_id_start") &&
      this.getFormId("form_id_end")
    ) {
      this.formInit();
      return;
    }
    if(this.getName() === "input-range-slider" &&
      this.getFormId("form_id_start") &&
      this.getFormId("form_id_end")
    ) {
      this.formInit();
      return;
    }

    if(widgetsForForm.indexOf(this.getName()) >= 0 && this.getFormId()){
      this.formInit();
      return;
    }

    if(widgetsForForm.indexOf(this.getName()) >= 0 && this.getSettings('form_actions') === 'delete'){
      this.formInit();
      return;
    }

  }
  async registerActions(){
    if(this.actionsRegistered){
      return;
    }
    /**
     * @member {ActionsManager|*} actionsManager
     */
    const actionsManager = (await import(/* webpackChunkName: 'ActionsManager' */'./modules/ActionsManager.js')).default;
    switch (this.getName()){
      case 'button':{
        actionsManager.registerWidgetActions(this.getIdForAction(), this.getSettings('actions', []), 'click', this);
      }
      break;
      case 'input':{
        actionsManager.registerWidgetActions(this.getIdForAction(), this.getSettings('actions', []), 'blur', this);
      }
    }

    this.actionsRegistered = true;
  }
  /**
   * Если элемент поле или кнопка нужно инициализирваоть форму в FormsManager
   */
  async formInit(){
    /**
     * @member {FormsManager} formsManager
     */

    if(! this.component){
      return;
    }
    if(this.formsIsInit){
      return
    }
    this.formsIsInit = true;
    let formsManager = await import(/* webpackChunkName: 'FormsManager' */'../../../../editor/src/js/classes/modules/FormsManager.js');
    formsManager = formsManager.default;

    switch (this.getName()) {
      case 'button': {
        let method = 'POST';
        switch (this.getSettings('form_actions')){
          case 'add_new':{
            this.addForm(formsManager.registerForm(this.getFormId(), this.getSettings('choose_model'), method));
          }
          break;
          case 'delete':{
            method = 'DELETE';
            let modelName = this.getModelName();
            if(modelName){
              this.addForm(formsManager.registerForm(this.getId(), modelName, method));
            }
          }
          break;
          case 'edit':{
            method = 'PUT';
            let modelName = this.getModelName();
            if(modelName){
              this.addForm(formsManager.registerForm(this.getFormId(), modelName, method));
            }
          }
          break;
          case 'login':{
            method = 'POST';
            this.addForm(formsManager.registerForm(this.getFormId(),
                'login',
                method,
                {afterLoginRedirect:this.getSettings('redirect_after')}));
          }
          break;
          case 'logout':{
            method = 'POST';
            this.addForm(formsManager.registerForm(this.getFormId(),
                'logout',
                method,
                {afterLogoutRedirect:this.getSettings('redirect_after')}
              ));
          }
          break;
          case 'email':{
            method = 'POST';
            this.addForm(formsManager.registerForm(this.getFormId(),
                'email',
                method,
                {afterLogoutRedirect:this.getSettings('redirect_after')}
              ));
          }
          break;
        }
        this.getForms().forEach(form=>{
          form.addSubmitButton(this);
        });
      }
      break;
      case 'input-select':
      case 'input-select-tree':
      case 'input-multi-select':
      case 'input-select2':
      case 'input-switch':
      case 'input-wysiwyg':
      case 'input-checkbox':
      case 'input-radio':
      case 'input-image-select':
      case 'input-file':
      case 'input-gallery':
      case 'input-accept':
      case 'input-date':
      case 'input-pagination':
      case 'input-textarea':
      case 'input-password':
      case 'input-email':
      case 'input-tel':
      case 'input-number':
      case 'input-hidden':
      case 'input-slider':
      case 'input-text':
      case 'input-text-common':
      case 'input-text-autocomplete':
      case 'stars':

      case 'input': {
        formsManager.addField(this.getFormId(), this);
      }
      break;

      case 'input-date-range': {
        formsManager.addField(this.getFormId("form_id_start"), this);
        formsManager.addField(this.getFormId("form_id_end"), this);
      }
      break;
      case 'input-range-slider': {
        formsManager.addField(this.getFormId("form_id_start"), this);
        formsManager.addField(this.getFormId("form_id_end"), this);
      }
      break;
    }
  }

  /**
   *
   * @return {AltrpForm[]}
   */
  getForms(){
    return this.forms;
  }

  /**
   *
   * @param {AltrpForm} form
   */
  addForm(form){
    this.forms.push(form);
  }
  /**
   * Возвращает массив потомков текущего элемента
   * @return {array}
   */

  getChildren(){
    return this.children;
  }

  /**
   *
   * @returns {string}
   */
  getId(){
    return this.id;
  }

  /**
   * id для повторяющихся виджетов с действиями
   * @return {string}
   */
  getIdForAction(){

    let altrpIndex = null
    if(_.isNumber(this.getCurrentModel()?.getProperty('altrpIndex'))){
      altrpIndex = this.getCurrentModel()?.getProperty('altrpIndex') + ''
    }
    if(! this.idForAction){
      this.idForAction = this.getId() +
        ( altrpIndex
          || this.getCurrentModel()?.getProperty('id')
          || '');
    }
    return this.idForAction;
  }

  /**
   *
   * @returns {string}
   */
  getName(){
    return this.name;
  }

  /**
   *
   * @returns {string}
   */
  getType(){
    return this.type;
  }

  /**
   * Получить настройку или все настройки
   * @param {string} settingName
   * @param {*} _default
   * @param {boolean} locked
   * @return {*}
   */
  getSettings(settingName, _default = '', locked = false){
    let settings = this.settings;
    if(locked && !_.isEmpty(this.settingsLock)){
      settings = this.settingsLock
    }
    if(! settingName)
    {
      return _.cloneDeep(settings);
    }
    if(_.get(settings, settingName) === false || _.get(settings, settingName) === 0){
      return _.get(settings, settingName);
    }

    return _.get(settings, settingName) || _default;
  }

  getLockedSettings(settingName, _default = '') {
    return this.getSettings(settingName, _default, true)
  }

  updateStyles(){
    window.stylesModulePromise.then(stylesModule => {
      /**
       * @member {Styles} stylesModule
       * */
      stylesModule.addElementStyles(this.getId(), this.getStringifyStyles());
    });
  }

  /**
   * Возвращает CSS-стили в виде строки
   * для вставки в тег style текущего элемента
   * @return {string}
   */
  getStringifyStyles(){
    let styles = '';
    if(typeof this.settings.styles !== 'object'){
      return styles
    }
    /**
     * Чтобы сохранить последовательность медиа-запросов в CSS,
     * добавлять будем в первоначальной последовательности.
     * Для этого сначала создадим копию массива со всеми настройками экранов
     * @type {{}}
     */
    let screens = _.cloneDeep(CONSTANTS.SCREENS);
    /**
     * Удалим дефолтный - он не нужен
     * @type {{}}
     */
    screens.splice(0,1);
    for(let breakpoint in this.settings.styles){
      let rules = {};
      if(this.settings.styles.hasOwnProperty(breakpoint)){
        for(let settingName in this.settings.styles[breakpoint]){
          if(this.settings.styles[breakpoint].hasOwnProperty(settingName)) {
            for(let selector in this.settings.styles[breakpoint][settingName]){
              if(this.settings.styles[breakpoint][settingName].hasOwnProperty(selector)) {
                rules[selector] = rules[selector] || [];
                // console.log(this.settings.styles[breakpoint][settingName][selector]);
                rules[selector] = rules[selector].concat(this.settings.styles[breakpoint][settingName][selector])
              }
            }
          }
        }
        /**
         * Оборачиваем в медиа запрос при необходимости
         *
         */
        if(breakpoint === CONSTANTS.DEFAULT_BREAKPOINT){
          for(let selector in rules){
            if(rules.hasOwnProperty(selector)){
              styles += `${selector} {` + rules[selector].join('') + '}';
            }
          }
        } else {
          // styles += `${getMediaQueryByName(breakpoint)}{`;
          // for(let selector in rules){
          //   if(rules.hasOwnProperty(selector)){
          //     styles += `${selector} {` + rules[selector].join('') + '}';
          //   }
          // }
          // styles += `}`;
          screens.forEach(screen=>{
            /**
             * Для каждого breakpoint сохраним
             * в соответствующей настройке экрана css правила
             */
            if(screen.name === breakpoint){
              screen.rules = rules;
            }
          });
        }
      }
    }

    screens.forEach(screen=>{

      /**
       * Если rules записаны, то добавим в styles в нужном порядке
       */
      if(!_.isObject(screen.rules)){
        return;
      }
      styles += `${screen.mediaQuery}{`;
      for(let selector in screen.rules){
        if(screen.rules.hasOwnProperty(selector)){
          styles += `${selector} {` + screen.rules[selector].join('') + '}';
        }
      }
      styles += `}`;
    });
    styles += this.settings.stringStyles || '';

    return styles;
  }

  /**
   * Возвращает css-селектор в виде строки
   * @return {string}
   */
  getSelector(){
    if(this.type === 'root-element'){
      return `.altrp-template-root${this.getId()}`;
    }

    if(this.settings.global_styles_presets){
      return `.altrp-element_altrp-preset_${this.getName()}-${this.settings.global_styles_presets}`
    }
    return `.altrp-element${this.getId()}`;
  }

  /**
   * Возвращает количестве колонок в секции
   * @return {*}
   */
  getColumnsCount(){
    return this.children.length;
  }

  /**
   *  Проводит валидацию поля, если это виджет input,
   *  если другой виджет, то просто возвращает true
   *  @return {boolean}
   */
  fieldValidate(){
    if(INPUT_WIDGETS.indexOf(this.getName()) === -1){
      return true;
    }
    if(! this.getSettings('content_required')){
      return true;
    }
    if(_.has(this, 'maskIsValid')){
      return this.getValue() && this.maskIsValid;
    }
    return this.getValue();
  }

  /**
   * Проверяет рекурсивно (проверяет всех предков) виден ли элемент свойство elementDisplay пропсов компонента
   * @return {boolean}
   */
  elementIsDisplay(){
    let display = true;
    if(this.getName() === 'root-element'){
      return true;
    }
    if(this.component.props.elementDisplay || this.getSettings('conditional_ignore_in_forms')){
      display = this.parent ? this.parent.elementIsDisplay() : true;
    } else {
      return false;
    }
    return display;
  }

  /**
   * Возвращает значение если виджет input, если другое, то null
   */
  getValue(){
    if(INPUT_WIDGETS.indexOf(this.getName()) === -1){
      return null;
    }
    if(! this.elementIsDisplay()){
      return null;
    }
    const elementName = this.getName();
    let value ;
    switch (elementName) {
      case 'input':
      case 'input-textarea':
      case 'input-tel':
      case 'input-text-autocomplete':
      case 'stars':
      case  'input-date-range':
      case 'input-text-common':{
        value = this?.component?.getValue() || this?.component?.state?.value || '';
      }break;

      default:{
        value = this.component.state.value;
      }
    }

    switch (this.getSettings('content_type')){
      /**
       * Если нужен массив
       */
      case 'checkbox':{
        value = _.isArray(value) ? value : (value ? [value] : []);
      }
        break;
      case 'accept':{
        let trueValue = this.getSettings('accept_checked') || true;
        let falseValue = this.getSettings('accept_unchecked') || false;
        falseValue = valueReplacement(falseValue);
        trueValue = valueReplacement(trueValue);
        value = value ? trueValue : falseValue;
      }
        break;


    }
    return value;
  }

  /**
   * Список моделей для шаблона включая модель Page
   * @return {AltrpModelUpdater[]}
   */
  getModelsList(){
    return this.getRoot().modelsList || [];
  }

  /**
   * Имя модели
   * из списка моделей извлекает имя модели не являющейся Page и возращает и это имя
   * @return {string | null}
   */
  getModelName(){
    let modelName = null;
    this.getModelsList().forEach(modelInfo=>{
      if(modelInfo.modelName!=='page' && ! modelInfo.related){
        modelName = modelInfo.modelName
      }
    });
    return modelName;
  }

  /**
   * Получаем данные о модели (modelName и modelId) из корневого элемента по названию модели
   * @param {string} modelName
   * @return {{}}
   */
  getModelsInfoByModelName(modelName){
    let modelsList = this.getModelsList();
    let modelInfo = null;
    modelsList.forEach(_modelInfo=>{
      if(_modelInfo.modelName === modelName){
        modelInfo = _modelInfo;
      }
    });
    return modelInfo
  }

  /**
   * @param {AltrpModelUpdater[]} modelsList
   */
  setModelsList(modelsList){
    this.getRoot().modelsList = modelsList;
  }
  /**
   * Добавляет информацию о модели в список моделей
   * @param {{}} modelInfo
   */
  addModelInfo(modelInfo){
    this.getRoot().modelsList = this.getRoot().modelsList || [];
    this.getRoot().modelsList.push({...modelInfo})
  }

  /**
   * Задайет id для всех моделей корневого элемента не являющихся моделью страницы (page)
   * todo: нужно вызывать в элементе при смене роута в том случае если роут имеет id
   * @param {int} id
   */
  setModelsIds(id){

  }

  /**
   * Получает данные для контента элемента
   * делегирует на this.component
   * @param {string} settingName
   * @return {*}
   */
  getContent(settingName){
    if(this.component){
      return this.component.getContent(settingName)
    }
    return'';
  }

  getLockedContent(settingName){
    if(this.component){
      return this.component.getContent(settingName)
    }
    return'';
  }

  /**
   * Сохраняет данные модели
   * @param modelName
   * @param data
   */
  setModelData(modelName, data){
    this.modelsStorage = this.modelsStorage || {};
    this.modelsStorage[modelName] = {...data};
    if(this.modelCallbacksStorage && this.modelCallbacksStorage[modelName]){
      this.modelCallbacksStorage[modelName](this.modelsStorage[modelName]);
    }
  }
  /**
   * Подписывает на изменения модели
   */
  onUpdateModelStorage(modelName, callback){
    this.modelCallbacksStorage = this.modelCallbacksStorage || {};
    this.modelCallbacksStorage[modelName] = callback;
    if(this.modelsStorage && this.modelsStorage[modelName]){
      callback(this.modelsStorage[modelName]);
    }
  }
  /**
   * Парсит объект и извлекает из него строку со всеми классами у которых есть свойство prefixClass
   * @return {string}
   */

  getPrefixClasses() {
    let changeCss = _.toPairs(this.cssClassStorage);
    let classStorage = ' ';
    changeCss.forEach(element => {
      classStorage += `${element[1]} `;
    });
    return classStorage;
  }

  /**
   * Модель для карточки внутри виджетов
   * @param {AltrpModel} model
   * @param {null | int} index
   */
  setCardModel(model, index = null) {

    let rootElement = this.getRoot();
    if(! model){
      rootElement.cardModel = null;
      rootElement.isCard = false;
      return;
    }
    if(! (model instanceof AltrpModel)){
      model = new AltrpModel(model);
    }
    index = Number(index);
    // model.setProperty('altrpIndex', index);
    if(! rootElement?.cardModel){
      this.cardModel = model;
      this.isCard = true;
    }else {
      rootElement.cardModel = model;
      rootElement.isCard = true;
    }
  }

  /**
   * Есть ли данные модели для карточки
   * @return {boolean}
   */
  hasCardModel(){
    let rootElement = this.getRoot();
    if(! rootElement){
      return ! ! (this.cardModel && this.isCard);
    }
    return ! ! (rootElement.cardModel && rootElement.isCard)
  }
  /**
   * Получить данные модели для карточки
   * @return {AltrpModel}
   */
  getCardModel(){
    let model;
    if(this.getType() === 'root-element'){
      model = this.cardModel;
    } else {
      model = this.getRoot() ? this.getRoot().cardModel : this.cardModel;
    }
    if(! model instanceof AltrpModel){
      model = new AltrpModel(model);
    }
    return model;
  }


  /**
   * Возвращает текущую модель для элемента
   * (для карточки на странице будут свои модели)
   * @return {AltrpModel}
   */
  getCurrentModel(){
    return this.hasCardModel() ? this.getCardModel() : (appStore.getState().currentModel || new AltrpModel);
  }

  /**
   * Получить id поля
   * @param {string} setting если конртоллер имеет кастомное имя
   */
  getFieldId(setting="field_id"){
    let fieldId = this.getSettings(setting);
    if(! fieldId){
      return fieldId;
    }
    if(fieldId.indexOf('{{') !== -1){
      fieldId = replaceContentWithData(fieldId, this.getCurrentModel().getData());
    }
    return fieldId;
  }
  /**
   * Получить id поля
   * @param {string} setting если конртоллер имеет кастомное имя
   */
  getFormId(setting="form_id"){
    let formId = this.getSettings(setting);
    if(! formId){
      return formId;
    }
    if(formId.indexOf('{{') !== -1 && this.component){
      formId = replaceContentWithData(formId, this.getCurrentModel().getData());
    }
    return formId;
  }

  updateFonts(){
    let fonts = _.get(this.settings,'__altrpFonts__',{});

    fonts = _.toPairs(fonts);
    fonts.forEach(([settingName, font])=>{
      appStore.dispatch(addFont(this.getId(), settingName, font));
    });
  }

  /**
   * Получить данные динамических настроек
   * @param {string} dynamicSettingName
   * @return {{} | null}
   */
  getDynamicSetting(dynamicSettingName){
    return _.get(this.settings, `altrpDynamicSetting.${dynamicSettingName}`, null);
  }

  /**
   * значение настройки в зависимости от разрешения
   * @param {string} settingName
   * @param {string} elementState
   * @param _default
   * @return {*}
   */
  getResponsiveSetting(settingName, elementState = '', _default){
    return getResponsiveSetting(this.getSettings(), settingName, elementState, _default)
  }

   /**
   * значение locked настройки в зависимости от разрешения
   * @param {string} settingName
   * @param {string} elementState
   * @param _default
   * @return {*}
   */
    getResponsiveLockedSetting(settingName, elementState = '', _default){
      const setting = getResponsiveSetting(this.getLockedSettings(), settingName, elementState, _default)

      if (setting === undefined) {
        return this.getResponsiveSetting(settingName, elementState = '', _default)
      }

      return setting
    }

  /**
   * Возвращает текущий тип шаблона
   * @return {string}
   */
  getTemplateType(){
    const rootElement = this.getRoot();
    return rootElement ? (rootElement.templateType || 'content') : 'content';
  }
  deleteSetting(settingName){
    const newSettings = {...this.settings}
    delete newSettings[settingName]

    this.settings = newSettings;
    if(this.component){
      this.component.setState(state => ({...state, settings: newSettings}));
    }
  }
  /**
   * Обновляем настройки элемента на фронте с обновлением компонента
   * @param value
   * @param settingName
   */

  updateSetting(value, settingName = ''){
    let newSettings;
    if(! settingName && _.isObject(value)){
       newSettings = {..._.assign(this.settings, value)};
    }
    if(settingName){
      newSettings = {...this.settings};
      _.set(newSettings, settingName, value);
    }
    if(newSettings){
      this.settings = newSettings;
      if(this.component){
        this.component.setState(state => ({...state, settings: newSettings}));
      }
    }
  }
  async beforeUnmount(){
    let formsManager = await import(/* webpackChunkName: 'FormsManager' */'../../../../editor/src/js/classes/modules/FormsManager.js');
    formsManager.removeField(this)
  }
  updateErrorState = (errorState = false)=>{
    if(! this.component){
      return
    }

    this.component.setState(state=>({...state, errorState}))
  }
}

export default FrontElement
