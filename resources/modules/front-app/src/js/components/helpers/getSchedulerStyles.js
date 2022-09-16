
import getResponsiveSetting from "../../functions/getResponsiveSetting";
import { borderWidthStyled, sizeStyled, colorPropertyStyled, simplePropertyStyled, dimensionsControllerToStyles, typographicControllerToStyles } from '../../helpers/styles';

const getSchedulerStyles = (settings, id) => {
  let styles = '';

  const switcher_bgc = getResponsiveSetting(settings, 'switcher_bgc', '');

  if (switcher_bgc?.color) {
    styles += `.fc-button {
      background-color: ${switcher_bgc.color} !important;
    }`;
  }

  //state disabled
  const switcher_bgcDisabled = getResponsiveSetting(settings, 'switcher_bgc', '.state-disabled');

  if (switcher_bgcDisabled?.color) {
    styles += `.state-disabled .fc-button {
      background-color: ${switcher_bgcDisabled.color} !important;
    }`;
  }

  //state active
  const switcher_bgcActive = getResponsiveSetting(settings, 'switcher_bgc', '.active');

  if (switcher_bgcActive?.color) {
    styles += `.active .fc-button {
      background-color: ${switcher_bgcActive.color} !important;
    }`;
  }

  const switcherBgcActive = getResponsiveSetting(settings, 'switcher_bgc', ':active');

  if (switcherBgcActive?.color) {
    styles += `.fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active {
      background-color: ${switcherBgcActive.color} !important;
    }`;
  }

  const switcher_bgc_hover = getResponsiveSetting(settings, 'switcher_bgc', ':hover')

  if (switcher_bgc_hover?.color) {
    styles += `.fc-button:hover {
      background-color: ${switcher_bgc_hover.color} !important;
    }`
  }

  const switcherBorderType = getResponsiveSetting(settings, "switcher_border_type", '');
  const switcherBorderWidth = getResponsiveSetting(settings, 'switcher_border_width', '');
  const switcherBorderColor = getResponsiveSetting(settings, 'switcher_border_color', '');

  styles += `.fc .fc-button {
    ${simplePropertyStyled(switcherBorderType, 'border-style')}
    ${borderWidthStyled(switcherBorderWidth)}
    ${colorPropertyStyled(switcherBorderColor, 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography'))}
  }`;

  //state disabled
  const switcherBorderTypeDisabled = getResponsiveSetting(settings, "switcher_border_type", '.state-disabled');
  const switcherBorderWidthDisabled = getResponsiveSetting(settings, 'switcher_border_width', '.state-disabled');
  const switcherBorderColorDisabled = getResponsiveSetting(settings, 'switcher_border_color', '.state-disabled');

  styles += `.state-disabled .fc .fc-button {
    ${simplePropertyStyled(switcherBorderTypeDisabled, 'border-style')}
    ${borderWidthStyled(switcherBorderWidthDisabled)}
    ${colorPropertyStyled(switcherBorderColorDisabled, 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', '.state-disabled'))}
  }`;

  //state active
  const switcherBorderTypeActive = getResponsiveSetting(settings, "switcher_border_type", '.active');
  const switcherBorderWidthActive = getResponsiveSetting(settings, 'switcher_border_width', '.active');
  const switcherBorderColorActive = getResponsiveSetting(settings, 'switcher_border_color', '.active');

  styles += `.active .fc .fc-button {
    ${simplePropertyStyled(switcherBorderTypeActive, 'border-style')}
    ${borderWidthStyled(switcherBorderWidthActive)}
    ${colorPropertyStyled(switcherBorderColorActive, 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', '.active'))}
  }`;

  const switcherHoverBorderColor = getResponsiveSetting(settings, 'switcher_border_color', ':hover');

  styles += `.fc .fc-button:hover {
    ${simplePropertyStyled(getResponsiveSetting(settings, 'switcher_border_type', ':hover'), 'border-style')}
    ${borderWidthStyled(getResponsiveSetting(settings, 'switcher_border_width', ':hover'))}
    ${colorPropertyStyled(switcherHoverBorderColor, 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', ':hover'))}
  }`;

  const toolbarTitleColor = getResponsiveSetting(settings, 'toolbar_title_color', '');

  styles += `.fc-toolbar-title {
    ${colorPropertyStyled(toolbarTitleColor, 'color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography'))}
  }`;

  //state disabled
  const toolbarTitleColorDisabled = getResponsiveSetting(settings, 'toolbar_title_color', '.state-disabled');

  styles += `.state-disabled .fc-toolbar-title {
    ${colorPropertyStyled(toolbarTitleColorDisabled, 'color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography', '.state-disabled'))}
  }`;

  //state active
  const toolbarTitleColorActive = getResponsiveSetting(settings, 'toolbar_title_color', '.active');

  styles += `.active .fc-toolbar-title {
    ${colorPropertyStyled(toolbarTitleColorActive, 'color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography', '.active'))}
  }`;

  styles += `.fc-toolbar-title:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'toolbar_title_color', ':hover'), 'color')}
  }`;

  // styles += `.fc-theme-standard .fc-scrollgrid {
  //     ${simplePropertyStyled( getResponsiveSetting(settings, 'table_border_type') , 'border-style')}
  //     ${borderWidthStyled( getResponsiveSetting(settings, 'table_border_width') )}
  //     ${colorPropertyStyled( getResponsiveSetting(settings, 'table_border_color') , 'border-color')}
  //     ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'table_border_radius') , "border-radius")}
  // }`

  const tableBorderColor = colorPropertyStyled(getResponsiveSetting(settings, 'table_border_color', ''), 'border-color');

  styles += `.fc-theme-standard .fc-scrollgrid {
    ${tableBorderColor}
  }`;

  styles += `.fc-theme-standard td, .fc-theme-standard th {
    ${tableBorderColor}
  }`

  //state disabled
  const tableBorderColorDisabled = colorPropertyStyled(
    getResponsiveSetting(settings, 'table_border_color', '.state-disabled'),
    'border-color'
  );

  styles += `.state-disabled .fc-theme-standard .fc-scrollgrid {
    ${tableBorderColorDisabled}
  }`;

  styles += `.state-disabled .fc-theme-standard td, .fc-theme-standard th {
    ${tableBorderColorDisabled}
  }`;

  //state active
  const tableBorderColorActive = colorPropertyStyled(
    getResponsiveSetting(settings, 'table_border_color', '.active'),
    'border-color'
  );

  styles += `.active .fc-theme-standard .fc-scrollgrid {
    ${tableBorderColorActive}
  }`;

  styles += `.active .fc-theme-standard td, .fc-theme-standard th {
    ${tableBorderColorActive}
  }`;

  styles += `.fc-col-header-cell {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', ''), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', ''), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography'))}
  }`;

  //state disabled
  styles += `.state-disabled .fc-col-header-cell {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', '.state-disabled'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', '.state-disabled'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', '.state-disabled'))}
  }`;

  //state active
  styles += `.active .fc-col-header-cell {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', '.active'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', '.active'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', '.active'))}
  }`;

  styles += `.fc-col-header-cell:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', ':hover'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', ':hover'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', ':hover'))}
  }`;

  styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', ''), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', ''), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography'))}
  }`;

  //state disabled
  styles += `.state-disabled .fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', '.state-disabled'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', '.state-disabled'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', '.state-disabled'))}
  }`;

  //state active
  styles += `.active .fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', '.active'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', '.active'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', '.active'))}
  }`;

  styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today):hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', ':hover'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', ':hover'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', ':hover'))}
  }`


  styles += `.fc-day-other {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', ''), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', ''), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography'))}
  }`;

  //state disabled
  styles += `.state-disabled .fc-day-other {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', '.state-disabled'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', '.state-disabled'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', '.state-disabled'))}
  }`;

  //state active
  styles += `.active .fc-day-other {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', '.active'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', '.active'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', '.active'))}
  }`;

  styles += `.fc-day-other:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', ':hover'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', ':hover'), 'background-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', ':hover'))}
  }`;

  styles += `.fc-day-today {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', ''), 'color')}`;

  const currentCellBackgroundColorSetting = getResponsiveSetting(settings, 'current_cell_background-color', '');

  if (currentCellBackgroundColorSetting?.color) {
    styles += `background-color: ${currentCellBackgroundColorSetting.color} !important;`;
  }

  styles += `${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography'))}};`;

  //state disabled
  styles += `.state-disabled .fc-day-today {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', '.state-disabled'), 'color')}`;

  const disabledCurrentCellBackgroundColorSetting = getResponsiveSetting(settings, 'current_cell_background-color', '.state-disabled');

  if (disabledCurrentCellBackgroundColorSetting?.color) {
    styles += `background-color: ${disabledCurrentCellBackgroundColorSetting.color} !important;`;
  }

  styles += `${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', '.state-disabled'))}}`;

  //state active
  styles += `.active .fc-day-today {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', '.active'), 'color')}`;

  const activeCurrentCellBackgroundColorSetting = getResponsiveSetting(settings, 'current_cell_background-color', '.active');

  if (activeCurrentCellBackgroundColorSetting?.color) {
    styles += `background-color: ${activeCurrentCellBackgroundColorSetting.color} !important;`;
  }

  styles += `${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', '.active'))}}`;

  styles += `.fc-day-today:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', ':hover'), 'color')}`;

  const hoverCurrentCellBackgroundColorSetting = getResponsiveSetting(settings, 'current_cell_background-color', ':hover');

  if (hoverCurrentCellBackgroundColorSetting?.color) {
    styles += `background-color: ${hoverCurrentCellBackgroundColorSetting.color} !important;`;
  }

  styles += `${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', ':hover'))}}`;

  styles += `.fc-event {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', ''), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', ''), 'background-color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', ''), 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography'))}
    ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type'), 'border-style')}
    ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', ''))}
    ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', ''), 'border-radius')}
  }`;

  //state disabled
  styles += `.state-disabled .fc-event {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', '.state-disabled'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', '.state-disabled'), 'background-color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', '.state-disabled'), 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', '.state-disabled'))}
    ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', '.state-disabled'), 'border-style')}
    ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', '.state-disabled'))}
    ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', '.state-disabled'), 'border-radius')}
  }`;

  //state active
  styles += `.active .fc-event {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', '.active'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', '.active'), 'background-color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', '.active'), 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', '.active'))}
    ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', '.active'), 'border-style')}
    ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', '.active'))}
    ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', '.active'), 'border-radius')}
  }`;

  styles += `.fc-event:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', ':hover'), 'color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', ':hover'), 'background-color')}
    ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', ':hover'), 'border-color')}
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', ':hover'))}
    ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', ':hover'), 'border-style')}
    ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', ':hover'))}
    ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', ':hover'), "border-radius")}
  }`;

  return styles;
}

export default getSchedulerStyles;
