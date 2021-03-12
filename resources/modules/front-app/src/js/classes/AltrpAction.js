import AltrpModel from '../../../../editor/src/js/classes/AltrpModel';
import React, { Component } from 'react';
import {
  altrpLogin,
  altrpLogout,
  dataFromTable,
  dataToCSV,
  elementsToPdf,
  getAppContext,
  getComponentByElementId,
  getHTMLElementById,
  parseParamsFromString,
  getDataByPath,
  printElements,
  replaceContentWithData,
  scrollToElement,
  setDataByPath,
  dataToXLS,
  delay,
} from '../helpers';
import { togglePopup } from '../store/popup-trigger/actions';
import {sendEmail} from '../helpers/sendEmail';

// let  history = require('history');
// // import {history} from 'history';
// console.log(history.history);
/**
 * Класс представляющий действия на странице
 * @link https://docs.google.com/document/d/1v8Hm1DLkqqwzBeISd8-UvgTqscVxQPtBUtKqBrH1HaU/edit#
 * @class AltrpAction
 */
class AltrpAction extends AltrpModel {
  constructor(data, widgetId, element) {
    super(data);
    this.setProperty('_widgetId', widgetId);
    this.setProperty('_element', element);
    this.init();
  }

  /**
   * Получить id элемента
   * @return {string}
   */
  getElementId() {
    return this.getProperty('_element').getId();
  }

  /**
   * Получить id для регистрации формы
   * @return {string}
   */
  getFormId() {
    let formId = this.getProperty('form_id');
    if (!formId) {
      return formId;
    }
    if (formId.indexOf('{{') !== -1) {
      formId = replaceContentWithData(formId, this.getCurrentModel().getData());
    }
    return formId;
  }

  /**
   * Получить URL формы
   * @return {string}
   */
  getFormURL() {
    let formURL = this.getProperty('form_url');
    if (!formURL) {
      return formURL;
    }
    if (formURL.indexOf('{{') !== -1) {
      formURL = replaceContentWithData(
        formURL,
        this.getCurrentModel().getData()
      );
    }
    return formURL;
  }

  /**
   * Получить компонент обертки для элемента
   * @return {{}}
   */
  getWrapperComponent() {
    return getComponentByElementId(this.getElementId());
  }

  /**
   * Получить экземпляр элемента
   * @return {FrontElement | null}
   */
  getElement() {
    return this.getProperty('_element');
  }
  /**
   * Получить экземпляр текущей модели страницы или карточки
   * @return {AltrpModel | null}
   */
  getCurrentModel() {
    const element = this.getElement();
    return element.getCurrentModel();
  }

  /**
   * Возврашает значение свойства name, если свойство строка, то производит подстановку значений из данных
   * @params {string} name
   * @params {*} defaultValue
   * @return {*}
   */
  getReplacedProperty(name, defaultValue = '') {
    let value = this.getProperty(name, defaultValue);
    if (_.isString(value)) {
      value = replaceContentWithData(value, this.getCurrentModel().getData());
    }
    return value;
  }
  /**
   * Инициируем действие
   */
  async init() {
    switch (this.getType()) {
      case 'form': {
        if (!this.getFormURL()) {
          this.setProperty('_form', null);
          return;
        }
        // const formsManager = (
        //   await import(
        //     '../../../../editor/src/js/classes/modules/FormsManager.js'
        //   )
        // ).default;
        // const formOptions = {
        //   dynamicURL: true,
        //   customRoute: this.getFormURL()
        // };

        // const form = formsManager.registerForm(
        //   this.getFormId(),
        //   '',
        //   this.getProperty('form_method'),
        //   formOptions
        // );
        // this.setProperty('_form', form);
        return;
      }
      case 'login': {
        const form = formsManager.registerForm(
          this.getFormId(),
          'login',
          'POST'
        );
        this.setProperty('_form', form);
      }
    }
  }
  /**
   * Получить тип действия
   * @return {string}
   */
  getType() {
    return this.getProperty('type');
  }
  /**
   * Получить тип действия
   * @return {*}
   */
  setType(type) {
    return this.setProperty('type', type);
  }

