import Resource from "./Resource";

/**
 * Класс имитирующий поведение формы (собирает данные с виджетов полей и отправляет их на сервер)
 */
class AltrpForm {
  constructor(formId, modelName, method = 'POST', options = {}){
    this.formId = formId;
    this.fields = [];
    this.submitButtons = [];
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
      case 'email':{
        route = `/ajax/feedback`
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
   * Добавляет кнопку
   */
  addSubmitButton(buttonElement){
    this.submitButtons.push(buttonElement);
  }
  /**
   * Добавляет поле
   * @param {FrontElement} field
   */
  addField(field){
    let exists = false;
    this.fields = this.fields.map(_f=>{
      if(_f.getId() === field.getId()){
        exists = true;
        if(! field.component){
          return _f;
        }
        return field;
      }
      return _f;
    });

    if(! exists){
      this.fields.push(field);
    }
    return true;
  }

  /**
   * Проверка полей перед отправкой
   * @param {int |  null} modelID
   * @param {string} submitText
   * @return {boolean}
   */
  async submit(modelID, submitText = ''){
    let success = true;
    if(submitText){
      let confirmed =  await confirm(submitText);
      if(! confirmed){
        return{success: false};
      }
    }
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
            return res;
          }
          if((this.modelName === 'logout') && this.options.afterLogoutRedirect){
            document.location.replace(this.options.afterLogoutRedirect);
            return res;
          }
          if(res.reload){
            document.location.reload();
            return;
          }
          this.clearInputs();
          return res;
        }

        case 'PUT':{
          // return await alert(JSON.stringify(this.getData()));
          let res;
          if(modelID){
            res =  await this.resource.put(modelID, this.getData());
            import('./modules/ModelsManager').then(modelsManager=>{
              modelsManager.default.updateModelWithData(this.modelName, modelID, this.getData());
            });
            this.clearInputs();
            return res;
          }
          console.error('Не удалось получить ИД модели для обновления!');
        }
        break;
        case 'DELETE':{
          if(modelID){
            // return await await alert('Удаление!');
            return await this.resource.delete(modelID);
          }
          console.error('Не удалось получить ИД модели для удаления!');
        }
        break;
      }
    } else {
      return await alert('Пожалуйста, заполните все обязательные поля');
    }
  }

  /**
   * Очистим поля формы
   */
  clearInputs(){
    this.fields.forEach(field=>{
      try {
        if (_.isFunction(_.get(field, 'component.setState'))) {
          field.component.setState(state => ({...state, value: ''}));
        }
      }catch(error){
        console.error(error);
      }
    });
  }

  /**
   * Собирает данные с полей для отправки
   * @return {object}
   */
  getData(){
    let data = {altrp_ajax: true};

    if(this.modelName === 'email'){
      let userMessage = '';
      let subject = 'Altrp Email';

      this.submitButtons.forEach(b=>{
        if(b.getSettings('email_subject')){
          subject = b.getSettings('email_subject');
        }
      });
      this.fields.forEach(field=>{
        if(field.getValue() !== null){
          let fieldLabel = field.getSettings('content_label')
              || field.getSettings('content_placeholder') || '';
          let fieldValue = field.getValue();
          userMessage += `${fieldLabel}: ${fieldValue} <br/> `
        }
      });
      data.subject = subject;
      data.user_message = userMessage;
    } else {
      this.fields.forEach(field=>{
        if(field.getValue() !== null){
          data[field.getSettings('field_id')] = field.getValue();
        }
      });
    }
    return data;
  }
}

export default AltrpForm