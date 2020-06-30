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
   * @param {*} method
   * @return {AltrpForm}
   */
  registerForm(formId, modelName, method){

  }

  /**
   * Добавляет поле к форме
   * @param {string} formId
   * @param {React.Component} filed
   * @return {bool}
   */
  addField(formId, filed){

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