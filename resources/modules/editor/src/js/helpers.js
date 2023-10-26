import { getCurrentScreen, getElementState } from "./store/store";
import CONSTANTS from "./consts";
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals
} = require("unique-names-generator");

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

export function editorSetCurrentElementByID(elementID) {
  const currentElement = getEditor().modules.templateDataStorage.getElementById(
    elementID
  );
  currentElement &&
    getEditor().modules.templateDataStorage.setCurrentElement(currentElement);
}
export function deleteCurrentElementByID(elementID) {
  const currentElement = getEditor().modules.templateDataStorage.getElementById(
    elementID
  );
  if (currentElement) {
    currentElement.deleteThisElement();
    return true;
  }
  return false;
}

export function createGlobalColor() {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "",
    style: "capital"
  });
  const color = `rgba(255, 255, 255, 1)`;
  const colorPickedHex = "#FFFFFF";
  const colorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  };
  return {
    name: randomName,
    color: color,
    colorPickedHex: colorPickedHex,
    colorRGB: colorRGB
  };
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
  return _.get(templateDataStorage, "type", "content");
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
 * @param {null|string} screen
 * @param {null|string} state
 * @return {string}
 */
export function getElementSettingsSuffix(controller, ignoreResponse = false, screen = null, state = null) {
  let suffix_1 = getElementState().value;
  if (controller.type === "repeater" ||
    controller.type === "group" ||
    controller.isStateless()) {
    suffix_1 = "";
  }

  if(state !== null){
    suffix_1 = state
  }

  let suffix_2 =
    getCurrentScreen().name === CONSTANTS.DEFAULT_BREAKPOINT
      ? ""
      : getCurrentScreen().name;
  if(screen !== null){
    suffix_2 = screen
  }
  if (ignoreResponse) {
    suffix_2 = "";
  }
  if (!(suffix_2 || suffix_1)) {
    return "";
  }
  return `_${suffix_1}_${suffix_2}`;
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
    if(Number(idTemplate.replace(/:|\//g, ""))){
      return
    }
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