  /**
   * Оссинхронно выполняет действие
   * @return {Promise<void>}
   */
  async doAction() {
    let result = {
      success: false
    };
    let confirmText = this.getProperty('confirm');
    if (confirmText && !confirm(confirmText)) {
      return {
        success: false,
        message: 'User not Confirm'
      };
    }
    switch (this.getType()) {
      case 'form':
        {
          result = await this.doActionForm();
        }
        break;
      case 'delay':
        {
          result = await this.doActionDelay();
        }
        break;
      case 'email':
        {
          result = await this.doActionEmail();
        }
        break;
      case 'redirect':
        {
          result = await this.doActionRedirect();
        }
        break;
      case 'toggle_element':
        {
          result = await this.doActionToggleElements();
        }
        break;
      case 'toggle_popup':
        {
          result = await this.doActionTogglePopup();
        }
        break;
      case 'print_page':
        {
          result = await this.doActionPrintPage();
        }
        break;
      case 'print_elements':
        {
          result = await this.doActionPrintElements();
        }
        break;
      case 'scroll_to_element':
        {
          result = await this.doActionScrollToElement();
        }
        break;
      case 'scroll_to_top':
        {
          result = await this.doActionScrollToTop();
        }
        break;
      case 'scroll_to_bottom':
        {
          result = await this.doActionScrollToBottom();
        }
        break;
      case 'trigger':
        {
          result = await this.doActionTrigger();
        }
        break;
      case 'page_to_pdf':
        {
          result = await this.doActionPageToPDF();
        }
        break;
      case 'elements_to_pdf':
        {
          result = await this.doActionElementsToPDF();
        }
        break;
      case 'data_to_csv':
        {
          result = await this.doActionDataToCSV();
        }
        break;
      case 'table_to_csv':
        {
          result = await this.doActionTableToCSV();
        }
        break;
      case 'table_to_xls':
        result = await this.doActionTableToXLS();
        break;
      case 'login':
        {
          result = await this.doActionLogin();
        }
        break;
      case 'logout':
        {
          result = await this.doActionLogout();
        }
        break;
      case 'set_data':
        {
          result = await this.doActionSetData();
        }
        break;
      case 'update_current_datasources':
        {
          result = await this.doActionUpdateCurrentDatasources();
        }
        break;
      case 'forms_manipulate':
        {
          result = await this.doActionFormsManipulate();
        }
        break;
      case 'custom_code':
        {
          result = await this.doActionCustomCode();
        }
        break;
      case 'play_sound':
        {
          result = await this.doActionPlaySound();
        }
        break;
    }
    let alertText = '';
    if (result.success) {
      alertText = this.getProperty('alert');
    } else {
      alertText = this.getProperty('reject');
    }
    if (alertText) {
      alertText = replaceContentWithData(alertText);
      alert(alertText);
    }
    return result;
  }
  /**
   * Ассинхронно выполняет действие-формы
   * @return {Promise<{}>}
   */
  async doActionForm() {
    // if (! this.getProperty('_form')) {
    //   return {
    //     success: false,
    //     message: 'Нет Формы'
    //   };
    // }
    const formsManager = (
      await import('../../../../editor/src/js/classes/modules/FormsManager.js')
    ).default;

    let data = null;
    let customHeaders = null;
    if(this.getProperty('custom_headers')){
      customHeaders = parseParamsFromString(this.getProperty('custom_headers'), this.getCurrentModel());
    }
    if (this.getProperty('data')) {
      data = parseParamsFromString(
        this.getProperty('data'),
        getAppContext(),
        true
      );
      // if (!_.isEmpty(data)) {
      //   return form.submit('', '', data);
      // }
      // return { success: true };
    }
    if (this.getProperty('forms_bulk')) {
      if (
        _.isArray(getDataByPath(this.getProperty('bulk_path'))) &&
        _.get(getDataByPath(this.getProperty('bulk_path')), 'length')
      ) {
        let bulk = getDataByPath(this.getProperty('bulk_path'));
        /**
         * Для получение данных с полей формы, нужно создать форму и вызвать метод getData
         * @type {AltrpForm}
         */
        const form = formsManager.registerForm(
            this.getFormId(),
            '',
            this.getProperty('form_method'),
            {
              customRoute: ''
            }
        );
        data = _.assign(form.getData(), data);
        let bulkRequests = bulk.map(async (item, idx) => {
          if (this.getProperty('data')) {
            data = parseParamsFromString(
              this.getProperty('data'),
              getAppContext(item),
              true
            );
          }
          let url = this.getProperty('form_url');
          url = replaceContentWithData(url, item);
          const form = formsManager.registerForm(
            this.getFormId() + idx,
            '',
            this.getProperty('form_method'),
            {
              customRoute: url
            }
          );
          return await form.submit('', '', data, customHeaders);
        });
        try {
          let res = await Promise.all(bulkRequests);
        } catch (error) {
          console.error(error);
          bulk.forEach((item, idx) => {
            formsManager.deleteFormById(this.getFormId() + idx);
          });
          return { success: false };
        }
        bulk.forEach((item, idx) => {
          formsManager.deleteFormById(this.getFormId() + idx);
        });
      }

      return { success: true };
    }
    if (this.getProperty('path')) {
      let _data = getDataByPath(this.getProperty('path'), {});
      if (!_.isEmpty(_data)) {
        data = _.assign(_data, data);
      }
    }
    /**
     *
     * @type {AltrpForm}
     */
    // let form = this.getProperty('_form');
    if (! this.getFormURL()) {
      this.setProperty('_form', null);
      return {
        success: false
      };
    }
    const formOptions = {
      dynamicURL: true,
      customRoute: this.getFormURL()
    };
    const form = formsManager.registerForm(
      this.getFormId(),
      '',
      this.getProperty('form_method'),
      formOptions
    );
    let result = {
      success: true
    };
    try {
      const response = await form.submit('', '', data, customHeaders);
      result = _.assign(result, response);
    } catch (error) {
      console.log(error);
      result.error = error;
      result.success = false;
    }

    return result;
  }
  /**
   * Делает редирект на страницу form_url
   * @return {Promise<{}>}
   */
  async doActionRedirect() {
    let URL = this.getFormURL();
    if (frontAppRouter) {
      if (this.getProperty('back')) {
        frontAppRouter.history.goBack();
      } else {
        let innerRedirect = !this.getProperty('outer');
        if (innerRedirect) {
          frontAppRouter.history.push(URL);
        } else {
          window.location.assign(URL);
        }
      }
    }
    return {
      success: true
    };
  }
  /**
   * Показывает/скрывает элементы по пользовательским ИД
   * @return {Promise<{}>}
   */
  async doActionToggleElements() {
    let IDs = this.getProperty('elements_ids');
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(',');

    IDs.forEach(id => {
      let component = getComponentByElementId(id);
      if (!component && !component.toggleElementDisplay) {
        return;
      }
      component.toggleElementDisplay();
    });
    return {
      success: true
    };
  }
  /**
   * Показывает/скрывает попап
   * @return {Promise<{}>}
   */
  async doActionTogglePopup() {
    let id = this.getProperty('popup_id');
    if (!id) {
      return {
        success: true
      };
    }
    appStore.dispatch(togglePopup(id));

    return {
      success: true
    };
  }
  /**
   * Печать страницы
   * @return {Promise<{}>}
   */
  async doActionPrintPage() {
    window.print();
    return {
      success: true
    };
  }
  /**
   * Печать элементов
   * @return {Promise<{}>}
   */
  async doActionPrintElements() {
    let IDs = this.getProperty('elements_ids');
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(',');
    let elementsToPrint = [];
    IDs.forEach(elementId => {
      if (!elementId || !elementId.trim()) {
        return;
      }
      getHTMLElementById(elementId.trim()) &&
        elementsToPrint.push(getHTMLElementById(elementId));
      if (getComponentByElementId(elementId.trim())?.getStylesHTMLElement) {
        let stylesElement = getComponentByElementId(
          elementId.trim()
        ).getStylesHTMLElement();
        if (stylesElement) {
          elementsToPrint.push(stylesElement);
        }
      }
    });
    if (_.get(window, 'stylesModule.stylesContainer.current')) {
      elementsToPrint.push(
        _.get(window, 'stylesModule.stylesContainer.current')
      );
    }
    elementsToPrint.push(document.head);
    printElements(elementsToPrint);
    return {
      success: true
    };
  }
  /**
   * Скролл к элементу
   * @return {Promise<{}>}
   */
  async doActionScrollToElement() {
    let elementId = this.getProperty('element_id');
    if (!elementId) {
      return { success: true };
    }
    elementId = elementId.trim();
    const element = getHTMLElementById(elementId);
    if (element) {
      scrollToElement(mainScrollbars, element);
    }
    return {
      success: true
    };
  }
  /**
   * Скролл на верх страницы
   * @return {Promise<{}>}
   */
  async doActionScrollToTop() {
    mainScrollbars.scrollTop(0);
    return {
      success: true
    };
  }
  /**
   * Скролл на верх страницы
   * @return {Promise<{}>}
   */
  async doActionScrollToBottom() {
    const routeContent = document.getElementById('route-content');
    if (!routeContent) {
      return {
        success: true
      };
    }
    mainScrollbars.scrollTop(routeContent.offsetHeight);
    return {
      success: true
    };
  }
  /**
   * Страницу в PDF
   * @return {Promise<{}>}
   */
  async doActionPageToPDF() {
    let filename = replaceContentWithData(this.getProperty('name', 'file'));
    const elements = [];

    elements.push(document.getElementById('route-content'));
    return await elementsToPdf(elements, filename);
  }

