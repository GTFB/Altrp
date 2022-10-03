import conditionChecker from "./conditionChecker";
import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

/**
 * Функция для проверки условий
 * @param {array} conditions
 * @param {boolean} AND - логичекое И или ИЛИ
 * @param {AltrpModel} model
 * @param {boolean} dataByPath - брать ли данные из getDataByPath
 * @return {boolean}
 */
export default function conditionsChecker(
  conditions = [],
  AND = true,
  model,
  dataByPath = true
) {
  if(! (model instanceof AltrpModel)){
    model = new AltrpModel(model)
  }
  if (!conditions.length) {
    return true;
  }
  let result = AND;
  _.each(conditions, c => {
    if (AND) {
      result *= conditionChecker(c, model, dataByPath);
    } else {
      result += conditionChecker(c, model, dataByPath);
    }
  });
  return !!result;
}
