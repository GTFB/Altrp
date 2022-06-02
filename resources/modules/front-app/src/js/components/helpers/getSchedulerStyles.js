
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";
import { borderWidthStyled, sizeStyled, colorPropertyStyled, simplePropertyStyled, dimensionsControllerToStyles, typographicControllerToStyles } from '../../helpers/styles';

const getSchedulerStyles = (settings, id) => {
  let styles = ''
  styles += `.popup {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
        width: 800px;
        max-width: 100%;
        background-color: white;
        z-index: 999;
        border: solid #ddd 1px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }`

  styles += ` .popup-wrapper {
        position: relative;
    }`

  styles += ` .popup__body {
        padding: 20px;
    }`

  styles += `.popup__text-field {
        font-size: 14px;
        margin-bottom: 8px;
    }`

  styles += `.bp3-input {
        height: 40px;
    }`

  styles += ` .popup__actions {
        padding: 16px;
        border-top: solid #ddd 1px;
    }`

  styles += `.popup__field-title {
        font-size: 18px;
        font-weight: 600;
    }`

  styles += `.popup__field-title:not(:first-child) {
        margin-top: 8px
    }`

  styles += `.popup__textarea {
        height: 80px;
    }`

  styles += `.popup__actions .button {
        border: solid #ddd 1px;
        background-color: #fff;
        margin-right: 10px;
        padding: 9px 15px;
        border-radius: 3px;
        font-size: 15px;
    }`

  styles += `.popup__actions .button.button-danger {
        border: none;
        background-color: #e82721;
        color: #fff;
    }`

  styles += `.popup__actions .button.button-danger:hover {
        background-color: #a62219;
    }`


  styles += `.popup__actions input[type="button"]:hover {
        background-color: #fafafa;
    }`

  const switcher_bgc = getResponsiveSetting(settings, 'switcher_bgc', '', {
    color: 'rgba(44, 62, 80, 100)',
    colorPickedHex: '#2C3E50'
  })

  styles += `.fc-button {
        background-color: ${switcher_bgc?.color} !important;
    }`

  //state disabled
  const switcher_bgcDisabled = getResponsiveSetting(settings, 'switcher_bgc', '.state-disabled', {
    color: 'rgba(44, 62, 80, 100)',
    colorPickedHex: '#2C3E50'
  })

  styles += `.state-disabled .fc-button {
        background-color: ${switcher_bgcDisabled?.color} !important;
    }`

  //state active
  const switcher_bgcActive = getResponsiveSetting(settings, 'switcher_bgc', '.active', {
    color: 'rgba(44, 62, 80, 100)',
    colorPickedHex: '#2C3E50'
  })

  styles += `.active .fc-button {
        background-color: ${switcher_bgcActive?.color} !important;
    }`

  const switcherBgcActive = getResponsiveSetting(settings, 'switcher_bgc', ':active', {
    color: 'rgba(44, 62, 80, 100)',
    colorPickedHex: '#2C3E50'
  })

  styles += `.fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active {
        background-color: ${switcherBgcActive?.color} !important;
    }`

  const switcher_bgc_hover = getResponsiveSetting(settings, 'switcher_bgc', ':hover')

  styles += `.fc-button:hover {
        background-color: ${switcher_bgc_hover?.color} !important;
    }`

  styles += `.fc-col-header-cell-cushion {
        color: inherit;
    }`

  styles += `.fc-daygrid-day-number {
        color: inherit;
    }`

  styles += `.fc .fc-day-other .fc-daygrid-day-top {
        opacity: 1;
    }`

  styles += `.fc-h-event .fc-event-main {
        color: inherit;
    }`

  const switcherBorderType = getResponsiveSetting(settings, "switcher_border_type", '', 'solid');
  const switcherBorderWidth = getResponsiveSetting(settings, 'switcher_border_width', '', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  })

  const switcherBorderColor = getResponsiveSetting(settings, 'switcher_border_color', '', {
    color: "rgba(44,62,80,100)",
    colorPickedHex: "#2C3E50"
  })

  styles += `.fc .fc-button {
        ${simplePropertyStyled(switcherBorderType, 'border-style')}
        ${borderWidthStyled(switcherBorderWidth)}
        ${colorPropertyStyled(switcherBorderColor, 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography'))}
    }`

  //state disabled
  const switcherBorderTypeDisabled = getResponsiveSetting(settings, "switcher_border_type", '.state-disabled', 'solid');
  const switcherBorderWidthDisabled = getResponsiveSetting(settings, 'switcher_border_width', '.state-disabled', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  })

  const switcherBorderColorDisabled = getResponsiveSetting(settings, 'switcher_border_color', '.state-disabled', {
    color: "rgba(44,62,80,100)",
    colorPickedHex: "#2C3E50"
  })

  styles += `.state-disabled .fc .fc-button {
        ${simplePropertyStyled(switcherBorderTypeDisabled, 'border-style')}
        ${borderWidthStyled(switcherBorderWidthDisabled)}
        ${colorPropertyStyled(switcherBorderColorDisabled, 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', '.state-disabled'))}
    }`
  //state active
  const switcherBorderTypeActive = getResponsiveSetting(settings, "switcher_border_type", '.active', 'solid');
  const switcherBorderWidthActive = getResponsiveSetting(settings, 'switcher_border_width', '.active', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  })

  const switcherBorderColorActive = getResponsiveSetting(settings, 'switcher_border_color', '.active', {
    color: "rgba(44,62,80,100)",
    colorPickedHex: "#2C3E50"
  })

  styles += `.active .fc .fc-button {
        ${simplePropertyStyled(switcherBorderTypeActive, 'border-style')}
        ${borderWidthStyled(switcherBorderWidthActive)}
        ${colorPropertyStyled(switcherBorderColorActive, 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', '.active'))}
    }`

  const switcherHoverBorderColor = getResponsiveSetting(settings, 'switcher_border_color', ':hover', {
    color: 'rgb(26, 37, 47)',
    colorPickedHex: '#1a252f'
  })

  styles += `.fc .fc-button:hover {
        ${simplePropertyStyled(getResponsiveSetting(settings, 'switcher_border_type', ':hover'), 'border-style')}
        ${borderWidthStyled(getResponsiveSetting(settings, 'switcher_border_width', ':hover'))}
        ${colorPropertyStyled(switcherHoverBorderColor, 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', ':hover'))}
    }`

  const toolbarTitleColor = getResponsiveSetting(settings, 'toolbar_title_color', '', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  })

  styles += `.fc-toolbar-title {
        ${colorPropertyStyled(toolbarTitleColor, 'color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography'))}
    }`

  //state disabled
  const toolbarTitleColorDisabled = getResponsiveSetting(settings, 'toolbar_title_color', '.state-disabled', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  })

  styles += `.state-disabled .fc-toolbar-title {
        ${colorPropertyStyled(toolbarTitleColorDisabled, 'color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography', '.state-disabled'))}
    }`
  //state active
  const toolbarTitleColorActive = getResponsiveSetting(settings, 'toolbar_title_color', '.active', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  })

  styles += `.active .fc-toolbar-title {
        ${colorPropertyStyled(toolbarTitleColorActive, 'color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography', '.active'))}
    }`

  styles += `.fc-toolbar-title:hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'toolbar_title_color', ':hover', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
    }`

  // styles += `.fc-theme-standard .fc-scrollgrid {
  //     ${simplePropertyStyled( getResponsiveSetting(settings, 'table_border_type') , 'border-style')}
  //     ${borderWidthStyled( getResponsiveSetting(settings, 'table_border_width') )}
  //     ${colorPropertyStyled( getResponsiveSetting(settings, 'table_border_color') , 'border-color')}
  //     ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'table_border_radius') , "border-radius")}
  // }`

  const tableBorderColor = colorPropertyStyled(getResponsiveSetting(settings, 'table_border_color', '', {
    color: "rgba(221,221,221,100)",
    colorPickedHex: "#DDDDDD"
  }), 'border-color')

  styles += `.fc-theme-standard .fc-scrollgrid {
        ${tableBorderColor}
    }`

  styles += `.fc-theme-standard td, .fc-theme-standard th {
        ${tableBorderColor}
    }`

  //state disabled
  const tableBorderColorDisabled = colorPropertyStyled(getResponsiveSetting(settings, 'table_border_color', '.state-disabled', {
    color: "rgba(221,221,221,100)",
    colorPickedHex: "#DDDDDD"
  }), 'border-color')

  styles += `.state-disabled .fc-theme-standard .fc-scrollgrid {
        ${tableBorderColorDisabled}
    }`

  styles += `.state-disabled .fc-theme-standard td, .fc-theme-standard th {
        ${tableBorderColorDisabled}
    }`

  //state active
  const tableBorderColorActive = colorPropertyStyled(getResponsiveSetting(settings, 'table_border_color', '.active', {
    color: "rgba(221,221,221,100)",
    colorPickedHex: "#DDDDDD"
  }), 'border-color')

  styles += `.active .fc-theme-standard .fc-scrollgrid {
        ${tableBorderColorActive}
    }`

  styles += `.active .fc-theme-standard td, .fc-theme-standard th {
        ${tableBorderColorActive}
    }`

  styles += `.fc-col-header-cell {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', '', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', '', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography'))}
    }`

  //state disabled
  styles += `.state-disabled .fc-col-header-cell {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', '.state-disabled', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', '.state-disabled', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', '.state-disabled'))}
    }`
  //state active
  styles += `.active .fc-col-header-cell {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', '.active', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', '.active', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', '.active'))}
    }`

  styles += `.fc-col-header-cell:hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_color', ':hover', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'header_cell_background-color', ':hover', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'header_cell_typography', ':hover'))}
    }`

  styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', '', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', '', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography'))}
    }`

  //state disabled
  styles += `.state-disabled .fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', '.state-disabled', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', '.state-disabled', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', '.state-disabled'))}
    }`
  //state active
  styles += `.active .fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', '.active', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', '.active', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', '.active'))}
    }`

  styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today):hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_color', ':hover', {
    color: "rgba(0,0,0,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'active_cell_background-color', ':hover', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'active_cell_typography', ':hover'))}
    }`


  styles += `.fc-day-other {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', '', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', '', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography'))}
    }`

  //state disabled
  styles += `.state-disabled .fc-day-other {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', '.state-disabled', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', '.state-disabled', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', '.state-disabled'))}
    }`
  //state active
  styles += `.active .fc-day-other {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', '.active', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', '.active', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', '.active'))}
    }`

  styles += `.fc-day-other:hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_color', ':hover', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'muted_cell_background-color', ':hover', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  }), 'background-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'muted_cell_typography', ':hover'))}
    }`


  styles += `.fc-day-today {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', '', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color', '', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  })?.color} !important;
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography'))}
    }`

  //state disabled
  styles += `.state-disabled .fc-day-today {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', '.state-disabled', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color', '.state-disabled', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  })?.color} !important;
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', '.state-disabled'))}
    }`
  //state active
  styles += `.active .fc-day-today {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', '.active', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color', '.active', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  })?.color} !important;
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', '.active'))}
    }`


  styles += `.fc-day-today:hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'current_cell_color', ':hover', {
    color: "rgba(34,25,77,100)",
    colorPickedHex: "#F5F5F5"
  }), 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color', ':hover', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#FFFFFF"
  })?.color} !important;
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'current_cell_typography', ':hover'))}
    }`

  styles += `.fc-event {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', '', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', '', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'background-color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', '', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography'))}
        ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type'), 'border-style')}
        ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', '', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  }))}
        ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', '', {
    size: 0,
    unit: 'px',
  }), "border-radius")}
    }`

  //state disabled
  styles += `.state-disabled .fc-event {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', '.state-disabled', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', '.state-disabled', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'background-color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', '.state-disabled', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', '.state-disabled'))}
        ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', '.state-disabled'), 'border-style')}
        ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', '.state-disabled', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  }))}
        ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', '.state-disabled', {
    size: 0,
    unit: 'px',
  }), "border-radius")}
    }`
  //state active
  styles += `.active .fc-event {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', '.active', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', '.active', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'background-color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', '.active', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', '.active'))}
        ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', '.active'), 'border-style')}
        ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', '.active', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  }))}
        ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', '.active', {
    size: 0,
    unit: 'px',
  }), "border-radius")}
    }`

  styles += `.fc-event:hover {
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_color', ':hover', {
    color: "rgba(255,255,255,100)",
    colorPickedHex: "#000000"
  }), 'color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_background-color', ':hover', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'background-color')}
        ${colorPropertyStyled(getResponsiveSetting(settings, 'event_border_color', ':hover', {
    color: "rgba(55,136,216,100)",
    colorPickedHex: "#3788d8"
  }), 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'event_typography', ':hover'))}
        ${simplePropertyStyled(getResponsiveSetting(settings, 'event_border_type', ':hover'), 'border-style')}
        ${borderWidthStyled(getResponsiveSetting(settings, 'event_border_width', ':hover', {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
    unit: "px",
    bind: true
  }))}
        ${sizeStyled(getResponsiveSetting(settings, 'event_border_radius', ':hover', {
    size: 0,
    unit: 'px',
  }), "border-radius")}
    }`

  return styles;
}

export default getSchedulerStyles;
