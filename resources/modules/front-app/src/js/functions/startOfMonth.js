/**
 * Получить начало месяца
 * @param {Date} date
 * @param {int} monthShift
 * @return {Date}
 */
export default function startOfMonth(date, monthShift = 0) {
  return new Date(date.getFullYear(), date.getMonth() + monthShift, 1);
}
