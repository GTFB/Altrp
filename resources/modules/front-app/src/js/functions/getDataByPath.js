import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import queryString from "query-string";
import Area from "../classes/Area";
import getTimeValue from "./getTimeValue";
import replaceContentWithData from './replaceContentWithData'
import getComponentByElementId from './getComponentByElementId'
import getDataFromLocalStorage from './getDataFromLocalStorage'
import setAltrpIndex from "./setAltrpIndex";

/**
 * Получить данные из окружения
 * @param {string} path
 * @param {*} _default
 * @param {{} | AltrpModel | null} context
 * @param {boolean} altrpCheck - проверять ли altrp
 * @return {*}
 */
export default function getDataByPath(
  path = "",
  _default = null,
  context = null,
  altrpCheck = false
) {
  if (!path) {
    return _default;
  }
  if (path.indexOf("{{") !== -1) {
    path = replaceContentWithData(path, context);
  } else if( path.indexOf("[[") !== -1){
    path = replaceContentWithData(path, context, true);

  }

  /**
   * проверим путь
   */
  if (altrpCheck && path.trim().indexOf("altrp") !== 0) {
    return path;
  }
  path = path.trim();
  let trueValue, falseValue;
  if (path.indexOf("?") !== -1 && path.indexOf(":") !== -1) {
    let [_path, _right] = path.split("?");
    [trueValue, falseValue] = _right.split(":");
    trueValue = trueValue.trim();
    if (trueValue.indexOf(".") !== -1) {
      trueValue = getDataByPath(trueValue, _default, context);
    }

    falseValue = falseValue.trim();
    if (falseValue.indexOf(".") !== -1) {
      falseValue = getDataByPath(falseValue, _default, context);
    }
    path = _path.trim();
  }
  /**
   * @type {AltrpModel} currentModel
   */
  let {
    currentModel,
    currentDataStorage,
    altrpresponses,
    formsStore,
    altrpPageState,
    altrpPage,
    currentUser,
    altrpMeta
  } = appStore.getState();
  if (context) {
    currentModel =
      context instanceof AltrpModel ? context : new AltrpModel(context);
  }
  let urlParams =
    window.currentRouterMatch instanceof AltrpModel
      ? window.currentRouterMatch.getProperty("params")
      : {};

  let queryData = queryString.parseUrl(window.location.href).query;

  urlParams = _.assign(queryData, urlParams);

  let value = _default;
  if (!_.isString(path)) {
    return value;
  }
  if(path === 'altrppage.is_dark' ||path ===  'altrppagestate.is_dark'){
    return document.documentElement.classList.contains('altrp-theme_dark')
  }
  if(path === 'altrppage.is_mobile'){
    return document.documentElement.classList.contains('is_mobile')
  }
  if(path === 'altrppage.lang' ||path ===  'altrppagestate.lang'){
    return document.documentElement.getAttribute('lang')
  }
  if (path.indexOf("altrpdata.") === 0) {
    path = path.replace("altrpdata.", "");
    value = currentDataStorage
      ? currentDataStorage.getProperty(path, _default)
      : "";
  } else if (path.indexOf("altrpresponses.") === 0) {
    path = path.replace("altrpresponses.", "");
    value = altrpresponses ? altrpresponses.getProperty(path, _default) : "";
  } else if (path.indexOf("altrpmeta.") === 0) {
    path = path.replace("altrpmeta.", "");
    value = altrpMeta ? altrpMeta.getProperty(path, _default) : "";
  } else if (path.indexOf("altrppagestate.") === 0) {
    path = path.replace("altrppagestate.", "");
    value = altrpPageState ? altrpPageState.getProperty(path, _default) : "";
  } else if (path.indexOf("altrpuser.") === 0) {
    path = path.replace("altrpuser.", "");
    value = currentUser ? currentUser.getProperty(path, _default) : "";
  } else if (path === "altrpuser") {
    value = currentUser.getData();
  } else if (path === "altrpmodel") {
    value = currentModel.getData();
  } else if (path.indexOf("altrptime.") === 0) {
    value = getTimeValue(path.replace("altrptime.", ""));
  } else if (path.indexOf("altrpforms.") === 0) {
    value = _.get(formsStore, path.replace("altrpforms.", ""), _default);
  } else if (path.indexOf("altrppage.") === 0) {
    value = altrpPage
      ? altrpPage.getProperty(path.replace("altrppage.", ""), _default)
      : "";
    if(_.isString(value) && value.match(/{{([\s\S]+?)}}/)){
      value = replaceContentWithData(value, context.getData());
    }
  } else if (path.indexOf("altrpelements.") === 0) {
    const pathElements = path.split(".");
    const [prefix, elementId, updateType, propName] = pathElements;
    const component = getComponentByElementId(elementId);
    if (!component) {
      value = "";
    } else {
      switch (updateType) {
        case "settings":
        {
          value = component.props.element.getSettings(propName);
        }
          break;
        default: {
          value = "";
        }
      }
    }
  } else if (path.indexOf("altrpstorage.") === 0) {
    path = path.replace("altrpstorage.", "");
    value = getDataFromLocalStorage("altrpstorage", {});
    value = _.get(value, path, _default);
  } else if (path.indexOf("altrpareas.") === 0) {
    const pathElements = path.split(".");
    const [prefix,  areaName,  updateType, propName] = pathElements;
    let area = window.page_areas.find(area => area.id === areaName);
    if(area && updateType === 'settings'){
      if(! (area instanceof Area)){
        area = Area.areaFactory(area);
      }
      value = area.getSetting(propName, _default);
    }
  } else {
    value = currentModel.getProperty(path) !== undefined
      ? currentModel.getProperty(path)
      : urlParams[path];
    if (! value && value !== 0) {
      value = _default;
    }
  }
  if (trueValue || falseValue) {
    value = value ? trueValue : falseValue;
  }
  if(_.isArray(value)){
    setAltrpIndex(value)
  }
  return value;
}
