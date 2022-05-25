import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";
import replaceContentWithData from "./replaceContentWithData";
import getDataByPath from "./getDataByPath";

/**
 * Парсим данный из строки в объект, если значение - путь, то берем значение из context
 * (если в context нет свойства, то не записываем)
 * @param {string} string
 * @param {AltrpModel} context
 * @param {boolean} allowObject
 * @param {boolean} replaceRight - нужно ли подставлять в значение параметра данные или оставить сырой шаблон
 * @param {boolean} replace - нужно ли подставлять в значение параметра данные или оставить сырой шаблон
 * @return {{}}
 */
export default function parseParamsFromString(
  string,
  context = {},
  allowObject = false,
  replaceRight = true,
  replace = true,
) {
  if (!(context instanceof AltrpModel)) {
    context = new AltrpModel(context);
  }
  const params = {};
  const urlParams =
    window.currentRouterMatch instanceof AltrpModel
      ? window.currentRouterMatch.getProperty("params")
      : {};

  if (!string) {
    return params;
  }
  const lines = string.split("\n");
  lines.forEach(line => {
    let [left, right] = line.split("|");
    if (!left || !right) {
      return;
    }
    left = left.trim();
    right = right.trim();
    if (replace && left.indexOf("{{") !== -1) {
      left = replaceContentWithData(left);
    }
    if (replace && right.match(/{{([\s\S]+?)(?=}})/g)) {
      if (
        context.getProperty(
          right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
        ) ||
        getDataByPath(right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", ""))
      ) {
        //todo ошибка в IOS
        params[left] =
          context.getProperty(
            right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
          ) ||
          getDataByPath(
            right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
          ) ||
          "";
      } else {
        replaceRight
          ? (params[left] = urlParams[
            right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
            ]
            ? urlParams[
              right.match(/{{([\s\S]+?)(?=}})/g)[0].replace("{{", "")
              ]
            : "")
          : (params[left] = right);
      }
    } else {
      params[left] = right;
    }
    if (!allowObject && _.isObject(params[left])) {
      delete params[left];
    }
  });
  return params;
}
