import CONSTANTS from "../../../../editor/src/js/consts";
import {getMediaQueryByName} from "../helpers";

class FrontElement {

  constructor(data = {}){
    this.name = data.name;
    this.settings = data.settings;
    this.children = data.children;
    this.cssClassStorage = data.cssClassStorage;
    this.type = data.type;
    this.id = data.id;
    if(window.frontElementsManager){
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
  }

  /**
   * Устанавливаем ссылку на элемент-родитель
   * @param {FrontElement} parent
   */
  setParent(parent){
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
    if (this.getType() === type){
      return this;
    }
    return this.parent.findClosestByType(type)
  }

  /**
   * Вызывается для обновление элемента
   */
  update(){
    this.updateStyles();
    let widgetsForForm = [
        'button',
        'input',
    ];
    if(widgetsForForm.indexOf(this.getName()) >= 0 && this.getSettings('form_id')){
      this.formInit()
    }
    if(widgetsForForm.indexOf(this.getName()) >= 0 && this.getSettings('form_actions') === 'delete'){
      this.formInit()
    }
  }

  /**
   * Если элемент поле или кнопка нужно инициализирваоть форму в FormsManager
   */
  async formInit(){
    /**
     * @member {FormsManager} formsManager
     */
    let formsManager = await import('../../../../editor/src/js/classes/modules/FormsManager.js');
    formsManager = formsManager.default;
    switch (this.getName()) {
      case 'button': {
        let method = 'POST';
        switch (this.getSettings('form_actions')){
          case 'add_new':{
            this.addForm(formsManager.registerForm(this.getSettings('form_id'), this.getSettings('choose_model'), method));
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
              this.addForm(formsManager.registerForm(this.getSettings('form_id'), modelName, method));
            }
          }
          break;
          case 'login':{
            method = 'POST';
            this.addForm(formsManager.registerForm(this.getSettings('form_id'),
                'login',
                method,
                {afterLoginRedirect:this.getSettings('redirect_after')}));
          }
          break;
          case 'logout':{
            method = 'POST';
            this.addForm(formsManager.registerForm(this.getSettings('form_id'),
                'logout',
                method,
                {afterLogoutRedirect:this.getSettings('redirect_after')}
          ));
          }
          break;
        }
      }
      break;
      case 'input': {
        formsManager.addField(this.getSettings('form_id'), this);
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
  getId(){
    return this.id;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }

  /**
   * Получить настройку или все настройки
   * @param settingName
   * @param {string} _default
   * @return {*}
   */
  getSettings(settingName, _default = ''){
    if(! settingName)
    {
      return _.cloneDeep(this.settings);
    }
    return this.settings[settingName] || _default;
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
     * @type {{}[]}
     */
    let screens = _.cloneDeep(CONSTANTS.SCREENS);
    /**
     * Удалим дефолтный - он не нужен
     * @type {{}[]}
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
   * Возвращает css-селектор в виду строки
   * @return {string}
   */
  getSelector(){
    if(this.type === 'root-element'){
      return `.altrp-template-root${this.getId()}`;
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
    if(this.getName() !== 'input'){
      return true;
    }
    return ! (this.getSettings('content_required') && ! this.getValue());
  }

  /**
   * Возвращает значение если виджет input, если другое, то null
   */
  getValue(){

    if(this.getName() !== 'input'){
      return null;
    }
    let value = this.component.state.value;
    /**
     * Если значение динамическое и не менялось в виджете,
     * то используем метод this.getContent для получения значения, а не динмического объекта
     */
    if(value.dynamic){
      value = this.getContent('content_default_value')
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
    console.log(changeCss);
    let classStorage = ' ';
    changeCss.forEach(element => {
      classStorage += `${element[1]} `;
      console.log(element[1]);
    });
    return classStorage;
  }
}

export default FrontElement
