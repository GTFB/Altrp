import extractPathFromString from "./extractPathFromString";
import getDataByPath from "./getDataByPath";

/**
 * Парсит стрку вводимую пользователем для опций селекта
 * @param string
 */
export default function parseOptionsFromSettings(string) {
  if (!string) {
    return [];
  }
  let options = string.split("\n");
  let path = extractPathFromString(string);
  let _optionsFromData = getDataByPath(path);
  if (_.isArray(_optionsFromData)) {
    return _optionsFromData;
  }
  options = options.map(option => {
    let value = option.split("|")[0];
    value = value.trim();
    let valuePath = extractPathFromString(value);
    if (valuePath) {
      value = getDataByPath(valuePath);
    }
    if(value !== '' && ! Number.isNaN(Number(value))){
      value = Number(value);
    }
    let label = option.split("|")[1] || value || "";
    _.isNumber(label) && (label += "")
    !_.isString(label) && (label = "");
    label = label.trim();
    let labelPath = extractPathFromString(label);
    if (labelPath) {
      label = getDataByPath(labelPath);
    }
    return {
      value,
      label
    };
  });
  return options;
}
