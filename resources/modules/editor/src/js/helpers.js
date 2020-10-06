import {getCurrentScreen, getElementState} from "./store/store";
import {isEditor} from "../../../front-app/src/js/helpers";
import CONSTANTS from "./consts";

export function getTemplateId() {
  return (new URL(window.location)).searchParams.get('template_id');
}

/**
 * @param {array} names
 * */
export function getClassNames(names) {
  if (!names.length) {
    return '';
  }
  let result = '';
  for (let cssClass of names) {
    result += cssClass + ' ';
  }
  return result;
}

export function settingToState(setting) {
  if (!setting) {
    return {};
  }
  return {
    value: setting.getValue(),
    label: setting.getLabel(),
  };
}

export function getEditorContent() {
  return window.frames[0].window.altrpEditorContent;
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
  return window.altrpEditor.modules.templateDataStorage
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
  return (y < (rect.height / 2)) ? 'top' : 'bottom';
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
 * @return {string}
 */
export function getElementSettingsSuffix(controller) {
  let suffix_1 = getElementState().value;
  let suffix_2 = (getCurrentScreen().name === CONSTANTS.DEFAULT_BREAKPOINT) ? '' : getCurrentScreen().name;
  if (!(suffix_2 || suffix_1)) {
    return '';
  }
  return `_${getElementState().value}_${getCurrentScreen().name}`
}

/**
 * Конвертируем RGBA в HEX формат
 * @param {String} строка в формате CSS-правила
 * @return {string}
 */
export function parseURLTemplate(URLTemplate, object = {}) {
  let url = URLTemplate;
  // columnEditUrl = columnEditUrl.replace(':id', row.original.id);
  let idTemplates = url.match(/:([\s\S]+?)(\/|$)/g);
  idTemplates.forEach(idTemplate => {
    let replace = object[idTemplate.replace(/:|\//g, '')] || '';
    idTemplate = idTemplate.replace('/', '');
    url = url.replace(new RegExp(idTemplate, 'g'), replace);
  });
  return url;
}

export function placeElement(getVariants, properties) {
  let variants = [
    {
      position: "bottomLeft",
      class: "bottom-left"
    },
    {
      position: "bottomCenter",
      class: "bottom-center"
    },
    {
      position: "bottomRight",
      class: "bottom-right"
    },
    {
      position: "topLeft",
      class: "top-left"
    },
    {
      position: "topCenter",
      class: "top-center"
    },
    {
      position: "topRight",
      class: "top-right"
    },
    {
      position: "leftTop",
      class: "left-top"
    },
    {
      position: "leftCenter",
      class: "left-center"
    },
    {
      position: "leftBottom",
      class: "left-bottom"
    },
    {
      position: "rightTop",
      class: "right-top"
    },
    {
      position: "rightCenter",
      class: "right-center"
    },
    {
      position: "rightBottom",
      class: "right-bottom"
    },
  ];

  if (getVariants) {
    return {variants}
  }
  ;

  let {target, object, place} = properties;

  let
      targetSizes = {width: target.offsetWidth, height: target.offsetHeight},
      targetPosition = {x: target.offsetLeft, y: target.offsetTop},
      objectSizes = {width: object.offsetWidth, height: object.offsetHeight},
      targetBottom = targetPosition.y + targetSizes.height,
      targetTop = targetPosition.y - objectSizes.height,
      targetStyles = window.getComputedStyle(target),
      targetMarginLeft = parseInt(targetStyles.getPropertyValue('margin-left').replace(/\D+/g, "")) || 0,
      targetMarginRight = parseInt(targetStyles.getPropertyValue('margin-right').replace(/\D+/g, "")) || 0;

  let positioning = {
    place,
    vector: "verBottom",
    position: {}
  };

  switch (place) {
    case "bottomLeft":
      positioning.position = {left: targetPosition.x, top: targetBottom};
      positioning.vector = "verBottom";
      break;
    case "bottomCenter":
      positioning.position = {top: targetBottom};
      positioning.vector = "verBottom";
      break;
    case "bottomRight":
      positioning.position = {right: targetMarginRight, top: targetBottom};
      positioning.vector = "verBottom";
      break;
    case "topLeft":
      positioning.position = {left: targetPosition.x, top: targetTop};
      positioning.vector = "verTop";
      break;
    case "topCenter":
      positioning.position = {top: targetTop};
      positioning.vector = "verTop";
      break;
    case "topRight":
      positioning.position = {right: targetMarginRight, top: targetTop};
      positioning.vector = "verTop";
      break;
    case "leftTop":
      positioning.position = {right: targetSizes.width + targetMarginLeft, top: targetPosition.y};
      positioning.vector = "horLeft";
      break;
    case "leftCenter":
      positioning.position = {right: targetSizes.width + targetMarginLeft};
      positioning.vector = "horLeft";
      break;
    case "leftBottom":
      positioning.position = {right: targetSizes.width + targetMarginLeft, bottom: targetPosition.y};
      positioning.vector = "horLeft";
      break;
    case "rightTop":
      positioning.position = {left: targetSizes.width + targetMarginRight, top: targetPosition.y};
      positioning.vector = "horRight";
      break;
    case "rightCenter":
      positioning.position = {left: targetSizes.width + targetMarginRight};
      positioning.vector = "horRight";
      break;
    case "rightBottom":
      positioning.position = {left: targetSizes.width + targetMarginRight, bottom: targetPosition.y};
      positioning.vector = "horRight";
      break;
  }
  return positioning
}

export function rgb2hex(rgb) {
  if (rgb) rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

export function cutString(string, maxLength = 80) {
  if (string.length <= maxLength) return string;
  return string.slice(0, maxLength) + '...';
}

export function sortOptions(options, sortDirection) {
  options.sort((a, b) => a.label.toLowerCase() > b.label.toLowerCase() ? 1 : b.label.toLowerCase() > a.label.toLowerCase() ? -1 : 0);
  return sortDirection === "asc" ? options : options.reverse();
}
