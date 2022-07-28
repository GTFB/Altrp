import CONSTANTS from "../../../editor/src/js/consts";
import AltrpModel from "../../../editor/src/js/classes/AltrpModel";
import Resource from "../../../editor/src/js/classes/Resource";
import { changeCurrentUser } from "./store/current-user/actions";
import { changeCurrentUserProperty } from "./store/current-user/actions";
import { changeAppRoutes } from "./store/routes/actions";
import Route from "./classes/Route";
import { changePageState } from "./store/altrp-page-state-storage/actions";
import { changeAltrpMeta } from "./store/altrp-meta-storage/actions";
import AltrpSVG from "../../../editor/src/js/components/altrp-svg/AltrpSVG";
import ArrayConverter from "./classes/converters/ArrayConverter";
import DataConverter from "./classes/converters/DataConverter";
import { changeFormFieldValue } from "./store/forms-data-storage/actions";
import { addResponseData } from "./store/responses-storage/actions";
import {getOffsetTopInElement} from "./helpers/elements";
import Area from "./classes/Area";
import {altrpFontsSet, GOOGLE_FONT} from "./constants/fonts";
import {addSettings} from "./store/elements-settings/actions";
import mutate from "dot-prop-immutable";
import React from "react";
import _CONDITIONS_OPTIONS from "./constants/CONDITIONS_OPTIONS";
import _mbParseJSON from "./functions/mb-parse-JSON";
import _getResponsiveSetting from "./helpers/get-responsive-setting";
import replaceContentWithData from "./functions/replaceContentWithData";
import getDataByPath from "./functions/getDataByPath";
import getComponentByElementId from "./functions/getComponentByElementId";
import getDataFromLocalStorage from "./functions/getDataFromLocalStorage";
import isEditor from "./functions/isEditor";
import delay from "./functions/delay";
export {default as replaceContentWithData} from "./functions/replaceContentWithData";
export {default as getDataByPath} from "./functions/getDataByPath";
export {default as getComponentByElementId} from "./functions/getComponentByElementId";
export {default as getDataFromLocalStorage} from "./functions/getDataFromLocalStorage";
export {default as getTimeValue} from "./functions/getTimeValue";
export {default as startOfMonth} from "./functions/startOfMonth";
export {default as startOfYear} from "./functions/startOfYear";
export {default as isEditor} from "./functions/isEditor";
export {default as delay} from "./functions/delay";


export const getResponsiveSetting = _getResponsiveSetting;

export function getRoutes() {

  return import(/* webpackChunkName: 'Routes' */"./classes/Routes.js");
}

export function isSSR(){
  try {
    return window.SSR;
  } catch (e) {
    return false;
  }
}
/**
 * @return {IconsManager}
 * */
export function iconsManager() {
  return window.iconsManager;
}

/**
 * Устанавливает заголовок страницы на фронтенде
 * @param {string} title
 */
export function setTitle(title) {
  let titleElement = document.title;
  if (!defaultTitle) {
    defaultTitle = titleElement.innerHTML;
  }
  if (!title) {
    title = defaultTitle;
  }
  if (document.title !== title) {
    document.title = title;
  }
}


/**
 * Переменная, в которой храниться изначальный заголовок
 * @let {string}
 */
let defaultTitle;

/**
 * Парсит стрку вводимую пользователем для опций селекта
 * @param string
 */
export function parseOptionsFromSettings(string) {
  if (!string) {
    return [];
  }
  let options = string.split("\n");
  let path = extractPathFromString(string);
  let _optionsFromData = getDataByPath(path);
  if (_.isArray(_optionsFromData)) {
    return _optionsFromData;
  }
  options = options.map(option => {
    let value = option.split("|")[0];
    value = value.trim();
    let valuePath = extractPathFromString(value);
    if (valuePath) {
      value = getDataByPath(valuePath);
    }
    let label = option.split("|")[1] || value || "";
    !_.isString(label) && (label = "");
    label = label.trim();
    let labelPath = extractPathFromString(label);
    if (labelPath) {
      label = getDataByPath(labelPath);
    }
    return {
      value,
      label
    };
  });
  return options;
}

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
 * Возвращает брейкпоинт относительно текущего размера экрана
 */
