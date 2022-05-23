import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  textShadowControllerToStyles,
  opacityStyled,
  gradientStyled,
  backgroundImageControllerToStyles,
  translateStyled
} from "../../helpers/styles";
import { getResponsiveSetting } from "../../helpers";

/**
 * Преобразует объект стилей, который задается в виджете Heading в строку css для вставки в GlobalStyles
 * @param {{}} settings
 * @param {string} id
 * @return {string}
 */

export function getHeadingTypeAnimatingStyles(settings, id) {
  let styles = "";

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-heading-sub:hover {`;

  const justifyContentHeaddingSubHover = getResponsiveSetting(
    settings,
    "sub_heading_settings_alignment",
    ":hover"
  );

  if (justifyContentHeaddingSubHover) {
    styles += simplePropertyStyled(
      justifyContentHeaddingSubHover,
      "justify-content"
    );
  }

  styles += `} `;

  //hover
  styles += `${parentClass} .altrp-icon-header:hover {`;

  const marginBottomForHorizontalHover = getResponsiveSetting(
    settings,
    "horizontal_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForHorizontalHover) {
    styles += sizeStyled(marginBottomForHorizontalHover, "margin-bottom");
  }

  const marginBottomForVerticalHover = getResponsiveSetting(
    settings,
    "vertical_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForVerticalHover) {
    styles += sizeStyled(marginBottomForVerticalHover, "margin-bottom");
  }

  const marginBottomForRotateHover = getResponsiveSetting(
    settings,
    "rotate_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForRotateHover) {
    styles += sizeStyled(marginBottomForRotateHover, "margin-bottom");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading {`;

  //fix display with <strong> and <b> tags
  styles += "display:block;";
  styles += `} `;

  styles += `${parentClass} .altrp-animating-text {`;

  const typographicAnimating = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style"
  );

  if (typographicAnimating) {
    styles += typographicControllerToStyles(typographicAnimating);
  }

  const colorAnimating = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style"
  );

  if (colorAnimating) {
    styles += colorPropertyStyled(colorAnimating, "color");
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .state-disabled .altrp-animating-text {`;

  const typographicAnimatingDisabled = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style", '.state-disabled'
  );

  if (typographicAnimatingDisabled) {
    styles += typographicControllerToStyles(typographicAnimatingDisabled);
  }

  const colorAnimatingDisabled = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style", '.state-disabled'
  );

  if (colorAnimatingDisabled) {
    styles += colorPropertyStyled(colorAnimatingDisabled, "color");
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .active .altrp-animating-text {`;

  const typographicAnimatingActive = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style", '.active'
  );

  if (typographicAnimatingActive) {
    styles += typographicControllerToStyles(typographicAnimatingActive);
  }

  const colorAnimatingActive = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style", '.active'
  );

  if (colorAnimatingActive) {
    styles += colorPropertyStyled(colorAnimatingActive, "color");
  }

  styles += `} `;


  //hover
  styles += `${parentClass} .altrp-animating-text:hover {`;

  const typographicAnimatingHover = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style",
    ":hover"
  );

  if (typographicAnimatingHover) {
    styles += typographicControllerToStyles(typographicAnimatingHover);
  }

  const colorAnimatingHover = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style",
    ":hover"
  );

  if (colorAnimatingHover) {
    styles += colorPropertyStyled(colorAnimatingHover, "color");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-no-animating-text {`;

  const typographicNoAnimating = getResponsiveSetting(
    settings,
    "text_headline_animating_style"
  );

  if (typographicNoAnimating) {
    styles += typographicControllerToStyles(typographicNoAnimating);
  }

  const colorNoAnimating = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style"
  );

  if (colorNoAnimating) {
    styles += colorPropertyStyled(colorNoAnimating, "color");
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .state-disabled .altrp-heading-no-animating-text {`;

  const typographicNoAnimatingDisabled = getResponsiveSetting(
    settings,
    "text_headline_animating_style", '.state-disabled'
  );

  if (typographicNoAnimatingDisabled) {
    styles += typographicControllerToStyles(typographicNoAnimatingDisabled);
  }

  const colorNoAnimatingDisabled = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style", '.state-disabled'
  );

  if (colorNoAnimatingDisabled) {
    styles += colorPropertyStyled(colorNoAnimatingDisabled, "color");
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .active .altrp-heading-no-animating-text {`;

  const typographicNoAnimatingActive = getResponsiveSetting(
    settings,
    "text_headline_animating_style", '.active'
  );

  if (typographicNoAnimatingActive) {
    styles += typographicControllerToStyles(typographicNoAnimatingActive);
  }

  const colorNoAnimatingActive = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style", '.active'
  );

  if (colorNoAnimatingActive) {
    styles += colorPropertyStyled(colorNoAnimatingActive, "color");
  }

  styles += `} `;

  //hover
  styles += `${parentClass} .altrp-heading-no-animating-text:hover {`;

  const typographicNoAnimatingHover = getResponsiveSetting(
    settings,
    "text_headline_animating_style",
    ":hover"
  );

  if (typographicNoAnimatingHover) {
    styles += typographicControllerToStyles(typographicNoAnimatingHover);
  }

  const colorNoAnimatingHover = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style",
    ":hover"
  );

  if (colorNoAnimatingHover) {
    styles += colorPropertyStyled(colorNoAnimatingHover, "color");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-animating-highlighted-svg svg path {`;

  const strokeWidthAnimatingSvg = getResponsiveSetting(
    settings,
    "width_shape_animating"
  );

  if (strokeWidthAnimatingSvg) {
    styles += sizeStyled(strokeWidthAnimatingSvg, "stroke-width");
  }

  const colorAnimatingSvg = getResponsiveSetting(
    settings,
    "color_shape_animating"
  );

  if (colorAnimatingSvg) {
    styles += colorPropertyStyled(colorAnimatingSvg, "stroke");
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .state-disabled .altrp-animating-highlighted-svg svg path {`;

  const strokeWidthAnimatingSvgDisabled = getResponsiveSetting(
    settings,
    "width_shape_animating", '.state-disabled'
  );

  if (strokeWidthAnimatingSvgDisabled) {
    styles += sizeStyled(strokeWidthAnimatingSvgDisabled, "stroke-width");
  }

  const colorAnimatingSvgDisabled = getResponsiveSetting(
    settings,
    "color_shape_animating", '.state-disabled'
  );

  if (colorAnimatingSvgDisabled) {
    styles += colorPropertyStyled(colorAnimatingSvgDisabled, "stroke");
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .active .altrp-animating-highlighted-svg svg path {`;

  const strokeWidthAnimatingSvgActive = getResponsiveSetting(
    settings,
    "width_shape_animating", '.active'
  );

  if (strokeWidthAnimatingSvgActive) {
    styles += sizeStyled(strokeWidthAnimatingSvgActive, "stroke-width");
  }

  const colorAnimatingSvgActive = getResponsiveSetting(
    settings,
    "color_shape_animating", '.active'
  );

  if (colorAnimatingSvgActive) {
    styles += colorPropertyStyled(colorAnimatingSvgActive, "stroke");
  }

  styles += `} `;

  //hover
  styles += `${parentClass} .altrp-animating-highlighted-svg:hover svg path {`;

  const strokeWidthAnimatingSvgHover = getResponsiveSetting(
    settings,
    "width_shape_animating",
    ":hover"
  );

  if (strokeWidthAnimatingSvgHover) {
    styles += sizeStyled(strokeWidthAnimatingSvgHover, "stroke-width");
  }

  const colorAnimatingSvgHover = getResponsiveSetting(
    settings,
    "color_shape_animating",
    ":hover"
  );

  if (colorAnimatingSvgHover) {
    styles += colorPropertyStyled(colorAnimatingSvgHover, "stroke");
  }

  styles += `} `;

  return styles;
}
