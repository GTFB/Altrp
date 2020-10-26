import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import {isString} from "lodash";
import {replaceContentWithData} from "../helpers";

// let  history = require('history');
// // import {history} from 'history';
// console.log(history.history);
/**
 * Класс представляющий действия на странице
 * @link https://docs.google.com/document/d/1v8Hm1DLkqqwzBeISd8-UvgTqscVxQPtBUtKqBrH1HaU/edit#
 * @class AltrpAction
 */
class AltrpAction extends AltrpModel{
  constructor(data, widgetId){
    super(data);
    this.setProperty('_widgetId', widgetId);
    this.init();
  }

  /**
   * Возврашает значение свойства name, если свойство строка, то производит подстановку значений из данных
   * @params {string} name
   * @params {*} defaultValue
   * @return {*}
   */
  getReplacedProperty(name, defaultValue = '') {
    let value = this.getProperty(name, defaultValue);
    if(_.isString(value)){
      value = replaceContentWithData(value);
    }
    return value;
  }
  /**
   * Инициируем действие
   */
  async init(){
    switch(this.getType()) {
      case 'form':{
        if(! this.getProperty('form_url')){
          this.setProperty('_form', null);
          return;
        }
        const formsManager = (await import('../../../../editor/src/js/classes/modules/FormsManager.js')).default;
        const formOptions = {
          dynamicURL: true,
          customRoute: this.getProperty('form_url'),
        };

        const form = formsManager.registerForm(this.getProperty('form_id'), '', this.getProperty('form_method'), formOptions);
        this.setProperty('_form', form);
        return;
      }
    }
  }
  /**
   * Получить тип действия
   * @return {string}
   */
  getType(){
    return this.getProperty('type');
  }
  /**
   * Получить тип действия
   * @return {*}
   */
  setType(type){
    return this.setProperty('type', type);
  }

  /**
   * Оссинхронно выполняет действие
   * @return {Promise<void>}
   */
  async doAction(){
    let result = {
      success: false,
    };
    let confirmText = this.getProperty('confirm');
    if(confirmText && ! confirm(confirmText)){
      return {
        success: false,
        message: 'User not Confirm'
      }
    }
    switch(this.getType()) {
      case 'form':{
        result =  await this.doActionForm();
      }
      break;
      case 'redirect':{
        result =  await this.doActionRedirect();
      }
      break;
      case 'toggle_element':{
        result =  await this.doActionToggleElements();
      }
      break;
    }
    let alertText =   this.getProperty('alert');
    if(alertText){
      alert(alertText);
    }
    return result;
  }
  /**
   * Ассинхронно выполняет действие-формы
   * @return {Promise<void>}
   */
  async doActionForm(){
    if(! this.getProperty('_form')){
      return {
        success: false,
        message: 'Нет Формы',
      };
    }
    return this.getProperty('_form').submit()
  }
  /**
   * Делает редирект на страницу form_url
   * @return {Promise<void>}
   */
  async doActionRedirect(){

    let URL = this.getReplacedProperty('form_url');
    frontAppRouter.history.push(URL);
    return {
      success: true,
    }
  }
  /**
   * Показывает/скрывает элементы по пользовательским ИД
   * @return {Promise<void>}
   */
  async doActionToggleElements(){

    let URL = this.getReplacedProperty('form_url');
    frontAppRouter.history.push(URL);
    return {
      success: true,
    }
  }
}

export default AltrpAction