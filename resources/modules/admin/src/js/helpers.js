import IconsManager from "../../../editor/src/js/classes/modules/IconsManager";
import Resource from "../../../editor/src/js/classes/Resource";

export function redirect(url) {
  url = url || '/';
  window.location.assign(url);
}
export function generateId(){
  return '_' + Math.random().toString(36).substr(2, 9);
}
/**
 * @return {IconsManager}
* */
export function iconsManager(){
  if(! window.iconsManager){
    window.iconsManager = new IconsManager();
  }
  return window.iconsManager;
}

export async function logout() {
  let res = await (new Resource({route: '/logout'})).post();
  redirect(res.location)
}

export function pageReload() {
  document.location.reload(true);
}

const a = { "Ё": "YO", "Й": "I", "Ц": "TS", "У": "U", "К": "K", "Е": "E", "Н": "N", "Г": "G", "Ш": "SH", "Щ": "SCH", "З": "Z", "Х": "H", "Ъ": "'", "ё": "yo", "й": "i", "ц": "ts", "у": "u", "к": "k", "е": "e", "н": "n", "г": "g", "ш": "sh", "щ": "sch", "з": "z", "х": "h", "ъ": "'", "Ф": "F", "Ы": "I", "В": "V", "А": "a", "П": "P", "Р": "R", "О": "O", "Л": "L", "Д": "D", "Ж": "ZH", "Э": "E", "ф": "f", "ы": "i", "в": "v", "а": "a", "п": "p", "р": "r", "о": "o", "л": "l", "д": "d", "ж": "zh", "э": "e", "Я": "Ya", "Ч": "CH", "С": "S", "М": "M", "И": "I", "Т": "T", "Ь": "'", "Б": "B", "Ю": "YU", "я": "ya", "ч": "ch", "с": "s", "м": "m", "и": "i", "т": "t", "ь": "'", "б": "b", "ю": "yu" };

export function transliterate(str) {
  return str.split('').map(function (char) {
    return a[char] || char;
  }).join("");
}

export function titleToName(str) {
  str = transliterate(str);
  return str.toLowerCase().replace(/^\d+/, '').replace(/[^\d\w]/g, '_');
}
