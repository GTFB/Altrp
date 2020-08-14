import Resource from "./Resource";

/**
 * Класс имитирующий поведение формы (собирает данные с виджетов полей и отправляет их на сервер)
 */
class AltrpForm {
  constructor(formId, modelName, method = 'POST', options = {}){
    this.formId = formId;
    this.fields = [];
    this.method = method;
    this.options = options;
    this.modelName = modelName;
    let route = `/ajax/models/${modelName}`;

    switch (modelName){
      case 'login':{
        route = `/login`
      }break;
      case 'logout':{
        route = `/logout`
      }break;
    }
    this.resource = new Resource({route});
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
   * @param {int |  null} modelID
   * @return {boolean}
   */
  async submit(modelID){
    let success = true;
    this.fields.forEach(field=>{
      if(! field.fieldValidate()){
        success = false;
      }
    });
    if(success){
      switch (this.method){
        case 'POST':{
          let res =  await this.resource.post(this.getData());
          if((this.modelName === 'login') && this.options.afterLoginRedirect){
            document.location.replace(this.options.afterLoginRedirect);
            return;
          }
          if((this.modelName === 'logout') && this.options.afterLogoutRedirect){
            document.location.replace(this.options.afterLogoutRedirect);
            return;
          }
          if(res.reload){
            document.location.reload();
            return;
          }
          return res;
        }
        case 'PUT':{
          // return await alert(JSON.stringify(this.getData()));
          let res;
          if(modelID){
            res =  await this.resource.put(modelID, this.getData());
            import('./modules/ModelsManager').then(modelsManager=>{
              console.log(this.getData());
              modelsManager.default.updateModelWithData(this.modelName, modelID, this.getData());
            });

            return res;
          }
          console.error('Не удалось получить ИД модели для удаления!');
        }
        break;
        case 'DELETE':{
          if(modelID){
            // return await await alert('Удаление!');
            return await this.resource.delete(modelID);
          }
          console.error('Не удалось получить ИД модели для удаления!');
        }
      }
    } else {
      return await alert('Валидация не прошла');
    }
  }

  /**
   * Собирает данные с полей для отправки
   * @return {object}
   */
  getData(){
    let data = {altrp_ajax: true};
    this.fields.forEach(field=>{
      if(field.getValue() !== null){
        data[field.getSettings('field_id')] = field.getValue();
      }
    });
    return data;
  }
}

export default AltrpForm