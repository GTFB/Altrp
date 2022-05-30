import AltrpModel from "../../../editor/src/js/classes/AltrpModel";
import {altrpFontsSet, GOOGLE_FONT} from "./constants/fonts";
import React from "react";
import replaceContentWithData from "./functions/replaceContentWithData";
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
export {default as parseStringValue} from "./functions/parseStringValue";
export {default as getMediaQueryByName} from "./functions/getMediaQueryByName";
export {default as getMediaSettingsByName} from "./functions/getMediaSettingsByName";
export {default as getObjectByPrefix} from "./functions/getObjectByPrefix";
export {default as isElementTopInViewport} from "./functions/isElementTopInViewport";
export {default as getTopPosition} from "./functions/getTopPosition";
export {default as startOfWeek} from "./functions/startOfWeek";
export {default as getCurrentStoreState} from "./functions/getCurrentStoreState";
export {default as getWrapperHTMLElementByElement} from "./functions/getWrapperHTMLElementByElement";
export {default as getNextWeekStart} from "./functions/getNextWeekStart";
export {default as getWeekStart} from "./functions/getWeekStart";
export {default as getNextWeekEnd} from "./functions/getNextWeekEnd";
export {default as getPrevWeekStart} from "./functions/getPrevWeekStart";
export {default as getPrevWeekEnd} from "./functions/getPrevWeekEnd";
export {default as isJSON} from "./functions/isJSON";
export {default as altrpLogin} from "./functions/altrpLogin";
export {default as prepareURLForEmail} from "./functions/prepareURLForEmail";
export {default as altrpLogout} from "./functions/altrpLogout";
export {default as getDataFromLocalStorage} from "./functions/getDataFromLocalStorage";
export {default as getTimeValue} from "./functions/getTimeValue";
export {default as startOfMonth} from "./functions/startOfMonth";
export {default as startOfYear} from "./functions/startOfYear";
export {default as isEditor} from "./functions/isEditor";
export {getResponsiveSetting} from "./functions/getResponsiveSetting";


export const CONDITIONS_OPTIONS = _CONDITIONS_OPTIONS


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

