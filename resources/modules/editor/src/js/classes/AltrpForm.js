class AltrpForm {
  constructor(formId, route, method = 'POST'){
    this.formId = formId;
    this.fileds = [];
    this.method = method;
    this.route = route;
  }

  /**
   * Добавлйет поле
   * @param fieldName
   * @param field
   */
  addField(fieldName,field){

  }

  /**
   * Проверка полей перед отправкой
   * @return {boolean}
   */
  submit(){

    this.fileds.forEach(form=>{
    });
  }

  /**
   * Собирает данные с полей для отправки
   * @return {object}
   */
  getData(){

  }
}

export default AltrpForm