import {CONSTANTS} from "../../../../editor/src/js/helpers";

class FrontElement {

  constructor(data = {}){
    this.name = data.name;
    this.settings = data.settings;
    this.children = data.children;
    this.type = data.type;
    this.id = data.id;
    if(window.frontElementsManager){
      this.componentClass = window.frontElementsManager.getComponentClass(this.getName());
    }
    this.parent = null;
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
  }

  /**
   * Если элемент поле или кнопка нужно инициализирваоть форму в FormsManager
   */
  async formInit(){
    /**
     * @member {FormsManager} formsManager
     */
    let formsManager = await import('../../../../editor/src/js/classes/modules/FormsManager.js').then();
    formsManager = formsManager.default;
    console.log(formsManager);
    if(this.getName() === 'button'){
      let method = 'POST';
      if(this.getSettings('form_actions') === 'add_new'){
        formsManager.registerForm(this.getSettings('form_id'), this.getSettings('choose_model'), method)
      }
    }
  }
  /**
   * Возвращает массив
   * @return {[]}
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
   * @return {*}
   */
  getSettings(settingName){
    if(! settingName)
    {
      return this.settings;
    }
    return this.settings[settingName];
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