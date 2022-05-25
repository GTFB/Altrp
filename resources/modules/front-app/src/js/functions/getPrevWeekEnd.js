import getPrevWeekStart from "./getPrevWeekStart";

/**
 * Конец предыдущей недели
 * @return {moment.Moment}
 */
export default function getPrevWeekEnd() {
  let lastMonday = getPrevWeekStart();
  return lastMonday.add("days", 6);
}
