import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import { isString } from "lodash";
import React, { Component } from "react";
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
  setDataByPath
} from "../helpers";
import { togglePopup } from "../store/popup-trigger/actions";
import reactDom from "react-dom";
import Resource from "../../../../editor/src/js/classes/Resource";

// let  history = require('history');
// // import {history} from 'history';
// console.log(history.history);
/**
 * Класс представляющий действия на странице
 * @link https://docs.google.com/document/d/1v8Hm1DLkqqwzBeISd8-UvgTqscVxQPtBUtKqBrH1HaU/edit#
 * @class AltrpAction
 */
class AltrpAction extends AltrpModel {
  constructor(data, widgetId) {
    super(data);
    this.setProperty("_widgetId", widgetId);
    this.init();
  }

  /**
   * Возврашает значение свойства name, если свойство строка, то производит подстановку значений из данных
   * @params {string} name
   * @params {*} defaultValue
   * @return {*}
   */
  getReplacedProperty(name, defaultValue = "") {
    let value = this.getProperty(name, defaultValue);
    if (_.isString(value)) {
      value = replaceContentWithData(value);
    }
    return value;
  }
  /**
   * Инициируем действие
   */
  async init() {
    switch (this.getType()) {
      case "form": {
        if (!this.getProperty("form_url")) {
          this.setProperty("_form", null);
          return;
        }
        const formsManager = (
          await import(
            "../../../../editor/src/js/classes/modules/FormsManager.js"
          )
        ).default;
        const formOptions = {
          dynamicURL: true,
          customRoute: this.getProperty("form_url")
        };

        const form = formsManager.registerForm(
          this.getProperty("form_id"),
          "",
          this.getProperty("form_method"),
          formOptions
        );
        this.setProperty("_form", form);
        return;
      }
      case "login": {
        const formsManager = (
          await import(
            "../../../../editor/src/js/classes/modules/FormsManager.js"
          )
        ).default;
        const form = formsManager.registerForm(
          this.getProperty("form_id"),
          "login",
          "POST"
        );
        this.setProperty("_form", form);
      }
    }
  }
  /**
   * Получить тип действия
   * @return {string}
   */
  getType() {
    return this.getProperty("type");
  }
  /**
   * Получить тип действия
   * @return {*}
   */
  setType(type) {
    return this.setProperty("type", type);
  }

