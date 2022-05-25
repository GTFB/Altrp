import CONSTANTS from "../../../editor/src/js/consts";
import AltrpModel from "../../../editor/src/js/classes/AltrpModel";
import Resource from "../../../editor/src/js/classes/Resource";
import { changeCurrentUser } from "./store/current-user/actions";
import { changeAppRoutes } from "./store/routes/actions";
import Route from "./classes/Route";
import { addResponseData } from "./store/responses-storage/actions";
import {altrpFontsSet, GOOGLE_FONT} from "./constants/fonts";
import React from "react";
import _CONDITIONS_OPTIONS from "./constants/CONDITIONS_OPTIONS";
export {default as replaceContentWithData} from "./functions/replaceContentWithData";
export {default as getDataByPath} from "./functions/getDataByPath";
export {default as getComponentByElementId} from "./functions/getComponentByElementId";
export {default as getHTMLElementById} from "./functions/getHTMLElementById";
export {default as parseURLTemplate} from "./functions/parseURLTemplate";
export {default as printElements} from "./functions/printElements";
export {default as renderAsset} from "./functions/renderAsset";
export {default as scrollToElement} from "./functions/scrollToElement";
export {default as isSSR} from "./functions/isSSR";
export {default as iconsManager} from "./functions/iconsManager";
export {default as renderAssetIcon} from "./functions/renderAssetIcon";
export {default as getBreadcrumbsItems} from "./functions/getBreadcrumbsItems";
export {default as getCurrentBreakpoint} from "./functions/getCurrentBreakpoint";
export {default as getWindowWidth} from "./functions/getWindowWidth";
export {default as getRoutes} from "./functions/getRoutes";
export {default as delay} from "./functions/delay";
export {default as valueReplacement} from "./functions/valueReplacement";
export {default as parseParamsFromString} from "./functions/parseParamsFromString";
export {default as parseOptionsFromSettings} from "./functions/parseOptionsFromSettings";
export {default as extractPathFromString} from "./functions/extractPathFromString";
export {default as convertData} from "./functions/convertData";
export {default as getConverter} from "./functions/getConverter";
export {default as altrpCompare} from "./functions/altrpCompare";
export {default as validateEmail} from "./functions/validateEmail";
export {default as sortOptions} from "./functions/sortOptions";
export {default as conditionChecker} from "./functions/conditionChecker";
export {default as mbParseJSON} from "./functions/mb-parse-JSON";
export {default as setAltrpIndex} from "./functions/setAltrpIndex";
export {default as generateButtonsArray} from "./functions/generateButtonsArray";
export {default as setTitle} from "./functions/setTitle";
export {default as conditionsChecker} from "./functions/conditionsChecker";
export {default as altrpRandomId} from "./functions/altrpRandomId";
export {default as parseIDFromYoutubeURL} from "./functions/parseIDFromYoutubeURL";
export {default as getWidgetState} from "./functions/getWidgetState";
export {default as storeWidgetState} from "./functions/storeWidgetState";
export {default as saveDataToLocalStorage} from "./functions/saveDataToLocalStorage";
export {default as setDataByPath} from "./functions/setDataByPath";
export {default as renderIcon} from "./functions/renderIcon";
export {default as scrollbarWidth} from "./functions/scrollbarWidth";
export {default as redirect} from "./functions/redirect";
export {default as getDataFromLocalStorage} from "./functions/getDataFromLocalStorage";
export {default as getTimeValue} from "./functions/getTimeValue";
export {default as startOfMonth} from "./functions/startOfMonth";
export {default as startOfYear} from "./functions/startOfYear";
export {default as isEditor} from "./functions/isEditor";
export {getResponsiveSetting} from "./functions/getResponsiveSetting";