  /**
   * Элементы в PDF
   * @return {Promise<{}>}
   */
  async doActionElementsToPDF() {
    let filename = replaceContentWithData(this.getProperty('name', 'file'));
    const elements = [];
    let IDs = this.getProperty('elements_ids');
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(',');
    IDs.forEach(elementId => {
      if (!elementId || !elementId.trim()) {
        return;
      }
      getHTMLElementById(elementId.trim()) &&
        elements.push(getHTMLElementById(elementId));
    });
    return await elementsToPdf(elements, filename);
  }
  /**
   * Данные в CSV-файл
   * @return {Promise<{}>}
   */
  async doActionDataToCSV() {
    let data = getDataByPath(this.getProperty('path'));
    let filename = replaceContentWithData(this.getProperty('name', 'file'));
    try {
      return await dataToCSV(data, filename);
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
  /**
   * HTML-Таблицу в CSV-файл
   * @return {Promise<{}>}
   */
  async doActionTableToCSV() {
    let elementId = this.getProperty('element_id');
    if (!elementId) {
      return { success: true };
    }
    elementId = elementId.trim();
    const element = getHTMLElementById(elementId);
    if (!element) {
      return { success: true };
    }
    let data;
    try {
      data = dataFromTable(element);
    } catch (error) {
      console.error(error);
      return { success: false };
    }
    if (_.isEmpty(data)) {
      return { success: true };
    }
    let filename = replaceContentWithData(this.getProperty('name', 'file'));
    try {
      return await dataToCSV(data, filename);
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
  /**
   * HTML-таблицу в XLS-файл
   * @return {Promise}
   */
  async doActionTableToXLS() {
    const elementId = this.getProperty('element_id').trim();
    if (!elementId) {
      console.error('Element ID is not set');
      return { success: true };
    }

    const table = getHTMLElementById(elementId);
    if (!table) {
      console.error('Table with provided ID is not found');
      return { success: true };
    }

    let data = dataFromTable(table);
    const formattedData = [];

    _.each(data, row => formattedData.push(Object.values(row)));
    const templateName = this.getProperty('template_name');
    const rawTemplateData = this.getProperty('template_data');
    const parsedTemplateData = rawTemplateData
      .split('\n')
      .reduce((data, row) => {
        const keyValuePair = row.split('=');
        data[keyValuePair[0]] = keyValuePair[1];
        return data;
      }, {});
    data = { ...parsedTemplateData, dataArray: formattedData };
    const filename = replaceContentWithData(this.getProperty('name', 'file'));

    try {
      const blob = await dataToXLS(data, filename, templateName);
      let link = document.createElement('a');
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', filename + '.xls');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }
  /**
   * действие-логин
   * @return {Promise<{}>}
   */
  async doActionLogin() {
    /**
     *
     * @member {AltrpForm} form
     */
    let form = this.getProperty('_form');
    let success = true;
    form.fields.forEach(field => {
      if (!field.fieldValidate()) {
        success = false;
      }
    });
    if (!success) {
      return { success: false };
    }

    return await altrpLogin(form.getData());
  }
  /**
   * действие-выход из приложения
   * @return {Promise<{}>}
   */
  async doActionLogout() {
    return await altrpLogout();
  }
  /**
   * действие-установка значения по для пути `path`
   * @return {Promise<{}>}
   */
  async doActionSetData() {
    let path = this.getProperty('path');
    const result = {
      success: false
    };
    if (!path) {
      return result;
    }
    let value = this.getProperty('value') || '';
    value = value.trim();
    const setType = this.getProperty('set_type');
    let count = this.getProperty('count');
    switch (setType) {
      case 'toggle':
        {
          value = !getDataByPath(path);
          result.success = setDataByPath(path, value);
        }
        break;
      case 'set':
        {
          if (
            value.split(/\r?\n/).length === 1 &&
            value.indexOf('{{') === 0 &&
            value.indexOf('}}') === value.length - 2 &&
            getDataByPath(value.replace('{{', '').replace('}}', ''))
          ) {
            value = getDataByPath(
              value.replace('{{', '').replace('}}', ''),
              null,
              this.getCurrentModel()
            );
          } else {
            value = replaceContentWithData(
              value,
              this.getCurrentModel().getData()
            );
          }
          result.success = setDataByPath(path, value);
        }
        break;
      case 'toggle_set':
        {
          let currentValue = getDataByPath(path);
          value = value.split('\n').map(v => v.trim());
          if (value.length === 1) {
            value.push('');
          }
          let nextIndex = value.indexOf(currentValue) + 1;
          if (nextIndex >= value.length) {
            nextIndex = 0;
          }
          value = value[nextIndex] || '';
          result.success = setDataByPath(path, value);
        }
        break;
      case 'increment':
        {
          let currentValue = getDataByPath(path);
          currentValue = currentValue
            ? _.isNaN(Number(currentValue))
              ? 1
              : Number(currentValue)
            : Number(!!currentValue);
          count = Number(count) || 1;
          currentValue += count;
          result.success = setDataByPath(path, currentValue);
        }
        break;
      case 'decrement':
        {
          let currentValue = getDataByPath(path);
          currentValue = currentValue
            ? _.isNaN(Number(currentValue))
              ? 1
              : Number(currentValue)
            : Number(!!currentValue);
          count = Number(count) || 1;
          currentValue -= count;
          result.success = setDataByPath(path, currentValue);
        }
        break;
      case 'push_items':
        {
          let currentValue = getDataByPath(path);
          let item = {};
          if (!_.isArray(currentValue)) {
            currentValue = [];
          }
          currentValue = [...currentValue];
          if (_.isObject(getDataByPath(value))) {
            item = getDataByPath(value);
          }
          count = Number(count) || 1;
          if (count < 0) {
            count = 1;
          }
          while (count) {
            _.isArray(item)
              ? currentValue.push([...item])
              : currentValue.push({ ...item });
            --count;
          }
          result.success = setDataByPath(path, currentValue);
        }
        break;
      case 'remove_items':
        {
          let items = path.split(/\r?\n/);
          items.forEach(i => {
            if (!i) {
              return;
            }
            i = i.trim();
            if (!i) {
              return;
            }
            if (i.indexOf('{{') !== -1) {
              i = replaceContentWithData(i, this.getCurrentModel().getData());
            }
            let item = getDataByPath(i);
            if (!item) {
              return;
            }
            let listPath = i.replace(/.\d+$/, '').trim();
            if (!listPath) {
              return;
            }
            let list = getDataByPath(listPath);
            if (!_.isArray(list)) {
              return;
            }
            list = [...list];
            list = list.filter(_item => _item !== item);
            setDataByPath(listPath, list);
          });
          result.success = true;
        }
        break;
    }

    return result;
  }
  /**
   * действие - манипуляция с элементами форм
   * @return {Promise<{}>}
   */
  doActionFormsManipulate() {
    let IDs = this.getProperty('elements_ids');
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(',');
    const change = this.getProperty('forms_change');
    IDs.forEach(id => {
      let component = getComponentByElementId(id);
      switch (change) {
        case 'select_all':
          {
            if (_.get(component, 'elementRef.current.selectAll')) {
              component.elementRef.current.selectAll();
            }
          }
          break;
        case 'clear':
          {
            if (_.get(component, 'elementRef.current.clearValue')) {
              component.elementRef.current.clearValue();
            }
          }
          break;
      }
    });
    return { success: true };
  }
  /**
   * действие - выполнение пользовательского кода
   * @return {Promise<{}>}
   */
  doActionCustomCode() {
    let code = this.getProperty('code');
    eval(code);
    return { success: true };
  }
  /**
   * действие - обновление текущего хранилища
   * @return {Promise<{}>}
   */
  async doActionUpdateCurrentDatasources() {
    let aliases = this.getProperty('aliases') || '';
    aliases = aliases.split(',').map(alias=>alias.trim()).filter(alias=>alias);
    const allDataSources = window.dataStorageUpdater.getProperty('currentDataSources');
    const dataSourcesToUpdate = allDataSources.filter(dataSource=>{
      return aliases.indexOf(dataSource.getProperty('alias')) !== -1;
    });
    /**
     * @type {DataStorageUpdater}
     */
    await window.dataStorageUpdater.updateCurrent(dataSourcesToUpdate, false);
    return { success: true };
  }
  /**
   * Триггер события на другом компоненте
   * @return {Promise<{}>}
   */
  async doActionTrigger() {
    let elementId = this.getProperty('element_id');
    let element = getComponentByElementId(elementId);
    let action = this.getProperty('action');
    if (_.isFunction(element[action])) {
      element[action]();
      return {
        success: true
      };
    }
    try {
      element.elementRef.current.fireAction(action);
      return {
        success: true
      };
    } catch (error) {
      console.error(error);
      return {
        success: false
      };
    }
  }

  /**
   * Отправка почты
   */
  async doActionEmail() {
    let templateGUID = this.getProperty('email_template');
    if(! templateGUID){
      return {success: true};
    }
    let res = {success: false};
    try{
      res = await sendEmail(templateGUID,
          this.getReplacedProperty('subject'),
          this.getReplacedProperty('from'),
          this.getReplacedProperty('to'),
          this.getReplacedProperty('attachments'),
          );
    } catch(e){
      console.error(e);
      return {
        success: false
      };
    }
    return res;
  }


  /**
   * Добавляем временную задержку в милисекундах
   */
  async doActionDelay() {
    await delay(this.getProperty('milliseconds') || 0);
    return {success: true}
  }
  async doActionPlaySound(){
    const duration = this.getProperty('milliseconds') || 0;
    const url = this.getProperty('media_url');
    const loop = this.getProperty('loop');
    if(url){
      const  {playSound} = await import('../helpers/sounds');
      playSound(url, loop, duration);
    }
    return {success: true}
  }
}

export default AltrpAction;
