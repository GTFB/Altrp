import isUndefined from "lodash/isUndefined";

const a = {
  Ё: "Yo",
  Й: "I",
  Ц: "Ts",
  У: "U",
  К: "K",
  Е: "E",
  Н: "N",
  Г: "G",
  Ш: "Sh",
  Щ: "Sch",
  З: "Z",
  Х: "KH",
  Ъ: "",
  ё: "yo",
  й: "i",
  ц: "ts",
  у: "u",
  к: "k",
  е: "e",
  н: "n",
  г: "g",
  ш: "sh",
  щ: "sch",
  з: "z",
  х: "kh",
  ъ: "",
  Ф: "F",
  Ы: "I",
  В: "V",
  А: "a",
  П: "P",
  Р: "R",
  О: "O",
  Л: "L",
  Д: "D",
  Ж: "Zh",
  Э: "E",
  ф: "f",
  ы: "i",
  в: "v",
  а: "a",
  п: "p",
  р: "r",
  о: "o",
  л: "l",
  д: "d",
  ж: "zh",
  э: "e",
  Я: "Ya",
  Ч: "Ch",
  С: "S",
  М: "M",
  И: "I",
  Т: "T",
  Ь: "",
  Б: "B",
  Ю: "Yu",
  я: "ya",
  ч: "ch",
  с: "s",
  м: "m",
  и: "i",
  т: "t",
  ь: "",
  б: "b",
  ю: "yu",
};

/**
 * Транслитерация
 * @param {string}str
 * @return {string}
 */
export default function transliterate(str) {
  if (!str) {
    return "";
  }
  return str
    .split("")
    .map(function (char) {
      return isUndefined(a[char]) ? char : a[char];
    })
    .join("").replace(/(?!\w)[\x00-\xC0]/g, '_');
}
