/**
 * Извелкает путь из строки
 * @param {string} string
 * @return {string}
 */
export default function extractPathFromString(string = "") {
  let path = "";
  if (_.isString(string)) {
    // path = string.match(/(?<={{)([\s\S]+?)(?=}})/g)[0]
    path = _.get(string.match(/{{([\s\S]+?)(?=}})/g), "0", "").replace(
      "{{",
      ""
    );
  }
  return path;
}
