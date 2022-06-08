/**
 * Сохранить данные в localStorage
 * @param {string} name
 * @param {*} data
 * @return {boolean}
 */
export default function saveDataToLocalStorage(name, data) {
  if (!name) {
    return false;
  }
  if (_.isObject(data)) {
    data = JSON.stringify(data);
  }
  try {
    localStorage.setItem(name, data);
  } catch (e) {
    return true;
  }
  return true;
}
