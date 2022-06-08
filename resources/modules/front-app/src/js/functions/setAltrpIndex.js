import AltrpModel from "../../../../editor/src/js/classes/AltrpModel";

/**
 * Добавляем свойство altrpIndex для всех эементов-объектов массива
 * для их идентификации внутри повторяющихся карточек
 * @param {[]} array
 */
export default function setAltrpIndex(array = []) {
  if (!_.isArray(array)) {
    return;
  }
  array.forEach((item, idx) => {
    if (!_.isObject(item)) {
      return;
    }
    if (item instanceof AltrpModel) {
      item.setProperty("altrpIndex", idx);
      return;
    }
    item.altrpIndex = idx;
  });
}
