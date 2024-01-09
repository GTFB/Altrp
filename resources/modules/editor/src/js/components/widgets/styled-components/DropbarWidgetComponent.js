import {
  backgroundImageControllerToStyles, borderWidthStyled,
  colorPropertyStyled,
  gradientStyled, shadowControllerToStyles, simplePropertyStyled, sizeStyled,
  sliderStyled,
  styledString, typographicControllerToStyles
} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {btnStyles} from "./ButtonComponent";

/**
 * @return {string}
 */
export default function DropbarWidgetComponent(settings) {

  const styles = [
    ...btnStyles(settings, true)
  ];

  const justify = getResponsiveSetting(settings, "justify_content", );
  let stylesInString = ''
  if(justify){
    stylesInString += `
& .btn-container-column{
  width: 100%;
}
& .btn-container-row{
  width: 100%;
  justify-content: ${justify};
}
& .altrp-btn{
  justify-content: ${justify};
}

`
  }
  stylesInString +=  styledString(styles, settings);

  stylesInString += `& .altrp-btn.active {`;

  const backgroundColorActive = getResponsiveSetting(settings, 'background_color', '.active');
  if (backgroundColorActive) {
    stylesInString += colorPropertyStyled(backgroundColorActive, 'background-color');
  }

  const gradientActive = getResponsiveSetting(settings, "gradient", '.active');

  if (gradientActive) {
    stylesInString += gradientStyled(gradientActive);
  }

  const backgroundImageActive = getResponsiveSetting(settings, "background_image", '.active');

  if (backgroundImageActive) {
    stylesInString += backgroundImageControllerToStyles(backgroundImageActive);
  }

  const borderTypeActive = getResponsiveSetting(settings, "border_type", '.active');

  if (borderTypeActive) {
    stylesInString += simplePropertyStyled(borderTypeActive, "border-style");
  }

  const borderWidthActive = getResponsiveSetting(settings, "border_width", '.active');

  if (borderWidthActive) {
    stylesInString += borderWidthStyled(borderWidthActive);
  }

  const borderColorActive = getResponsiveSetting(settings, "border_color", '.active');

  if (borderColorActive) {
    stylesInString += colorPropertyStyled(borderColorActive, "border-color");
  }

  const borderRadiusActive = getResponsiveSetting(settings, "border_radius", '.active');

  if (borderRadiusActive) {
    stylesInString += sizeStyled(borderRadiusActive, "border-radius");
  }

  const boxShadowActive = getResponsiveSetting(settings, 'style_background_shadow', '.active');

  if (boxShadowActive) {
    stylesInString += shadowControllerToStyles(boxShadowActive);
  }

  const typographicActive = getResponsiveSetting(settings, "font_typographic", '.active');

  if (typographicActive) {
    stylesInString += typographicControllerToStyles(typographicActive);
  }

  const colorActive = getResponsiveSetting(settings, 'font_color', '.active');

  if (colorActive) {
    stylesInString += colorPropertyStyled(colorActive, 'color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn.active svg {`;

  const backgroundColorSvgActive = getResponsiveSetting(settings, 'icon_color_background', '.active');

  if (backgroundColorSvgActive) {
    stylesInString += colorPropertyStyled(backgroundColorSvgActive, 'background-color');
  }

  stylesInString += `} `;

  stylesInString += `& .altrp-btn.active path {`;

  const fillColorSvgActive = getResponsiveSetting(settings, 'icon_color', '.active');

  if (fillColorSvgActive) {
    stylesInString += colorPropertyStyled(fillColorSvgActive, 'fill');
  }

  const strokeColorSvgActive = getResponsiveSetting(settings, 'icon_color_stroke', '.active');

  if (strokeColorSvgActive) {
    stylesInString += colorPropertyStyled(strokeColorSvgActive, 'stroke');
  }
  stylesInString += `} `;

  return stylesInString
}
