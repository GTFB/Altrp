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

    styles += '}';
    /**
     * Ститли поповера для кнопки
     * @type {string}
     */
    let renderButton = getResponsiveSetting(settings, 'button');
    if (renderButton) {
      styles += '.altrp-popover{display:flex;';
      let alignment = getResponsiveSetting(settings, 'alignment')
      styles += `justify-content:${alignment};`;
      if(alignment === 'stretch') {
        styles += `.bp3-button{flex-grow:1;}`;
      }
      styles += '}';
    }
    return styles;
  }}
`;

export default MenuComponent;
