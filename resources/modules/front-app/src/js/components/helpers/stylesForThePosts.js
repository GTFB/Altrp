import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  heightCalcStyled,
  transformRotateStyled,
  iconSizeStyled,
  shadowControllerToStyles,
} from '../../helpers/styles';
import getResponsiveSetting from "../../functions/getResponsiveSetting";

/**
 * Преобразует объект стилей, который задается в виджете Cards в строку css для вставки в GlobalStyles
 * @param {{}} settings
 * @param {string} id
 * @return {string}
 */

export function getPostsStyles(settings, id) {
  let styles = '';

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-pagination__previous {`;

  const flexDirectionPaginPrev = getResponsiveSetting(settings, 'prev_icon_position');

  if (flexDirectionPaginPrev && flexDirectionPaginPrev !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginPrev, 'flex-direction');
  }

  const marginPaginPrev = getResponsiveSetting(settings, 'posts_prev_margin');

  if (marginPaginPrev) {
    styles += dimensionsControllerToStyles(marginPaginPrev, 'margin');
  }

  const paddingPaginPrev = getResponsiveSetting(settings, 'posts_prev_padding');

  if (paddingPaginPrev) {
    styles += dimensionsControllerToStyles(paddingPaginPrev);
  }

  const colorPaginPrev = getResponsiveSetting(settings, 'posts_prev_color');

  if (colorPaginPrev) {
    styles += colorPropertyStyled(colorPaginPrev, 'color');
  }

  const typographicPaginPrev = getResponsiveSetting(settings, 'posts_prev_typographic');

  if (typographicPaginPrev) {
    styles += typographicControllerToStyles(typographicPaginPrev);
  }

  const borderTypePaginPrev = getResponsiveSetting(settings, 'posts_prev_border_type');

  if (borderTypePaginPrev) {
    styles += simplePropertyStyled(borderTypePaginPrev, 'border-style');
  }

  const borderWidthPaginPrev = getResponsiveSetting(settings, 'posts_prev_border_width');

  if (borderWidthPaginPrev) {
    styles += borderWidthStyled(borderWidthPaginPrev);
  }

  const borderColorPaginPrev = getResponsiveSetting(settings, 'posts_prev_border_color');

  if (borderColorPaginPrev) {
    styles += colorPropertyStyled(borderColorPaginPrev, 'border-color');
  }

  const borderRadiusPaginPrev = getResponsiveSetting(settings, 'border_prev_radius');

  if (borderRadiusPaginPrev) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPrev, 'border-radius');
  }

  const boxShadowPaginPrev = getResponsiveSetting(settings, 'style_prev_background_shadow');

  if (boxShadowPaginPrev) {
    styles += shadowControllerToStyles(boxShadowPaginPrev);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__previous {`;

  const flexDirectionPaginPrevDisabled = getResponsiveSetting(settings, 'prev_icon_position', '.state-disabled');

  if (flexDirectionPaginPrevDisabled && flexDirectionPaginPrevDisabled !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginPrevDisabled, 'flex-direction');
  }

  const marginPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_margin', '.state-disabled');

  if (marginPaginPrevDisabled) {
    styles += dimensionsControllerToStyles(marginPaginPrevDisabled, 'margin');
  }

  const paddingPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_padding', '.state-disabled');

  if (paddingPaginPrevDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginPrevDisabled);
  }

  const colorPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_color', '.state-disabled');

  if (colorPaginPrevDisabled) {
    styles += colorPropertyStyled(colorPaginPrevDisabled, 'color');
  }

  const typographicPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_typographic', '.state-disabled');

  if (typographicPaginPrevDisabled) {
    styles += typographicControllerToStyles(typographicPaginPrevDisabled);
  }

  const borderTypePaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_border_type', '.state-disabled');

  if (borderTypePaginPrevDisabled) {
    styles += simplePropertyStyled(borderTypePaginPrevDisabled, 'border-style');
  }

  const borderWidthPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_border_width', '.state-disabled');

  if (borderWidthPaginPrevDisabled) {
    styles += borderWidthStyled(borderWidthPaginPrevDisabled);
  }

  const borderColorPaginPrevDisabled = getResponsiveSetting(settings, 'posts_prev_border_color', '.state-disabled');

  if (borderColorPaginPrevDisabled) {
    styles += colorPropertyStyled(borderColorPaginPrevDisabled, 'border-color');
  }

  const borderRadiusPaginPrevDisabled = getResponsiveSetting(settings, 'border_prev_radius', '.state-disabled');

  if (borderRadiusPaginPrevDisabled) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPrevDisabled, 'border-radius');
  }

  const boxShadowPaginPrevDisabled = getResponsiveSetting(settings, 'style_prev_background_shadow', '.state-disabled');

  if (boxShadowPaginPrevDisabled) {
    styles += shadowControllerToStyles(boxShadowPaginPrevDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__previous {`;

  const flexDirectionPaginPrevActive = getResponsiveSetting(settings, 'prev_icon_position', '.active');

  if (flexDirectionPaginPrevActive && flexDirectionPaginPrevActive !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginPrevActive, 'flex-direction');
  }

  const marginPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_margin', '.active');

  if (marginPaginPrevActive) {
    styles += dimensionsControllerToStyles(marginPaginPrevActive, 'margin');
  }

  const paddingPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_padding', '.active');

  if (paddingPaginPrevActive) {
    styles += dimensionsControllerToStyles(paddingPaginPrevActive);
  }

  const colorPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_color', '.active');

  if (colorPaginPrevActive) {
    styles += colorPropertyStyled(colorPaginPrevActive, 'color');
  }

  const typographicPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_typographic', '.active');

  if (typographicPaginPrevActive) {
    styles += typographicControllerToStyles(typographicPaginPrevActive);
  }

  const borderTypePaginPrevActive = getResponsiveSetting(settings, 'posts_prev_border_type', '.active');

  if (borderTypePaginPrevActive) {
    styles += simplePropertyStyled(borderTypePaginPrevActive, 'border-style');
  }

  const borderWidthPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_border_width', '.active');

  if (borderWidthPaginPrevActive) {
    styles += borderWidthStyled(borderWidthPaginPrevActive);
  }

  const borderColorPaginPrevActive = getResponsiveSetting(settings, 'posts_prev_border_color', '.active');

  if (borderColorPaginPrevActive) {
    styles += colorPropertyStyled(borderColorPaginPrevActive, 'border-color');
  }

  const borderRadiusPaginPrevActive = getResponsiveSetting(settings, 'border_prev_radius', '.active');

  if (borderRadiusPaginPrevActive) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPrevActive, 'border-radius');
  }

  const boxShadowPaginPrevActive = getResponsiveSetting(settings, 'style_prev_background_shadow', '.active');

  if (boxShadowPaginPrevActive) {
    styles += shadowControllerToStyles(boxShadowPaginPrevActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover {`;

  const flexDirectionPaginPrevHover = getResponsiveSetting(settings, 'prev_icon_position', ':hover');

  if (flexDirectionPaginPrevHover && flexDirectionPaginPrevHover !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginPrevHover, 'flex-direction');
  }

  const marginPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_margin', ':hover');

  if (marginPaginPrevHover) {
    styles += dimensionsControllerToStyles(marginPaginPrevHover, 'margin');
  }

  const paddingPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_padding', ':hover');

  if (paddingPaginPrevHover) {
    styles += dimensionsControllerToStyles(paddingPaginPrevHover);
  }

  const colorPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_color', ':hover');

  if (colorPaginPrevHover) {
    styles += colorPropertyStyled(colorPaginPrevHover, 'color');
  }

  const typographicPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_typographic', ':hover');

  if (typographicPaginPrevHover) {
    styles += typographicControllerToStyles(typographicPaginPrevHover);
  }

  const borderTypePaginPrevHover = getResponsiveSetting(settings, 'posts_prev_border_type', ':hover');

  if (borderTypePaginPrevHover) {
    styles += simplePropertyStyled(borderTypePaginPrevHover, 'border-style');
  }

  const borderWidthPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_border_width', ':hover');

  if (borderWidthPaginPrevHover) {
    styles += borderWidthStyled(borderWidthPaginPrevHover);
  }

  const borderColorPaginPrevHover = getResponsiveSetting(settings, 'posts_prev_border_color', ':hover');

  if (borderColorPaginPrevHover) {
    styles += colorPropertyStyled(borderColorPaginPrevHover, 'border-color');
  }

  const borderRadiusPaginPrevHover = getResponsiveSetting(settings, 'border_prev_radius', ':hover');

  if (borderRadiusPaginPrevHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPrevHover, 'border-radius');
  }

  const boxShadowPaginPrevHover = getResponsiveSetting(settings, 'style_prev_background_shadow', ':hover');

  if (boxShadowPaginPrevHover) {
    styles += shadowControllerToStyles(boxShadowPaginPrevHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous svg, ${parentClass} .altrp-pagination__previous img {`;

  const marginPaginPrevSvgImg = getResponsiveSetting(settings, 'prev_icon_padding');

  if (marginPaginPrevSvgImg) {
    styles += dimensionsControllerToStyles(marginPaginPrevSvgImg, 'margin');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__previous svg, ${parentClass} .altrp-pagination__previous img {`;

  const marginPaginPrevSvgImgDisabled = getResponsiveSetting(settings, 'prev_icon_padding', '.state-disabled');

  if (marginPaginPrevSvgImgDisabled) {
    styles += dimensionsControllerToStyles(marginPaginPrevSvgImgDisabled, 'margin');
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__previous svg, ${parentClass} .altrp-pagination__previous img {`;

  const marginPaginPrevSvgImgActive = getResponsiveSetting(settings, 'prev_icon_padding', '.active');

  if (marginPaginPrevSvgImgActive) {
    styles += dimensionsControllerToStyles(marginPaginPrevSvgImgActive, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover svg, ${parentClass} .altrp-pagination__previous:hover img {`;

  const marginPaginPrevSvgImgHover = getResponsiveSetting(settings, 'prev_icon_padding', ':hover');

  if (marginPaginPrevSvgImgHover) {
    styles += dimensionsControllerToStyles(marginPaginPrevSvgImgHover, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous svg {`;

  const sizePaginPrevSvg = getResponsiveSetting(settings, 'prev_icon_size');

  if (sizePaginPrevSvg) {
    styles += iconSizeStyled(sizePaginPrevSvg);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__previous svg {`;

  const sizePaginPrevSvgDisabled = getResponsiveSetting(settings, 'prev_icon_size', '.state-disabled');

  if (sizePaginPrevSvgDisabled) {
    styles += iconSizeStyled(sizePaginPrevSvgDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__previous svg {`;

  const sizePaginPrevSvgActive = getResponsiveSetting(settings, 'prev_icon_size', '.active');

  if (sizePaginPrevSvgActive) {
    styles += iconSizeStyled(sizePaginPrevSvgActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover svg {`;

  const sizePaginPrevSvgHover = getResponsiveSetting(settings, 'prev_icon_size', ':hover');

  if (sizePaginPrevSvgHover) {
    styles += iconSizeStyled(sizePaginPrevSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous img {`;

  const heightPaginPrevImg = getResponsiveSetting(settings, 'prev_icon_size');

  if (heightPaginPrevImg) {
    styles += sizeStyled(heightPaginPrevImg, 'height');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__previous img {`;

  const heightPaginPrevImgDisabled = getResponsiveSetting(settings, 'prev_icon_size', '.state-disabled');

  if (heightPaginPrevImgDisabled) {
    styles += sizeStyled(heightPaginPrevImgDisabled, 'height');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__previous img {`;

  const heightPaginPrevImgActive = getResponsiveSetting(settings, 'prev_icon_size', '.active');

  if (heightPaginPrevImgActive) {
    styles += sizeStyled(heightPaginPrevImgActive, 'height');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover img {`;

  const heightPaginPrevImgHover = getResponsiveSetting(settings, 'prev_icon_size', ':hover');

  if (heightPaginPrevImgHover) {
    styles += sizeStyled(heightPaginPrevImgHover, 'height');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous path {`;

  const fillPaginPrevPath = getResponsiveSetting(settings, 'prev_icon_color');

  if (fillPaginPrevPath) {
    styles += colorPropertyStyled(fillPaginPrevPath, 'fill');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__previous path {`;

  const fillPaginPrevPathDisabled = getResponsiveSetting(settings, 'prev_icon_color', '.state-disabled');

  if (fillPaginPrevPathDisabled) {
    styles += colorPropertyStyled(fillPaginPrevPathDisabled, 'fill');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__previous path {`;

  const fillPaginPrevPathActive = getResponsiveSetting(settings, 'prev_icon_color', '.active');

  if (fillPaginPrevPathActive) {
    styles += colorPropertyStyled(fillPaginPrevPathActive, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover path {`;

  const fillPaginPrevPathHover = getResponsiveSetting(settings, 'prev_icon_color', ':hover');

  if (fillPaginPrevPathHover) {
    styles += colorPropertyStyled(fillPaginPrevPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next {`;

  const flexDirectionPaginNext = getResponsiveSetting(settings, 'next_icon_position');

  if (flexDirectionPaginNext && flexDirectionPaginNext !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginNext, 'flex-direction');
  }

  const marginPaginNext = getResponsiveSetting(settings, 'posts_next_margin');

  if (marginPaginNext) {
    styles += dimensionsControllerToStyles(marginPaginNext, 'margin');
  }

  const paddingPaginNext = getResponsiveSetting(settings, 'posts_next_padding');

  if (paddingPaginNext) {
    styles += dimensionsControllerToStyles(paddingPaginNext);
  }

  const colorPaginNext = getResponsiveSetting(settings, 'posts_next_color');

  if (colorPaginNext) {
    styles += colorPropertyStyled(colorPaginNext, 'color');
  }

  const typographicPaginNext = getResponsiveSetting(settings, 'posts_next_typographic');

  if (typographicPaginNext) {
    styles += typographicControllerToStyles(typographicPaginNext);
  }

  const borderTypePaginNext = getResponsiveSetting(settings, 'posts_next_border_type');

  if (borderTypePaginNext) {
    styles += simplePropertyStyled(borderTypePaginNext, 'border-style');
  }

  const borderWidthPaginNext = getResponsiveSetting(settings, 'posts_next_border_width');

  if (borderWidthPaginNext) {
    styles += borderWidthStyled(borderWidthPaginNext);
  }

  const borderColorPaginNext = getResponsiveSetting(settings, 'posts_next_border_color');

  if (borderColorPaginNext) {
    styles += colorPropertyStyled(borderColorPaginNext, 'border-color');
  }

  const borderRadiusPaginNext = getResponsiveSetting(settings, 'border_next_radius');

  if (borderRadiusPaginNext) {
    styles += dimensionsControllerToStyles(borderRadiusPaginNext, 'border-radius');
  }

  const boxShadowPaginNext = getResponsiveSetting(settings, 'style_next_background_shadow');

  if (boxShadowPaginNext) {
    styles += shadowControllerToStyles(boxShadowPaginNext);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next {`;

  const flexDirectionPaginNextDisabled = getResponsiveSetting(settings, 'next_icon_position', '.state-disabled');

  if (flexDirectionPaginNextDisabled && flexDirectionPaginNextDisabled !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginNextDisabled, 'flex-direction');
  }

  const marginPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_margin', '.state-disabled');

  if (marginPaginNextDisabled) {
    styles += dimensionsControllerToStyles(marginPaginNextDisabled, 'margin');
  }

  const paddingPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_padding', '.state-disabled');

  if (paddingPaginNextDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginNextDisabled);
  }

  const colorPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_color', '.state-disabled');

  if (colorPaginNextDisabled) {
    styles += colorPropertyStyled(colorPaginNextDisabled, 'color');
  }

  const typographicPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_typographic', '.state-disabled');

  if (typographicPaginNextDisabled) {
    styles += typographicControllerToStyles(typographicPaginNextDisabled);
  }

  const borderTypePaginNextDisabled = getResponsiveSetting(settings, 'posts_next_border_type', '.state-disabled');

  if (borderTypePaginNextDisabled) {
    styles += simplePropertyStyled(borderTypePaginNextDisabled, 'border-style');
  }

  const borderWidthPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_border_width', '.state-disabled');

  if (borderWidthPaginNextDisabled) {
    styles += borderWidthStyled(borderWidthPaginNextDisabled);
  }

  const borderColorPaginNextDisabled = getResponsiveSetting(settings, 'posts_next_border_color', '.state-disabled');

  if (borderColorPaginNextDisabled) {
    styles += colorPropertyStyled(borderColorPaginNextDisabled, 'border-color');
  }

  const borderRadiusPaginNextDisabled = getResponsiveSetting(settings, 'border_next_radius', '.state-disabled');

  if (borderRadiusPaginNextDisabled) {
    styles += dimensionsControllerToStyles(borderRadiusPaginNextDisabled, 'border-radius');
  }

  const boxShadowPaginNextDisabled = getResponsiveSetting(settings, 'style_next_background_shadow', '.state-disabled');

  if (boxShadowPaginNextDisabled) {
    styles += shadowControllerToStyles(boxShadowPaginNextDisabled);
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__next {`;

  const flexDirectionPaginNextActive = getResponsiveSetting(settings, 'next_icon_position', '.active');

  if (flexDirectionPaginNextActive && flexDirectionPaginNextActive !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginNextActive, 'flex-direction');
  }

  const marginPaginNextActive = getResponsiveSetting(settings, 'posts_next_margin', '.active');

  if (marginPaginNextActive) {
    styles += dimensionsControllerToStyles(marginPaginNextActive, 'margin');
  }

  const paddingPaginNextActive = getResponsiveSetting(settings, 'posts_next_padding', '.active');

  if (paddingPaginNextActive) {
    styles += dimensionsControllerToStyles(paddingPaginNextActive);
  }

  const colorPaginNextActive = getResponsiveSetting(settings, 'posts_next_color', '.active');

  if (colorPaginNextActive) {
    styles += colorPropertyStyled(colorPaginNextActive, 'color');
  }

  const typographicPaginNextActive = getResponsiveSetting(settings, 'posts_next_typographic', '.active');

  if (typographicPaginNextActive) {
    styles += typographicControllerToStyles(typographicPaginNextActive);
  }

  const borderTypePaginNextActive = getResponsiveSetting(settings, 'posts_next_border_type', '.active');

  if (borderTypePaginNextActive) {
    styles += simplePropertyStyled(borderTypePaginNextActive, 'border-style');
  }

  const borderWidthPaginNextActive = getResponsiveSetting(settings, 'posts_next_border_width', '.active');

  if (borderWidthPaginNextActive) {
    styles += borderWidthStyled(borderWidthPaginNextActive);
  }

  const borderColorPaginNextActive = getResponsiveSetting(settings, 'posts_next_border_color', '.active');

  if (borderColorPaginNextActive) {
    styles += colorPropertyStyled(borderColorPaginNextActive, 'border-color');
  }

  const borderRadiusPaginNextActive = getResponsiveSetting(settings, 'border_next_radius', '.active');

  if (borderRadiusPaginNextActive) {
    styles += dimensionsControllerToStyles(borderRadiusPaginNextActive, 'border-radius');
  }

  const boxShadowPaginNextActive = getResponsiveSetting(settings, 'style_next_background_shadow', '.active');

  if (boxShadowPaginNextActive) {
    styles += shadowControllerToStyles(boxShadowPaginNextActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover {`;

  const flexDirectionPaginNextHover = getResponsiveSetting(settings, 'next_icon_position', ':hover');

  if (flexDirectionPaginNextHover && flexDirectionPaginNextHover !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginNextHover, 'flex-direction');
  }

  const marginPaginNextHover = getResponsiveSetting(settings, 'posts_next_margin', ':hover');

  if (marginPaginNextHover) {
    styles += dimensionsControllerToStyles(marginPaginNextHover, 'margin');
  }

  const paddingPaginNextHover = getResponsiveSetting(settings, 'posts_next_padding', ':hover');

  if (paddingPaginNextHover) {
    styles += dimensionsControllerToStyles(paddingPaginNextHover);
  }

  const colorPaginNextHover = getResponsiveSetting(settings, 'posts_next_color', ':hover');

  if (colorPaginNextHover) {
    styles += colorPropertyStyled(colorPaginNextHover, 'color');
  }

  const typographicPaginNextHover = getResponsiveSetting(settings, 'posts_next_typographic', ':hover');

  if (typographicPaginNextHover) {
    styles += typographicControllerToStyles(typographicPaginNextHover);
  }

  const borderTypePaginNextHover = getResponsiveSetting(settings, 'posts_next_border_type', ':hover');

  if (borderTypePaginNextHover) {
    styles += simplePropertyStyled(borderTypePaginNextHover, 'border-style');
  }

  const borderWidthPaginNextHover = getResponsiveSetting(settings, 'posts_next_border_width', ':hover');

  if (borderWidthPaginNextHover) {
    styles += borderWidthStyled(borderWidthPaginNextHover);
  }

  const borderColorPaginNextHover = getResponsiveSetting(settings, 'posts_next_border_color', ':hover');

  if (borderColorPaginNextHover) {
    styles += colorPropertyStyled(borderColorPaginNextHover, 'border-color');
  }

  const borderRadiusPaginNextHover = getResponsiveSetting(settings, 'border_next_radius', ':hover');

  if (borderRadiusPaginNextHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginNextHover, 'border-radius');
  }

  const boxShadowPaginNextHover = getResponsiveSetting(settings, 'style_next_background_shadow', ':hover');

  if (boxShadowPaginNextHover) {
    styles += shadowControllerToStyles(boxShadowPaginNextHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next svg, ${parentClass} .altrp-pagination__next img {`;

  const marginPaginNextSvgImg = getResponsiveSetting(settings, 'next_icon_margin');

  if (marginPaginNextSvgImg) {
    styles += dimensionsControllerToStyles(marginPaginNextSvgImg, 'margin');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next svg, ${parentClass} .altrp-pagination__next img {`;

  const marginPaginNextSvgImgDisabled = getResponsiveSetting(settings, 'next_icon_margin', '.state-disabled');

  if (marginPaginNextSvgImgDisabled) {
    styles += dimensionsControllerToStyles(marginPaginNextSvgImgDisabled, 'margin');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__next svg, ${parentClass} .altrp-pagination__next img {`;

  const marginPaginNextSvgImgActive = getResponsiveSetting(settings, 'next_icon_margin', '.active');

  if (marginPaginNextSvgImgActive) {
    styles += dimensionsControllerToStyles(marginPaginNextSvgImgActive, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover svg, ${parentClass} .altrp-pagination__next:hover img {`;

  const marginPaginNextSvgImgHover = getResponsiveSetting(settings, 'next_icon_margin', ':hover');

  if (marginPaginNextSvgImgHover) {
    styles += dimensionsControllerToStyles(marginPaginNextSvgImgHover, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next svg {`;

  const sizePaginNextSvg = getResponsiveSetting(settings, 'next_icon_size');

  if (sizePaginNextSvg) {
    styles += iconSizeStyled(sizePaginNextSvg);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next svg {`;

  const sizePaginNextSvgDisabled = getResponsiveSetting(settings, 'next_icon_size', '.state-disabled');

  if (sizePaginNextSvgDisabled) {
    styles += iconSizeStyled(sizePaginNextSvgDisabled);
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__next svg {`;

  const sizePaginNextSvgActive = getResponsiveSetting(settings, 'next_icon_size', '.active');

  if (sizePaginNextSvgActive) {
    styles += iconSizeStyled(sizePaginNextSvgActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover svg {`;

  const sizePaginNextSvgHover = getResponsiveSetting(settings, 'next_icon_size', ':hover');

  if (sizePaginNextSvgHover) {
    styles += iconSizeStyled(sizePaginNextSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next img {`;

  const heightPaginNextImg = getResponsiveSetting(settings, 'next_icon_size');

  if (heightPaginNextImg) {
    styles += sizeStyled(heightPaginNextImg, 'height');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next img {`;

  const heightPaginNextImgDisabled = getResponsiveSetting(settings, 'next_icon_size', '.state-disabled');

  if (heightPaginNextImgDisabled) {
    styles += sizeStyled(heightPaginNextImgDisabled, 'height');
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__next img {`;

  const heightPaginNextImgActive = getResponsiveSetting(settings, 'next_icon_size', '.active');

  if (heightPaginNextImgActive) {
    styles += sizeStyled(heightPaginNextImgActive, 'height');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover img {`;

  const heightPaginNextImgHover = getResponsiveSetting(settings, 'next_icon_size', ':hover');

  if (heightPaginNextImgHover) {
    styles += sizeStyled(heightPaginNextImgHover, 'height');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next path {`;

  const fillPaginNextPath = getResponsiveSetting(settings, 'next_icon_color');

  if (fillPaginNextPath) {
    styles += colorPropertyStyled(fillPaginNextPath, 'fill');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next path {`;

  const fillPaginNextPathDisabled = getResponsiveSetting(settings, 'next_icon_color', '.state-disabled');

  if (fillPaginNextPathDisabled) {
    styles += colorPropertyStyled(fillPaginNextPathDisabled, 'fill');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__next path {`;

  const fillPaginNextPathActive = getResponsiveSetting(settings, 'next_icon_color', '.active');

  if (fillPaginNextPathActive) {
    styles += colorPropertyStyled(fillPaginNextPathActive, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover path {`;

  const fillPaginNextPathHover = getResponsiveSetting(settings, 'next_icon_color', ':hover');

  if (fillPaginNextPathHover) {
    styles += colorPropertyStyled(fillPaginNextPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count {`;

  const marginPaginCount = getResponsiveSetting(settings, 'count_buttons_margin');

  if (marginPaginCount) {
    styles += dimensionsControllerToStyles(marginPaginCount, 'margin');
  }

  const backgroundColorPaginCount = getResponsiveSetting(settings, 'table_style_pagination_count_background_color');

  if (backgroundColorPaginCount) {
    styles += colorPropertyStyled(backgroundColorPaginCount, 'background-color');
  }

  const paddingPaginCount = getResponsiveSetting(settings, 'table_style_pagination_padding_count');

  if (paddingPaginCount) {
    styles += dimensionsControllerToStyles(paddingPaginCount);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__count {`;

  const marginPaginCountDisabled = getResponsiveSetting(settings, 'count_buttons_margin', '.state-disabled');

  if (marginPaginCountDisabled) {
    styles += dimensionsControllerToStyles(marginPaginCountDisabled, 'margin');
  }

  const backgroundColorPaginCountDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_background_color', '.state-disabled');

  if (backgroundColorPaginCountDisabled) {
    styles += colorPropertyStyled(backgroundColorPaginCountDisabled, 'background-color');
  }

  const paddingPaginCountDisabled = getResponsiveSetting(settings, 'table_style_pagination_padding_count', '.state-disabled');

  if (paddingPaginCountDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginCountDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__count {`;

  const marginPaginCountActive = getResponsiveSetting(settings, 'count_buttons_margin', '.active');

  if (marginPaginCountActive) {
    styles += dimensionsControllerToStyles(marginPaginCountActive, 'margin');
  }

  const backgroundColorPaginCountActive = getResponsiveSetting(settings, 'table_style_pagination_count_background_color', '.active');

  if (backgroundColorPaginCountActive) {
    styles += colorPropertyStyled(backgroundColorPaginCountActive, 'background-color');
  }

  const paddingPaginCountActive = getResponsiveSetting(settings, 'table_style_pagination_padding_count', '.active');

  if (paddingPaginCountActive) {
    styles += dimensionsControllerToStyles(paddingPaginCountActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count:hover {`;

  const marginPaginCountHover = getResponsiveSetting(settings, 'count_buttons_margin', ':hover');

  if (marginPaginCountHover) {
    styles += dimensionsControllerToStyles(marginPaginCountHover, 'margin');
  }

  const backgroundColorPaginCountHover = getResponsiveSetting(settings, 'table_style_pagination_count_background_color', ':hover');

  if (backgroundColorPaginCountHover) {
    styles += colorPropertyStyled(backgroundColorPaginCountHover, 'background-color');
  }

  const paddingPaginCountHover = getResponsiveSetting(settings, 'table_style_pagination_padding_count', ':hover');

  if (paddingPaginCountHover) {
    styles += dimensionsControllerToStyles(paddingPaginCountHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination-pages__item {`;

  const colorPaginCountPagesItem = getResponsiveSetting(settings, 'table_style_pagination_count_text_color');

  if (colorPaginCountPagesItem) {
    styles += colorPropertyStyled(colorPaginCountPagesItem, 'color');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination-pages__item {`;

  const colorPaginCountPagesItemDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', '.state-disabled');

  if (colorPaginCountPagesItemDisabled) {
    styles += colorPropertyStyled(colorPaginCountPagesItemDisabled, 'color');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination-pages__item {`;

  const colorPaginCountPagesItemActive = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', '.active');

  if (colorPaginCountPagesItemActive) {
    styles += colorPropertyStyled(colorPaginCountPagesItemActive, 'color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count:hover, ${parentClass} .altrp-pagination-pages__item:hover {`;

  const colorPaginCountPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', ':hover');

  if (colorPaginCountPagesItemHover) {
    styles += colorPropertyStyled(colorPaginCountPagesItemHover, 'color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination-pages__item {`;

  const marginPaginPagesItem = getResponsiveSetting(settings, 'count_button_item_margin');

  if (marginPaginPagesItem) {
    styles += dimensionsControllerToStyles(marginPaginPagesItem, 'margin');
  }

  const backgroundColorPaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color');

  if (backgroundColorPaginPagesItem) {
    styles += colorPropertyStyled(backgroundColorPaginPagesItem, 'background-color');
  }

  const borderTypePaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type');

  if (borderTypePaginPagesItem) {
    styles += simplePropertyStyled(borderTypePaginPagesItem, 'border-style');
  }

  const borderWidthPaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width');

  if (borderWidthPaginPagesItem) {
    styles += borderWidthStyled(borderWidthPaginPagesItem);
  }

  const borderRadiusPaginPagesItem = getResponsiveSetting(settings, 'table_style_count_item_border_radius');

  if (borderRadiusPaginPagesItem) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPagesItem, 'border-radius');
  }

  const borderColorPaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color');

  if (borderColorPaginPagesItem) {
    styles += colorPropertyStyled(borderColorPaginPagesItem, 'border-color', '!important');
  }

  const boxShadowPaginPagesItem = getResponsiveSetting(settings, 'pagination_count_item_shadow');

  if (boxShadowPaginPagesItem) {
    styles += shadowControllerToStyles(boxShadowPaginPagesItem);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination-pages__item {`;

  const marginPaginPagesItemDisabled = getResponsiveSetting(settings, 'count_button_item_margin', '.state-disabled');

  if (marginPaginPagesItemDisabled) {
    styles += dimensionsControllerToStyles(marginPaginPagesItemDisabled, 'margin');
  }

  const backgroundColorPaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color', '.state-disabled');

  if (backgroundColorPaginPagesItemDisabled) {
    styles += colorPropertyStyled(backgroundColorPaginPagesItemDisabled, 'background-color');
  }

  const borderTypePaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type', '.state-disabled');

  if (borderTypePaginPagesItemDisabled) {
    styles += simplePropertyStyled(borderTypePaginPagesItemDisabled, 'border-style');
  }

  const borderWidthPaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width', '.state-disabled');

  if (borderWidthPaginPagesItemDisabled) {
    styles += borderWidthStyled(borderWidthPaginPagesItemDisabled);
  }

  const borderRadiusPaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_count_item_border_radius', '.state-disabled');

  if (borderRadiusPaginPagesItemDisabled) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPagesItemDisabled, 'border-radius');
  }

  const borderColorPaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color', '.state-disabled');

  if (borderColorPaginPagesItemDisabled) {
    styles += colorPropertyStyled(borderColorPaginPagesItemDisabled, 'border-color', '!important');
  }

  const boxShadowPaginPagesItemDisabled = getResponsiveSetting(settings, 'pagination_count_item_shadow', '.state-disabled');

  if (boxShadowPaginPagesItemDisabled) {
    styles += shadowControllerToStyles(boxShadowPaginPagesItemDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination-pages__item {`;

  const marginPaginPagesItemActive = getResponsiveSetting(settings, 'count_button_item_margin', '.active');

  if (marginPaginPagesItemActive) {
    styles += dimensionsControllerToStyles(marginPaginPagesItemActive, 'margin');
  }

  const backgroundColorPaginPagesItemActive = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color', '.active');

  if (backgroundColorPaginPagesItemActive) {
    styles += colorPropertyStyled(backgroundColorPaginPagesItemActive, 'background-color');
  }

  const borderTypePaginPagesItemActive = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type', '.active');

  if (borderTypePaginPagesItemActive) {
    styles += simplePropertyStyled(borderTypePaginPagesItemActive, 'border-style');
  }

  const borderWidthPaginPagesItemActive = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width', '.active');

  if (borderWidthPaginPagesItemActive) {
    styles += borderWidthStyled(borderWidthPaginPagesItemActive);
  }

  const borderRadiusPaginPagesItemActive = getResponsiveSetting(settings, 'table_style_count_item_border_radius', '.active');

  if (borderRadiusPaginPagesItemActive) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPagesItemActive, 'border-radius');
  }

  const borderColorPaginPagesItemActive = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color', '.active');

  if (borderColorPaginPagesItemActive) {
    styles += colorPropertyStyled(borderColorPaginPagesItemActive, 'border-color', '!important');
  }

  const boxShadowPaginPagesItemActive = getResponsiveSetting(settings, 'pagination_count_item_shadow', '.active');

  if (boxShadowPaginPagesItemActive) {
    styles += shadowControllerToStyles(boxShadowPaginPagesItemActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination-pages__item:hover {`;

  const marginPaginPagesItemHover = getResponsiveSetting(settings, 'count_button_item_margin', ':hover');

  if (marginPaginPagesItemHover) {
    styles += dimensionsControllerToStyles(marginPaginPagesItemHover, 'margin');
  }

  const backgroundColorPaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color', ':hover');

  if (backgroundColorPaginPagesItemHover) {
    styles += colorPropertyStyled(backgroundColorPaginPagesItemHover, 'background-color');
  }

  const borderTypePaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type', ':hover');

  if (borderTypePaginPagesItemHover) {
    styles += simplePropertyStyled(borderTypePaginPagesItemHover, 'border-style');
  }

  const borderWidthPaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width', ':hover');

  if (borderWidthPaginPagesItemHover) {
    styles += borderWidthStyled(borderWidthPaginPagesItemHover);
  }

  const borderRadiusPaginPagesItemHover = getResponsiveSetting(settings, 'table_style_count_item_border_radius', ':hover');

  if (borderRadiusPaginPagesItemHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginPagesItemHover, 'border-radius');
  }

  const borderColorPaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color', ':hover');

  if (borderColorPaginPagesItemHover) {
    styles += colorPropertyStyled(borderColorPaginPagesItemHover, 'border-color', '!important');
  }

  const boxShadowPaginPagesItemHover = getResponsiveSetting(settings, 'pagination_count_item_shadow', ':hover');

  if (boxShadowPaginPagesItemHover) {
    styles += shadowControllerToStyles(boxShadowPaginPagesItemHover);
  }

  styles += `} `;

  styles += `${parentClass} .active.altrp-pagination-pages__item {`;

  const colorActivePaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_active_count_text_color');

  if (colorActivePaginPagesItem) {
    styles += colorPropertyStyled(colorActivePaginPagesItem, 'color');
  }

  const backgroundColorActivePaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_background_color');

  if (backgroundColorActivePaginPagesItem) {
    styles += colorPropertyStyled(backgroundColorActivePaginPagesItem, 'background');
  }

  const borderColorActivePaginPagesItem = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_border_color');

  if (borderColorActivePaginPagesItem) {
    styles += colorPropertyStyled(borderColorActivePaginPagesItem, 'border-color');
  }

  styles += `} `;

  styles += `${parentClass} .active.altrp-pagination-pages__item:hover {`;

  const colorActivePaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_active_count_text_color', ':hover');

  if (colorActivePaginPagesItemHover) {
    styles += colorPropertyStyled(colorActivePaginPagesItemHover, 'color');
  }

  const backgroundColorActivePaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_background_color', ':hover');

  if (backgroundColorActivePaginPagesItemHover) {
    styles += colorPropertyStyled(backgroundColorActivePaginPagesItemHover, 'background');
  }

  const borderColorActivePaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_border_color', ':hover');

  if (borderColorActivePaginPagesItemHover) {
    styles += colorPropertyStyled(borderColorActivePaginPagesItemHover, 'border-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item {`;

  const typographicPaginPaginPagesItem = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic');

  if (typographicPaginPaginPagesItem) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItem);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item {`;

  const typographicPaginPaginPagesItemDisabled = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic', '.state-disabled');

  if (typographicPaginPaginPagesItemDisabled) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemDisabled);
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item {`;

  const typographicPaginPaginPagesItemActive = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic', '.active');

  if (typographicPaginPaginPagesItemActive) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item:hover {`;

  const typographicPaginPaginPagesItemHover = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic', ':hover');

  if (typographicPaginPaginPagesItemHover) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__ellipsis {`;

  const marginPaginEllipsis = getResponsiveSetting(settings, 'ellipsis_margin');

  if (marginPaginEllipsis) {
    styles += dimensionsControllerToStyles(marginPaginEllipsis, 'margin');
  }

  const colorPaginEllipsis = getResponsiveSetting(settings, 'ellipsis_color');

  if (colorPaginEllipsis) {
    styles += colorPropertyStyled(colorPaginEllipsis, 'color');
  }

  const typographicPaginEllipsis = getResponsiveSetting(settings, 'ellipsis_typographic');

  if (typographicPaginEllipsis) {
    styles += typographicControllerToStyles(typographicPaginEllipsis);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__ellipsis {`;

  const marginPaginEllipsisDisabled = getResponsiveSetting(settings, 'ellipsis_margin', '.state-disabled');

  if (marginPaginEllipsisDisabled) {
    styles += dimensionsControllerToStyles(marginPaginEllipsisDisabled, 'margin');
  }

  const colorPaginEllipsisDisabled = getResponsiveSetting(settings, 'ellipsis_color', '.state-disabled');

  if (colorPaginEllipsisDisabled) {
    styles += colorPropertyStyled(colorPaginEllipsisDisabled, 'color');
  }

  const typographicPaginEllipsisDisabled = getResponsiveSetting(settings, 'ellipsis_typographic', '.state-disabled');

  if (typographicPaginEllipsisDisabled) {
    styles += typographicControllerToStyles(typographicPaginEllipsisDisabled);
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__ellipsis {`;

  const marginPaginEllipsisActive = getResponsiveSetting(settings, 'ellipsis_margin', '.active');

  if (marginPaginEllipsisActive) {
    styles += dimensionsControllerToStyles(marginPaginEllipsisActive, 'margin');
  }

  const colorPaginEllipsisActive = getResponsiveSetting(settings, 'ellipsis_color', '.active');

  if (colorPaginEllipsisActive) {
    styles += colorPropertyStyled(colorPaginEllipsisActive, 'color');
  }

  const typographicPaginEllipsisActive = getResponsiveSetting(settings, 'ellipsis_typographic', '.active');

  if (typographicPaginEllipsisActive) {
    styles += typographicControllerToStyles(typographicPaginEllipsisActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__ellipsis:hover {`;

  const marginPaginEllipsisHover = getResponsiveSetting(settings, 'ellipsis_margin', ':hover');

  if (marginPaginEllipsisHover) {
    styles += dimensionsControllerToStyles(marginPaginEllipsisHover, 'margin');
  }

  const colorPaginEllipsisHover = getResponsiveSetting(settings, 'ellipsis_color', ':hover');

  if (colorPaginEllipsisHover) {
    styles += colorPropertyStyled(colorPaginEllipsisHover, 'color');
  }

  const typographicPaginEllipsisHover = getResponsiveSetting(settings, 'ellipsis_typographic', ':hover');

  if (typographicPaginEllipsisHover) {
    styles += typographicControllerToStyles(typographicPaginEllipsisHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__goto-page {`;

  const marginPaginGotoPage = getResponsiveSetting(settings, 'goto-page_margin');

  if (marginPaginGotoPage) {
    styles += dimensionsControllerToStyles(marginPaginGotoPage, 'margin');
  }

  const paddingPaginGotoPage = getResponsiveSetting(settings, 'page_input_padding');

  if (paddingPaginGotoPage) {
    styles += dimensionsControllerToStyles(paddingPaginGotoPage);
  }

  const colorPaginGotoPage = getResponsiveSetting(settings, 'page_input_text_color');

  if (colorPaginGotoPage) {
    styles += colorPropertyStyled(colorPaginGotoPage, 'color');
  }

  const backgroundColorPaginGotoPage = getResponsiveSetting(settings, 'page_input_background_color');

  if (backgroundColorPaginGotoPage) {
    styles += colorPropertyStyled(backgroundColorPaginGotoPage, 'background-color');
  }

  const borderTypePaginGotoPage = getResponsiveSetting(settings, 'page_input_border_type');

  if (borderTypePaginGotoPage) {
    styles += simplePropertyStyled(borderTypePaginGotoPage, 'border-style');
  }

  const borderWidthPaginGotoPage = getResponsiveSetting(settings, 'page_input_border_width');

  if (borderWidthPaginGotoPage) {
    styles += borderWidthStyled(borderWidthPaginGotoPage);
  }

  const borderColorPaginGotoPage = getResponsiveSetting(settings, 'page_input_border_color');

  if (borderColorPaginGotoPage) {
    styles += colorPropertyStyled(borderColorPaginGotoPage, 'border-color');
  }

  const borderRadiusPaginGotoPage = getResponsiveSetting(settings, 'page_input_border_radius');

  if (borderRadiusPaginGotoPage) {
    styles += dimensionsControllerToStyles(borderRadiusPaginGotoPage, 'border-radius');
  }

  const boxShadowPaginGotoPage = getResponsiveSetting(settings, 'page_input_shadow');

  if (boxShadowPaginGotoPage) {
    styles += shadowControllerToStyles(boxShadowPaginGotoPage);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__goto-page {`;

  const marginPaginGotoPageDisabled = getResponsiveSetting(settings, 'goto-page_margin', '.state-disabled');

  if (marginPaginGotoPageDisabled) {
    styles += dimensionsControllerToStyles(marginPaginGotoPageDisabled, 'margin');
  }

  const paddingPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_padding', '.state-disabled');

  if (paddingPaginGotoPageDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginGotoPageDisabled);
  }

  const colorPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_text_color', '.state-disabled');

  if (colorPaginGotoPageDisabled) {
    styles += colorPropertyStyled(colorPaginGotoPageDisabled, 'color');
  }

  const backgroundColorPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_background_color', '.state-disabled');

  if (backgroundColorPaginGotoPageDisabled) {
    styles += colorPropertyStyled(backgroundColorPaginGotoPageDisabled, 'background-color');
  }

  const borderTypePaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_border_type', '.state-disabled');

  if (borderTypePaginGotoPageDisabled) {
    styles += simplePropertyStyled(borderTypePaginGotoPageDisabled, 'border-style');
  }

  const borderWidthPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_border_width', '.state-disabled');

  if (borderWidthPaginGotoPageDisabled) {
    styles += borderWidthStyled(borderWidthPaginGotoPageDisabled);
  }

  const borderColorPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_border_color', '.state-disabled');

  if (borderColorPaginGotoPageDisabled) {
    styles += colorPropertyStyled(borderColorPaginGotoPageDisabled, 'border-color');
  }

  const borderRadiusPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_border_radius', '.state-disabled');

  if (borderRadiusPaginGotoPageDisabled) {
    styles += dimensionsControllerToStyles(borderRadiusPaginGotoPageDisabled, 'border-radius');
  }

  const boxShadowPaginGotoPageDisabled = getResponsiveSetting(settings, 'page_input_shadow', '.state-disabled');

  if (boxShadowPaginGotoPageDisabled) {
    styles += shadowControllerToStyles(boxShadowPaginGotoPageDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__goto-page {`;

  const marginPaginGotoPageActive = getResponsiveSetting(settings, 'goto-page_margin', '.active');

  if (marginPaginGotoPageActive) {
    styles += dimensionsControllerToStyles(marginPaginGotoPageActive, 'margin');
  }

  const paddingPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_padding', '.active');

  if (paddingPaginGotoPageActive) {
    styles += dimensionsControllerToStyles(paddingPaginGotoPageActive);
  }

  const colorPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_text_color', '.active');

  if (colorPaginGotoPageActive) {
    styles += colorPropertyStyled(colorPaginGotoPageActive, 'color');
  }

  const backgroundColorPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_background_color', '.active');

  if (backgroundColorPaginGotoPageActive) {
    styles += colorPropertyStyled(backgroundColorPaginGotoPageActive, 'background-color');
  }

  const borderTypePaginGotoPageActive = getResponsiveSetting(settings, 'page_input_border_type', '.active');

  if (borderTypePaginGotoPageActive) {
    styles += simplePropertyStyled(borderTypePaginGotoPageActive, 'border-style');
  }

  const borderWidthPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_border_width', '.active');

  if (borderWidthPaginGotoPageActive) {
    styles += borderWidthStyled(borderWidthPaginGotoPageActive);
  }

  const borderColorPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_border_color', '.active');

  if (borderColorPaginGotoPageActive) {
    styles += colorPropertyStyled(borderColorPaginGotoPageActive, 'border-color');
  }

  const borderRadiusPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_border_radius', '.active');

  if (borderRadiusPaginGotoPageActive) {
    styles += dimensionsControllerToStyles(borderRadiusPaginGotoPageActive, 'border-radius');
  }

  const boxShadowPaginGotoPageActive = getResponsiveSetting(settings, 'page_input_shadow', '.active');

  if (boxShadowPaginGotoPageActive) {
    styles += shadowControllerToStyles(boxShadowPaginGotoPageActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__goto-page:hover {`;

  const marginPaginGotoPageHover = getResponsiveSetting(settings, 'goto-page_margin', ':hover');

  if (marginPaginGotoPageHover) {
    styles += dimensionsControllerToStyles(marginPaginGotoPageHover, 'margin');
  }

  const paddingPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_padding', ':hover');

  if (paddingPaginGotoPageHover) {
    styles += dimensionsControllerToStyles(paddingPaginGotoPageHover);
  }

  const colorPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_text_color', ':hover');

  if (colorPaginGotoPageHover) {
    styles += colorPropertyStyled(colorPaginGotoPageHover, 'color');
  }

  const backgroundColorPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_background_color', ':hover');

  if (backgroundColorPaginGotoPageHover) {
    styles += colorPropertyStyled(backgroundColorPaginGotoPageHover, 'background-color');
  }

  const borderTypePaginGotoPageHover = getResponsiveSetting(settings, 'page_input_border_type', ':hover');

  if (borderTypePaginGotoPageHover) {
    styles += simplePropertyStyled(borderTypePaginGotoPageHover, 'border-style');
  }

  const borderWidthPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_border_width', ':hover');

  if (borderWidthPaginGotoPageHover) {
    styles += borderWidthStyled(borderWidthPaginGotoPageHover);
  }

  const borderColorPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_border_color', ':hover');

  if (borderColorPaginGotoPageHover) {
    styles += colorPropertyStyled(borderColorPaginGotoPageHover, 'border-color');
  }

  const borderRadiusPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_border_radius', ':hover');

  if (borderRadiusPaginGotoPageHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginGotoPageHover, 'border-radius');
  }

  const boxShadowPaginGotoPageHover = getResponsiveSetting(settings, 'page_input_shadow', ':hover');

  if (boxShadowPaginGotoPageHover) {
    styles += shadowControllerToStyles(boxShadowPaginGotoPageHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-posts {`;

  const paddingPosts = getResponsiveSetting(settings, 'position_padding');

  if (paddingPosts) {
    styles += dimensionsControllerToStyles(paddingPosts);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-posts {`;

  const paddingPostsDisabled = getResponsiveSetting(settings, 'position_padding', '.state-disabled');

  if (paddingPostsDisabled) {
    styles += dimensionsControllerToStyles(paddingPostsDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-posts {`;

  const paddingPostsActive = getResponsiveSetting(settings, 'position_padding', '.active');

  if (paddingPostsActive) {
    styles += dimensionsControllerToStyles(paddingPostsActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-posts:hover {`;

  const paddingPostsHover = getResponsiveSetting(settings, 'position_padding', ':hover');

  if (paddingPostsHover) {
    styles += dimensionsControllerToStyles(paddingPostsHover);
  }

  styles += `} `;

  styles += `${parentClass} > .altrp-pagination-pages {`;

  const paddingPaginPages = getResponsiveSetting(settings, 'posts_pagination_padding');

  if (paddingPaginPages) {
    styles += dimensionsControllerToStyles(paddingPaginPages);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} > .altrp-pagination-pages {`;

  const paddingPaginPagesDisabled = getResponsiveSetting(settings, 'posts_pagination_padding', '.state-disabled');

  if (paddingPaginPagesDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginPagesDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} > .altrp-pagination-pages {`;

  const paddingPaginPagesActive = getResponsiveSetting(settings, 'posts_pagination_padding', '.active');

  if (paddingPaginPagesActive) {
    styles += dimensionsControllerToStyles(paddingPaginPagesActive);
  }

  styles += `} `;

  styles += `${parentClass} > .altrp-pagination-pages:hover {`;

  const paddingPaginPagesHover = getResponsiveSetting(settings, 'posts_pagination_padding', ':hover');

  if (paddingPaginPagesHover) {
    styles += dimensionsControllerToStyles(paddingPaginPagesHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page {`;

  const typographicPaginPaginGotoPages = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page');

  if (typographicPaginPaginGotoPages) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPages);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page {`;

  const typographicPaginPaginGotoPagesDisabled = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page', '.state-disabled');

  if (typographicPaginPaginGotoPagesDisabled) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPagesDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page {`;

  const typographicPaginPaginGotoPagesActive = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page', '.active');

  if (typographicPaginPaginGotoPagesActive) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPagesActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page:hover {`;

  const typographicPaginPaginGotoPagesHover = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page', ':hover');

  if (typographicPaginPaginGotoPagesHover) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPagesHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next, ${parentClass} .altrp-pagination-pages__item, ${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination__previous {`;

  const typographicPaginPaginPagesItemCountPrev = getResponsiveSetting(settings, 'table_style_pagination_typographic');

  if (typographicPaginPaginPagesItemCountPrev) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemCountPrev);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__next, ${parentClass} .altrp-pagination-pages__item, ${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination__previous {`;

  const typographicPaginPaginPagesItemCountPrevDisabled = getResponsiveSetting(settings, 'table_style_pagination_typographic', '.state-disabled');

  if (typographicPaginPaginPagesItemCountPrevDisabled) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemCountPrevDisabled);
  }

  styles += `} `;
  //state active
  styles += `${parentClass} .altrp-pagination__next, ${parentClass} .altrp-pagination-pages__item, ${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination__previous {`;

  const typographicPaginPaginPagesItemCountPrevActive = getResponsiveSetting(settings, 'table_style_pagination_typographic', '.active');

  if (typographicPaginPaginPagesItemCountPrevActive) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemCountPrevActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover, ${parentClass} .altrp-pagination-pages__item:hover, ${parentClass} .altrp-pagination__count:hover, ${parentClass} .altrp-pagination__previous:hover {`;

  const typographicPaginPaginPagesItemCountPrevHover = getResponsiveSetting(settings, 'table_style_pagination_typographic', ':hover');

  if (typographicPaginPaginPagesItemCountPrevHover) {
    styles += typographicControllerToStyles(typographicPaginPaginPagesItemCountPrevHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size {`;

  const marginPaginSelectSize = getResponsiveSetting(settings, 'pagination_select_margin');

  if (marginPaginSelectSize) {
    styles += dimensionsControllerToStyles(marginPaginSelectSize, 'margin');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__select-size {`;

  const marginPaginSelectSizeDisabled = getResponsiveSetting(settings, 'pagination_select_margin', '.state-disabled');

  if (marginPaginSelectSizeDisabled) {
    styles += dimensionsControllerToStyles(marginPaginSelectSizeDisabled, 'margin');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__select-size {`;

  const marginPaginSelectSizeActive = getResponsiveSetting(settings, 'pagination_select_margin', '.active');

  if (marginPaginSelectSizeActive) {
    styles += dimensionsControllerToStyles(marginPaginSelectSizeActive, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size:hover {`;

  const marginPaginSelectSizeHover = getResponsiveSetting(settings, 'pagination_select_margin', ':hover');

  if (marginPaginSelectSizeHover) {
    styles += dimensionsControllerToStyles(marginPaginSelectSizeHover, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const paddingPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_padding');

  if (paddingPaginSelectSizeControl) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControl);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const paddingPaginSelectSizeControlDisabled = getResponsiveSetting(settings, 'pagination_select_padding', '.state-disabled');

  if (paddingPaginSelectSizeControlDisabled) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControlDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const paddingPaginSelectSizeControlActive = getResponsiveSetting(settings, 'pagination_select_padding', '.active');

  if (paddingPaginSelectSizeControlActive) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControlActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control:hover {`;

  const paddingPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_padding', ':hover');

  if (paddingPaginSelectSizeControlHover) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControlHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size {`;

  const typographicPaginPaginSelectSize = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic');

  if (typographicPaginPaginSelectSize) {
    styles += typographicControllerToStyles(typographicPaginPaginSelectSize);
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size {`;

  const typographicPaginPaginSelectSizeDisabled = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic', '.state-disabled');

  if (typographicPaginPaginSelectSizeDisabled) {
    styles += typographicControllerToStyles(typographicPaginPaginSelectSizeDisabled);
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size {`;

  const typographicPaginPaginSelectSizeActive = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic', '.active');

  if (typographicPaginPaginSelectSizeActive) {
    styles += typographicControllerToStyles(typographicPaginPaginSelectSizeActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size:hover {`;

  const typographicPaginPaginSelectSizeHover = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic', ':hover');

  if (typographicPaginPaginSelectSizeHover) {
    styles += typographicControllerToStyles(typographicPaginPaginSelectSizeHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const borderTypePaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_border_type');

  if (borderTypePaginSelect2Control) {
    styles += simplePropertyStyled(borderTypePaginSelect2Control, 'border-style');
  }

  const borderWidthPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_border_width');

  if (borderWidthPaginSelect2Control) {
    styles += borderWidthStyled(borderWidthPaginSelect2Control);
  }

  const borderRadiusPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_border_radius');

  if (borderRadiusPaginSelect2Control) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelect2Control, 'border-radius');
  }

  const borderColorPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_border_color');

  if (borderColorPaginSelect2Control) {
    styles += colorPropertyStyled(borderColorPaginSelect2Control, 'border-color');
  }

  const boxShadowPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_shadow');

  if (boxShadowPaginSelect2Control) {
    styles += shadowControllerToStyles(boxShadowPaginSelect2Control);
  }

  const colorPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_text_color');

  if (colorPaginSelect2Control) {
    styles += colorPropertyStyled(colorPaginSelect2Control, 'color');
  }

  const backgroundColorPaginSelect2Control = getResponsiveSetting(settings, 'pagination_select_background_color');

  if (backgroundColorPaginSelect2Control) {
    styles += colorPropertyStyled(backgroundColorPaginSelect2Control, 'background-color');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const borderTypePaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_border_type', '.state-disabled');

  if (borderTypePaginSelect2ControlDisabled) {
    styles += simplePropertyStyled(borderTypePaginSelect2ControlDisabled, 'border-style');
  }

  const borderWidthPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_border_width', '.state-disabled');

  if (borderWidthPaginSelect2ControlDisabled) {
    styles += borderWidthStyled(borderWidthPaginSelect2ControlDisabled);
  }

  const borderRadiusPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_border_radius', '.state-disabled');

  if (borderRadiusPaginSelect2ControlDisabled) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelect2ControlDisabled, 'border-radius');
  }

  const borderColorPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_border_color', '.state-disabled');

  if (borderColorPaginSelect2ControlDisabled) {
    styles += colorPropertyStyled(borderColorPaginSelect2ControlDisabled, 'border-color');
  }

  const boxShadowPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_shadow', '.state-disabled');

  if (boxShadowPaginSelect2ControlDisabled) {
    styles += shadowControllerToStyles(boxShadowPaginSelect2ControlDisabled);
  }

  const colorPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_text_color', '.state-disabled');

  if (colorPaginSelect2ControlDisabled) {
    styles += colorPropertyStyled(colorPaginSelect2ControlDisabled, 'color');
  }

  const backgroundColorPaginSelect2ControlDisabled = getResponsiveSetting(settings, 'pagination_select_background_color', '.state-disabled');

  if (backgroundColorPaginSelect2ControlDisabled) {
    styles += colorPropertyStyled(backgroundColorPaginSelect2ControlDisabled, 'background-color');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const borderTypePaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_border_type', '.active');

  if (borderTypePaginSelect2ControlActive) {
    styles += simplePropertyStyled(borderTypePaginSelect2ControlActive, 'border-style');
  }

  const borderWidthPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_border_width', '.active');

  if (borderWidthPaginSelect2ControlActive) {
    styles += borderWidthStyled(borderWidthPaginSelect2ControlActive);
  }

  const borderRadiusPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_border_radius', '.active');

  if (borderRadiusPaginSelect2ControlActive) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelect2ControlActive, 'border-radius');
  }

  const borderColorPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_border_color', '.active');

  if (borderColorPaginSelect2ControlActive) {
    styles += colorPropertyStyled(borderColorPaginSelect2ControlActive, 'border-color');
  }

  const boxShadowPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_shadow', '.active');

  if (boxShadowPaginSelect2ControlActive) {
    styles += shadowControllerToStyles(boxShadowPaginSelect2ControlActive);
  }

  const colorPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_text_color', '.active');

  if (colorPaginSelect2ControlActive) {
    styles += colorPropertyStyled(colorPaginSelect2ControlActive, 'color');
  }

  const backgroundColorPaginSelect2ControlActive = getResponsiveSetting(settings, 'pagination_select_background_color', '.active');

  if (backgroundColorPaginSelect2ControlActive) {
    styles += colorPropertyStyled(backgroundColorPaginSelect2ControlActive, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control:hover {`;

  const borderTypePaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_border_type', ':hover');

  if (borderTypePaginSelect2ControlHover) {
    styles += simplePropertyStyled(borderTypePaginSelect2ControlHover, 'border-style');
  }

  const borderWidthPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_border_width', ':hover');

  if (borderWidthPaginSelect2ControlHover) {
    styles += borderWidthStyled(borderWidthPaginSelect2ControlHover);
  }

  const borderRadiusPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_border_radius', ':hover');

  if (borderRadiusPaginSelect2ControlHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelect2ControlHover, 'border-radius');
  }

  const borderColorPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_border_color', ':hover');

  if (borderColorPaginSelect2ControlHover) {
    styles += colorPropertyStyled(borderColorPaginSelect2ControlHover, 'border-color');
  }

  const boxShadowPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_shadow', ':hover');

  if (boxShadowPaginSelect2ControlHover) {
    styles += shadowControllerToStyles(boxShadowPaginSelect2ControlHover);
  }

  const colorPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_text_color', ':hover');

  if (colorPaginSelect2ControlHover) {
    styles += colorPropertyStyled(colorPaginSelect2ControlHover, 'color');
  }

  const backgroundColorPaginSelect2ControlHover = getResponsiveSetting(settings, 'pagination_select_background_color', ':hover');

  if (backgroundColorPaginSelect2ControlHover) {
    styles += colorPropertyStyled(backgroundColorPaginSelect2ControlHover, 'background-color');
  }

  styles += `} `;

  return styles;
}
