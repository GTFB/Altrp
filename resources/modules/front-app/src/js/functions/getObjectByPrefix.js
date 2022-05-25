/**
 * Возвращает новый объект из свояств объекта, в именах которых присутствует префикс prefix
 * @param {string} prefix - строка для поиска (например 'test')
 * @param {{}} object - если в объекте есть свойство test__test то вернет {test: test__test_value}
 * @return {{}}
 */
export default function getObjectByPrefix(prefix = "", object = {}) {
  let result = {};
  if (!prefix) {
    return result;
  }
  _.forEach(object, (value, key) => {
    if (key.indexOf(`${prefix}__`, "") === 0) {
      result[key.replace(`${prefix}__`, "")] = value;
    }
  });
  return result;
}
