/**
 * Возвращает объект из json-строки если возможно
 * @param {string} string
 * @param {*} _default
 * @return {*}
 */
export default function mbParseJSON(string, _default: any = null) {
  try {
    return JSON.parse(string);
  } catch (e) {
    return _default === null ? string : _default;
  }
}
