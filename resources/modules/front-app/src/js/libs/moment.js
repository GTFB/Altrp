import momentModule from 'moment';
import 'moment/locale/ru';
window.altrpHelpers = window.altrpHelpers || {};
window.altrpHelpers.moment = momentModule;
window.altrpHelpers.moment.locale('ru');
window.altrpHelpers.moment.updateLocale('ru', {
  week: {
    dow: 1,
  }
});
