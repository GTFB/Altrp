import AltrpModel from '../../../../editor/src/js/classes/AltrpModel';
import {togglePopup} from '../store/popup-trigger/actions';
import {sendEmail} from '../helpers/sendEmail';
import {changeCurrentModel} from "../store/current-model/actions";
import { v4 as uuid } from "uuid";
import { io } from "socket.io-client";
import axios from "axios";
import elementsToPdf from "../functions/elementsToPdf";
import altrpLogin from "../functions/altrpLogin"
import altrpLogout from "../functions/altrpLogout"
import dataFromTable from "../functions/dataFromTable"
import dataToCSV from "../functions/dataToCSV"
import dataToXML from "../functions/dataToXML"
import getAppContext from "../functions/getAppContext"
import getComponentByElementId from "../functions/getComponentByElementId"
import getHTMLElementById from "../functions/getHTMLElementById"
import parseParamsFromString from "../functions/parseParamsFromString"
import getDataByPath from "../functions/getDataByPath"
import printElements from "../functions/printElements"
import replaceContentWithData from "../functions/replaceContentWithData"
import scrollToElement from "../functions/scrollToElement"
import setDataByPath from "../functions/setDataByPath"
import dataToXLS from "../functions/dataToXLS"
import delay from "../functions/delay"
import altrpCompare from "../functions/altrpCompare"
import getWrapperHTMLElementByElement from "../functions/getWrapperHTMLElementByElement"
import Resource from "../../../../editor/src/js/classes/Resource"
import replacePageContent from "../helpers/replace-page-content";

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
  getFormId(item = {}) {
    let formId = this.getProperty('form_id');
    if (!formId) {
      return formId;
    }
    if (formId.indexOf('{{') !== -1) {
      formId = replaceContentWithData(formId, {...this.getCurrentModel().getData(), ...item});
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
    confirmText = replaceContentWithData(confirmText, this.getCurrentModel().getData());

    if (confirmText && !confirm(confirmText)) {
      return {
        success: false,
        message: 'User not Confirm'
      };
    }
    switch (this.getType()) {
      case 'form': {
        result = await this.doActionForm();
      }
        break;
      case 'delay': {
        result = await this.doActionDelay();
      }
        break;
      case 'email': {
        result = await this.doActionEmail();
      }
        break;
      case 'redirect': {
        result = await this.doActionRedirect();
      }
        break;
      case 'reload': {
        result = this.doActionReload();
      }
        break;
      case 'toggle_element': {
        result = await this.doActionToggleElements();
      }
        break;
      case 'toggle_popup': {
        result = await this.doActionTogglePopup();
      }
        break;
      case 'print_page': {
        result = await this.doActionPrintPage();
      }
        break;
      case 'print_elements': {
        result = await this.doActionPrintElements();
      }
        break;
      case 'scroll_to_element': {
        result = await this.doActionScrollToElement();
      }
        break;
      case 'scroll_to_top': {
        result = await this.doActionScrollToTop();
      }
        break;
      case 'scroll_to_bottom': {
        result = await this.doActionScrollToBottom();
      }
        break;
      case 'trigger': {
        result = await this.doActionTrigger();
      }
        break;
      case 'page_to_pdf': {
        result = await this.doActionPageToPDF();
      }
        break;
      case 'elements_to_pdf': {
        result = await this.doActionElementsToPDF();
      }
        break;
      case 'data_to_csv': {
        result = await this.doActionDataToCSV();
      }
        break;
      case 'table_to_csv': {
        result = await this.doActionTableToCSV();
      }
        break;
      case 'table_to_xml': {
        result = await this.doActionTableToXML();
      }
        break;
      case 'table_to_xls':
        result = await this.doActionTableToXLS();
        break;
      case 'login': {
        result = await this.doActionLogin();
      }
        break;
      case 'logout': {
        result = await this.doActionLogout();
      }
        break;
      case 'set_data': {
        result = await this.doActionSetData();
      }
        break;
      case 'update_current_datasources': {
        result = await this.doActionUpdateCurrentDatasources();
      }
        break;
      case 'update_current_model': {
        result = await this.doActionUpdateCurrentModel();
      }
        break;
      case 'forms_manipulate': {
        result = await this.doActionFormsManipulate();
      }
        break;
      case 'custom_code': {
        result = await this.doActionCustomCode();
      }
        break;
      case 'play_sound': {
        result = await this.doActionPlaySound();
      }
        break;
      case 'condition': {
        result = await this.doActionCondition();
      }
        break;
      case 'vi_toggle': {
        result = await this.doActionVIToggle();
      }
        break;
      case 'oauth': {
        result = await this.doActionOAuth();
      }
        break;
      case 'metamask_connect': {
        result = await this.metaMaskConnect();
      }
        break;
      case 'socket_emit': {
        result = await this.doActionSocketEmit();

      }
        break;
      case 'socket_receiver': {
        result = this.doActionSocketReceiver();

      }
        break;
      case 'set_cookie': {
        result = this.doActionSetCookie();

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
      alertText = replaceContentWithData(alertText, this.getCurrentModel().getData());
      alert(alertText);
    }
    return result;
  }

  async doActionSetCookie() {
    const name = replaceContentWithData(this.getProperty("cookie_name"), this.getCurrentModel().getData())
    const value = replaceContentWithData(this.getProperty("cookie_value"), this.getCurrentModel().getData())

    const res = await axios.post("/ajax/cookie", {
      name,
      value
    })

    if(res.status === 200) {
      return res.data
    } else {
      return {
        success: false
      }
    }
  }
  /**
   * заставляет сервер отправить сокет
   * @return {object}
   */
  async doActionSocketEmit() {
    // if(!window.io) {
    //   window.io = io()
    // }
    let name = replaceContentWithData(this.getProperty("socket_emit_name"), this.getCurrentModel().getData())

    const value = {
      name,
      data: replaceContentWithData(this.getProperty("socket_value"), this.getCurrentModel().getData())
    }

    await axios.post("/sockets", value)
    return {
      success: true
    }
  }

  /**
   * слушает сокеты
   * @return {object}
   */
  doActionSocketReceiver() {

    let name = ""

    if(this.getProperty("socket_type") === "custom") {
      name = replaceContentWithData(this.getProperty("socket_name"), this.getCurrentModel().getData());
    } else {
      const user = window.current_user

      if(!user.is_guest && user.guid) {
        name = user.guid
      } else {
        let guid = localStorage.getItem("socket_guid");
        if(!guid) {
          localStorage.setItem("socket_guid", uuid())
          guid = localStorage.getItem("socket_guid")
        }

        name = guid
      }

    }

    if(!window.altrpIo) {
      window.altrpIo = io( {
        path: '/wsaltrp',
        auth: {
          key: name,
        },
      })
    }

    window.altrpIo.on(replaceContentWithData(name, this.getCurrentModel().getData()), (data) => {
      console.log(data)
      this.doActionUpdateCurrentDatasources()
    });

    return {
      success: true
    }
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
      await import(/* webpackChunkName: 'formsManager' */'../../../../editor/src/js/classes/modules/FormsManager.js')
    ).default;

    let data = null;
    let customHeaders = null;
    let emptyFieldMessage;
    if (this.getProperty('custom_headers')) {
      customHeaders = parseParamsFromString(
        this.getProperty('custom_headers'),
        this.getCurrentModel()
      );
    }
    if (this.getProperty('empty_field')) {
      emptyFieldMessage = this.getProperty('empty_field')
    }
    if (this.getProperty('data')) {
      data = parseParamsFromString(
        this.getProperty('data'),
        getAppContext(this.getCurrentModel()),
        true
      );
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
          if(! _.isObject(item)){
            item = {id: item}
          }
          url = replaceContentWithData(url, item);
          const form = formsManager.registerForm(
            this.getFormId() + idx,
            '',
            this.getProperty('form_method'),
            {
              customRoute: url
            }
          );
          return  form.submit('', '', data, customHeaders, emptyFieldMessage);
        });
        try {
          let res = await Promise.all(bulkRequests);
        } catch (error) {
          console.error(error);
          bulk.forEach((item, idx) => {
            formsManager.deleteFormById(this.getFormId() + idx);
          });
          return {success: false};
        }
        bulk.forEach((item, idx) => {
          formsManager.deleteFormById(this.getFormId() + idx);
        });
      }

      return {success: true};
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
    if (!this.getFormURL()) {
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
      const response = await form.submit('', '', data, customHeaders, emptyFieldMessage);
      result = _.assign(result, response);
    } catch (error) {
      console.error(error);
      result.error = error;
      result.success = false;
    }

    return result;
  }

  doActionReload(){
    window.location.reload();
    return{success: true}
  }
  /**
   * Делает редирект на страницу form_url
   * @return {Promise<{}>}
   */
  async doActionRedirect() {
    let history = window.history
    let _URL = this.getFormURL();
    if(! this.getProperty('back')){
      let url = _URL.replace(location.origin, '')
      url = location.origin + url
      url = new URL(url)
      if(location.pathname + location.search === url.pathname + url.search){
        return {success: true}
      }

    }
    if(! _URL){
      if (this.getProperty('back')) {
        history.back()
      }
      return {
        success: true
      }
    }
    if (window.frontAppRouter) {
      if (this.getProperty('back')) {
        frontAppRouter.history.goBack();
      } else {
        let innerRedirect = !this.getProperty('outer');
        if (innerRedirect) {
          frontAppRouter.history.push(_URL);
        } else {
          window.location.assign(_URL);
        }
      }
    } else {
      if (this.getProperty('back')) {
        history.back()
      } else {
        try{


          replacePageContent(_URL)
        } catch (e) {
          console.error(e);

          // window.location.href = _URL
          alert(e);
          window.location.assign(_URL);
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
      return {success: true};
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
    if (window['h-altrp']) {
      const loadPopups = (await import(/* webpackChunkName: 'load-popups' */"../functions/load-popups")).default;
      await loadPopups();
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
      return {success: true};
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
    console.log(elementId);
    if (!elementId) {
      return {success: true};
    }
    elementId = elementId.trim();
    const element = getHTMLElementById(elementId);
    let scroller = window.mainScrollbars;
    if (!scroller) {
      scroller = document.querySelector('.front-app-content');
    }
    if (!scroller) {
      scroller = window;
    }
    if (element) {
      scrollToElement(scroller, element);
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
    if (window.mainScrollbars) {
      window.mainScrollbars.scrollTop(0);
      return {
        success: true
      };
    }
    let scroller = document.querySelector('.front-app-content');

    if (!scroller) {
      scroller = window;
    }
    scroller.scrollTo({top: 0, left: 0, behavior: 'smooth'})

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
    if (window.mainScrollbars) {
      window.mainScrollbars.scrollTop(routeContent.offsetHeight);
      return {
        success: true
      };
    }

    let scroller = document.querySelector('.front-app-content');

    if (!scroller) {
      scroller = window;
    }
    scroller.scrollTo({left: 0, top: document.querySelector('.route-content').offsetHeight, behavior: 'smooth'})
    return {
      success: true
    };
  }

  /**
   * Страницу в PDF
   * @return {Promise<{}>}
   */
  async doActionPageToPDF() {
    let filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    const elements = [];

    elements.push(document.getElementById('route-content'));
    return await elementsToPdf(elements, filename);
  }

  /**
   * Элементы в PDF
   * @return {Promise<{}>}
   */
  async doActionElementsToPDF() {
    let filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    const elements = [];
    let IDs = this.getProperty('elements_ids');
    if (!IDs) {
      return {success: true};
    }
    IDs = IDs.split(',');
    IDs.forEach(elementId => {
      if (!elementId || !elementId.trim()) {
        return;
      }
      getHTMLElementById(elementId.trim()) &&
      elements.push(getHTMLElementById(elementId));
    });
    return await elementsToPdf(elements, filename, this.getProperty('with_breaks'), this.getProperty('p'));
  }

  /**
   * Данные в CSV-файл
   * @return {Promise<{}>}
   */
  async doActionDataToCSV() {
    let data = getDataByPath(this.getProperty('path'));
    let filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    try {
      return await dataToCSV(data, filename);
    } catch (error) {
      console.error(error);
      return {success: false};
    }
  }

  /**
   * HTML-Таблицу в CSV-файл
   * @return {Promise<{}>}
   */
  async doActionTableToCSV() {
    let elementId = this.getProperty('element_id');
    if (!elementId) {
      return {success: true};
    }
    elementId = elementId.trim();
    const element = getHTMLElementById(elementId);
    if (!element) {
      return {success: true};
    }
    let data;
    try {
      data = dataFromTable(element);
    } catch (error) {
      console.error(error);
      return {success: false};
    }
    if (_.isEmpty(data)) {
      return {success: true};
    }
    let filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    try {
      return await dataToCSV(data, filename);
    } catch (error) {
      console.error(error);
      return {success: false};
    }
  }

  /**
   * HTML-Таблицу в XML-файл
   * @return {Promise<{}>}
   */
  async doActionTableToXML() {
    let elementId = this.getProperty('element_id');
    if (!elementId) {
      return {success: true};
    }
    elementId = elementId.trim();
    const element = getHTMLElementById(elementId);
    if (!element) {
      return {success: true};
    }
    let data;
    try {
      data = dataFromTable(element);
    } catch (error) {
      console.error(error);
      return {success: false};
    }
    if (_.isEmpty(data)) {
      return {success: true};
    }
    let filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    try {
      return await dataToXML(data, filename);
    } catch (error) {
      console.error(error);
      return {success: false};
    }
  }

  /**
   * HTML-таблицу в XLS-файл
   * @return {Promise}
   */
  async doActionTableToXLS() {

    let data = [];

    if (this.getProperty('all_sources')) {
      const all_sources_path = this.getProperty('all_sources_path');
      if (all_sources_path) data = getDataByPath(all_sources_path, {});
      data = {data};

    } else {
      const elementId = this.getProperty('element_id').trim();

      if (!elementId) {
        console.error('Element ID is not set');
        return {success: true};
      }

      const table = getHTMLElementById(elementId);
      if (!table) {
        console.error('Table with provided ID is not found');
        return {success: true};
      }

      data = dataFromTable(table);

      const formattedData = [];

      _.each(data, row => formattedData.push(Object.values(row)));
      let rawTemplateData = this.getProperty('template_data');
      if (rawTemplateData) {
        const parsedTemplateData = rawTemplateData
          .split('\n')
          .reduce((data, row) => {
            const keyValuePair = row.split('=');
            data[keyValuePair[0]] = keyValuePair[1];
            return data;
          }, {});
        data = {...parsedTemplateData, data: formattedData};
      } else {
        data = {data};
      }
    }

    const filename = replaceContentWithData(this.getProperty('name', 'file'), this.getCurrentModel().getData());
    const templateName = this.getProperty('template_name');

    try {
      const blob = await dataToXLS(data, filename, templateName);
      let link = document.createElement('a');
      link.setAttribute('href', window.URL.createObjectURL(blob));
      link.setAttribute('download', filename + '.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return {success: true};
    } catch (error) {
      console.error(error);
      return {success: false};
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
      return {success: false};
    }
    return await altrpLogin(form.getData(), this.getFormId());
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
    let paths = this.getProperty('path');
    const result = {
      success: true
    };
    if (!paths) {
      return result;
    }
    if (paths.indexOf(',') !== -1) {
      paths = paths.split(',').map(path => path.trim());
    } else {
      paths = [paths];
    }
    for (let path of paths) {
      path = replaceContentWithData(path, this.getCurrentModel().getData());
      let value = this.getProperty('value') || '';
      value = value.trim();
      const setType = this.getProperty('set_type');
      let count = this.getProperty('count');
      switch (setType) {
        case 'toggle': {
          value = !getDataByPath(path);
          result.success = setDataByPath(path, value);
        }
          break;
        case 'set': {
          if (
            value.split(/\r?\n/).length === 1 &&
            value.indexOf('{{') === 0 &&
            value.indexOf('}}') === value.length - 2
          ) {
            value = getDataByPath(
              value.replace('{{', '').replace('}}', ''),
              null,
              this.getCurrentModel()
            );
          } else if (value.indexOf('|') !== -1) {
            value = parseParamsFromString(
              value,
              this.getCurrentModel(),
              true
            );
          }
          result.success = setDataByPath(path, value);
        }
          break;
        case 'toggle_set': {
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
        case 'increment': {
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
        case 'decrement': {
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
        case 'push_items': {
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
              : currentValue.push({...item});
            --count;
          }
          result.success = setDataByPath(path, currentValue);
        }
          break;
        case 'remove_items': {
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

            if (_.isArray(list)) {
              list = [...list];

              list = list.filter(_item => _item !== item);

              setDataByPath(listPath, list);
            } else {
              setDataByPath(listPath, null);
            }
          });
          result.success = true;
        }
          break;
        case 'delete': {
          setDataByPath(path, null);
          result.success = true;
        }
          break;
      }
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
      return {success: true};
    }
    IDs = IDs.split(',');
    const change = this.getProperty('forms_change');
    IDs.forEach(id => {
      let component = getComponentByElementId(id);
      switch (change) {
        case 'select_all': {
          if (_.get(component, 'elementRef.current.selectAll')) {
            component.elementRef.current.selectAll();
          }
        }
          break;
        case 'clear': {
          if (_.get(component, 'elementRef.current.clearValue')) {
            component.elementRef.current.clearValue();
          }
        }
          break;
      }
    });
    return {success: true};
  }

  /**
   * действие - выполнение пользовательского кода
   * @return {Promise<{}>}
   */
  async doActionCustomCode() {
    let code = this.getProperty('code');
    try {
      let actionResult = {success: true}
      code = replaceContentWithData(code, this.getCurrentModel().getData())
      const evaluateResult = eval(code);
      if(_.isFunction(evaluateResult)){
        await evaluateResult()
      }
      return actionResult;
    } catch (error) {
      console.error('Evaluate error in doActionCustomCode: "' + error.message + '"');
      return {success: false};
    }
  }

  /**
   * Действие - обновление текущей модели по AJAX
   * Action - updating the current model via AJAX
   * @return {Promise<{}>}
   */
  async doActionUpdateCurrentModel() {

    let modelName = window?.currentPage?.model_name
    if (!modelName) {
      return {success: true}
    }
    let modelId = window?.model_data?.id;
    if (!modelId) {
      return {success: true}
    }
    try {
      let model = await new Resource({
        route: `/ajax/models/${modelName}`
      }).get(modelId);
      if (_.isObject(model.data)) {
        model = model.data
      }
      const oldModel = window.appStore.getState().currentModel.getData();
      model.altrpModelUpdated = true;

      if (!_.isEqual(model, oldModel)) {
        appStore.dispatch(changeCurrentModel({altrpModelUpdated: false}));
        appStore.dispatch(changeCurrentModel(model));
      }
      return {success: true}

    } catch (e) {
      console.error(e);
    }
  }

  /**
   * действие - обновление текущего хранилища
   * @return {Promise<{}>}
   */
  async doActionUpdateCurrentDatasources() {
    let aliases = this.getProperty('aliases') || '';
    aliases = aliases
      .split(',')
      .map(alias => alias.trim())
      .filter(alias => alias);
    const allDataSources = window.dataStorageUpdater.getProperty(
      'currentDataSources'
    );
    const dataSourcesToUpdate = allDataSources.filter(dataSource => {
      return aliases.indexOf(dataSource.getProperty('alias')) !== -1;
    });
    /**
     * @type {DataStorageUpdater}
     */


    await window.dataStorageUpdater.updateCurrent(dataSourcesToUpdate, false);
    return {success: true};
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
      if(_.isFunction(element.elementRef.current[action])){
        let result = await element.elementRef.current[action]();
        if(_.isObject(result)){
          return result
        }
        return {success:true}
      }
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
    if (!templateGUID) {
      return {success: true};
    }
    let res = {success: false};
    try {
      res = await sendEmail(
        templateGUID,
        this.getReplacedProperty('subject'),
        this.getReplacedProperty('from'),
        this.getReplacedProperty('to'),
        this.getReplacedProperty('attachments')
      );
    } catch (e) {
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
    return {success: true};
  }

  /**
   * Воспроизводим звук
   * @return {Promise<{success: boolean}>}
   */
  async doActionPlaySound() {
    const duration = this.getProperty('milliseconds') || 0;
    const url = this.getProperty('media_url');
    const loop = this.getProperty('loop');
    if (url) {
      const {playSound} = await import(/* webpackChunkName: 'helpers-sounds' */'../helpers/sounds');
      playSound(url, loop, duration);
      await delay(20);
    }
    return {success: true};
  }

  /**
   * Проверка условий
   * @return {Promise<{success: boolean}>}
   */

  async doActionCondition() {
    const compare = this.getProperty('compare');
    let conditionLeft = this.getProperty('condition_left');
    let conditionRight = this.getProperty('condition_right');
    conditionLeft = getDataByPath(conditionLeft, null , this.getCurrentModel().getData());
    conditionRight = replaceContentWithData(conditionRight, this.getCurrentModel().getData());
    const res = altrpCompare(conditionLeft, conditionRight, compare);
    return {success: res};
  }

  metaMaskConnect = async () => {
    let path = this.getProperty('path');
    let currentValue = getDataByPath(path); // не получаю значение, приходит всегда null

    if (!window.ethereum) {

      return {
        success: false
      };
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {

        return {
          success: false
        };
      } else {
        try {
          const requestAccounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setDataByPath(path, requestAccounts[0])
          return {
            success: true
          };
        } catch (e) {
          console.error(e);
          return {
            success: false
          };
        }
      }
    } catch (e) {
      console.error(e);
      return {
        success: false
      };
    }
  }

  /**
   * Версия сайта для слабовидящих
   * @return {Promise<void>}
   */
  async doActionVIToggle() {
    try {
      const {loadVIPlugin} = (await import(/* webpackChunkName 'loadVIPlugin' */'../helpers/plugins'))
      await loadVIPlugin();
    } catch (error) {
      return {
        success: false
      };
    }
    // console.log($);
    let HTMLWrapper = getWrapperHTMLElementByElement(this.getElement());
    // if(HTMLWrapper){
    //   HTMLWrapper.classList.add('bvi-hide');
    // }

    // $.bvi({
    //   bvi_target: '.altrp-btn',
    //
    // });

    return {
      success: true
    };
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async doActionOAuth() {
    const OIDC  = await import (/* webpackChunkName: 'OIDC' */"oidc-client");
    const {WebStorageStateStore, UserManager, authority, OidcClient} = OIDC;
    (window.altrpLibs = window.altrpLibs || {}).OIDC = OIDC

    const method = this.getProperty('method')
    if( ! method){
      return {
        success: true,
      }
    }
    let settings = {
      client_id: this.getProperty('client_id'),
      redirect_uri: this.getProperty('redirect_uri'),
      post_logout_redirect_uri: this.getProperty('post_logout_redirect_uri'),
      response_type: this.getProperty('response_type'),
      scope: this.getProperty('scope'),
      authority:this.getProperty('authority'),
      automaticSilentRenew: this.getProperty('automaticSilentRenew'),
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      filterProtocolClaims: this.getProperty('filterProtocolClaims'),
      loadUserInfo: this.getProperty('loadUserInfo'),
      monitorSession: this.getProperty('monitorSession'),
      checkSessionInterval: this.getProperty('checkSessionInterval')
    };
    const manager = new UserManager(settings);
    // console.log( manager);
    // console.log(await manager.getUser());
    let result;
    console.log(method);

    if(_.isFunction(manager[method])){
      try {
        result =await manager[method]();
      } catch (e) {
        return {success:false}
      }
    }
    console.log(result);
    // await manager.signoutRedirect();
    return {success:true}
  }
}

export default AltrpAction;
