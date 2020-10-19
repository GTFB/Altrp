import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";
import Resource from "../../../editor/src/js/classes/Resource";
import { isEmpty } from "lodash";
import FrontElement from "../../../front-app/src/js/classes/FrontElement";

export function redirect(url) {
  url = url || '/';
  window.location.assign(url);
}
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
/**
 * @return {IconsManager}
* */
export function iconsManager() {
  if (!window.iconsManager) {
    window.iconsManager = new IconsManager();
  }
  return window.iconsManager;
}

export async function logout() {
  let res = await (new Resource({ route: '/logout' })).post();
  redirect(res.location)
}

export function pageReload() {
  document.location.reload(true);
}

const a = { "Ё": "Yo", "Й": "I", "Ц": "Ts", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "Sh", "Щ": "Sch", "З": "Z", "Х": "H", "Ъ": "", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "", "Ф": "F", "Ы": "I", "В": "V", "А": "a", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "", "б": "b", "ю": "yu" };

/**
 * Транслитерация
 * @param {string}str
 * @return {string}
 */
export function transliterate(str) {
  if (!str) {
    return "";
  }
  return str.split('').map(function (char) {
    return _.isUndefined(a[char]) ? char : a[char];
  }).join("");
}

/**
 * Парсит строку в name для БД
 * @param {string}str
 * @return {string}
 */
export function titleToName(str) {
  str = transliterate(str);
  return str.toLowerCase().replace(/^\d+/, '').replace(/[^\d\w]/g, '_');

}

export function titleToPath(str) {
  str = transliterate(str);
  return str.toLowerCase().replace(/^\d+/, '').replace(/[^\d\w]/g, '-');

}
/** @function objectDeepCleaning
  * Удаляет все свойства id, и чистит settings (пока нет) todo: нужна оптимизация
  * @param {object} collection
  * @return {object} Объект после удаления всех свойств id, и чистки settings
 */
export function objectDeepCleaning(collection) {
  return collection;
  if (typeof collection !== "object" || collection === null) return collection;
  if (collection.id) delete collection.id;

  if (Array.isArray(collection)) {
    for (let index = 0; index < collection.length; index++) {
      const element = collection[index];
      objectDeepCleaning(element);
    }
  } else {
    if (collection.hasOwnProperty("settings")) deleteEmptyPropsDeep(collection.settings);
    if (isEmpty(collection.settings)) delete collection.settings; // удаляем settings, если оно - пустой объект
    for (const key in collection) {
      if (collection.hasOwnProperty(key)) {
        const element = collection[key];
        objectDeepCleaning(element);
      }
    }
  }
  return collection;
}
/** @function deleteEmptyPropsDeep
  * Удаляет в объекте все свойства, значения которых - null, или "", или {}
  * @param {object} collection
 */
export function deleteEmptyPropsDeep(collection) {
  const deleteProps = [];
  for (const key in collection) {
    if (collection[key] === null || collection[key] === "") {
      deleteProps.push(key);
    }
    deleteProps.forEach(key => delete collection[key]);

    if (typeof collection[key] === "object") {
      deleteEmptyPropsDeep(collection[key]);
      if (isEmpty(collection[key])) delete collection[key];
    }
  }
}

/**
 * Подготовить данные перед импортом
 * @param templateData
 * @param {FrontElement | null} parent
 */
function prepareTemplate(templateData, parent = null){
  let template = new FrontElement(templateData);

}

export function buildPagesTree(pages) {
  // return pages;
  const level = 0;
  let _result;
  const roots = pages.filter(({ parent_page_id }) => parent_page_id === null);

  if (!roots) return pages;

  _result = _.cloneDeep(roots);

  roots.forEach(treeItem => {
    treeRecursion(treeItem.id, level + 1);
  });

  function treeRecursion(parentId, level) {
    const children = pages.filter(({ parent_page_id }) => parent_page_id === parentId);
    children.forEach(page => {
      page.title = "—".repeat(level) + page.title;
      _result.push(page);
      treeRecursion(page.id, level + 1);
    });
  }

  return _result;
}