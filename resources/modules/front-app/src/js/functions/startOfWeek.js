import moment from 'moment';
import 'moment/locale/ru';

/**
 * Получить начало месяца
 * @param {Date} date
 * @param {int} weekShift
 * @return {Date}
 */
export default function startOfWeek(date, weekShift = 0) {

  return moment(
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + weekShift * 7
    )
  ).firstDayOfWeek();
}
