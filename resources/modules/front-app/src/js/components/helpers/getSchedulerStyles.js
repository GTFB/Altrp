import { getResponsiveSetting } from '../../helpers';
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
        border: solid #ddd 1px;
        width: 100%;
        height: 40px;
        padding: 4px;
        padding-left: 7px;
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

    const switcher_bgc = getResponsiveSetting(settings, 'switcher_bgc')

    styles += `.fc-button {
        background-color: ${switcher_bgc?.color} !important;
    }`

    const switcherBgcActive = getResponsiveSetting(settings, 'switcher_bgc', 'active')

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

    const switcherBorderType = getResponsiveSetting(settings, "switcher_border_type");
    const switcherBorderWidth = getResponsiveSetting(settings, 'switcher_border_width')
    const switcherBorderColor = getResponsiveSetting(settings, 'switcher_border_color')

    styles += `.fc .fc-button {
        ${simplePropertyStyled(switcherBorderType, 'border-style')}
        ${borderWidthStyled(switcherBorderWidth)}
        ${colorPropertyStyled(switcherBorderColor, 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography'))}
    }`

    const switcherHoverBorderColor = getResponsiveSetting(settings, 'switcher_border_color', ':hover')

    styles += `.fc .fc-button:hover {
        ${simplePropertyStyled( getResponsiveSetting(settings, 'switcher_border_type', ':hover') , 'border-style')}
        ${borderWidthStyled( getResponsiveSetting(settings, 'switcher_border_width', ':hover') )}
        ${colorPropertyStyled( switcherHoverBorderColor , 'border-color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'switcher_typography', ':hover'))}
    }`

    const toolbarTitleColor = getResponsiveSetting(settings, 'toolbar_title_color')

    styles += `.fc-toolbar-title {
        ${colorPropertyStyled(toolbarTitleColor, 'color')}
        ${typographicControllerToStyles(getResponsiveSetting(settings, 'toolbar_title_typography'))}
    }`

    styles += `.fc-toolbar-title:hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'toolbar_title_color', ':hover') , 'color')}
    }`

    // styles += `.fc-theme-standard .fc-scrollgrid {
    //     ${simplePropertyStyled( getResponsiveSetting(settings, 'table_border_type') , 'border-style')}
    //     ${borderWidthStyled( getResponsiveSetting(settings, 'table_border_width') )}
    //     ${colorPropertyStyled( getResponsiveSetting(settings, 'table_border_color') , 'border-color')}
    //     ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'table_border_radius') , "border-radius")}
    // }`

    styles += `.fc-theme-standard .fc-scrollgrid {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'table_border_color') , 'border-color')}
    }`

    styles += `.fc-theme-standard td, .fc-theme-standard th {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'table_border_color') , 'border-color')}
    }`

    styles += `.fc-col-header-cell {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'header_cell_color') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'header_cell_background-color') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'header_cell_typography') )}
    }`
    styles += `.fc-col-header-cell:hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'header_cell_color', ':hover') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'header_cell_background-color', ':hover') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'header_cell_typography', ':hover') )}
    }`


    styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today) {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'active_cell_color') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'active_cell_background-color') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'active_cell_typography') )}
    }`
    styles += `.fc-daygrid-day:not(.fc-day-other):not(.fc-day-today):hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'active_cell_color', ':hover') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'active_cell_background-color', ':hover') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'active_cell_typography', ':hover') )}
    }`

    
    styles += `.fc-day-other {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'muted_cell_color') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'muted_cell_background-color') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'muted_cell_typography') )}
    }`
    styles += `.fc-day-other:hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'muted_cell_color', ':hover') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'muted_cell_background-color', ':hover') , 'background-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'muted_cell_typography', ':hover') )}
    }`


    styles += `.fc-day-today {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'current_cell_color') , 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color')?.color } !important;
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'current_cell_typography') )}
    }`
    styles += `.fc-day-today:hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'current_cell_color', ':hover') , 'color')}
        background-color: ${getResponsiveSetting(settings, 'current_cell_background-color', ':hover')?.color } !important;
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'current_cell_typography', ':hover') )}
    }`

    styles += `.fc-event {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_color') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_background-color') , 'background-color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_border_color') , 'border-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'event_typography') )}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'event_border_type') , 'border-style')}
        ${borderWidthStyled( getResponsiveSetting(settings, 'event_border_width') )}
        ${sizeStyled( getResponsiveSetting(settings, 'event_border_radius') , "border-radius")}
    }`
    styles += `.fc-event:hover {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_color', ':hover') , 'color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_background-color', ':hover') , 'background-color')}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'event_border_color', ':hover') , 'border-color')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'event_typography', ':hover') )}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'event_border_type', ':hover') , 'border-style')}
        ${borderWidthStyled( getResponsiveSetting(settings, 'event_border_width', ':hover') )}
        ${sizeStyled( getResponsiveSetting(settings, 'event_border_radius', ':hover') , "border-radius")}
    }`
    
    return styles;
}

export default getSchedulerStyles;