export function getCurrentBreakpoint() {
  const currentWidth = getWindowWidth();
  const breakPoints = CONSTANTS.SCREENS;
  const breakPointsSizes = breakPoints.map(item => ({
    name: item.name,
    size: Number(item.width.split("px")[0])
  }));
  for (let breakpoint of breakPointsSizes) {
    if (breakpoint.size < currentWidth) {
      return breakpoint.name;
    }
  }
}
/**
 *@param {string} URLTemplate
 *@param {{} | null} object
 */
export function parseURLTemplate(URLTemplate = "", object = null) {
  let url = URLTemplate;
  let protocol = "";
  if (!isEditor()) {
    object = _.assign(
      _.cloneDeep(currentRouterMatch.getProperty("params")),
      object
    );
  }
  url = url.trim();
  if (url.indexOf("{{") !== -1) {
    url = replaceContentWithData(url, object);
  }
  if (url.indexOf("https://") === 0) {
    protocol = "https://";
    url = url.replace("https://", "");
  }
  if (url.indexOf("http://") === 0) {
    protocol = "http://";
    url = url.replace("http://", "");
  }
  if (url.indexOf("mailto:") === 0) {
    protocol = "mailto:";
    url = url.replace("mailto:", "");
  }
  if (url.indexOf("tel:") === 0) {
    protocol = "tel:";
    url = url.replace("tel:", "");
  }
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  if (!idTemplates) {
    return protocol + url;
  }
  idTemplates.forEach(idTemplate => {
    let replace = object[idTemplate.replace(/:|\//g, "")] || "";
    idTemplate = idTemplate.replace("/", "");
    url = url.replace(new RegExp(idTemplate, "g"), replace);
  });
  return protocol + url;
}

export function getWindowWidth() {
  let window;
  if (isEditor()) {
    window = document.getElementById("editorWindow").offsetWidth;
  } else {
    window = document.getElementById("front-app").offsetWidth;
  }
  return window;
}

export function renderAssetIcon(asset, props = null) {
  if (asset) {
    if (asset.url && asset.type === "svg") {
      return <AltrpSVG {...props} url={asset.url} />;
    }
    switch (asset.assetType) {
      case "icon": {
        return iconsManager().renderIcon(asset.name);
      }
      case "image": {
        return React.createElement("img", { ...props, src: asset.url });
      }
      case "media": {
        return React.createElement("img", { ...props, src: asset.url });
      }
    }
  }
  return "";
}

/**
 * @param {object} asset
 * @param {object} props
 * @return {React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> | React.DetailedReactHTMLElement<React.HTMLAttributes<T>, HTMLElement> | React.ReactSVGElement | React.DOMElement<React.DOMAttributes<T>, Element> | React.FunctionComponentElement<{}> | React.CElement<{}, React.ClassicComponent<{}, React.ComponentState>> | React.CElement<{}, React.Component<P, React.ComponentState>> | React.ReactElement<{}> | string}
 * @throws Исключение если иконка не найдена
 * */
export function renderAsset(asset, props = null) {
  if(_.isEmpty(asset)){
    return  ''
  }
  if(asset.type === 'image' && asset.dataUrl){
    return React.createElement("img", {
      ...props,
      src: asset.dataUrl,
    });
  }
  if (asset.url && asset.type === "svg") {
    return <AltrpSVG {...props} url={asset.url} rawSVG={asset.rawSVG} />;
  }
  if (! isSSR() && asset instanceof File) {
    let refImg = React.createRef();
    let fr = new FileReader();
    fr.readAsDataURL(asset);
    fr.onload = () => {
      if (refImg.current) {
        refImg.current.src = fr.result;
        refImg.current.alt = asset.name;
      }
    };
    return React.createElement("img", {
      ...props,
      src: asset.url,
      ref: refImg
    });
  }
  switch (asset.assetType) {
    case "icon": {
      return iconsManager().renderIcon(asset.name, props);
    }
    case "image": {
      return React.createElement("img", { ...props, src: asset.url });
    }
    case "media": {
      return React.createElement("img", { ...props, src: asset.url });
    }
    case "mediaBackground": {
      return React.createElement("div", {
        ...props,
        style: { backgroundImage: `url(${asset.url})` }
      });
    }
    case undefined: {
      return React.createElement("img", {
        ...props,
        src: "/img/nullImage.png"
      });
    }
  }
  return "";
}

/**
 * Парсим данный из строки в объект, если значение - путь, то берем значение из context
 * (если в context нет свойства, то не записываем)
 * @param {string} string
 * @param {AltrpModel} context
 * @param {boolean} allowObject
 * @param {boolean} replaceRight - нужно ли подставлять в значение параметра данные или оставить сырой шаблон
 * @param {boolean} replace - нужно ли подставлять в значение параметра данные или оставить сырой шаблон
 * @return {{}}
 */
export function parseParamsFromString(
  string,
  context = {},
  allowObject = false,
  replaceRight = true,
  replace = true,
) {
  if (!(context instanceof AltrpModel)) {
    context = new AltrpModel(context);
  }
  const params = {};
  const urlParams =
    window.currentRouterMatch instanceof AltrpModel
      ? window.currentRouterMatch.getProperty("params")
      : {};

  if (!string) {
    return params;
  }
  const lines = string.split("\n");
  lines.forEach(line => {
    let [left, right] = line.split("|");
    if (!left || !right) {
      return;
    }
    left = left.trim();
    right = right.trim();
    if (replace && left.indexOf("{{") !== -1) {
      left = replaceContentWithData(left);
    }
    if (replace && right.match(/{{([\s\S]+?)(?=}})/g)) {
      if (
        context.getProperty(
          right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
        ) ||
        getDataByPath(right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", ""))
      ) {
        //todo ошибка в IOS
        params[left] =
          context.getProperty(
            right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
          ) ||
          getDataByPath(
            right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
          ) ||
          "";
      } else {
        replaceRight
          ? (params[left] = urlParams[
              right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
            ]
              ? urlParams[
                  right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
                ]
              : "")
          : (params[left] = right);
      }
    } else {
      params[left] = right;
    }
    if (!allowObject && _.isObject(params[left])) {
      delete params[left];
    }
  });
  return params;
}

/**
 * Функция для проверки условий
 * @param {array} conditions
 * @param {boolean} AND - логичекое И или ИЛИ
 * @param {AltrpModel} model
 * @param {boolean} dataByPath - брать ли данные из getDataByPath
 * @return {boolean}
 */
export function conditionsChecker(
  conditions = [],
  AND = true,
  model,
  dataByPath = true
) {
  if (!conditions.length) {
    return true;
  }
  let result = AND;
  _.each(conditions, c => {
    if (AND) {
      result *= conditionChecker(c, model, dataByPath);
    } else {
      result += conditionChecker(c, model, dataByPath);
    }
  });

  return !!result;
}

/**
 * Функция для проверки одного условия
 * @param c
 * @param {AltrpModel} model
 * @param {boolean} dataByPath - брать ли данный из getDataByPath
 * @return {boolean}
 */
export function conditionChecker(c, model, dataByPath = true) {
  const { operator } = c;
  let { modelField: left, value } = c;
  if (dataByPath) {
    value = getDataByPath(value, "", model, true);
    left = getDataByPath(left, "", model);
    return altrpCompare(left, value, operator);
  }
  return altrpCompare(model.getProperty(left), value, operator);
}

/**
 * Установить данные
 * @param {string} path
 * @param {*} value
 * @param {function | null} dispatch
 * @return {boolean}
 */
export function setDataByPath(path = "", value, dispatch = null) {
  if (!path) {
    return false;
  }
  if (path.indexOf(",") !== -1) {
    let result = path
      .split(",")
      .map(path => setDataByPath(path, value, dispatch));
    return true;
  }
  path = path.replace("{{", "").replace("}}", "");
  path = path.trim();
  switch (value) {
    case "true":
      value = true;
      break;
    case "false":
      value = false;
      break;
    case "null":
      value = null;
      break;
    case "undefined":
      value = undefined;
      break;
  }

  if (path.indexOf("altrppagestate.") === 0) {
    path = path.replace("altrppagestate.", "");
    if (!path) {
      return false;
    }
    const oldValue = appStore.getState().altrpPageState.getProperty(path);
    if (_.isEqual(oldValue, value)) {
      return true;
    }
    if (_.isFunction(dispatch)) {
      dispatch(changePageState(path, value));
    } else {
      appStore.dispatch(changePageState(path, value));
    }
    return true;
  }
  if (path.indexOf("altrpmeta.") === 0) {
    path = path.replace("altrpmeta.", "");
    if (!path) {
      return false;
    }
    const oldValue = appStore.getState().altrpMeta.getProperty(path);
    if (_.isEqual(oldValue, value)) {
      return true;
    }
    if (_.isFunction(dispatch)) {
      dispatch(changeAltrpMeta(path, value));
    } else {
      appStore.dispatch(changeAltrpMeta(path, value));
    }
    return true;
  }
  if (path.indexOf("altrpuser.local_storage.") === 0) {
    path = path.replace("altrpuser.", "");
    if (!path) {
      return false;
    }
    const oldValue = appStore.getState().currentUser.getProperty(path);
    if (_.isEqual(oldValue, value)) {
      return true;
    }
    if (_.isFunction(dispatch)) {
      dispatch(changeCurrentUserProperty(path, value));
    } else {
      appStore.dispatch(changeCurrentUserProperty(path, value));
    }
    return true;
  }
  if (path.indexOf("altrpforms.") === 0) {
    path = path.replace("altrpforms.", "");
    if (!path) {
      return false;
    }
    const [formId, fieldName] = path.split(".");
    const { formsStore } = appStore.getState();

    const oldValue = _.get(formsStore, path);
    if (_.isEqual(oldValue, value)) {
      return true;
    }
    if (_.isFunction(dispatch)) {
      dispatch(changeFormFieldValue(path, value));
    } else {
      appStore.dispatch(changeFormFieldValue(fieldName, value, formId, true));
    }
  } else
  if (path.indexOf("altrpelements.") === 0) {
    const pathElements = path.split(".");
    let [prefix, elementId, updateType, ...propName] = pathElements;
    const component = getComponentByElementId(elementId);
    if (!component) {
      return true;
    }
    propName =  propName.join('.');
    switch (updateType) {
      case "settings": {
        component.props.element.updateSetting(value, propName);
        if(window['h-altrp']){
          let settings = component.props.element.settings;
          settings = mutate.set(settings, propName, value)
          appStore.dispatch(addSettings(component.props.element.getId(), component.props.element.getName(), settings));
        }
        return true;
      }
      default: {
        return true;
      }
    }
  } else
  if (path.indexOf("altrpareas.") === 0) {
    const pathElements = path.split(".");
    const [prefix,  areaName,  updateType, propName] = pathElements;
    let area = window.page_areas.find(area => area.id === areaName);
    if(area && updateType === 'settings'){
      if(! (area instanceof Area)){
        area = Area.areaFactory(area);
      }
      area.setSetting(propName, value);
    }
  } else
  if (path.indexOf("altrpstorage.") === 0) {
    path = path.replace("altrpstorage.", "");
    const currentStorage = getDataFromLocalStorage("altrpstorage", {});
    _.set(currentStorage, path, value);
    saveDataToLocalStorage("altrpstorage", currentStorage);
    return true;
  }
  return false;
}

/**
 * Извелкает путь из строки
 * @param {string} string
 * @return {string}
 */
export function extractPathFromString(string = "") {
  let path = "";
  if (_.isString(string)) {
    // path = string.match(/(?<={{)([\s\S]+?)(?=}})/g)[0]
    path = _.get(string.match(/{{([\s\S]+?)(?=}})/g), "0", "").replace(
      "{{",
      ""
    );
  }
  return path;
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

// /**
//  * Возвращает объект из json-строки если возможно
//  * @param {string} string
//  * @param {*} _default
//  * @return {*}
//  */
// export function mbParseJSON(string, _default = null) {
//   try {
//     return JSON.parse(string);
//   } catch (e) {
//     return _default === null ? string : _default;
//   }
// }


export const mbParseJSON = _mbParseJSON;

/**
 * Функция для сравнения значений
 * @param leftValue
 * @param rightValue
 * @param operator
 * @return {boolean}
 */
export function altrpCompare(
  leftValue = "",
  rightValue = "",
  operator = "empty"
) {
  switch (operator) {
    case "empty": {
      return _.isEmpty(leftValue);
    }
    case "not_empty": {
      return !_.isEmpty(leftValue);
    }
    case "null": {
      return !leftValue;
    }
    case "not_null": {
      return !!leftValue;
    }
    case "==": {
      if (!leftValue && !rightValue) {
        return true;
      }
      if (!(_.isObject(leftValue) || _.isObject(rightValue))) {
        return leftValue == rightValue;
      } else {
        return _.isEqual(leftValue, rightValue);
      }
    }
    case "===": {
      return _.isEqual(leftValue, rightValue);
    }
    case "<>": {
      if (!leftValue && !rightValue) {
        return false;
      }
      if (!(_.isObject(leftValue) || _.isObject(rightValue))) {
        return leftValue != rightValue;
      } else {
        return _.isEqual(leftValue, rightValue);
      }    }
    case ">": {
      return Number(leftValue) > Number(rightValue);
    }
    case ">=": {
      return Number(leftValue) >= Number(rightValue);
    }
    case "<": {
      return Number(leftValue) < Number(rightValue);
    }
    case "<=": {
      return Number(leftValue) <= Number(rightValue);
    }
    case "in": {
      if (_.isString(rightValue)) {
        return rightValue.indexOf(leftValue) !== -1;
      }
      if (!_.isArray(rightValue)) {
        return false;
      }
      let result = false;
      rightValue.forEach(item => {
        if (!result) {
          result = altrpCompare(leftValue, item, "==");
        }
      });
      return result;
    }
    case "not_in": {
      return !altrpCompare(leftValue, rightValue, "in");
    }
    case "contain": {

      if (_.isString(leftValue)) {
        return leftValue.indexOf(rightValue) !== -1;
      }
      if (!_.isArray(leftValue)) {
        return false;
      }
      let result = false;
      leftValue.forEach(item => {
        if (!result) {
          result = altrpCompare(rightValue, item, "contain");
        }
      });
      return result;
    }
    case "not_contain": {
      return !altrpCompare(leftValue, rightValue, "contain");
    }
  }
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
 * Скроллит к элементу
 * @param {{} | HTMLElement}scrollbars
 * @param {{}}element
 */
export function scrollToElement(scrollbars, element) {
  let { container } = scrollbars;
  if(scrollbars instanceof HTMLElement){
    container = scrollbars;
    let scroll = getOffsetTopInElement(element, scrollbars);
    if(scroll){
      scrollbars.scrollTop = scroll;
    }

  }
  if(scrollbars instanceof Window){
    container = scrollbars;
  }
  /**
   * @member {HTMLElement} container
   */
  if (!container) {
    return;
  }
  if (!_.isFunction(scrollbars.scrollTop) && !_.isFunction(scrollbars.scrollTo)) {
    return;
  }


  let parent = element.offsetParent;
  let top = element.offsetTop;

  while (parent !== container || parent !== document.body) {
    if (! parent) {
      /**
       * ушли в самый корень ДОМ и контейнер не встретился
       */
      break;
    }
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  /**
   * не получили каеое-либо значение
   */
  if (! top) {
    return;
  }


  console.log(scrollbars.scrollTo);
  scrollbars.scrollTop && scrollbars.scrollTop(top);
  scrollbars.scrollTo && scrollbars.scrollTo({
    top,
    left: 0,
    behavior: 'smooth',
  });
}

/**
 * Вернет HTML элемент React компонента, у которого id = elementId
 * @param {string} elementId
 * @return {null | HTMLElement}
 */
export function getHTMLElementById(elementId = "") {
  let HTMLElement = null;
  if (!elementId || !elementId.trim()) {
    return HTMLElement;
  }
  elementId = elementId.trim();
  HTMLElement = document.getElementById(elementId)
  if (HTMLElement){
    return HTMLElement
  }
  appStore.getState().elements.forEach(el => {
    if (!el.elementWrapperRef.current) {
      return;
    }
    if (!el.elementWrapperRef.current.id) {
      return;
    }
    if (
      el.elementWrapperRef.current.id
        .toString()
        .split(" ")
        .indexOf(elementId) !== -1
    ) {
      HTMLElement = el.elementWrapperRef.current;
    }
  });
  return HTMLElement;
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
 * Функция выводит определенный элемент на печать
 * @params {HTMLElement[]} elements
 * @params {null || HTMLElement} stylesTag
 */
export function printElements(elements, title = "") {
  let myWindow = window.open("", "my div", "height=400,width=1200");
  myWindow.document.write(`<html><head><title>${title}</title></head>`);
  myWindow.document.write("<body >");
  elements = _.isArray(elements) ? elements : [elements];
  let headContent = '';
  myWindow.document.write("</body></html>");
  let bodyContent = '';
  elements.forEach(element => {
    if(element instanceof HTMLHeadElement){
      headContent = element.innerHTML;
      return
    }
    bodyContent += element.outerHTML;
  });
  myWindow.document.close(); // necessary for IE >= 10
  myWindow.document.head.innerHTML = headContent;
  bodyContent = bodyContent
    .replace(/<tr/g, '<div className="altrp-table-tr"')
    .replace(/<th/g, '<div')
    .replace(/<\/tr>/g, '</div>')
    .replace(/<\/th>/g, '</div>')
  myWindow.document.body.innerHTML = bodyContent;
  myWindow.focus(); // necessary for IE >= 10
  delay(250).then(()=>{
    myWindow.print();
    myWindow.close();
  })
  return true;
}


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

export function sortOptions(options, sortDirection) {
  options.sort((a, b) =>
    a.label.toLowerCase() > b.label.toLowerCase()
      ? 1
      : b.label.toLowerCase() > a.label.toLowerCase()
      ? -1
      : 0
  );
  return sortDirection === "asc" ? options : options.reverse();
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
 * Сохраняет состояние виджет в localStorage
 * Для виджетов ,которые могут сохранять состояния при смене страниц
 * @param {string} widgetId
 * @param {*} state
 * @return {boolean}
 */
export function storeWidgetState(widgetId, state = null) {
  if (!widgetId) {
    return false;
  }
  const path = `widget_state${widgetId}`;
  return saveDataToLocalStorage(path, state);
}
/**
 * Забирает состояние из localStorage
 * Для виджетов ,которые могут сохранять состояния при смене страниц
 * @param {string} widgetId
 * @param {*} _default
 * @return {boolean}
 */
export function getWidgetState(widgetId, _default = null) {
  if (!widgetId) {
    return _default;
  }
  const path = `widget_state${widgetId}`;
  return getDataFromLocalStorage(path, _default);
}

/**
 * Сохранить данные в localStorage
 * @param {string} name
 * @param {*} data
 * @return {boolean}
 */
export function saveDataToLocalStorage(name, data) {
  if (!name) {
    return false;
  }
  if (_.isObject(data)) {
    data = JSON.stringify(data);
  }
  try {
    localStorage.setItem(name, data);
  } catch (e) {
    return true;
  }
  return true;
}


export function scrollbarWidth() {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute(
    "style",
    "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

/**
 * Добавляем свойство altrpIndex для всех эементов-объектов массива
 * для их идентификации внутри повторяющихся карточек
 * @param {[]} array
 */
export function setAltrpIndex(array = []) {
  if (!_.isArray(array)) {
    return;
  }
  array.forEach((item, idx) => {
    if (!_.isObject(item)) {
      return;
    }
    if (item instanceof AltrpModel) {
      item.setProperty("altrpIndex", idx);
      return;
    }
    item.altrpIndex = idx;
  });
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
 * случайная строка
 * @return {string}
 */
export function altrpRandomId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

/**
 * Кнопки для пагинации
 * @param pageIndex
 * @param pageCount
 * @param first_last_buttons_count
 * @param middle_buttons_count
 * @return {*[]}
 */
export function generateButtonsArray(
  pageIndex,
  pageCount,
  first_last_buttons_count,
  middle_buttons_count
) {
  const buttonsSum = first_last_buttons_count + middle_buttons_count;
  const lastButtons = Array.from(
    { length: first_last_buttons_count },
    (_, i) => pageCount - i - 1
  ).reverse();
  const middleButtons = Array.from(
    { length: middle_buttons_count },
    (_, i) => pageIndex - Math.floor(middle_buttons_count / 2) + i
  );

  if (pageIndex + 1 < buttonsSum) {
    return [...Array(buttonsSum).keys(), "ellipsis", ...lastButtons];
  }
  if (
    pageIndex >=
    pageCount -
      first_last_buttons_count -
      1 -
      Math.floor(middle_buttons_count / 2)
  ) {
    return [
      ...Array(first_last_buttons_count).keys(),
      "ellipsis",
      ...Array.from(
        { length: first_last_buttons_count + middle_buttons_count },
        (_, i) => pageCount - i - 1
      ).reverse()
    ];
  }

  return [
    ...Array(first_last_buttons_count).keys(),
    "ellipsis",
    ...middleButtons,
    "ellipsis",
    ...lastButtons
  ];
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
 * Вернуть экземпляр конвертера необходимого типа (array - ArrayConverter и т. д.)
 * @return {DataConverter}
 */
export function getConverter(data) {
  switch (data.data_type) {
    case "array":
      return new ArrayConverter(data);
  }
  return new DataConverter();
}

/**
 * Конвертируются данные
 * @param {{} | []} settings
 * @param {*} data
 */
export function convertData(settings, data) {
  if (_.isArray(settings)) {
    settings.forEach(item => {
      const converter = getConverter(item);
      data = converter.convertData(data);
    });
  }
  if (settings.data_type) {
    const converter = getConverter(settings);
    data = converter.convertData(data);
  }
  return data;
}
export function renderIcon(isHidden, icon, defaultIcon, className) {
  if (isHidden) return null;

  return (
    <span className={className}>
      {icon && icon.assetType ? renderAssetIcon(icon) : defaultIcon}
    </span>
  );
  // if()
}

/**
 * Перенаправление на другую страницу по настройкам LinkController
 * @param {{}} linkSettings
 * @param {{}} e
 * @param {{}} context
 */
export function redirect(linkSettings, e, context = {}) {
  if (_.get(linkSettings, "toPrevPage")) {
    if(window.frontAppRouter){
      frontAppRouter.history.goBack();
    } else {
      history.back();
    }
    return;
  }
  if (!_.get(linkSettings, "url")) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  let { url } = linkSettings;
  url = replaceContentWithData(url, context);
  if (linkSettings.openInNew) {
    window.open(url, "_blank");
    return;
  }
  if (linkSettings.tag === "a" || ! window.frontAppRouter) {
    window.location.assign(url);
  } else {
    frontAppRouter.history.push(url);
  }

}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Заменяет false, null, true в строке на соответствующие значения
 * @param {string} value
 * @return {*}
 */
export function valueReplacement(value) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
  }
  return value;
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

export function parseIDFromYoutubeURL(youtubeURL) {
  const startIndex = youtubeURL.indexOf("v=") + 2;
  const endIndex = youtubeURL.indexOf("&", startIndex);

  return youtubeURL.substring(startIndex, endIndex);
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

/**
 *
 * @return {*[]}
 */
export function getBreadcrumbsItems(){
  if(window['h-altrp'] && window.breadcrumbsItems){
    return window.breadcrumbsItems;
  }
  let items = [];
  if(isEditor(0)){
    return items;
  }
  const currentId = window['h-altrp'] ? window.page_id : window.currentPageId
  const {routes} = appStore.getState().appRoutes
  let breadcrumbsClone = [];
  let idCurrent = 0;
  routes.forEach((route, idx) => {
    if(currentId === route.id) {
      idCurrent = idx
    }
  })

  breadcrumbsClone.push(routes[idCurrent])

  function getParent(parentId) {
    routes.forEach(route => {
      if(route.id === parentId) {
        breadcrumbsClone.push(route)
        if(route.parent_page_id) {
          getParent(route.parent_page_id)
        }
      }
    })
  }

  if(routes[idCurrent].parent_page_id) {
    getParent(routes[idCurrent].parent_page_id)
  }

  items = breadcrumbsClone.reverse()
  if(window['h-altrp']){
    window.breadcrumbsItems = items;
  }
  return items;
}