  /**
   * Оссинхронно выполняет действие
   * @return {Promise<void>}
   */
  async doAction() {
    let result = {
      success: false
    };
    let confirmText = this.getProperty("confirm");
    if (confirmText && !confirm(confirmText)) {
      return {
        success: false,
        message: "User not Confirm"
      };
    }
    switch (this.getType()) {
      case "form":
        {
          result = await this.doActionForm();
        }
        break;
      case "redirect":
        {
          result = await this.doActionRedirect();
        }
        break;
      case "toggle_element":
        {
          result = await this.doActionToggleElements();
        }
        break;
      case "toggle_popup":
        {
          result = await this.doActionTogglePopup();
        }
        break;
      case "print_page":
        {
          result = await this.doActionPrintPage();
        }
        break;
      case "print_elements":
        {
          result = await this.doActionPrintElements();
        }
        break;
      case "scroll_to_element":
        {
          result = await this.doActionScrollToElement();
        }
        break;
      case "scroll_to_top":
        {
          result = await this.doActionScrollToTop();
        }
        break;
      case "scroll_to_bottom":
        {
          result = await this.doActionScrollToBottom();
        }
        break;
      case "trigger":
        {
          result = await this.doActionTrigger();
        }
        break;
      case "page_to_pdf":
        {
          result = await this.doActionPageToPDF();
        }
        break;
      case "elements_to_pdf":
        {
          result = await this.doActionElementsToPDF();
        }
        break;
      case "data_to_csv":
        {
          result = await this.doActionDataToCSV();
        }
        break;
      case "table_to_csv":
        {
          result = await this.doActionTableToCSV();
        }
        break;
      case "login":
        {
          result = await this.doActionLogin();
        }
        break;
      case "logout":
        {
          result = await this.doActionLogout();
        }
        break;
      case "set_data":
        {
          result = await this.doActionSetData();
        }
        break;
    }
    let alertText = "";
    if (result.success) {
      alertText = this.getProperty("alert");
    } else {
      alertText = this.getProperty("reject");
    }
    if (alertText) {
      alert(alertText);
    }
    return result;
  }
  /**
   * Ассинхронно выполняет действие-формы
   * @return {Promise<{}>}
   */
  async doActionForm() {
    if (!this.getProperty("_form")) {
      return {
        success: false,
        message: "Нет Формы"
      };
    }
    if(this.getProperty('path')){
      let data = getDataByPath(this.getProperty('path'));
      if(! _.isEmpty(data)){
        return this.getProperty('_form').submit('', '', data);
      }
      return {success: true};
    }
    if(this.getProperty('data')){
      let data = parseParamsFromString(this.getProperty('data'), getAppContext(), true);
      if(! _.isEmpty(data)){
        return this.getProperty('_form').submit('', '', data);
      }
      return {success: true};
    }
    return this.getProperty('_form').submit()
  }
  /**
   * Делает редирект на страницу form_url
   * @return {Promise<{}>}
   */
  async doActionRedirect() {
    let URL = this.getReplacedProperty("form_url");
    if (frontAppRouter) {
      if (this.getProperty("back")) {
        frontAppRouter.history.back();
      } else {
        let routes = appStore.getState().appRoutes.routes || [];
        let innerRedirect = false;
        if (URL === "/") {
          innerRedirect = true;
        } else {
          routes.forEach(route => {
            if (!route.path) {
              return;
            }
            if (route.path === URL) {
              innerRedirect = true;
            }
          });
        }
        if (innerRedirect) {
          frontAppRouter.history.push(URL);
        } else {
          window.location.replace(URL);
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
    let IDs = this.getProperty("elements_ids");
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(",");

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
    let id = this.getProperty("popup_id");

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
    let IDs = this.getProperty("elements_ids");
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(",");
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
    if (_.get(window, "stylesModule.stylesContainer.current")) {
      elementsToPrint.push(
        _.get(window, "stylesModule.stylesContainer.current")
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
    let elementId = this.getProperty("element_id");
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
    const routeContent = document.getElementById("route-content");
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
    let filename = replaceContentWithData(this.getProperty("name", "file"));
    const elements = [];

    elements.push(document.getElementById("route-content"));
    return await elementsToPdf(elements, filename);
  }

  /**
   * Элементы в PDF
   * @return {Promise<{}>}
   */
  async doActionElementsToPDF() {
    let filename = replaceContentWithData(this.getProperty("name", "file"));
    const elements = [];
    let IDs = this.getProperty("elements_ids");
    if (!IDs) {
      return { success: true };
    }
    IDs = IDs.split(",");
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
    let data = getDataByPath(this.getProperty("path"));
    let filename = replaceContentWithData(this.getProperty("name", "file"));
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
    let elementId = this.getProperty("element_id");
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
    let filename = replaceContentWithData(this.getProperty("name", "file"));
    try {
      return await dataToCSV(data, filename);
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
    let form = this.getProperty("_form");
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
    let path = this.getProperty("path");
    const result = {
      success: false
    };
    if (!path) {
      return result;
    }
    let value = this.getProperty("value");
    const setType = this.getProperty("set_type");

    switch (setType) {
      case "toggle":
        {
          value = !getDataByPath(path);
          result.success = setDataByPath(path, value);
        }
        break;
      case "set":
        {
          result.success = setDataByPath(path, value);
        }
        break;
      case "toggle_set":
        {
          let currentValue = getDataByPath(path);
          value = value.split("\n").map(v => v.trim());
          if (value.length === 1) {
            value.push("");
          }
          let nextIndex = value.indexOf(currentValue) + 1;
          if (nextIndex >= value.length) {
            nextIndex = 0;
          }
          value = value[nextIndex] || "";
          result.success = setDataByPath(path, value);
        }
        break;
    }

    return result;
  }
  /**
   * Триггер события на другом компоненте
   * @return {Promise<{}>}
   */
  async doActionTrigger() {
    let elementId = this.getProperty("element_id");
    let element = getComponentByElementId(elementId);
    let action = this.getProperty("action");

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
}

export default AltrpAction;
