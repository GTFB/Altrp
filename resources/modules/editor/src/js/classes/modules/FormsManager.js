import AltrpForm from "../AltrpForm";
/**
 * Класс менеджер форм для фронтенда/редактора
 */
class FormsManager {
  constructor(){
    /**
     *
     * @type {AltrpForm[]}
     */
    this.forms = [];
    /**
     *
     * @type {string[]}
     */
    this.formIds = [];
  }

  /**
   * Регистрирует новую форму.
   * @param {string} formId
   * @param {string} modelName
   * @param {string} method
   * @return {AltrpForm}
   */
  registerForm(formId, modelName, method){
    let form = this.getForm(formId);
    let route = `/ajax/models/${modelName}`;
    if(! form){
      form = new AltrpForm(formId, route, method);
      this.forms.push(form);
    }
    return form;
  }

  /**
   * Добавляет поле к форме
   * @param {string} formId
   * @param {FrontElement} field
   * @return {boolean}
   */
  addField(formId, field){
    let form = this.getForm(formId);
    return form.addField(field)
  }
  /**
   * Отправляет форму
   * @param {string} formId
   * @return {boolean}
   */
  submitForm(formId){
    if(! this.getForm(formId)){
      console.error('Форма не найдена');
      return false;
    }
    return this.getForm(formId).submit();
  }
  /**
   * Получить форму по id
   * @param {string} formId
   * @return {AltrpForm | null}
   */
  getForm(formId){
    let _form = null;
    this.forms.forEach(form=>{
      /**
       * @member {AltrpForm}form
       */
      if(form.formId === formId){
        _form = form;
      }
    });
    return _form;
  }
}
const formsManager = new FormsManager();

export default formsManager;