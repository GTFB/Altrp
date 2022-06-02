import parseURLTemplate from "./parseURLTemplate";

/**
 * Подготавливает URL для шаблона письма
 * @param {string} url
 * @param {{} | null} context
 * @return {string}
 */
export default function prepareURLForEmail(url, context = null) {
  if (!_.isString(url) || !url) {
    return url;
  }
  url = url.trim();
  if (url.indexOf("http") !== 0) {
    url = location.origin + url;
  }
  return parseURLTemplate(url, context);
}