/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export function getMediaQueryByName(screenSettingName) {
  let mediaQuery = "";
  CONSTANTS.SCREENS.forEach(screen => {
    if (screen.name === screenSettingName) {
      mediaQuery = screen.mediaQuery;
    }
  });
  return mediaQuery;
}
/**
 * Получает медиа запрос для css по имени настройки
 * @param {string} screenSettingName
 * @return {string}
 */
export function getMediaSettingsByName(screenSettingName) {
  let screen = CONSTANTS.SCREENS[0];
  CONSTANTS.SCREENS.forEach(_screen => {
    if (_screen.name === screenSettingName) {
      screen = _screen;
    }
  });
  return screen;
}

/**
 * Возвращает новый объект из свояств объекта, в именах которых присутствует префикс prefix
 * @param {string} prefix - строка для поиска (например 'test')
 * @param {{}} object - если в объекте есть свойство test__test то вернет {test: test__test_value}
 * @return {{}}
 */
export function getObjectByPrefix(prefix = "", object = {}) {
  let result = {};
  if (!prefix) {
    return result;
  }
  _.forEach(object, (value, key) => {
    if (key.indexOf(`${prefix}__`, "") === 0) {
      result[key.replace(`${prefix}__`, "")] = value;
    }
  });
  return result;
}


export const CONDITIONS_OPTIONS = _CONDITIONS_OPTIONS

export function isElementTopInViewport(top, scrollTop, clientHeight) {
  return top > scrollTop && top < scrollTop + clientHeight;
}

export function getTopPosition(element) {
  let top = element.offsetTop;

  while (element.offsetParent) {
    element = element.offsetParent;
    top += element.offsetTop;
  }

  return top;
}
/**
 * Получить начало месяца
 * @param {Date} date
 * @param {int} weekShift
 * @return {Date}
 */
export function startOfWeek(date, weekShift = 0) {
  const {moment} = window.altrpHelpers;
  return moment(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + weekShift * 7
    )
  ).firstDayOfWeek();
}

/**
 * Получить ссылку на состояние хранилища
 * @return {*}
 */
export function getCurrentStoreState() {
  return appStore.getState();
}




/**
 * Вернет HTML  React компонента, у которого props.element = element
 * @param {FrontElement} element
 * @return {null | HTMLElement}
 */
export function getWrapperHTMLElementByElement(element) {
  if (!element) {
    return null;
  }
  let HTMLElement = null;
  appStore.getState().elements.forEach(el => {
    if (element === el.props.element) {
      HTMLElement = el.elementWrapperRef.current;
    }
  });
  return HTMLElement;
}

/**
 * Начало следующей недели
 * @return {moment.Moment}
 */
function getNextWeekStart() {
  const {moment} = window.altrpHelpers;
  let today = moment();
  let daystoMonday = 7 - (today.isoWeekday() - 1);
  return today.add(daystoMonday, "days");
}

/**
 * Начало текущей недели
 * @return {moment.Moment}
 */
function getWeekStart() {
  const {moment} = window.altrpHelpers;
  let today = moment();
  let daystoMonday = today.isoWeekday() - 1;
  return today.subtract(daystoMonday, "days");
}

/**
 * Конец Следующей недели
 * @return {moment.Moment}
 */
function getNextWeekEnd() {
  let nextMonday = getNextWeekStart();
  return nextMonday.add("days", 6);
}

/**
 * Начало предыдущей недели
 * @return {moment.Moment}
 */
function getPrevWeekStart() {
  const {moment} = window.altrpHelpers;
  let today = moment();
  let daystoLastMonday = today.isoWeekday() - 1 + 7;
  return today.subtract(daystoLastMonday, "days");
}

/**
 * Конец предыдущей недели
 * @return {moment.Moment}
 */
function getPrevWeekEnd() {
  let lastMonday = getPrevWeekStart();
  return lastMonday.add("days", 6);
}

/**
 * Удаляет пустые свойства в объектах
 */
export function clearEmptyProps() {}


/**
 * Вспомогательные функции для работы с данными виджетов
 */
