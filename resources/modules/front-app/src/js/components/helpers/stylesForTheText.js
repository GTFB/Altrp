import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  borderRadiusStyled,
  columnGapStyled,
  opacityStyled,
} from '../../helpers/styles';
import { getResponsiveSetting } from '../../helpers';

/**
 * Преобразует объект стилей, который задается в виджете Text в строку css для вставки в GlobalStyles
 * @param {{}} settings 
 * @param {string} id 
 * @return {string}
 */

export function getTextStyles(settings, id) {
  let styles = '';

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-text {`;

  const columnCount = getResponsiveSetting(settings, 'text_style_column-count');

  if (columnCount) {
    styles += simplePropertyStyled(columnCount, 'column-count');
  }

  const columnGap = getResponsiveSetting(settings, 'text_style_column-gap');

  if (columnGap) {
    styles += columnGapStyled(columnGap);
  }

  const padding = getResponsiveSetting(settings, 'text_style_position_padding');

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  const margin = getResponsiveSetting(settings, 'text_style_position_margin');

  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }

  const zIndex = getResponsiveSetting(settings, 'text_position_z_index');

  if (zIndex) {
    styles += simplePropertyStyled(zIndex, 'z-index');
  }

  const backgroundColor = getResponsiveSetting(settings, 'text_style_background_color');

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  const opacity = getResponsiveSetting(settings, 'text_style_background_opacity');

  if (opacity) {
    styles += opacityStyled(opacity, 'opacity');
  }

  const typographic = getResponsiveSetting(settings, 'text_style_font_typographic');

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  const color = getResponsiveSetting(settings, 'text_style_font_color');

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }

  const borderStyle = getResponsiveSetting(settings, 'text_style_border_type');

  if (borderStyle) {
    styles += simplePropertyStyled(borderStyle, 'border-style');
  }

  const borderWidth = getResponsiveSetting(settings, 'text_style_border_width');

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  const borderColor = getResponsiveSetting(settings, 'text_style_border_color');

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  const borderRadius = getResponsiveSetting(settings, 'text_style_border_radius');

  if (borderRadius) {
    styles += borderRadiusStyled(borderRadius);
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-text:hover {`;

  const columnCountHover = getResponsiveSetting(settings, 'text_style_column-count', ':hover');

  if (columnCountHover) {
    styles += simplePropertyStyled(columnCountHover, 'column-count');
  }

  const paddingHover = getResponsiveSetting(settings, 'text_style_position_padding', ':hover');

  if (paddingHover) {
    styles += dimensionsControllerToStyles(paddingHover);
  }

  const marginHover = getResponsiveSetting(settings, 'text_style_position_margin', ':hover');

  if (marginHover) {
    styles += dimensionsControllerToStyles(marginHover, 'margin');
  }

  const zIndexHover = getResponsiveSetting(settings, 'text_position_z_index', ':hover');

  if (zIndexHover) {
    styles += simplePropertyStyled(zIndexHover, 'z-index');
  }

  const backgroundColorHover = getResponsiveSetting(settings, 'text_style_background_color', ':hover');

  if (backgroundColorHover) {
    styles += colorPropertyStyled(backgroundColorHover, 'background-color');
  }

  const opacityHover = getResponsiveSetting(settings, 'text_style_background_opacity', ':hover');

  if (opacityHover) {
    styles += opacityStyled(opacityHover, 'opacity');
  }

  const typographicHover = getResponsiveSetting(settings, 'text_style_font_typographic', ':hover');

  if (typographicHover) {
    styles += typographicControllerToStyles(typographicHover);
  }

  const colorHover = getResponsiveSetting(settings, 'text_style_font_color', ':hover');

  if (colorHover) {
    styles += colorPropertyStyled(colorHover, 'color');
  }

  const borderStyleHover = getResponsiveSetting(settings, 'text_style_border_type', ':hover');

  if (borderStyleHover) {
    styles += simplePropertyStyled(borderStyleHover, 'border-style');
  }

  const borderWidthHover = getResponsiveSetting(settings, 'text_style_border_width', ':hover');

  if (borderWidthHover) {
    styles += borderWidthStyled(borderWidthHover);
  }

  const borderColorHover = getResponsiveSetting(settings, 'text_style_border_color', ':hover');

  if (borderColorHover) {
    styles += colorPropertyStyled(borderColorHover, 'border-color');
  }

  const borderRadiusHover = getResponsiveSetting(settings, 'text_style_border_radius', ':hover');

  if (borderRadiusHover) {
    styles += borderRadiusStyled(borderRadiusHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-text img {`;

  styles += `max-width: 100%; `

  styles += `} `;

  styles += `${parentClass} .ck.ck-editor__editable_inline {`;

  styles += `padding: 0; `

  styles += `} `;

  return styles;
}