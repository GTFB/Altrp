import Resource from "./Resource";

class AltrpForm {
  constructor(formId, route, method = 'POST'){
    this.formId = formId;
    this.fields = [];
    this.method = method;
    this.route = route;
    this.resource = new Resource({route})
  }

  /**
   * Устанавливает список полей (в случае, если егистрация после добавления какой либо формы)
   * @param {FrontElement[]}fields
   */
  setFields(fields){
    this.fields = fields;
  }

  /**
   * Добавлйет поле
   * @param {FrontElement} field
   */
  addField(field){
    this.fields.push(field);
    return true;
  }

  /**
   * Проверка полей перед отправкой
   * @return {boolean}
   */
  async submit(){
    let success = true;
    this.fields.forEach(field=>{
      if(!field.fieldValidate()){
        success = false;
      }
    });
    if(success){
      return await this.resource.post(this.getData())
    } else {
      return await alert('Валидация не прошла');
    }
  }

  /**
   * Собирает данные с полей для отправки
   * @return {object}
   */
  getData(){
    let data = {};
    return data;
  }
}

export default AltrpForm