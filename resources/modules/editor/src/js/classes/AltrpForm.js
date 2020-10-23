import Resource from "./Resource";
import {clearAllResponseData} from "../../../../front-app/src/js/store/responses-storage/actions";

/**
 * Класс имитирующий поведение формы (собирает данные с виджетов полей и отправляет их на сервер)
 */
class AltrpForm {
  /**
   *
   * @param {string} formId
   * @param {string} modelName
   * @param {string} method
   * @param {{}} options
   */
  constructor(formId, modelName = '', method = 'POST', options = {}){
    this.formId = formId;
    this.fields = [];
    this.submitButtons = [];
    this.method = method;
    this.options = options;
    this.modelName = modelName;
    let route = `/ajax/models/${modelName}`;
    const {dynamicURL, customRoute} = this.options;

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
    if(customRoute){
      route = customRoute;
    }
    this.resource = new Resource({route, dynamicURL});
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
  async submit(modelID = null, submitText = ''){
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
          this.updateResponseStorage(res);
          return res;
        }

        case 'PUT':{
          let res;
          if(modelID || this.options.customRoute){
            res =  await this.resource.put(modelID, this.getData());
            import('./modules/ModelsManager').then(modelsManager=>{
              modelsManager.default.updateModelWithData(this.modelName, modelID, this.getData());
            });
            this.clearInputs();
            this.updateResponseStorage(res);
            return res;
          }
          console.error('Не удалось получить ИД модели для обновления или customRoute!');
        }
        break;
        case 'GET':{
          // return await alert(JSON.stringify(this.getData()));
          let res;
          res =  await this.resource.getQueried(this.getData());
          this.updateResponseStorage(res);
          return res;
        }
        case 'DELETE':{
          if(modelID || this.options.customRoute){
            // return await await alert('Удаление!');
            return await this.resource.delete(modelID);
          }
          console.error('Не удалось получить ИД модели для удаления или customRoute!');
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
   * @return {{}}
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

  /**
   * Обновить responses-storage данными
   * @param {{}} res
   */
  updateResponseStorage(res = {}){
    appStore.dispatch(clearAllResponseData(this.formId, res));
  }

}

export default AltrpForm