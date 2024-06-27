import {changePageState} from "../store/altrp-page-state-storage/actions";
import {changeAltrpMeta} from "../store/altrp-meta-storage/actions";
import {changeCurrentUserProperty} from "../store/current-user/actions";
import {changeFormFieldValue} from "../store/forms-data-storage/actions";
import mutate from "dot-prop-immutable";
import {addSettings} from "../store/elements-settings/actions";
import Area from "../classes/Area";
import getComponentByElementId from "./getComponentByElementId";
import getDataFromLocalStorage from "./getDataFromLocalStorage";
import saveDataToLocalStorage from "./saveDataToLocalStorage";

/**
 * Установить данные
 * @param {string} path
 * @param {*} value
 * @param {function | null} dispatch
 * @return {boolean}
 */
export default function setDataByPath(path = "", value, dispatch = null) {
  if (!path ||! window.appStore) {
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
    let [formId, ...fieldName] = path.split(".");
    const { formsStore } = appStore.getState();
    fieldName = fieldName.join('.')
    const oldValue = _.get(formsStore, [formId, fieldName]);
    if (_.isEqual(oldValue, value)) {
      return true;
    }
    if (_.isFunction(dispatch)) {
      dispatch(changeFormFieldValue(path, value));
    } else {
      appStore.dispatch(changeFormFieldValue(fieldName, value, formId, true));
    }
    return true;
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
    return true;
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
