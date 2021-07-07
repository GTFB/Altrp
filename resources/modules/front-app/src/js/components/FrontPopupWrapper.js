
import { getResponsiveSetting } from '../helpers';
import { shadowControllerToStyles, dimensionsControllerToStyles } from '../helpers/styles';


const FrontPopupWrapper = window.styled.div`
& .popup-content {
  ${({settings}) => {
    let styles = "";

    if(settings.width_popup_layout && settings.width_popup_layout.size)
    styles += `width: ${settings.width_popup_layout.size} ${settings.width_popup_layout.unit};`;

    return styles;
  }}
}
& .popup-close-button {
  ${({settings}) => {
    let styles = "";
    styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'popup_close_button_padding'));

    if(settings.popup_close_button_height_size && settings.popup_close_button_height_size.size) {
      let {size, unit} = getResponsiveSetting(settings, 'popup_close_button_height_size');
      styles += `height: ${size}${unit};`;
    }

    if(settings.popup_close_button_width_size && settings.popup_close_button_width_size.size) {
      let {size, unit} = getResponsiveSetting(settings, 'popup_close_button_width_size');
      styles += `width: ${size}${unit};`
    }

    if(settings.popup_close_button_border_type) {
      styles += dimensionsControllerToStyles(getResponsiveSetting(settings, "popup_close_button_border_width"), "border");
      styles += `border-style: ${getResponsiveSetting(settings, "popup_close_button_border_type")};`;
      if(settings.popup_close_button_border_color && settings.popup_close_button_border_color.colorPickedHex)
        styles += `border-color: ${getResponsiveSetting(settings, "popup_close_button_border_color.colorPickedHex")};`;
    }
    styles += dimensionsControllerToStyles(getResponsiveSetting(settings, "popup_close_button_border_radius"), "border-radius");
    if(settings.popup_close_button_background_color) {
      styles += `background-color: ${getResponsiveSetting(settings, "popup_close_button_background_color").colorPickedHex} !important;`;
    }

    styles += shadowControllerToStyles(getResponsiveSetting(settings, "popup_close_button_box_shadow"));

    return styles;
  }}
}
& .popup-close-button:hover {
  ${({settings}) => {
    let styles = '';
    let popupCloseButtonPadding = getResponsiveSetting(settings, 'popup_close_button_padding', ':hover');
    styles += popupCloseButtonPadding;
    return styles;
  }}
}
& .popup-close-button-icon {
  ${({settings}) => {
    let styles = '';
    if(settings.popup_close_icon_height_size && settings.popup_close_icon_height_size.size) {
      let {size, unit} = getResponsiveSetting(settings, 'popup_close_icon_height_size');
      styles += `height: ${size}${unit};`
    }
    if(settings.popup_close_icon_width_size && settings.popup_close_icon_width_size.size) {
      let {size, unit} = getResponsiveSetting(settings, 'popup_close_icon_width_size');
      styles += `width: ${size}${unit};`
    }
    return styles;
  }}
}
& .altrp-offcanvas {
  ${({settings}) => {
    let styles ='';
    if(settings.time_offcanvas  && settings.time_offcanvas.size) {
      styles += `animation-duration: ${settings.time_offcanvas.size}${settings.time_offcanvas.unit} !important;`
    }
    return styles;
  }}
}
`

export default FrontPopupWrapper;
