import getNextWeekStart from "./getNextWeekStart";

/**
 * Конец Следующей недели
 * @return {moment.Moment}
 */
export default function getNextWeekEnd() {
  let nextMonday = getNextWeekStart();
  return nextMonday.add("days", 6);
}
