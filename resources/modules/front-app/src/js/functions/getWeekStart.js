import moment from 'moment';
import 'moment/locale/ru';

/**
 * Начало текущей недели
 * @return {moment.Moment}
 */
export default function getWeekStart() {
  let today = moment();
  let daystoMonday = today.isoWeekday() - 1;
  return today.subtract(daystoMonday, "days");
}
