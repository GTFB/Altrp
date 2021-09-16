import { getResponsiveSetting } from '../../helpers';
import {dimensionsControllerToStyles} from "../../helpers/styles";

const getMenuStyles = (settings,id)=>{

    const parentClass = `.altrp-element${id}`;

    let styles = `${parentClass} .altrp-menu{`;

    if (getResponsiveSetting(settings, 'type') === 'horizontal') {
      styles += 'display: flex;';
      styles += '.bp3-submenu{flex-grow:1}';
      styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    }

    styles += '} ';
    /**
     * Стили поповера
     * @type {string}
     */
    let renderButton = getResponsiveSetting(settings, 'button');
    if (renderButton) {
      styles += `${parentClass}${parentClass} {`;
      let alignment = getResponsiveSetting(settings, 'alignment')
      styles += `justify-content:${alignment};flex-direction: row;`;
      if (alignment !== 'stretch') {
        styles += `& .altrp-popover{flex-grow:0; width: auto;}`;
      } else {
        styles += `& .bp3-button {width: 100%;}`;
      }
      styles += '} ';
    }
    /**
     * Стили кнопки
     * @type {string}
     */
    if (renderButton) {
      styles += `${parentClass}${parentClass} .altrp-menu-toggle{`;
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
      styles += '} ';

      styles += `${parentClass} .altrp-menu-toggle:hover{`;
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
}

export default getMenuStyles;
