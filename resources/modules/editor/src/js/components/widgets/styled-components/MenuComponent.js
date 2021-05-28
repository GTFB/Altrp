import styled, {createGlobalStyle} from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  borderRadiusStyled,
  columnGapStyled,
  opacityStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

const MenuComponent = styled.div`
  ${({elementId, settings}) => {
    let styles = `.altrp-menu{`;
    if (getResponsiveSetting(settings, 'type') === 'horizontal') {
      styles += 'display: flex;';
      styles += '.bp3-submenu{flex-grow:1}';
      styles += '.bp3-icon-caret-right{transform: rotate(90deg);}';
    }
    const menuPadding = getResponsiveSetting(settings, 'menu_padding');
    if (menuPadding) {
      styles += dimensionsControllerToStyles(menuPadding);
    }
    let menuBg = getResponsiveSetting(settings, 'menu_bg');
    if (menuBg && menuBg.color) {
      styles += `background-color: ${menuBg.color};`;
    }
    let menu_radius = getResponsiveSetting(settings, 'menu_radius');
    if (menu_radius) {
      styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
    }
    let gap = getResponsiveSetting(settings, 'gap');
    if(gap){
      gap = gap.replace(',', '.')
      styles += `& > li:not(:last-child) { margin-${
        getResponsiveSetting(settings, 'type') === 'horizontal' ? 'right' : 'bottom'
      }: ${gap}}`;
    }
    styles += '}';
    /**
     * стили для ховера
     * @type {string}
     */
    styles += `.altrp-menu:hover{`;

    menu_radius = getResponsiveSetting(settings, 'menu_radius', ':hover');
    if (menu_radius) {
      styles += dimensionsControllerToStyles(menu_radius, 'border-radius');
    }

    menuBg = getResponsiveSetting(settings, 'menu_bg', ':hover');
    if (menuBg && menuBg.color) {
      styles += `background-color: ${menuBg.color};`;
    }

    styles += '}';

    return styles;
  }}
`;

export default MenuComponent;
