/**
 *
 * Определеят явлется ли строка валидным JSON
 * @param {string} JSONString
 * @return {boolean}
 */
export default function isJSON(JSONString = "") {
  try {
    JSON.parse(JSONString);
    return true;
  } catch (error) {
    return false;
  }
}
