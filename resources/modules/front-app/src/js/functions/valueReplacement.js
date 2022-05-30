/**
 * Заменяет false, null, true в строке на соответствующие значения
 * @param {string} value
 * @return {*}
 */
export default function valueReplacement(value) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
  }
  return value;
}
