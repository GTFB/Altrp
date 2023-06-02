/**
 * get data from localStorage
 * @param {string} name
 * @param {*} _default
 * @return {*}
 */
export default function getDataFromLocalStorage(name, _default = undefined) {
  if (!name) {
    return _default;
  }
  let value
  try {
    value = localStorage.getItem(name);
    if (!value) {
      return _default;
    }
    value = JSON.parse(value);
  } catch (error) {
  }
  if (_.isString(value) && Number(value)) {
    value = Number(value);
  }
  return value !== null ? value : _default;
}
