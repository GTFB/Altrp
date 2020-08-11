/** @function getDateFormat
  * @param {string} type тип поля where_date
  * @return {string} формат отображаемых данных
 */
export function getDatePickerFormat(type) {
  switch (type) {
    case 'datetime':
      return "yyyy/MM/dd h:mm:ss";
    case 'date':
      return "yyyy/MM/dd";
    case 'time':
      return "h:mm:ss";
    case 'day':
      return "dd";
    case 'month':
      return "MM";
    case 'year':
      return "yyyy";

    default:
      return "yyyy";
  }
}

/** @function getDateFormat
 * Функция схожа с getDateFormat, с тем различием
 что moment запрашивает дату в формате DD - заглавные буквы
 * @param {string} type - тип поля where_date
 * @return {string | undefined} формат строки, получаемой из объекта Date
 */
export function getMomentFormat(type) {
  switch (type) {
    case 'datetime':
      return "YYYY/MM/DD H:mm:ss";
    case 'date':
      return "YYYY/MM/DD";
    case 'time':
      return "H:mm:ss";
    case 'day':
      return "DD";
    case 'month':
      return "MM";
    case 'year':
      return "YYYY";

    default:
      return "YYYY";
  }
}