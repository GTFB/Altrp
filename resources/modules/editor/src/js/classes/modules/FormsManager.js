/**
 * Класс менеджер форм для фронтенда/редактора
 */
class FormsManager {
  constructor(){
    this.forms = [];
    this.formIds = [];
  }

  /**
   * Регистрирует новую форму.
   * Если форма с таким ID существует, то возвращает false
   * @param {string} formId
   * @param {string} route
   * @param {*} method
   * @return {bool}
   */
  registerForm(formId, route, method){

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
   * @return {bool}
   */
  submitForm(formId){

    this.forms.forEach(form=>{
      form.validateFileds();
    })
  }
}
const formsManager = new FormsManager();

export default formsManager;