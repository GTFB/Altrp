import {CONSTANTS} from "../../../../editor/src/js/helpers";

class FrontElement {

  constructor(data){
    this.name = data.name;
    this.settings = data.settings;
    this.children = data.children;
    this.type = data.type;
    this.id = data.id;
    this.componentClass = window.frontElementsManager.getComponentClass(this.getName());
    /**
     * Ссылка на родителя
     * @type {FrontElement}
     */
    this.parent = null;
    /**
     * Ссылка на корневой элемент шаблона
     * @type {FrontElement}
     */
    this.root = null;

    /**
     * Список данных моделей для текущего шаблона. Например:
     *  {
     *      modelName: page
     *      modelId: 1,
     *  }
     *  Для каждого шаблона типа content устанавливается одна обязательная модель Page
     *  Для шаблонов header и footer нужно предусмотреть изменение данных моджели типа Page
     *  (при смене страницы header footer могут не меняться)
     *  * @type {array}
     */
    this.models = []
  }

  /**
   * Устанавливаем ссылку на элемент-родитель
   * @param {FrontElement} parent
   */
  setParent(parent){
    this.parent = parent;
  }

  /**
   * @return {object}
   */
  getModelData(modelName){
    let rootElement = this.getRoot();
    let data = null;
    rootElement.models.forEach(model=>{
      if(model.modelName === modelName){
        data = {...model};
      }
    });
    return data;
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
  getSettings(){
    return this.settings;
  }
  updateStyles(){
    window.stylesModulePromise.then(stylesModule => {
      /**
       * @member {Styles} stylesModule
       * */
      stylesModule.addElementStyles(this.getId(), this.getStringifyStyles());
    });
  }

  getStringifyStyles(){
    let styles = '';
    if(typeof this.settings.styles !== 'object'){
      return styles
    }
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
      }
      if(breakpoint === CONSTANTS.DEFAULT_BREAKPOINT){
        for(let selector in rules){
          if(rules.hasOwnProperty(selector)){
            styles += `${selector} {` + rules[selector].join('') + '}';
          }
        }
      }
    }
    return styles;
  }

  getSelector(){
    if(this.type === 'root-element'){
      return `.altrp-template-root${this.getId()}`;
    }
    return `.altrp-element${this.getId()}`;
  }
  getColumnsCount(){
    return this.children.length;
  }
}

export default FrontElement