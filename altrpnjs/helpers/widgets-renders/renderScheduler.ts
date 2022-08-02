import getResponsiveSetting from '../getResponsiveSetting';
import moment from 'moment';

export default function renderScheduler(settings, device) {
  const lang = getResponsiveSetting(settings, 'lang', device, 'en-gb');
  const date = new Date();
  const daysInMonth: number = moment().daysInMonth();
  const timeformat: Intl.DateTimeFormatOptions = {
    month: 'long',
  };
  let arrayDates: number[] = [];
  for (let i = 1; i <= daysInMonth; i++) {
    arrayDates.push(i);
  }
  const titleDate =
    date.toLocaleString(lang, timeformat) + ' ' + date.getFullYear() + (lang === 'ru' ? ' г.' : '');
  const ariaLabelDate =
    date.toLocaleString(lang, timeformat) +
    (lang === 'ru' ? 'a' : '') +
    ' ' +
    date.getFullYear() +
    (lang === 'ru' ? ' г.' : '');

  const getDataDate = () => {
    let pad = function (num) {
      return ('0' + num).slice(-2);
    };
    let date: any = new Date();
    date = date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate());
    return date;
  };

  return `<div class="popup-wrapper">
             <div class="fc fc-media-screen fc-direction-ltr fc-theme-standard">
                 <div class="fc-header-toolbar fc-toolbar fc-toolbar-ltr">
                    <div class="fc-toolbar-chunk">
                        <div class="fc-button-group">
                            <button type="button" title="${
                              lang === 'ru' ? 'Пред' : 'Previous month'
                            }" aria-pressed="false" class="fc-prev-button fc-button fc-button-primary">
                               <span class="fc-icon fc-icon-chevron-left"></span></button>
                            <button type="button" title="${
                              lang === 'ru' ? 'След' : 'Next month'
                            }" aria-pressed="false" class="fc-next-button fc-button fc-button-primary">
                               <span class="fc-icon fc-icon-chevron-right"></span>
                            </button>
                        </div>
                    </div>
                    <div class="fc-toolbar-chunk">
                       <h2 class="fc-toolbar-title" id="fc-dom-86">${titleDate}</h2>
                    </div>
                    <div class="fc-toolbar-chunk">
                       <div class="fc-button-group">
                          <button type="button" title="${
                            lang === 'ru' ? 'День' : 'day view'
                          }" aria-pressed="false" class="fc-timeGridDay-button fc-button fc-button-primary">${
    lang === 'ru' ? 'День' : 'day'
  }</button>
                          <button type="button" title="${
                            lang === 'ru' ? 'Неделя' : 'week view'
                          }" aria-pressed="false" class="fc-timeGridWeek-button fc-button fc-button-primary">${
    lang === 'ru' ? 'Неделя' : 'week'
  }</button>
                          <button type="button" title="${
                            lang === 'ru' ? 'Месяц' : 'month view'
                          }" aria-pressed="true" class="fc-dayGridMonth-button fc-button fc-button-primary fc-button-active">${
    lang === 'ru' ? 'Месяц' : 'month'
  }</button>
                       </div>
                    </div>
                 </div>
                 <div aria-labelledby="fc-dom-86" class="fc-view-harness fc-view-harness-active" style="height: 1051.85px;">
                    <div class="fc-daygrid fc-dayGridMonth-view fc-view">
                      <table role="grid" class="fc-scrollgrid  fc-scrollgrid-liquid">
                         <thead role="rowgroup">
                           <tr role="presentation" class="fc-scrollgrid-section fc-scrollgrid-section-header ">
                             <th role="presentation">
                               <div class="fc-scroller-harness">
                                 <div class="fc-scroller" style="overflow: hidden;">
                                   <table role="presentation" class="fc-col-header " style="width: 1418px;">
                                     <colgroup></colgroup>
                                     <thead role="presentation">
                                         <tr role="row">
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-mon">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'понедельник' : 'Monday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'пн' : 'Mon'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-tue">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'вторник' : 'Tuesday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'вт' : 'Tue'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-wed">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'среда' : 'Wednesday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'ср' : 'Wed'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-thu">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'четверг' : 'Thursday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'чт' : 'Thu'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-fri">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'пятница' : 'Friday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'пт' : 'Fri'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-sat">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'суббота' : 'Saturday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'сб' : 'Sat'
  }</a>
                                             </div>
                                           </th>
                                           <th role="columnheader" class="fc-col-header-cell fc-day fc-day-sun">
                                             <div class="fc-scrollgrid-sync-inner">
                                               <a aria-label="${
                                                 lang === 'ru' ? 'воскресенье' : 'Sunday'
                                               }" class="fc-col-header-cell-cushion ">${
    lang === 'ru' ? 'вс' : 'Sun'
  }</a>
                                             </div>
                                           </th>
                                         </tr>
                                     </thead>
                                   </table>
                                 </div>
                               </div>
                             </th>
                           </tr>
                         </thead>
                         <tbody role="rowgroup">
                            <tr role="presentation" class="fc-scrollgrid-section fc-scrollgrid-section-body  fc-scrollgrid-section-liquid">
                              <td role="presentation">
                                <div class="fc-scroller-harness fc-scroller-harness-liquid">
                                  <div class="fc-scroller fc-scroller-liquid-absolute" style="overflow: hidden auto;">
                                    <div class="fc-daygrid-body fc-daygrid-body-unbalanced " style="width: 1418px;">
                                      <table role="presentation" class="fc-scrollgrid-sync-table" style="width: 1418px; height: 1025px;">
                                        <colgroup></colgroup>
                                        <tbody role="presentation">
                                          <tr role="row">
                                            ${arrayDates
                                              .filter((_, idx) => idx + 1 <= 7)
                                              .map((number) => {
                                                return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                              })
                                              .join(' ')}
                                          </tr>
                                          <tr role="row">
                                            ${arrayDates
                                              .filter((_, idx) => idx + 1 > 7 && idx + 1 <= 14)
                                              .map((number) => {
                                                return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                              })
                                              .join(' ')}
                                          </tr>
                                          <tr role="row">
                                            ${arrayDates
                                              .filter((_, idx) => idx + 1 > 14 && idx + 1 <= 21)
                                              .map((number) => {
                                                return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                              })
                                              .join(' ')}
                                          </tr>
                                          <tr role="row">
                                             ${arrayDates
                                               .filter((_, idx) => idx + 1 > 21 && idx + 1 <= 28)
                                               .map((number) => {
                                                 return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                               })
                                               .join(' ')}
                                          </tr>
                                          <tr role="row">
                                             ${arrayDates
                                               .filter((_, idx) => idx + 1 > 28 && idx + 1 <= 35)
                                               .map((number) => {
                                                 return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                               })
                                               .join(' ')}
                                          </tr>
                                          <tr role="row">
                                            ${arrayDates
                                              .filter((_, idx) => idx + 1 > 35 && idx + 1 <= 42)
                                              .map((number) => {
                                                return `<td role="gridcell" class="fc-daygrid-day fc-day fc-day-mon fc-day-future fc-day-other" data-date="${getDataDate()}" aria-labelledby="fc-dom-548">
                                                   <div class="fc-daygrid-day-frame fc-scrollgrid-sync-inner">
                                                      <div class="fc-daygrid-day-top">
                                                         <a id="fc-dom-548" class="fc-daygrid-day-number" aria-label="${
                                                           number + ' ' + ariaLabelDate
                                                         }">${number}</a>
                                                      </div>
                                                      <div class="fc-daygrid-day-events">
                                                        <div class="fc-daygrid-day-bottom" style="margin-top: 0;"></div>
                                                      </div>
                                                      <div class="fc-daygrid-day-bg"></div>
                                                   </div>
                                                </td>`;
                                              })
                                              .join(' ')}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                         </tbody>
                      </table>
                    </div>
                 </div>
             </div>
           </div>`;
}
