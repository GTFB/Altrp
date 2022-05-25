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
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";

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
