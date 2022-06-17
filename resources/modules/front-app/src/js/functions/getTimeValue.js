import  startOfMonth from "./startOfMonth";
import  startOfYear from "./startOfYear";
import moment from 'moment';

/**
 * Получить какое-то время по шаблону `YYYY-MM-DD`
 * @param {string} path
 * @param {string | null} defaultValue
 */
export default function getTimeValue(path, defaultValue = null) {
  let value = defaultValue;

  switch (path) {
    case "now":
    {
      value = _.now();
    }
      break;
    case "month_start":
    {
      value = startOfMonth(new Date());
    }
      break;
    case "prev_month_start":
    {
      value = startOfMonth(new Date(), -1);
    }
      break;
    case "year_start":
    {
      value = startOfYear(new Date());
    }
      break;
    case "prev_year_start":
    {
      value = startOfYear(new Date(), -1);
    }
      break;
    case "prev_week_start":
    {
      value = getPrevWeekStart();
    }
      break;
    case "next_week_start":
    {
      value = getNextWeekStart();
    }
      break;
    case "week_start":
    {
      value = getWeekStart();
    }
      break;
  }
  value = moment(value).format("YYYY-MM-DD");
  return value;
}
