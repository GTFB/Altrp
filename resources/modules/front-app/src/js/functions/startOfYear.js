

/**
 * Получить начало месяца
 * @param {Date} date
 * @param {int} yearShift
 * @return {Date}
 */
export default function startOfYear(date, yearShift = 0) {
  return new Date(date.getFullYear() + yearShift, 0, 1);
}
