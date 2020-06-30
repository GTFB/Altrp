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
   * Добавлйет поле
   * @param {FrontElement} field
   */
  addField(field){
    console.log(field);
    this.fields.push(field);
    return true;
  }

  /**
   * Проверка полей перед отправкой
   * @return {boolean}
   */
  submit(){
    let success = true;
    this.fields.forEach(field=>{
      if(!field.fieldValidate()){
        success = false;
      }
    });
    if(success){
      this.resource.post(this.getData())
    } else {
      alert('Валидация не прошла');
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