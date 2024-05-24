import {altrpFontsSet, GOOGLE_FONT} from "./constants/fonts";
import React from "react";
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
export {default as dataFromTable} from "./functions/dataFromTable";
export {default as getAppContext} from "./functions/getAppContext";
export {default as prepareContext} from "./functions/prepareContext";
export {default as CONDITIONS_OPTIONS} from "./constants/CONDITIONS_OPTIONS";
export {default as getResponsiveSetting} from "./functions/getResponsiveSetting";
export qs from /* webpackChunkName: 'qs' */"qs";

export async function checkAppearBottomElement(...a){
  return (await import(/* webpackChunkName: 'checkAppearBottomElement' */"./helpers/elements/check-appear-bottom-element")).default(...a)
}
export async function dataToCSV(...a){
  return (await import(/* webpackChunkName: 'dataToCSV' */'./functions/dataToCSV')).default(...a)
}

export async function dataToXLS(...a){
  return (await import(/* webpackChunkName: 'dataToXLS' */'./functions/dataToXLS')).default(...a)
}
export async function dataToXML(...a){
  return (await import(/* webpackChunkName: 'dataToXML' */'./functions/dataToXML')).default(...a)
}
export async function updateQueryString(...a){
  return (await import(/* webpackChunkName: 'updateQueryString' */'./functions/updateQueryString')).default(...a)
}

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
    "https://fonts.bunny.net/css?family=" + font + "&subset=cyrillic";
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

export async function getActionsElement(){
  const getActionsElement =  await import(/* webpackChunkName: 'get-actions-element' */ './helpers/get-actions-element')
  return getActionsElement.default(...arguments)
}

export async function elementSearch(){
  const getActionsElement =  await import(/* webpackChunkName: 'element-search' */ './helpers/element-search')
  return getActionsElement.default(...arguments)
}
export async function getAxios(){
  const axios =  await import(/* webpackChunkName: 'axios' */ 'axios')
  return axios.default
}


