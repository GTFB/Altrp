class Form {
  constructor(formId, route, method = 'post'){
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

export default Form