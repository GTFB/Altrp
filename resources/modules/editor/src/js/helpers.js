import { getCurrentScreen, getElementState } from "./store/store";
import { isEditor } from "../../../front-app/src/js/helpers";
import CONSTANTS from "./consts";
import controllerHistory from "./classes/ControllerHistory";

export function getTemplateId() {
  return new URL(window.location).searchParams.get("template_id");
}

export function getReportsId() {
  return new URL(window.location).searchParams.get("id");
}

/**
 * @param {array} names
 * */
export function getClassNames(names) {
  if (!names.length) {
    return "";
  }
  let result = "";
  for (let cssClass of names) {
    result += cssClass + " ";
  }
  return result;
}

export function settingToState(setting) {
  if (!setting) {
    return {};
  }
  return {
    value: setting.getValue(),
    label: setting.getLabel()
  };
}

export function getEditorContent() {
  return window.frames[0].window.altrpEditorContent;
}

export function getReportsContent() {
  return window.frames[0].window.altrpReportsContent;
}

/**
 * @return {Editor}
 * */
export function getEditor() {
  return window.altrpEditor || window.parent.altrpEditor;
}

export function editorSetCurrentElement(element) {
  getEditor().modules.templateDataStorage.setCurrentElement(element);
}

/**
 * @return {TemplateDataStorage}
 * */
export function getTemplateDataStorage() {
  return window.altrpEditor.modules.templateDataStorage;
}

/**
 * @return {string}
 * */
export function getTemplateType() {
  const templateDataStorage = getTemplateDataStorage();
  return _.get(templateDataStorage, 'type', 'content')
}

/**
 *
 * @return {ElementsFactory}
 */
export function getFactory() {
  return getEditor().modules.elementsFactory;
}

/**
 * @param {Event} e
 * @param {HTMLElement} element
 * */
export function topOrBottomHover(e, element) {
  let rect = element.getBoundingClientRect();
  let y = e.clientY - rect.top;
  return y < rect.height / 2 ? "top" : "bottom";
}

/**
 * @return {IconsManager}
 * */
export function iconsManager() {
  return window.iconsManager;
}

/**
 * Генерирует суфикс для всех настроек
 * на основе elementState и разврешения
 * @param {Controller} controller
 * @param {boolean} ignoreResponse
 * @return {string}
 */
export function getElementSettingsSuffix(controller, ignoreResponse = false) {
  let suffix_1 = getElementState().value;
  let suffix_2 =
    getCurrentScreen().name === CONSTANTS.DEFAULT_BREAKPOINT
      ? ""
      : getCurrentScreen().name;
  if(ignoreResponse){
    suffix_2 = '';
  }
  if (!(suffix_2 || suffix_1)) {
    return "";
  }
  return `_${controller.stateless ? '' : getElementState().value}_${suffix_2}`;
}

/**
 * Конвертируем RGBA в HEX формат
 * @param {String} URLTemplate строка в формате CSS-правила
 * @param {{}} object
 * @return {string}
 */
export function parseURLTemplate(URLTemplate, object = {}) {
  let url = URLTemplate;
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  idTemplates.forEach(idTemplate => {
    let replace = object[idTemplate.replace(/:|\//g, "")] || "";
    idTemplate = idTemplate.replace("/", "");
    url = url.replace(new RegExp(idTemplate, "g"), replace);
  });
  return url;
}

export function rgb2hex(rgb) {
  if (rgb)
    rgb = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
  return rgb && rgb.length === 4
    ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : "";
}
