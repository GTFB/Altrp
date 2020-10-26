import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
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
    switch(this.getType()) {
      case 'form':{
        return await this.doActionForm();
      }
    }
  }
  /**
   * Оссинхронно выполняет действие-формы
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
}

export default AltrpAction