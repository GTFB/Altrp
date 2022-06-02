import getDataByPath from "./getDataByPath";
import altrpCompare from "./altrpCompare";

/**
 * Функция для проверки одного условия
 * @param c
 * @param {AltrpModel} model
 * @param {boolean} dataByPath - брать ли данный из getDataByPath
 * @return {boolean}
 */
export default function conditionChecker(c, model, dataByPath = true) {
  let result = 0;
  const { operator } = c;
  let { modelField: left, value } = c;
  if (dataByPath) {
    value = getDataByPath(value, "", model, true);
    left = getDataByPath(left, "", model);
    return altrpCompare(left, value, operator);
  }
  return altrpCompare(model.getProperty(left), value, operator);
}