window.altrphelpers = {
  /**
   * Возвращает сумму полей в массиве объектов
   * @param {string}fieldName
   * @return {number}
   */
  sumFields: function sumFields(fieldName) {
    let sum = 0;
    if (!_.isObject(this.context)) {
      return sum;
    }
    if (!_.isArray(this.context)) {
      this.context = [this.context];
    }
    this.context.forEach(c => {
      sum += Number(_.get(c, fieldName)) || 0;
    });
    return sum;
  }
};



/**
 * Забирает данные из HTML таблицы
 * @param {{}}HTMLElement
 */
export function dataFromTable(HTMLElement) {
  const data = [];
  const headers = [];
  if (!(HTMLElement && HTMLElement.querySelectorAll)) {
    return data;
  }
  let table = HTMLElement.querySelector(".altrp-table");
  if (!table && HTMLElement.querySelector(".altrp-table-tr")) {
    table = HTMLElement;
  }
  if (!table) {
    return data;
  }
  const ths = table.querySelectorAll(".altrp-table-th");
  _.each(ths, th => {
    // if (th.innerText) {
    headers.push(th.innerText || "");
    // }
  });
  const rows = table.querySelectorAll(".altrp-table-tbody .altrp-table-tr");
  _.each(rows, row => {
    const cells = row.querySelectorAll(".altrp-table-td");
    const part = {};
    headers.forEach((header, idx) => {
      if (!header) {
        return;
      }
      part[header] = cells[idx].innerText || "";
    });
    data.push(part);
  });
  return data;
}

/**
 * Создать csv-файл из данных и скачать
 * @param {{}} data
 * @param {string} filename
 */
