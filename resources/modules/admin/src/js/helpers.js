import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";
import Resource from "../../../editor/src/js/classes/Resource";
import { isEmpty } from "lodash";

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
/** @function objectDeepCleaning
  * Удаляет все свойства id, и чистит settings
  * @param {object} collection
  * @return {object} Объект после удаления всех свойств id, и чистки settings
 */
export function objectDeepCleaning(collection) {
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
