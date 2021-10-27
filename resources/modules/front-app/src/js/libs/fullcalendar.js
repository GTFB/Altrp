import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru'
import enLocale from '@fullcalendar/core/locales/en-gb'


window.altrpLibs = window.altrpLibs || {};
window.altrpLibs.fullCalendar = window.altrpLibs.fullCalendar || {};
window.altrpLibs.fullCalendar.FullCalendar = FullCalendar;
window.altrpLibs.fullCalendar.dayGridPlugin = dayGridPlugin;
window.altrpLibs.fullCalendar.timeGridPlugin = timeGridPlugin;
window.altrpLibs.fullCalendar.interaction = interaction;
window.altrpLibs.fullCalendar.locales = window.altrpLibs.fullCalendar.locales || {};
window.altrpLibs.fullCalendar.locales.ru = ruLocale;
window.altrpLibs.fullCalendar.locales['en-gb'] = enLocale;