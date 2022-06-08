import moment from 'moment';
import 'moment/locale/ru';

/**
 * Начало следующей недели
 * @return {moment.Moment}
 */
export default function getNextWeekStart() {
  let today = moment();
  let daystoMonday = 7 - (today.isoWeekday() - 1);
  return today.add(daystoMonday, "days");
}
