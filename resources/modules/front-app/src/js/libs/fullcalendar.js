import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';


window.altrpLibs = window.altrpLibs || {};
window.altrpLibs.fullCalendar = window.altrpLibs.fullCalendar || {};
window.altrpLibs.fullCalendar.FullCalendar = FullCalendar;
window.altrpLibs.fullCalendar.dayGridPlugin = dayGridPlugin;
window.altrpLibs.fullCalendar.timeGridPlugin = timeGridPlugin;
window.altrpLibs.fullCalendar.interaction = interaction;