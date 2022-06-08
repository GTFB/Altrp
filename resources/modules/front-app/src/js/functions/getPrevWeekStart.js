import moment from 'moment';
import 'moment/locale/ru';

/**
 * Начало предыдущей недели
 * @return {moment.Moment}
 */
export default function getPrevWeekStart() {
  let today = moment();
  let daystoLastMonday = today.isoWeekday() - 1 + 7;
  return today.subtract(daystoLastMonday, "days");
}