export async function dataToCSV(data = {}, filename) {
  filename = filename || "File";
  if (!data) {
    return { success: false };
  }
  if (_.isObject() && !_.isArray(data)) {
    data = [data];
  }
  if (!_.isArray(data)) {
    return { success: false };
  }

  let headers = _.toPairs(data[0]).map(([name, value]) => name);
  let csvContent =
    // 'data:text/csv;charset=utf-8,'
    "" +
    headers.join(";") +
    "\n" +
    data
      .map(item => {
        let line = "";
        headers.forEach((h, idx) => {
          let value = _.get(item, h) || "";
          if (_.isObject(value)) {
            value = JSON.stringify(value);
          }

          line +=
            (_.isString(value) ? value.replace(/\s/g, " ") : value) +
            (headers.length === idx + 1 ? "" : ";");
        });
        return line;
      })
      .join("\n");
  let blob = new Blob([csvContent], {
    type: "text/csv",
    charset: "windows-1251"
    // charset: 'utf-8',
  });
  let link = document.createElement("a");
  link.setAttribute("href", window.URL.createObjectURL(blob));
  link.setAttribute("download", filename + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return { success: true };
}

/**
 * Генерация и загрузка XLS-файла
 * @param {Object data} Объект данных
 * @param {String} filename Имя файла
 */
export async function dataToXLS(data, filename = "table", templateName = "") {
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("data", JSON.stringify(data));
  formData.append("template", templateName);

  const response = await fetch("/api/export-excel", {
    method: "POST",
    body: formData
  });

  return await response.blob();
}

/**
 * Генерация и загрузка XML-файла
 * @param {Object data} Объект данных
 * @param {String} filename Имя файла
 */
export async function dataToXML(data, filename = "table") {
  const formData = new FormData();
  formData.append("filename", filename);
  formData.append("data", JSON.stringify(data));

  const response = await fetch("/api/export-xml", {
    method: "POST",
    body: formData
  });

  return await response.blob();
}

/**
 * Логиним пользователя
 * @param {{}} data
 * @param {string} formId
 * @return {Promise<{}>}
 */
export async function altrpLogin(data = {}, formId = "login") {
  data.altrpLogin = true;
  let res;
  try {
    res = await new Resource({ route: "/login" }).post(data);
  } catch (error) {
    let status = error.status;
    if (error.res instanceof Promise) {
      res = await error.res;
    }
    if (error instanceof Promise) {
      res = await error;
    }
    res = mbParseJSON(res, {});
    status && (res.__status = status);
  }
  appStore.dispatch(addResponseData(formId, res));
  if (!(res.success || res._token)) {
    return {
      success: false
    };
  }
  _token = res._token;

  let currentUser = await new Resource({
    route: "/ajax/current-user"
  }).getAll();
  currentUser = currentUser.data;
  appStore.dispatch(changeCurrentUser(currentUser));
  /*let routes = [];
  try {
    let routesData = await new Resource({
      route: "/ajax/routes"
    }).getAll();

    for (let _data of routesData.pages) {
      routes.push(Route.routeFabric(_data));
    }
    appStore.dispatch(changeAppRoutes(routes));
  } catch (err) {
    console.error(err);
    return { success: false };
  }*/
  return { success: true };
}

/**
 * Выход
 * @return {Promise<{}>}
 */
export async function altrpLogout() {
  let res = await new Resource({ route: "/logout" }).post();
  if (!(res.success || res._token)) {
    return {
      success: false
    };
  }
  _token = res._token;

  let currentUser = await new Resource({
    route: "/ajax/current-user"
  }).getAll();
  currentUser = currentUser.data;
  appStore.dispatch(changeCurrentUser(currentUser));
  let routes = [];
  try {
    let routesData = await new Resource({
      route: "/ajax/routes"
    }).getAll();

    for (let _data of routesData.pages) {
      routes.push(Route.routeFabric(_data));
    }
    appStore.dispatch(changeAppRoutes(routes));
  } catch (err) {
    console.error(err);
    return { success: false };
  }
  return { success: true };
}

export function cutString(string, maxLength = 80) {
  if (string.length <= maxLength) return string;
  return string.slice(0, maxLength) + "...";
}

/**
 * рекурсивно считает общую длину по пути
 * @param {{}} object
 * @param {string} path
 * @return {number}
 */
export function recurseCount(object = {}, path = "") {
  let count = 0;
  if (!path) {
    return count;
  }
  let array = _.get(object, path, []);
  if (!array.length) {
    count++;
    return count;
  }
  array.forEach(item => {
    count += recurseCount(item, path);
  });
  return count;
}

/**
 * Вовращает AltrpModel, в котором храняться все источники данных на странице
 * @param {{}} model
 * @return {AltrpModel}
 */
export function getAppContext(model = null) {
  const { currentModel } = appStore.getState();
  if(model instanceof AltrpModel){
    model = model.getData();
  }
  const currentModelData = model ? model : currentModel.getData();
  const urlParams = _.cloneDeep(
    window.currentRouterMatch instanceof AltrpModel
      ? window.currentRouterMatch.getProperty("params")
      : {}
  );
  const context = new AltrpModel(_.assign(urlParams, currentModelData));
  const {
    altrpPageState,
    altrpPage,
    altrpMeta,
    currentDataStorage,
    currentUser,
    altrpresponses,
    formsStore
  } = appStore.getState();

  context.setProperty("altrpdata", currentDataStorage);
  context.setProperty("altrppagestate", altrpPageState);
  context.setProperty("altrpmeta", altrpMeta);
  context.setProperty("altrpuser", currentUser);
  context.setProperty("altrpresponses", altrpresponses);
  context.setProperty("altrpforms", formsStore);
  context.setProperty("altrppage", altrpPage);
  return context;
}

/**
 *
 * @param {string} font
 * @return {*}
 */
export function renderFontLink(font) {
  if (altrpFontsSet[font] !== GOOGLE_FONT) {
    return null;
  }
  font = font.replace(/ /g, "+");
  font +=
    ":100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic";
  let fontUrl =
    "https://fonts.googleapis.com/css?family=" + font + "&subset=cyrillic";
  fontUrl = encodeURI(fontUrl);
  return <link rel="stylesheet" key={fontUrl} href={fontUrl} />;
}

/**
 * Включен ли режим тестирования
 */
export function isAltrpTestMode() {
  return window.location.href.indexOf("altrp-test=true") > 0;
}

/**
 * Проверяем текст на соответствие маске
 * @param {string} value
 * @param {[]} mask
 * @return {boolean}
 */
export function isValueMatchMask(value, mask) {
  if (!value || value.length !== mask.length) {
    return false;
  }
  return (
    value.length &&
    value
      .split("")
      .every((char, index) => char === mask[index] || char.match(mask[index]))
  );
}

/**
 * Подготавливает URL для шаблона письма
 * @param {string} url
 * @param {{} | null} context
 * @return {string}
 */
export function prepareURLForEmail(url, context = null) {
  if (!_.isString(url) || !url) {
    return url;
  }
  url = url.trim();
  if (url.indexOf("http") !== 0) {
    url = location.origin + url;
  }
  return parseURLTemplate(url, context);
}

/**
 *
 * @param {{}} context
 * @return {{}}
 */
export function prepareContext(context) {
  context.altrpdata = appStore.getState().currentDataStorage.getData();
  context.altrpmodel = appStore.getState().currentModel.getData();
  context.altrpuser = appStore.getState().currentUser.getData();
  context.altrppagestate = appStore.getState().altrpPageState.getData();
  context.altrpresponses = appStore.getState().altrpresponses.getData();
  context.altrpmeta = appStore.getState().altrpMeta.getData();
  return context;
}

/**
 *
 * Определеят явлется ли строка валидным JSON
 * @param {string} JSONString
 * @return {boolean}
 */
export function isJSON(JSONString = "") {
  try {
    JSON.parse(JSONString);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Парсит xml строку в объект
 * @param xml
 * @param arrayTags
 */
function parseXml(xml, arrayTags) {
  let dom = null;
  if (window.DOMParser) dom = new DOMParser().parseFromString(xml, "text/xml");
  else if (window.ActiveXObject) {
    dom = new ActiveXObject("Microsoft.XMLDOM");
    dom.async = false;
    if (!dom.loadXML(xml))
      throw dom.parseError.reason + " " + dom.parseError.srcText;
  } else throw new Error("cannot parse xml string!");

  function parseNode(xmlNode, result) {
    if (xmlNode.nodeName === "#text") {
      let v = xmlNode.nodeValue;
      if (v.trim()) result["#text"] = v;
      return;
    }

    let jsonNode = {},
      existing = result[xmlNode.nodeName];
    if (existing) {
      if (!Array.isArray(existing))
        result[xmlNode.nodeName] = [existing, jsonNode];
      else result[xmlNode.nodeName].push(jsonNode);
    } else {
      if (arrayTags && arrayTags.indexOf(xmlNode.nodeName) !== -1)
        result[xmlNode.nodeName] = [jsonNode];
      else result[xmlNode.nodeName] = jsonNode;
    }

    if (xmlNode.attributes)
      for (let attribute of xmlNode.attributes)
        jsonNode[attribute.nodeName] = attribute.nodeValue;

    for (let node of xmlNode.childNodes) parseNode(node, jsonNode);
  }

  let result = {};
  for (let node of dom.childNodes) parseNode(node, result);

  return result;
}
/**
 * Вернуть значение из строки
 * @param string
 */
export function parseStringValue(string) {
  let value = string;

  if (Number(value)) {
    return Number(value);
  }
  switch (value) {
    case "true": {
      return true;
    }
    case "false": {
      return false;
    }
    case "null": {
      return null;
    }
    case "undefined": {
      return undefined;
    }
    case "0": {
      return 0;
    }
  }
  return value;
}

