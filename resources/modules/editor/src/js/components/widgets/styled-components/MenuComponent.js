import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {dimensionsControllerToStyles} from "../../../../../../front-app/src/js/helpers/styles";


const MenuComponent = styled.div`
  ${({elementId, settings}) => {
    let styles = `.altrp-menu{`;
    if (getResponsiveSetting(settings, 'type') === 'horizontal') {
      styles += 'display: flex;';
      styles += '.bp3-submenu{flex-grow:1}';
      styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    }

    styles += '}';
    /**
     * Стили поповера
     * @type {string}
     */
    let renderButton = getResponsiveSetting(settings, 'button');
    if (renderButton) {
      styles += '.altrp-popover{display:flex;';
      let alignment = getResponsiveSetting(settings, 'alignment')
      styles += `justify-content:${alignment};`;
      if (alignment === 'stretch') {
        styles += `.altrp-menu-toggle{flex-grow:1;}`;
      }
      styles += '}';
    }
    /**
     * Стили кнопки
     * @type {string}
     */
    if (renderButton) {
      styles += '&& .altrp-menu-toggle{';
      let buttonBg = getResponsiveSetting(settings, 'button_bg')
      if (buttonBg && buttonBg.color) {
        styles += `background-color:${buttonBg.color};background-image:none;`;
      }
      let buttonColor = getResponsiveSetting(settings, 'button_color')
      if (buttonColor && buttonColor.color) {
        styles += `svg, path{fill:${buttonColor.color};}`;
      }
      let buttonPadding = getResponsiveSetting(settings, 'button_padding')
      if (buttonPadding) {
        styles += dimensionsControllerToStyles(buttonPadding);
      }
      let border = getResponsiveSetting(settings, 'border');
      if(border){
        styles += `border-style:${border};`;
        styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width'), 'border-width');
        let borderColor = getResponsiveSetting(settings, 'border_color')
        if(borderColor && borderColor.color){
          styles += `border-color:${borderColor.color};`;
        }
      }
      let borderRadius = getResponsiveSetting(settings, 'button_radius');
      if(borderRadius){
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }
      styles += '}';

      styles += '&& .altrp-menu-toggle:hover{';
      buttonBg = getResponsiveSetting(settings, 'button_bg', ':hover')
      if (buttonBg && buttonBg.color) {
        styles += `background-color:${buttonBg.color};background-image:none;`;
      }
      buttonColor = getResponsiveSetting(settings, 'button_color', ':hover')
      if (buttonColor && buttonColor.color) {
        styles += `svg, path{fill:${buttonColor.color};}`;
      }
      border = getResponsiveSetting(settings, 'border', ':hover');
      if(border){
        styles += `border-style:${border};`;
        styles += dimensionsControllerToStyles(getResponsiveSetting(settings, 'border_width', ':hover'), 'border-width');
        let borderColor = getResponsiveSetting(settings, 'border_color', ':hover')
        if(borderColor && borderColor.color){
          styles += `border-color:${borderColor.color};`;
        }
      }
      borderRadius = getResponsiveSetting(settings, 'button_radius', ':hover');
      if(borderRadius){
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }
      styles += '}';
    }

    return styles;
  }}
`;

export default MenuComponent;
