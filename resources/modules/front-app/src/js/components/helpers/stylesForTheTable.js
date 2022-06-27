import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  filtersControllerToStyles,
  marginTopLeftStyled,
  iconSizeStyled,
  sizeStyled,
  shadowControllerToStyles,
} from '../../helpers/styles';
import getResponsiveSetting from "../../functions/getResponsiveSetting";

/**
 * Преобразует объект стилей, который задается в виджете Table в строку css для вставки в GlobalStyles
 * @param {{}} settings
 * @param {string} id
 * @return {string}
 */

export function getTableStyles(settings, id) {
  let styles = '';

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-table {`;

  const borderType = getResponsiveSetting(settings, 'table_style_table_border_type');

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style', '!important');
  }

  const borderWidth = getResponsiveSetting(settings, 'table_style_table_border_width');

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth, '!important');
  }

  const borderColor = getResponsiveSetting(settings, 'table_style_table_border_color');

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color', '!important');
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-table:hover {`;

  const borderTypeHover = getResponsiveSetting(settings, 'table_style_table_border_type', ':hover');

  if (borderTypeHover) {
    styles += simplePropertyStyled(borderTypeHover, 'border-style', '!important');
  }

  const borderWidthHover = getResponsiveSetting(settings, 'table_style_table_border_width', ':hover');

  if (borderWidthHover) {
    styles += borderWidthStyled(borderWidthHover, '!important');
  }

  const borderColorHover = getResponsiveSetting(settings, 'table_style_table_border_color', ':hover');

  if (borderColorHover) {
    styles += colorPropertyStyled(borderColorHover, 'border-color', '!important');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next {`;

  const flexDirection = getResponsiveSetting(settings, 'next_icon_position');

  if (flexDirection && flexDirection !== 'default') {
    styles += simplePropertyStyled(flexDirection, 'flex-direction');
  }

  const margin = getResponsiveSetting(settings, 'next_page_button_margin');

  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover {`;

  const flexDirectionHover = getResponsiveSetting(settings, 'next_icon_position', ':hover');

  if (flexDirectionHover && flexDirectionHover !== 'default') {
    styles += simplePropertyStyled(flexDirectionHover, 'flex-direction');
  }

  const marginHover = getResponsiveSetting(settings, 'next_page_button_margin', ':hover');

  if (marginHover) {
    styles += dimensionsControllerToStyles(marginHover, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next svg {`;

  const marginPaginationSvg = getResponsiveSetting(settings, 'next_icon_margin');

  if (marginPaginationSvg) {
    styles += dimensionsControllerToStyles(marginPaginationSvg, 'margin');
  }

  const iconSize = getResponsiveSetting(settings, 'next_icon_size');

  if (iconSize) {
    styles += iconSizeStyled(iconSize);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover svg {`;

  const marginPaginationSvgHover = getResponsiveSetting(settings, 'next_icon_margin', ':hover');

  if (marginPaginationSvgHover) {
    styles += dimensionsControllerToStyles(marginPaginationSvgHover, 'margin');
  }

  const iconSizeHover = getResponsiveSetting(settings, 'next_icon_size', ':hover');

  if (iconSizeHover) {
    styles += iconSizeStyled(iconSizeHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next img {`;

  const iconSizeNextImg = getResponsiveSetting(settings, 'next_icon_size');

  if (iconSizeNextImg) {
    styles += sizeStyled(iconSizeNextImg, 'width');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover img {`;

  const iconSizeNextImgHover = getResponsiveSetting(settings, 'next_icon_size', ':hover');

  if (iconSizeNextImgHover) {
    styles += sizeStyled(iconSizeNextImgHover, 'width');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next path {`;

  const iconFillNextPath = getResponsiveSetting(settings, 'next_icon_color');

  if (iconFillNextPath) {
    styles += colorPropertyStyled(iconFillNextPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover path {`;

  const iconFillNextPathHover = getResponsiveSetting(settings, 'next_icon_color', ':hover');

  if (iconFillNextPathHover) {
    styles += colorPropertyStyled(iconFillNextPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous {`;

  const flexDirectionPaginationPrev = getResponsiveSetting(settings, 'prev_icon_position');

  if (flexDirectionPaginationPrev && flexDirectionPaginationPrev !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginationPrev, 'flex-direction');
  }

  const marginPaginationPrev = getResponsiveSetting(settings, 'prev_page_button_margin');

  if (marginPaginationPrev) {
    styles += dimensionsControllerToStyles(marginPaginationPrev, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover {`;

  const flexDirectionPaginationPrevHover = getResponsiveSetting(settings, 'prev_icon_position', ':hover');

  if (flexDirectionPaginationPrevHover && flexDirectionPaginationPrevHover !== 'default') {
    styles += simplePropertyStyled(flexDirectionPaginationPrevHover, 'flex-direction');
  }

  const marginPaginationPrevHover = getResponsiveSetting(settings, 'prev_page_button_margin', ':hover');

  if (marginPaginationPrevHover) {
    styles += dimensionsControllerToStyles(marginPaginationPrevHover, 'margin');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous svg {`;

  const marginPrevSvg = getResponsiveSetting(settings, 'prev_icon_padding');

  if (marginPrevSvg) {
    styles += dimensionsControllerToStyles(marginPrevSvg, 'margin');
  }

  const iconSizePrevSvg = getResponsiveSetting(settings, 'prev_icon_size');

  if (iconSizePrevSvg) {
    styles += iconSizeStyled(iconSizePrevSvg);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover svg {`;

  const marginPrevSvgHover = getResponsiveSetting(settings, 'prev_icon_padding', ':hover');

  if (marginPrevSvgHover) {
    styles += dimensionsControllerToStyles(marginPrevSvgHover, 'margin');
  }

  const iconSizePrevSvgHover = getResponsiveSetting(settings, 'prev_icon_size', ':hover');

  if (iconSizePrevSvgHover) {
    styles += iconSizeStyled(iconSizePrevSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous img {`;

  const iconSizePrevImg = getResponsiveSetting(settings, 'prev_icon_size');

  if (iconSizePrevImg) {
    styles += sizeStyled(iconSizePrevImg, 'width');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover img {`;

  const iconSizePrevImgHover = getResponsiveSetting(settings, 'prev_icon_size', ':hover');

  if (iconSizePrevImgHover) {
    styles += sizeStyled(iconSizePrevImgHover, 'width');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous path {`;

  const iconFillPrevPath = getResponsiveSetting(settings, 'prev_icon_color');

  if (iconFillPrevPath) {
    styles += colorPropertyStyled(iconFillPrevPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover path {`;

  const iconFillPrevPathHover = getResponsiveSetting(settings, 'prev_icon_color', ':hover');

  if (iconFillPrevPathHover) {
    styles += colorPropertyStyled(iconFillPrevPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .replace-text {`;

  const colorReplaceText = getResponsiveSetting(settings, 'replace_text_color');

  if (colorReplaceText) {
    styles += colorPropertyStyled(colorReplaceText, 'color');
  }

  const typographicReplaceText = getResponsiveSetting(settings, 'replace_text_typographic');

  if (typographicReplaceText) {
    styles += typographicControllerToStyles(typographicReplaceText);
  }

  styles += `} `;

  styles += `${parentClass} .replace-text:hover {`;

  const colorReplaceTextHover = getResponsiveSetting(settings, 'replace_text_color', ':hover');

  if (colorReplaceTextHover) {
    styles += colorPropertyStyled(colorReplaceTextHover, 'color');
  }

  const typographicReplaceTextHover = getResponsiveSetting(settings, 'replace_text_typographic', ':hover');

  if (typographicReplaceTextHover) {
    styles += typographicControllerToStyles(typographicReplaceTextHover);
  }

  styles += `} `;

  styles += `${parentClass} .replace-picture {`;

  const widthPictureReplacePicture = getResponsiveSetting(settings, 'replace_image_width');

  if (widthPictureReplacePicture) {
    styles += sizeStyled(widthPictureReplacePicture, 'width');
  }

  const heightReplacePicture = getResponsiveSetting(settings, 'replace_image_height');

  if (heightReplacePicture) {
    styles += sizeStyled(heightReplacePicture, 'height');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th .grouped-column {`;

  const paddingGroupedColumn = getResponsiveSetting(settings, 'grouped_column_icon_padding');

  if (paddingGroupedColumn) {
    styles += dimensionsControllerToStyles(paddingGroupedColumn);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover .grouped-column {`;

  const paddingGroupedColumnHover = getResponsiveSetting(settings, 'grouped_column_icon_padding', ':hover');

  if (paddingGroupedColumnHover) {
    styles += dimensionsControllerToStyles(paddingGroupedColumnHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th path {`;

  const iconFillTableThPath = getResponsiveSetting(settings, 'grouped_column_icon_color');

  if (iconFillTableThPath) {
    styles += colorPropertyStyled(iconFillTableThPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover path {`;

  const iconFillTableThPathHover = getResponsiveSetting(settings, 'grouped_column_icon_color', ':hover');

  if (iconFillTableThPathHover) {
    styles += colorPropertyStyled(iconFillTableThPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th .grouped-column, ${parentClass} .altrp-table-th svg, ${parentClass} .altrp-table-th img {`;

  const iconSizeGroupedColumnSvgImg = getResponsiveSetting(settings, 'grouped_column_icon_size');

  if (iconSizeGroupedColumnSvgImg) {
    styles += iconSizeStyled(iconSizeGroupedColumnSvgImg);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover .grouped-column, ${parentClass} .altrp-table-th:hover svg, ${parentClass} .altrp-table-th:hover img {`;

  const iconSizeGroupedColumnSvgImgHover = getResponsiveSetting(settings, 'grouped_column_icon_size', ':hover');

  if (iconSizeGroupedColumnSvgImgHover) {
    styles += iconSizeStyled(iconSizeGroupedColumnSvgImgHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th .not-grouped-column {`;

  const paddingNotGroupedColumn = getResponsiveSetting(settings, 'not_grouped_column_icon_padding');

  if (paddingNotGroupedColumn) {
    styles += dimensionsControllerToStyles(paddingNotGroupedColumn);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover .not-grouped-column {`;

  const paddingNotGroupedColumnHover = getResponsiveSetting(settings, 'not_grouped_column_icon_padding', ':hover');

  if (paddingNotGroupedColumnHover) {
    styles += dimensionsControllerToStyles(paddingNotGroupedColumnHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th .not-grouped-column path {`;

  const iconFillNotGroupedColumnPath = getResponsiveSetting(settings, 'not_grouped_column_icon_color');

  if (iconFillNotGroupedColumnPath) {
    styles += colorPropertyStyled(iconFillNotGroupedColumnPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover .not-grouped-column path {`;

  const iconFillNotGroupedColumnPathHover = getResponsiveSetting(settings, 'not_grouped_column_icon_color', ':hover');

  if (iconFillNotGroupedColumnPathHover) {
    styles += colorPropertyStyled(iconFillNotGroupedColumnPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th .not-grouped-column, ${parentClass} .altrp-table-th .not-grouped-column svg, ${parentClass} .altrp-table-th .not-grouped-column img {`;

  const iconSizeNotGroupedColumnSvgImg = getResponsiveSetting(settings, 'not_grouped_column_icon_size');

  if (iconSizeNotGroupedColumnSvgImg) {
    styles += iconSizeStyled(iconSizeNotGroupedColumnSvgImg);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover .not-grouped-column, ${parentClass} .altrp-table-th:hover .not-grouped-column svg, ${parentClass} .altrp-table-th:hover .not-grouped-column img {`;

  const iconSizeNotGroupedColumnSvgImgHover = getResponsiveSetting(settings, 'not_grouped_column_icon_size', ':hover');

  if (iconSizeNotGroupedColumnSvgImgHover) {
    styles += iconSizeStyled(iconSizeNotGroupedColumnSvgImgHover);
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row {`;

  const paddingExpandedRow = getResponsiveSetting(settings, 'expanded_row_icon_padding');

  if (paddingExpandedRow) {
    styles += dimensionsControllerToStyles(paddingExpandedRow);
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row:hover {`;

  const paddingExpandedRowHover = getResponsiveSetting(settings, 'expanded_row_icon_padding', ':hover');

  if (paddingExpandedRowHover) {
    styles += dimensionsControllerToStyles(paddingExpandedRowHover);
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row path {`;

  const iconFillExpandedRowPath = getResponsiveSetting(settings, 'expanded_row_icon_color');

  if (iconFillExpandedRowPath) {
    styles += colorPropertyStyled(iconFillExpandedRowPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row:hover path {`;

  const iconFillExpandedRowPathHover = getResponsiveSetting(settings, 'expanded_row_icon_color', ':hover');

  if (iconFillExpandedRowPathHover) {
    styles += colorPropertyStyled(iconFillExpandedRowPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row, ${parentClass} .expanded-row svg, ${parentClass}  .expanded-row img {`;

  const iconSizeExpandedRowSvgImg = getResponsiveSetting(settings, 'expanded_row_icon_size');

  if (iconSizeExpandedRowSvgImg) {
    styles += iconSizeStyled(iconSizeExpandedRowSvgImg);
  }

  styles += `} `;

  styles += `${parentClass} .expanded-row:hover, ${parentClass} .expanded-row svg:hover, ${parentClass}  .expanded-row img:hover {`;

  const iconSizeExpandedRowSvgImgHover = getResponsiveSetting(settings, 'expanded_row_icon_size', ':hover');

  if (iconSizeExpandedRowSvgImgHover) {
    styles += iconSizeStyled(iconSizeExpandedRowSvgImgHover);
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row {`;

  const paddingNotExpandedRow = getResponsiveSetting(settings, 'not_expanded_row_icon_padding');

  if (paddingNotExpandedRow) {
    styles += dimensionsControllerToStyles(paddingNotExpandedRow);
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row:hover {`;

  const paddingNotExpandedRowHover = getResponsiveSetting(settings, 'not_expanded_row_icon_padding', ':hover');

  if (paddingNotExpandedRowHover) {
    styles += dimensionsControllerToStyles(paddingNotExpandedRowHover);
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row path {`;

  const iconFillNotExpandedRowPath = getResponsiveSetting(settings, 'not_expanded_row_icon_color');

  if (iconFillNotExpandedRowPath) {
    styles += colorPropertyStyled(iconFillNotExpandedRowPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row:hover path {`;

  const iconFillNotExpandedRowPathHover = getResponsiveSetting(settings, 'not_expanded_row_icon_color', ':hover');

  if (iconFillNotExpandedRowPathHover) {
    styles += colorPropertyStyled(iconFillNotExpandedRowPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row, ${parentClass} .not-expanded-row svg, ${parentClass} .not-expanded-row img {`;

  const iconSizeNotExpandedRowSvgImg = getResponsiveSetting(settings, 'not_expanded_row_icon_size');

  if (iconSizeNotExpandedRowSvgImg) {
    styles += iconSizeStyled(iconSizeNotExpandedRowSvgImg);
  }

  styles += `} `;

  styles += `${parentClass} .not-expanded-row:hover, ${parentClass} .not-expanded-row svg:hover, ${parentClass} .not-expanded-row img:hover {`;

  const iconSizeNotExpandedRowSvgImgHover = getResponsiveSetting(settings, 'not_expanded_row_icon_size', ':hover');

  if (iconSizeNotExpandedRowSvgImgHover) {
    styles += iconSizeStyled(iconSizeNotExpandedRowSvgImgHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody--striped tr:nth-child(2n), ${parentClass} .altrp-table-tbody--striped .altrp-table-tr:nth-child(2n) {`;

  const colorThNthChild = getResponsiveSetting(settings, 'table_style_table_stripe_color');

  if (colorThNthChild) {
    styles += colorPropertyStyled(colorThNthChild, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody--striped tr:nth-child(2n):hover, ${parentClass} .altrp-table-tbody--striped .altrp-table-tr:nth-child(2n):hover {`;

  const colorThNthChildHover = getResponsiveSetting(settings, 'table_style_table_stripe_color');

  if (colorThNthChildHover) {
    styles += colorPropertyStyled(colorThNthChildHover, 'background-color', ':hover');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-field, ${parentClass} .altrp-table__filter-select>.altrp-field-select2__control, ${parentClass} .altrp-label_slider>.altrp-btn {`;

  const colorFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_table_text_color');

  if (colorFieldSelect2ControlBtn) {
    styles += colorPropertyStyled(colorFieldSelect2ControlBtn, 'color', '!important');
  }

  const backgroundColorFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_table_background_color');

  if (backgroundColorFieldSelect2ControlBtn) {
    styles += colorPropertyStyled(backgroundColorFieldSelect2ControlBtn, 'background-color', '!important');
  }

  const inputPaddingFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_padding');

  if (inputPaddingFieldSelect2ControlBtn) {
    styles += dimensionsControllerToStyles(inputPaddingFieldSelect2ControlBtn);
  }

  const typographicFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_typographic');

  if (typographicFieldSelect2ControlBtn) {
    styles += typographicControllerToStyles(typographicFieldSelect2ControlBtn);
  }

  const borderTypeFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_table_border_type');

  if (borderTypeFieldSelect2ControlBtn) {
    styles += simplePropertyStyled(borderTypeFieldSelect2ControlBtn, 'border-style', '!important');
  }

  const borderWidthFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_table_border_width');

  if (borderWidthFieldSelect2ControlBtn) {
    styles += borderWidthStyled(borderWidthFieldSelect2ControlBtn, '!important');
  }

  const borderColorFieldSelect2ControlBtn = getResponsiveSetting(settings, 'filter_style_table_border_color');

  if (borderColorFieldSelect2ControlBtn) {
    styles += colorPropertyStyled(borderColorFieldSelect2ControlBtn, 'border-color', '!important');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-field:hover, ${parentClass} .altrp-table__filter-select:hover>.altrp-field-select2__control, ${parentClass} .altrp-label_slider>.altrp-btn {`;

  const colorFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_table_text_color', ':hover');

  if (colorFieldSelect2ControlBtnHover) {
    styles += colorPropertyStyled(colorFieldSelect2ControlBtnHover, 'color', '!important');
  }

  const backgroundColorFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_table_background_color', ':hover');

  if (backgroundColorFieldSelect2ControlBtnHover) {
    styles += colorPropertyStyled(backgroundColorFieldSelect2ControlBtnHover, 'background-color', '!important');
  }

  const inputPaddingFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_padding', ':hover');

  if (inputPaddingFieldSelect2ControlBtnHover) {
    styles += dimensionsControllerToStyles(inputPaddingFieldSelect2ControlBtnHover);
  }

  const typographicFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_typographic', ':hover');

  if (typographicFieldSelect2ControlBtnHover) {
    styles += typographicControllerToStyles(typographicFieldSelect2ControlBtnHover);
  }

  const borderTypeFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_table_border_type', ':hover');

  if (borderTypeFieldSelect2ControlBtnHover) {
    styles += simplePropertyStyled(borderTypeFieldSelect2ControlBtnHover, 'border-style', '!important');
  }

  const borderWidthFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_table_border_width', ':hover');

  if (borderWidthFieldSelect2ControlBtnHover) {
    styles += borderWidthStyled(borderWidthFieldSelect2ControlBtnHover, '!important');
  }

  const borderColorFieldSelect2ControlBtnHover = getResponsiveSetting(settings, 'filter_style_table_border_color', ':hover');

  if (borderColorFieldSelect2ControlBtnHover) {
    styles += colorPropertyStyled(borderColorFieldSelect2ControlBtnHover, 'border-color', '!important');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-label {`;

  const labelPaddingLabel = getResponsiveSetting(settings, 'label_padding');

  if (labelPaddingLabel) {
    styles += dimensionsControllerToStyles(labelPaddingLabel);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-label:hover {`;

  const labelPaddingLabelHover = getResponsiveSetting(settings, 'label_padding', ':hover');

  if (labelPaddingLabelHover) {
    styles += dimensionsControllerToStyles(labelPaddingLabelHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th {`;

  const textAlignTableTh = getResponsiveSetting(settings, 'table_table_header_alignment');

  if (textAlignTableTh) {
    styles += simplePropertyStyled(textAlignTableTh, 'text-align');
  }

  const typographicTableTh = getResponsiveSetting(settings, 'table_style_header_font');

  if (typographicTableTh) {
    styles += typographicControllerToStyles(typographicTableTh);
  }

  const colorTableTh = getResponsiveSetting(settings, 'table_style_header_text_color');

  if (colorTableTh) {
    styles += colorPropertyStyled(colorTableTh, 'color');
  }

  const paddingTableTh = getResponsiveSetting(settings, 'table_style_header_padding');

  if (paddingTableTh) {
    styles += dimensionsControllerToStyles(paddingTableTh);
  }

  const borderTypeTableTh = getResponsiveSetting(settings, 'table_style_header_border_type');

  if (borderTypeTableTh) {
    styles += simplePropertyStyled(borderTypeTableTh, 'border-style');
  }

  const borderColorTableTh = getResponsiveSetting(settings, 'table_style_header_border_color');

  if (borderColorTableTh) {
    styles += colorPropertyStyled(borderColorTableTh, 'border-color');
  }

  const borderWidthTableTh = getResponsiveSetting(settings, 'table_style_header_border_width');

  if (borderWidthTableTh) {
    styles += borderWidthStyled(borderWidthTableTh);
  }

  const backgroundColorTableTh = getResponsiveSetting(settings, 'table_style_header_background');

  if (backgroundColorTableTh) {
    styles += `background-color: ${backgroundColorTableTh.color}: `;
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-th:hover {`;

  const textAlignTableThHover = getResponsiveSetting(settings, 'table_table_header_alignment', ':hover');

  if (textAlignTableThHover) {
    styles += simplePropertyStyled(textAlignTableThHover, 'text-align');
  }

  const typographicTableThHover = getResponsiveSetting(settings, 'table_style_header_font', ':hover');

  if (typographicTableThHover) {
    styles += typographicControllerToStyles(typographicTableThHover);
  }

  const colorTableThHover = getResponsiveSetting(settings, 'table_style_header_text_color', ':hover');

  if (colorTableThHover) {
    styles += colorPropertyStyled(colorTableThHover, 'color');
  }

  const paddingTableThHover = getResponsiveSetting(settings, 'table_style_header_padding', ':hover');

  if (paddingTableThHover) {
    styles += dimensionsControllerToStyles(paddingTableThHover);
  }

  const borderTypeTableThHover = getResponsiveSetting(settings, 'table_style_header_border_type', ':hover');

  if (borderTypeTableThHover) {
    styles += simplePropertyStyled(borderTypeTableThHover, 'border-style');
  }

  const borderColorTableThHover = getResponsiveSetting(settings, 'table_style_header_border_color', ':hover');

  if (borderColorTableThHover) {
    styles += colorPropertyStyled(borderColorTableThHover, 'border-color');
  }

  const borderWidthTableThHover = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');

  if (borderWidthTableThHover) {
    styles += borderWidthStyled(borderWidthTableThHover);
  }

  const backgroundColorTableThHover = getResponsiveSetting(settings, 'table_style_header_background', ':hover');

  if (backgroundColorTableThHover) {
    styles += colorPropertyStyled(backgroundColorTableThHover, 'background');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-head {`;

  const backgroundColorTableHead = getResponsiveSetting(settings, 'table_style_header_background');

  if (backgroundColorTableHead) {
    styles += `background-color: ${backgroundColorTableHead.color}; `;
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-head:hover {`;

  const backgroundColorTableHeadHover = getResponsiveSetting(settings, 'table_style_header_background', ':hover');

  if (backgroundColorTableHeadHover) {
    styles += colorPropertyStyled(backgroundColorTableHeadHover, 'background');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-th:not(:first-child) {`;

  const borderWidthTableThNotFirstChild = getResponsiveSetting(settings, 'table_style_header_border_width');

  if (borderWidthTableThNotFirstChild) {
    styles += marginTopLeftStyled(borderWidthTableThNotFirstChild, 'top'); //здесь вернется строка вида: "margin-top: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-th:not(:first-child):hover {`;

  const borderWidthTableThNotFirstChildHover = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');

  if (borderWidthTableThNotFirstChildHover) {
    styles += marginTopLeftStyled(borderWidthTableThNotFirstChildHover, 'top'); //здесь вернется строка вида: "margin-top: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-th {`;

  const borderWidthTableTrNotFirstChild = getResponsiveSetting(settings, 'table_style_header_border_width');

  if (borderWidthTableTrNotFirstChild) {
    styles += marginTopLeftStyled(borderWidthTableTrNotFirstChild, 'left'); //здесь вернется строка вида: "margin-left: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-th:hover {`;

  const borderWidthTableTrNotFirstChildHover = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');

  if (borderWidthTableTrNotFirstChildHover) {
    styles += marginTopLeftStyled(borderWidthTableTrNotFirstChildHover, 'left'); //здесь вернется строка вида: "margin-left: -10px"
  }

  styles += `} `;

  styles += `${parentClass} div:not(.altrp-element) .altrp-table-th {`;

  const verticalAlignDivNotAltrpElement = getResponsiveSetting(settings, 'header_cell_vertical_alignment');

  if (verticalAlignDivNotAltrpElement) {
    styles += simplePropertyStyled(verticalAlignDivNotAltrpElement, 'vertical-align');
  }

  styles += `} `;

  styles += `${parentClass} div:not(.altrp-element) .altrp-table-th:hover {`;

  const verticalAlignDivNotAltrpElementHover = getResponsiveSetting(settings, 'header_cell_vertical_alignment', ':hover');

  if (verticalAlignDivNotAltrpElementHover) {
    styles += simplePropertyStyled(verticalAlignDivNotAltrpElementHover, 'vertical-align');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td {`;

  const textAlignTableTd = getResponsiveSetting(settings, 'table_table_body_alignment');

  if (textAlignTableTd) {
    styles += simplePropertyStyled(textAlignTableTd, 'text-align');
  }

  const paddingTableTd = getResponsiveSetting(settings, 'table_style_body_cell_padding');

  if (paddingTableTd) {
    styles += dimensionsControllerToStyles(paddingTableTd);
  }

  const borderTypeTableTd = getResponsiveSetting(settings, 'table_style_body_border_type');

  if (borderTypeTableTd) {
    styles += simplePropertyStyled(borderTypeTableTd, 'border-style');
  }

  const borderColorTableTd = getResponsiveSetting(settings, 'table_style_body_border_color_');

  if (borderColorTableTd) {
    styles += colorPropertyStyled(borderColorTableTd, 'border-color');
  }

  const colorTableTd = getResponsiveSetting(settings, 'table_style_body_border_text_color');

  if (colorTableTd) {
    styles += colorPropertyStyled(colorTableTd, 'color');
  }

  const typographicTableTd = getResponsiveSetting(settings, 'table_style_body_font');

  if (typographicTableTd) {
    styles += typographicControllerToStyles(typographicTableTd);
  }

  const borderWidthTableTd = getResponsiveSetting(settings, 'table_style_body_border_width');

  if (borderWidthTableTd) {
    styles += borderWidthStyled(borderWidthTableTd);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td:hover {`;

  const textAlignTableTdHover = getResponsiveSetting(settings, 'table_table_body_alignment', ':hover');

  if (textAlignTableTdHover) {
    styles += simplePropertyStyled(textAlignTableTdHover, 'text-align');
  }

  const paddingTableTdHover = getResponsiveSetting(settings, 'table_style_body_cell_padding', ':hover');

  if (paddingTableTdHover) {
    styles += dimensionsControllerToStyles(paddingTableTdHover);
  }

  const borderTypeTableTdHover = getResponsiveSetting(settings, 'table_style_body_border_type', ':hover');

  if (borderTypeTableTdHover) {
    styles += simplePropertyStyled(borderTypeTableTdHover, 'border-style');
  }

  const borderColorTableTdHover = getResponsiveSetting(settings, 'table_style_body_border_color_', ':hover');

  if (borderColorTableTdHover) {
    styles += colorPropertyStyled(borderColorTableTdHover, 'border-color');
  }

  const colorTableTdHover = getResponsiveSetting(settings, 'table_style_body_border_text_color', ':hover');

  if (colorTableTdHover) {
    styles += colorPropertyStyled(colorTableTdHover, 'color');
  }

  const typographicTableTdHover = getResponsiveSetting(settings, 'table_style_body_font', ':hover');

  if (typographicTableTdHover) {
    styles += typographicControllerToStyles(typographicTableTdHover);
  }

  const borderWidthTableTdHover = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');

  if (borderWidthTableTdHover) {
    styles += borderWidthStyled(borderWidthTableTdHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td a {`;

  const colorTableTdA = getResponsiveSetting(settings, 'table_link_color');

  if (colorTableTdA) {
    styles += colorPropertyStyled(colorTableTdA, 'color');
  }

  const typographicTableTdA = getResponsiveSetting(settings, 'table_link_font');

  if (typographicTableTdA) {
    styles += typographicControllerToStyles(typographicTableTdA);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td a:hover {`;

  const colorTableTdAHover = getResponsiveSetting(settings, 'table_link_color', ':hover');

  if (colorTableTdAHover) {
    styles += colorPropertyStyled(colorTableTdAHover, 'color');
  }

  const typographicTableTdAHover = getResponsiveSetting(settings, 'table_link_font', ':hover');

  if (typographicTableTdAHover) {
    styles += typographicControllerToStyles(typographicTableTdAHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody {`;

  const backgroundColorTbodyBackground = getResponsiveSetting(settings, 'table_style_body_border_background');

  if (backgroundColorTbodyBackground) {
    styles += colorPropertyStyled(backgroundColorTbodyBackground, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody:hover {`;

  const backgroundColorTbodyBackgroundHover = getResponsiveSetting(settings, 'table_style_body_border_background', ':hover');

  if (backgroundColorTbodyBackgroundHover) {
    styles += colorPropertyStyled(backgroundColorTbodyBackgroundHover, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-td:not(:first-child) {`;

  const borderWidthTransposeTableTdNot = getResponsiveSetting(settings, 'table_style_body_border_width');

  if (borderWidthTransposeTableTdNot) {
    styles += marginTopLeftStyled(borderWidthTransposeTableTdNot, 'top'); //здесь вернется строка вида: "margin-top: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-td:not(:first-child):hover {`;

  const borderWidthTransposeTableTdNotHover = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');

  if (borderWidthTransposeTableTdNotHover) {
    styles += marginTopLeftStyled(borderWidthTransposeTableTdNotHover, 'top'); //здесь вернется строка вида: "margin-top: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-td {`;

  const borderWidthTransposeTableTdNotTd = getResponsiveSetting(settings, 'table_style_body_border_width');

  if (borderWidthTransposeTableTdNotTd) {
    styles += marginTopLeftStyled(borderWidthTransposeTableTdNotTd, 'left'); //здесь вернется строка вида: "margin-left: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-td:hover {`;

  const borderWidthTransposeTableTdNotTdHover = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');

  if (borderWidthTransposeTableTdNotTdHover) {
    styles += marginTopLeftStyled(borderWidthTransposeTableTdNotTdHover, 'left'); //здесь вернется строка вида: "margin-left: -10px"
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping {`;

  const colorTdGrouping = getResponsiveSetting(settings, 'table_style_group_border_text_color');

  if (colorTdGrouping) {
    styles += colorPropertyStyled(colorTdGrouping, 'color');
  }

  const typographicTdGrouping = getResponsiveSetting(settings, 'table_style_group_font');

  if (typographicTdGrouping) {
    styles += typographicControllerToStyles(typographicTdGrouping);
  }

  const paddingTdGrouping = getResponsiveSetting(settings, 'table_style_group_cell_padding');

  if (paddingTdGrouping) {
    styles += dimensionsControllerToStyles(paddingTdGrouping);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping:hover {`;

  const colorTdGroupingHover = getResponsiveSetting(settings, 'table_style_group_border_text_color', ':hover');

  if (colorTdGroupingHover) {
    styles += colorPropertyStyled(colorTdGroupingHover, 'color');
  }

  const typographicTdGroupingHover = getResponsiveSetting(settings, 'table_style_group_font', ':hover');

  if (typographicTdGroupingHover) {
    styles += typographicControllerToStyles(typographicTdGroupingHover);
  }

  const paddingTdGroupingHover = getResponsiveSetting(settings, 'table_style_group_cell_padding', ':hover');

  if (paddingTdGroupingHover) {
    styles += dimensionsControllerToStyles(paddingTdGroupingHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody .altrp-table-td__grouping {`;

  const backgroundColorTbodyTdGrouping = getResponsiveSetting(settings, 'table_style_group_border_background');

  if (backgroundColorTbodyTdGrouping) {
    styles += colorPropertyStyled(backgroundColorTbodyTdGrouping, 'background-color');
  }

  const textAlignTbodyTdGrouping = getResponsiveSetting(settings, 'table_style_group_cell_alignment');

  if (textAlignTbodyTdGrouping) {
    styles += simplePropertyStyled(textAlignTbodyTdGrouping, 'text-align');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-tbody .altrp-table-td__grouping:hover {`;

  const backgroundColorTbodyTdGroupingHover = getResponsiveSetting(settings, 'table_style_group_border_background', ':hover');

  if (backgroundColorTbodyTdGroupingHover) {
    styles += colorPropertyStyled(backgroundColorTbodyTdGroupingHover, 'background-color');
  }

  const textAlignTbodyTdGroupingHover = getResponsiveSetting(settings, 'table_style_group_cell_alignment', ':hover');

  if (textAlignTbodyTdGroupingHover) {
    styles += simplePropertyStyled(textAlignTbodyTdGroupingHover, 'text-align');
  }

  styles += `} `;

  styles += `${parentClass} div:not(.altrp-element) .altrp-table-td {`;

  const verticalAlignDivNotAltrpElTd = getResponsiveSetting(settings, 'cell_vertical_alignment');

  if (verticalAlignDivNotAltrpElTd) {
    styles += simplePropertyStyled(verticalAlignDivNotAltrpElTd, 'vertical-align');
  }

  styles += `} `;

  styles += `${parentClass} div:not(.altrp-element) .altrp-table-td:hover {`;

  const verticalAlignDivNotAltrpElTdHover = getResponsiveSetting(settings, 'cell_vertical_alignment', ':hover');

  if (verticalAlignDivNotAltrpElTdHover) {
    styles += simplePropertyStyled(verticalAlignDivNotAltrpElTdHover, 'vertical-align');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping .altrp-table__collapse-icon svg {`;

  const iconSizeTdGroupingIconSvg = getResponsiveSetting(settings, 'table_style_group_icon_size');

  if (iconSizeTdGroupingIconSvg) {
    styles += iconSizeStyled(iconSizeTdGroupingIconSvg);
  }

  const iconLeftSpaceTdGroupingIconSvg = getResponsiveSetting(settings, 'table_style_group_icon_left_space');

  if (iconLeftSpaceTdGroupingIconSvg) {
    styles += sizeStyled(iconLeftSpaceTdGroupingIconSvg, 'margin-left');
  }

  const iconRightSpaceTdGroupingIconSvg = getResponsiveSetting(settings, 'table_style_group_icon_right_space');

  if (iconRightSpaceTdGroupingIconSvg) {
    styles += sizeStyled(iconRightSpaceTdGroupingIconSvg, 'margin-right');
  }

  const iconTopTranslateTdGroupingIconSvg = getResponsiveSetting(settings, 'table_style_group_icon_top');

  if (iconTopTranslateTdGroupingIconSvg) {
    styles += sizeStyled(iconTopTranslateTdGroupingIconSvg, 'top');
  }

  const iconLeftTranslateTdGroupingIconSvg = getResponsiveSetting(settings, 'table_style_group_icon_left');

  if (iconLeftTranslateTdGroupingIconSvg) {
    styles += sizeStyled(iconLeftTranslateTdGroupingIconSvg, 'left');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping:hover .altrp-table__collapse-icon svg {`;

  const iconSizeTdGroupingIconSvgHover = getResponsiveSetting(settings, 'table_style_group_icon_size', ':hover');

  if (iconSizeTdGroupingIconSvgHover) {
    styles += iconSizeStyled(iconSizeTdGroupingIconSvgHover);
  }

  const iconLeftSpaceTdGroupingIconSvgHover = getResponsiveSetting(settings, 'table_style_group_icon_left_space', ':hover');

  if (iconLeftSpaceTdGroupingIconSvgHover) {
    styles += sizeStyled(iconLeftSpaceTdGroupingIconSvgHover, 'margin-left');
  }

  const iconRightSpaceTdGroupingIconSvgHover = getResponsiveSetting(settings, 'table_style_group_icon_right_space', ':hover');

  if (iconRightSpaceTdGroupingIconSvgHover) {
    styles += sizeStyled(iconRightSpaceTdGroupingIconSvgHover, 'margin-right');
  }

  const iconTopTranslateTdGroupingIconSvgHover = getResponsiveSetting(settings, 'table_style_group_icon_top', ':hover');

  if (iconTopTranslateTdGroupingIconSvgHover) {
    styles += sizeStyled(iconTopTranslateTdGroupingIconSvgHover, 'top');
  }

  const iconLeftTranslateTdGroupingIconSvgHover = getResponsiveSetting(settings, 'table_style_group_icon_left', ':hover');

  if (iconLeftTranslateTdGroupingIconSvgHover) {
    styles += sizeStyled(iconLeftTranslateTdGroupingIconSvgHover, 'left');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping .altrp-table__collapse-icon svg, ${parentClass} .altrp-table-td__grouping .altrp-table__collapse-icon path {`;

  const iconFillTdGroupingIconSvgPath = getResponsiveSetting(settings, 'table_style_group_icon_color');

  if (iconFillTdGroupingIconSvgPath) {
    styles += colorPropertyStyled(iconFillTdGroupingIconSvgPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-td__grouping:hover .altrp-table__collapse-icon svg, ${parentClass} .altrp-table-td__grouping:hover .altrp-table__collapse-icon path {`;

  const iconFillTdGroupingIconSvgPathHover = getResponsiveSetting(settings, 'table_style_group_icon_color', ':hover');

  if (iconFillTdGroupingIconSvgPathHover) {
    styles += colorPropertyStyled(iconFillTdGroupingIconSvgPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-foot .altrp-table-td {`;

  const paddingTableFootTd = getResponsiveSetting(settings, 'table_style_footer_cell_padding');

  if (paddingTableFootTd) {
    styles += dimensionsControllerToStyles(paddingTableFootTd);
  }

  const textAlignTableFootTd = getResponsiveSetting(settings, 'table_style_footer_cell_alignment');

  if (textAlignTableFootTd) {
    styles += simplePropertyStyled(textAlignTableFootTd, 'text-align');
  }

  const backgroundColorTableFootTd = getResponsiveSetting(settings, 'table_style_footer_border_background');

  if (backgroundColorTableFootTd) {
    styles += colorPropertyStyled(backgroundColorTableFootTd, 'background-color');
  }

  const colorTableFootTd = getResponsiveSetting(settings, 'table_style_footer_border_text_color');

  if (colorTableFootTd) {
    styles += colorPropertyStyled(colorTableFootTd, 'color');
  }

  const typographicTableFootTd = getResponsiveSetting(settings, 'table_style_footer_font');

  if (typographicTableFootTd) {
    styles += typographicControllerToStyles(typographicTableFootTd);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-foot .altrp-table-td:hover {`;

  const paddingTableFootTdHover = getResponsiveSetting(settings, 'table_style_footer_cell_padding', ':hover');

  if (paddingTableFootTdHover) {
    styles += dimensionsControllerToStyles(paddingTableFootTdHover);
  }

  const textAlignTableFootTdHover = getResponsiveSetting(settings, 'table_style_footer_cell_alignment', ':hover');

  if (textAlignTableFootTdHover) {
    styles += simplePropertyStyled(textAlignTableFootTdHover, 'text-align');
  }

  const backgroundColorTableFootTdHover = getResponsiveSetting(settings, 'table_style_footer_border_background', ':hover');

  if (backgroundColorTableFootTdHover) {
    styles += colorPropertyStyled(backgroundColorTableFootTdHover, 'background-color');
  }

  const colorTableFootTdHover = getResponsiveSetting(settings, 'table_style_footer_border_text_color', ':hover');

  if (colorTableFootTdHover) {
    styles += colorPropertyStyled(colorTableFootTdHover, 'color');
  }

  const typographicTableFootTdHover = getResponsiveSetting(settings, 'table_style_footer_font', ':hover');

  if (typographicTableFootTdHover) {
    styles += typographicControllerToStyles(typographicTableFootTdHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-global-filter label {`;

  const paddingGlobalFilterLabel = getResponsiveSetting(settings, 'global_filter_label_padding');

  if (paddingGlobalFilterLabel) {
    styles += dimensionsControllerToStyles(paddingGlobalFilterLabel);
  }

  const colorGlobalFilterLabel = getResponsiveSetting(settings, 'global_filter_label_color');

  if (colorGlobalFilterLabel) {
    styles += colorPropertyStyled(colorGlobalFilterLabel, 'color');
  }

  const typographicGlobalFilterLabel = getResponsiveSetting(settings, 'global_filter_label_typographic');

  if (typographicGlobalFilterLabel) {
    styles += typographicControllerToStyles(typographicGlobalFilterLabel);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-global-filter label:hover {`;

  const paddingGlobalFilterLabelHover = getResponsiveSetting(settings, 'global_filter_label_padding', ':hover');

  if (paddingGlobalFilterLabelHover) {
    styles += dimensionsControllerToStyles(paddingGlobalFilterLabelHover);
  }

  const colorGlobalFilterLabelHover = getResponsiveSetting(settings, 'global_filter_label_color', ':hover');

  if (colorGlobalFilterLabelHover) {
    styles += colorPropertyStyled(colorGlobalFilterLabelHover, 'color');
  }

  const typographicGlobalFilterLabelHover = getResponsiveSetting(settings, 'global_filter_label_typographic', ':hover');

  if (typographicGlobalFilterLabelHover) {
    styles += typographicControllerToStyles(typographicGlobalFilterLabelHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-global-filter input {`;

  const paddingGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_padding');

  if (paddingGlobalFilterInput) {
    styles += dimensionsControllerToStyles(paddingGlobalFilterInput);
  }

  const widthGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_width');

  if (widthGlobalFilterInput) {
    styles += sizeStyled(widthGlobalFilterInput, 'width');
  }

  const marginLeftGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_margin_left');

  if (marginLeftGlobalFilterInput) {
    styles += sizeStyled(marginLeftGlobalFilterInput, 'margin-left');
  }

  const colorGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_color');

  if (colorGlobalFilterInput) {
    styles += colorPropertyStyled(colorGlobalFilterInput, 'color');
  }

  const backgroundColorGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_background_color');

  if (backgroundColorGlobalFilterInput) {
    styles += colorPropertyStyled(backgroundColorGlobalFilterInput, 'background');
  }

  const typographicGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_typographic');

  if (typographicGlobalFilterInput) {
    styles += typographicControllerToStyles(typographicGlobalFilterInput);
  }

  const borderTypeGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_border_type');

  if (borderTypeGlobalFilterInput) {
    styles += simplePropertyStyled(borderTypeGlobalFilterInput, 'border-style');
  }

  const borderWidthGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_border_width');

  if (borderWidthGlobalFilterInput) {
    styles += borderWidthStyled(borderWidthGlobalFilterInput);
  }

  const borderRadiusGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_border_radius');

  if (borderRadiusGlobalFilterInput) {
    styles += dimensionsControllerToStyles(borderRadiusGlobalFilterInput, 'border-radius');
  }

  const borderColorGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_border_color');

  if (borderColorGlobalFilterInput) {
    styles += colorPropertyStyled(borderColorGlobalFilterInput, 'border-color');
  }

  const boxShadowGlobalFilterInput = getResponsiveSetting(settings, 'global_filter_input_shadow');

  if (boxShadowGlobalFilterInput) {
    styles += shadowControllerToStyles(boxShadowGlobalFilterInput);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table-global-filter input:hover {`;

  const paddingGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_padding', ':hover');

  if (paddingGlobalFilterInputHover) {
    styles += dimensionsControllerToStyles(paddingGlobalFilterInputHover);
  }

  const widthGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_width', ':hover');

  if (widthGlobalFilterInputHover) {
    styles += sizeStyled(widthGlobalFilterInputHover, 'width');
  }

  const marginLeftGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_margin_left', ':hover');

  if (marginLeftGlobalFilterInputHover) {
    styles += sizeStyled(marginLeftGlobalFilterInputHover, 'margin-left');
  }

  const colorGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_color', ':hover');

  if (colorGlobalFilterInputHover) {
    styles += colorPropertyStyled(colorGlobalFilterInputHover, 'color');
  }

  const backgroundColorGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_background_color', ':hover');

  if (backgroundColorGlobalFilterInputHover) {
    styles += colorPropertyStyled(backgroundColorGlobalFilterInputHover, 'background');
  }

  const typographicGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_typographic', ':hover');

  if (typographicGlobalFilterInputHover) {
    styles += typographicControllerToStyles(typographicGlobalFilterInputHover);
  }

  const borderTypeGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_border_type', ':hover');

  if (borderTypeGlobalFilterInputHover) {
    styles += simplePropertyStyled(borderTypeGlobalFilterInputHover, 'border-style');
  }

  const borderWidthGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_border_width', ':hover');

  if (borderWidthGlobalFilterInputHover) {
    styles += borderWidthStyled(borderWidthGlobalFilterInputHover);
  }

  const borderRadiusGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_border_radius', ':hover');

  if (borderRadiusGlobalFilterInputHover) {
    styles += dimensionsControllerToStyles(borderRadiusGlobalFilterInputHover, 'border-radius');
  }

  const borderColorGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_border_color', ':hover');

  if (borderColorGlobalFilterInputHover) {
    styles += colorPropertyStyled(borderColorGlobalFilterInputHover, 'border-color');
  }

  const boxShadowGlobalFilterInputHover = getResponsiveSetting(settings, 'global_filter_input_shadow', ':hover');

  if (boxShadowGlobalFilterInputHover) {
    styles += shadowControllerToStyles(boxShadowGlobalFilterInputHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination {`;

  const paddingPagination = getResponsiveSetting(settings, 'table_style_pagination_padding');

  if (paddingPagination) {
    styles += dimensionsControllerToStyles(paddingPagination);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination:hover {`;

  const paddingPaginationHover = getResponsiveSetting(settings, 'table_style_pagination_padding', ':hover');

  if (paddingPaginationHover) {
    styles += dimensionsControllerToStyles(paddingPaginationHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__previous {`;

  const typographicPaginationPrev = getResponsiveSetting(settings, 'table_style_prev_btn_pagination_typographic');

  if (typographicPaginationPrev) {
    styles += typographicControllerToStyles(typographicPaginationPrev);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__previous:hover {`;

  const typographicPaginationPrevHover = getResponsiveSetting(settings, 'table_style_prev_btn_pagination_typographic', ':hover');

  if (typographicPaginationPrevHover) {
    styles += typographicControllerToStyles(typographicPaginationPrevHover);
  }

  styles += `} `;

  styles += `${parentClass} altrp-pagination .altrp-pagination__next {`;

  const typographicPaginationNext = getResponsiveSetting(settings, 'table_style_next_btn_pagination_typographic');

  if (typographicPaginationNext) {
    styles += typographicControllerToStyles(typographicPaginationNext);
  }

  styles += `} `;

  styles += `${parentClass} altrp-pagination .altrp-pagination__next:hover {`;

  const typographicPaginationNextHover = getResponsiveSetting(settings, 'table_style_next_btn_pagination_typographic', ':hover');

  if (typographicPaginationNextHover) {
    styles += typographicControllerToStyles(typographicPaginationNextHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item {`;

  const typographicPaginationPagesItem = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic');

  if (typographicPaginationPagesItem) {
    styles += typographicControllerToStyles(typographicPaginationPagesItem);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination-pages__item:hover {`;

  const typographicPaginationPagesItemHover = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic', ':hover');

  if (typographicPaginationPagesItemHover) {
    styles += typographicControllerToStyles(typographicPaginationPagesItemHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous, ${parentClass} .altrp-pagination__next {`;

  const colorPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_buttons_text_color');

  if (colorPaginationPrevNext) {
    styles += colorPropertyStyled(colorPaginationPrevNext, 'color');
  }

  const backgroundColorPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_buttons_background_color');

  if (backgroundColorPaginationPrevNext) {
    styles += colorPropertyStyled(backgroundColorPaginationPrevNext, 'background-color');
  }

  const paddingPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_padding_buttons');

  if (paddingPaginationPrevNext) {
    styles += dimensionsControllerToStyles(paddingPaginationPrevNext);
  }

  const borderTypePaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_border_type');

  if (borderTypePaginationPrevNext) {
    styles += simplePropertyStyled(borderTypePaginationPrevNext, 'border-style');
  }

  const borderWidthPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_border_width');

  if (borderWidthPaginationPrevNext) {
    styles += borderWidthStyled(borderWidthPaginationPrevNext);
  }

  const borderRadiusPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_border_radius');

  if (borderRadiusPaginationPrevNext) {
    styles += dimensionsControllerToStyles(borderRadiusPaginationPrevNext, 'border-radius');
  }

  const borderColorPaginationPrevNext = getResponsiveSetting(settings, 'table_style_pagination_border_color');

  if (borderColorPaginationPrevNext) {
    styles += colorPropertyStyled(borderColorPaginationPrevNext, 'border-color');
  }

  const boxShadowPaginationPrevNext = getResponsiveSetting(settings, 'pagination_buttons_shadow');

  if (boxShadowPaginationPrevNext) {
    styles += shadowControllerToStyles(boxShadowPaginationPrevNext);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__previous:hover, ${parentClass} .altrp-pagination__next:hover {`;

  const colorPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_buttons_text_color', ':hover');

  if (colorPaginationPrevNextHover) {
    styles += colorPropertyStyled(colorPaginationPrevNextHover, 'color');
  }

  const backgroundColorPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_buttons_background_color', ':hover');

  if (backgroundColorPaginationPrevNextHover) {
    styles += colorPropertyStyled(backgroundColorPaginationPrevNextHover, 'background-color');
  }

  const paddingPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_padding_buttons', ':hover');

  if (paddingPaginationPrevNextHover) {
    styles += dimensionsControllerToStyles(paddingPaginationPrevNextHover);
  }

  const borderTypePaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_border_type', ':hover');

  if (borderTypePaginationPrevNextHover) {
    styles += simplePropertyStyled(borderTypePaginationPrevNextHover, 'border-style');
  }

  const borderWidthPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_border_width', ':hover');

  if (borderWidthPaginationPrevNextHover) {
    styles += borderWidthStyled(borderWidthPaginationPrevNextHover);
  }

  const borderRadiusPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_border_radius', ':hover');

  if (borderRadiusPaginationPrevNextHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginationPrevNextHover, 'border-radius');
  }

  const borderColorPaginationPrevNextHover = getResponsiveSetting(settings, 'table_style_pagination_border_color', ':hover');

  if (borderColorPaginationPrevNextHover) {
    styles += colorPropertyStyled(borderColorPaginationPrevNextHover, 'border-color');
  }

  const boxShadowPaginationPrevNextHover = getResponsiveSetting(settings, 'pagination_buttons_shadow', ':hover');

  if (boxShadowPaginationPrevNextHover) {
    styles += shadowControllerToStyles(boxShadowPaginationPrevNextHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next, ${parentClass} .altrp-pagination-pages__item, ${parentClass} .altrp-pagination__count, ${parentClass} .altrp-pagination__previous, ${parentClass} .altrp-pagination__goto-page, ${parentClass} .altrp-pagination__select-size  {`;

  const typographicNextItemCountPrevGotoSelect = getResponsiveSetting(settings, 'table_style_pagination_typographic');

  if (typographicNextItemCountPrevGotoSelect) {
    styles += typographicControllerToStyles(typographicNextItemCountPrevGotoSelect);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__next:hover, ${parentClass} .altrp-pagination-pages__item:hover, ${parentClass} .altrp-pagination__count:hover, ${parentClass} .altrp-pagination__previous:hover, ${parentClass} .altrp-pagination__goto-page:hover, ${parentClass} .altrp-pagination__select-size:hover  {`;

  const typographicNextItemCountPrevGotoSelectHover = getResponsiveSetting(settings, 'table_style_pagination_typographic', ':hover');

  if (typographicNextItemCountPrevGotoSelectHover) {
    styles += typographicControllerToStyles(typographicNextItemCountPrevGotoSelectHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count {`;

  const marginPaginationCount = getResponsiveSetting(settings, 'count_buttons_margin');

  if (marginPaginationCount) {
    styles += dimensionsControllerToStyles(marginPaginationCount, 'margin');
  }

  const colorPaginationCount = getResponsiveSetting(settings, 'table_style_pagination_count_text_color');

  if (colorPaginationCount) {
    styles += colorPropertyStyled(colorPaginationCount, 'color');
  }

  const backgroundColorPaginationCount = getResponsiveSetting(settings, 'table_style_pagination_count_background_color');

  if (backgroundColorPaginationCount) {
    styles += colorPropertyStyled(backgroundColorPaginationCount, 'background-color');
  }

  const paddingPaginationCount = getResponsiveSetting(settings, 'table_style_pagination_padding_count');

  if (paddingPaginationCount) {
    styles += dimensionsControllerToStyles(paddingPaginationCount);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__count:hover {`;

  const marginPaginationCountHover = getResponsiveSetting(settings, 'count_buttons_margin', ':hover');

  if (marginPaginationCountHover) {
    styles += dimensionsControllerToStyles(marginPaginationCountHover, 'margin');
  }

  const colorPaginationCountHover = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', ':hover');

  if (colorPaginationCountHover) {
    styles += colorPropertyStyled(colorPaginationCountHover, 'color');
  }

  const backgroundColorPaginationCountHover = getResponsiveSetting(settings, 'table_style_pagination_count_background_color', ':hover');

  if (backgroundColorPaginationCountHover) {
    styles += colorPropertyStyled(backgroundColorPaginationCountHover, 'background-color');
  }

  const paddingPaginationCountHover = getResponsiveSetting(settings, 'table_style_pagination_padding_count', ':hover');

  if (paddingPaginationCountHover) {
    styles += dimensionsControllerToStyles(paddingPaginationCountHover);
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
    styles += colorPropertyStyled(borderColorPaginPagesItem, 'border-color');
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
    styles += colorPropertyStyled(borderColorPaginPagesItemHover, 'border-color');
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
    styles += colorPropertyStyled(backgroundColorActivePaginPagesItem, 'background-color');
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
    styles += colorPropertyStyled(backgroundColorActivePaginPagesItemHover, 'background-color');
  }

  const borderColorActivePaginPagesItemHover = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_border_color', ':hover');

  if (borderColorActivePaginPagesItemHover) {
    styles += colorPropertyStyled(borderColorActivePaginPagesItemHover, 'border-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__ellipsis {`;

  const marginPaginationEllipsis = getResponsiveSetting(settings, 'ellipsis_margin');

  if (marginPaginationEllipsis) {
    styles += dimensionsControllerToStyles(marginPaginationEllipsis, 'margin');
  }

  const colorPaginationEllipsis = getResponsiveSetting(settings, 'ellipsis_color');

  if (colorPaginationEllipsis) {
    styles += colorPropertyStyled(colorPaginationEllipsis, 'color');
  }

  const typographicPaginationEllipsis = getResponsiveSetting(settings, 'ellipsis_typographic');

  if (typographicPaginationEllipsis) {
    styles += typographicControllerToStyles(typographicPaginationEllipsis);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__ellipsis:hover {`;

  const marginPaginationEllipsisHover = getResponsiveSetting(settings, 'ellipsis_margin', ':hover');

  if (marginPaginationEllipsisHover) {
    styles += dimensionsControllerToStyles(marginPaginationEllipsisHover, 'margin');
  }

  const colorPaginationEllipsisHover = getResponsiveSetting(settings, 'ellipsis_color', ':hover');

  if (colorPaginationEllipsisHover) {
    styles += colorPropertyStyled(colorPaginationEllipsisHover, 'color');
  }

  const typographicPaginationEllipsisHover = getResponsiveSetting(settings, 'ellipsis_typographic', ':hover');

  if (typographicPaginationEllipsisHover) {
    styles += typographicControllerToStyles(typographicPaginationEllipsisHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__goto-page {`;

  const marginPaginationGotoPages = getResponsiveSetting(settings, 'goto-page_margin');

  if (marginPaginationGotoPages) {
    styles += dimensionsControllerToStyles(marginPaginationGotoPages, 'margin');
  }

  const paddingPaginationGotoPages = getResponsiveSetting(settings, 'page_input_padding');

  if (paddingPaginationGotoPages) {
    styles += dimensionsControllerToStyles(paddingPaginationGotoPages);
  }

  const colorPaginationGotoPages = getResponsiveSetting(settings, 'page_input_text_color');

  if (colorPaginationGotoPages) {
    styles += colorPropertyStyled(colorPaginationGotoPages, 'color');
  }

  const backgroundColorPaginationGotoPages = getResponsiveSetting(settings, 'page_input_background_color');

  if (backgroundColorPaginationGotoPages) {
    styles += colorPropertyStyled(backgroundColorPaginationGotoPages, 'background-color');
  }

  const borderTypePaginationGotoPages = getResponsiveSetting(settings, 'page_input_border_type');

  if (borderTypePaginationGotoPages) {
    styles += simplePropertyStyled(borderTypePaginationGotoPages, 'border-style');
  }

  const borderWidthPaginationGotoPages = getResponsiveSetting(settings, 'page_input_border_width');

  if (borderWidthPaginationGotoPages) {
    styles += borderWidthStyled(borderWidthPaginationGotoPages);
  }

  const borderRadiusPaginationGotoPages = getResponsiveSetting(settings, 'page_input_border_radius');

  if (borderRadiusPaginationGotoPages) {
    styles += dimensionsControllerToStyles(borderRadiusPaginationGotoPages, 'border-radius');
  }

  const borderColorPaginationGotoPages = getResponsiveSetting(settings, 'page_input_border_color');

  if (borderColorPaginationGotoPages) {
    styles += colorPropertyStyled(borderColorPaginationGotoPages, 'border-color');
  }

  const boxShadowPaginationGotoPages = getResponsiveSetting(settings, 'page_input_shadow');

  if (boxShadowPaginationGotoPages) {
    styles += shadowControllerToStyles(boxShadowPaginationGotoPages);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__goto-page:hover {`;

  const marginPaginationGotoPagesHover = getResponsiveSetting(settings, 'goto-page_margin', ':hover');

  if (marginPaginationGotoPagesHover) {
    styles += dimensionsControllerToStyles(marginPaginationGotoPagesHover, 'margin');
  }

  const paddingPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_padding', ':hover');

  if (paddingPaginationGotoPagesHover) {
    styles += dimensionsControllerToStyles(paddingPaginationGotoPagesHover);
  }

  const colorPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_text_color', ':hover');

  if (colorPaginationGotoPagesHover) {
    styles += colorPropertyStyled(colorPaginationGotoPagesHover, 'color');
  }

  const backgroundColorPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_background_color', ':hover');

  if (backgroundColorPaginationGotoPagesHover) {
    styles += colorPropertyStyled(backgroundColorPaginationGotoPagesHover, 'background-color');
  }

  const borderTypePaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_border_type', ':hover');

  if (borderTypePaginationGotoPagesHover) {
    styles += simplePropertyStyled(borderTypePaginationGotoPagesHover, 'border-style');
  }

  const borderWidthPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_border_width', ':hover');

  if (borderWidthPaginationGotoPagesHover) {
    styles += borderWidthStyled(borderWidthPaginationGotoPagesHover);
  }

  const borderRadiusPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_border_radius', ':hover');

  if (borderRadiusPaginationGotoPagesHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginationGotoPagesHover, 'border-radius');
  }

  const borderColorPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_border_color', ':hover');

  if (borderColorPaginationGotoPagesHover) {
    styles += colorPropertyStyled(borderColorPaginationGotoPagesHover, 'border-color');
  }

  const boxShadowPaginationGotoPagesHover = getResponsiveSetting(settings, 'page_input_shadow', ':hover');

  if (boxShadowPaginationGotoPagesHover) {
    styles += shadowControllerToStyles(boxShadowPaginationGotoPagesHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page {`;

  const typographicPaginPaginGotoPages = getResponsiveSetting(settings, 'table_style_page_input_pagination_typographic');

  if (typographicPaginPaginGotoPages) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPages);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__goto-page:hover {`;

  const typographicPaginPaginGotoPagesHover = getResponsiveSetting(settings, 'table_style_page_input_pagination_typographic', ':hover');

  if (typographicPaginPaginGotoPagesHover) {
    styles += typographicControllerToStyles(typographicPaginPaginGotoPagesHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control {`;

  const widthPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_width');

  if (widthPaginSelectSizeControl) {
    styles += sizeStyled(widthPaginSelectSizeControl, 'width');
  }

  const paddingPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_padding');

  if (paddingPaginSelectSizeControl) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControl);
  }

  const borderTypePaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_border_type');

  if (borderTypePaginSelectSizeControl) {
    styles += simplePropertyStyled(borderTypePaginSelectSizeControl, 'border-style');
  }

  const borderWidthPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_border_width');

  if (borderWidthPaginSelectSizeControl) {
    styles += borderWidthStyled(borderWidthPaginSelectSizeControl);
  }

  const borderRadiusPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_border_radius');

  if (borderRadiusPaginSelectSizeControl) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelectSizeControl, 'border-radius');
  }

  const borderColorPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_border_color');

  if (borderColorPaginSelectSizeControl) {
    styles += colorPropertyStyled(borderColorPaginSelectSizeControl, 'border-color');
  }

  const boxShadowPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_shadow');

  if (boxShadowPaginSelectSizeControl) {
    styles += shadowControllerToStyles(boxShadowPaginSelectSizeControl);
  }

  const colorPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_text_color');

  if (colorPaginSelectSizeControl) {
    styles += colorPropertyStyled(colorPaginSelectSizeControl, 'color');
  }

  const backgroundColorPaginSelectSizeControl = getResponsiveSetting(settings, 'pagination_select_background_color');

  if (backgroundColorPaginSelectSizeControl) {
    styles += colorPropertyStyled(backgroundColorPaginSelectSizeControl, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination__select-size .altrp-field-select2__control:hover {`;

  const widthPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_width', ':hover');

  if (widthPaginSelectSizeControlHover) {
    styles += sizeStyled(widthPaginSelectSizeControlHover, 'width');
  }

  const paddingPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_padding', ':hover');

  if (paddingPaginSelectSizeControlHover) {
    styles += dimensionsControllerToStyles(paddingPaginSelectSizeControlHover);
  }

  const borderTypePaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_border_type', ':hover');

  if (borderTypePaginSelectSizeControlHover) {
    styles += simplePropertyStyled(borderTypePaginSelectSizeControlHover, 'border-style');
  }

  const borderWidthPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_border_width', ':hover');

  if (borderWidthPaginSelectSizeControlHover) {
    styles += borderWidthStyled(borderWidthPaginSelectSizeControlHover);
  }

  const borderRadiusPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_border_radius', ':hover');

  if (borderRadiusPaginSelectSizeControlHover) {
    styles += dimensionsControllerToStyles(borderRadiusPaginSelectSizeControlHover, 'border-radius');
  }

  const borderColorPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_border_color', ':hover');

  if (borderColorPaginSelectSizeControlHover) {
    styles += colorPropertyStyled(borderColorPaginSelectSizeControlHover, 'border-color');
  }

  const boxShadowPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_shadow', ':hover');

  if (boxShadowPaginSelectSizeControlHover) {
    styles += shadowControllerToStyles(boxShadowPaginSelectSizeControlHover);
  }

  const colorPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_text_color', ':hover');

  if (colorPaginSelectSizeControlHover) {
    styles += colorPropertyStyled(colorPaginSelectSizeControlHover, 'color');
  }

  const backgroundColorPaginSelectSizeControlHover = getResponsiveSetting(settings, 'pagination_select_background_color', ':hover');

  if (backgroundColorPaginSelectSizeControlHover) {
    styles += colorPropertyStyled(backgroundColorPaginSelectSizeControlHover, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size {`;

  const typographicPaginSelectSize = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic');

  if (typographicPaginSelectSize) {
    styles += typographicControllerToStyles(typographicPaginSelectSize);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-pagination .altrp-pagination__select-size:hover {`;

  const typographicPaginPaginSelectSizeHover = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic', ':hover');

  if (typographicPaginPaginSelectSizeHover) {
    styles += typographicControllerToStyles(typographicPaginPaginSelectSizeHover);
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

  styles += `${parentClass} .check-icon--checked svg {`;

  const marginCheckIconSvg = getResponsiveSetting(settings, 'checked_icon_margin');

  if (marginCheckIconSvg) {
    styles += dimensionsControllerToStyles(marginCheckIconSvg, 'margin');
  }

  const sizeCheckIconSvg = getResponsiveSetting(settings, 'checked_size');

  if (sizeCheckIconSvg) {
    styles += iconSizeStyled(sizeCheckIconSvg);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--checked svg:hover {`;

  const marginCheckIconSvgHover = getResponsiveSetting(settings, 'checked_icon_margin', ':hover');

  if (marginCheckIconSvgHover) {
    styles += dimensionsControllerToStyles(marginCheckIconSvgHover, 'margin');
  }

  const sizeCheckIconSvgHover = getResponsiveSetting(settings, 'checked_size', ':hover');

  if (sizeCheckIconSvgHover) {
    styles += iconSizeStyled(sizeCheckIconSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--unchecked svg {`;

  const marginUncheckIconSvg = getResponsiveSetting(settings, 'unchecked_icon_margin');

  if (marginUncheckIconSvg) {
    styles += dimensionsControllerToStyles(marginUncheckIconSvg, 'margin');
  }

  const sizeUncheckIconSvg = getResponsiveSetting(settings, 'unchecked_size');

  if (sizeUncheckIconSvg) {
    styles += iconSizeStyled(sizeUncheckIconSvg);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--unchecked svg:hover {`;

  const marginUncheckIconSvgHover = getResponsiveSetting(settings, 'unchecked_icon_margin', ':hover');

  if (marginUncheckIconSvgHover) {
    styles += dimensionsControllerToStyles(marginUncheckIconSvgHover, 'margin');
  }

  const sizeUncheckIconSvgHover = getResponsiveSetting(settings, 'unchecked_size', ':hover');

  if (sizeUncheckIconSvgHover) {
    styles += iconSizeStyled(sizeUncheckIconSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--indeterminate svg {`;

  const marginCheckIconIndeterminateSvg = getResponsiveSetting(settings, 'indeterminate_icon_margin');

  if (marginCheckIconIndeterminateSvg) {
    styles += dimensionsControllerToStyles(marginCheckIconIndeterminateSvg, 'margin');
  }

  const sizeCheckIconIndeterminateSvg = getResponsiveSetting(settings, 'indeterminate_size');

  if (sizeCheckIconIndeterminateSvg) {
    styles += iconSizeStyled(sizeCheckIconIndeterminateSvg);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--indeterminate svg:hover {`;

  const marginCheckIconIndeterminateSvgHover = getResponsiveSetting(settings, 'indeterminate_icon_margin', ':hover');

  if (marginCheckIconIndeterminateSvgHover) {
    styles += dimensionsControllerToStyles(marginCheckIconIndeterminateSvgHover, 'margin');
  }

  const sizeCheckIconIndeterminateSvgHover = getResponsiveSetting(settings, 'indeterminate_size', ':hover');

  if (sizeCheckIconIndeterminateSvgHover) {
    styles += iconSizeStyled(sizeCheckIconIndeterminateSvgHover);
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--checked path {`;

  const iconFillCheckIconCheckedPath = getResponsiveSetting(settings, 'checked_icon_color');

  if (iconFillCheckIconCheckedPath) {
    styles += colorPropertyStyled(iconFillCheckIconCheckedPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--checked:hover path {`;

  const iconFillCheckIconCheckedPathHover = getResponsiveSetting(settings, 'checked_icon_color', ':hover');

  if (iconFillCheckIconCheckedPathHover) {
    styles += colorPropertyStyled(iconFillCheckIconCheckedPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--unchecked path {`;

  const iconFillCheckIconUncheckedPath = getResponsiveSetting(settings, 'unchecked_icon_color');

  if (iconFillCheckIconUncheckedPath) {
    styles += colorPropertyStyled(iconFillCheckIconUncheckedPath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--unchecked:hover path {`;

  const iconFillCheckIconUncheckedPathHover = getResponsiveSetting(settings, 'unchecked_icon_color', ':hover');

  if (iconFillCheckIconUncheckedPathHover) {
    styles += colorPropertyStyled(iconFillCheckIconUncheckedPathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--indeterminate path {`;

  const iconFillCheckIconIndeterminatePath = getResponsiveSetting(settings, 'indeterminate_icon_color');

  if (iconFillCheckIconIndeterminatePath) {
    styles += colorPropertyStyled(iconFillCheckIconIndeterminatePath, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .check-icon--indeterminate:hover path {`;

  const iconFillCheckIconIndeterminatePathHover = getResponsiveSetting(settings, 'indeterminate_icon_color', ':hover');

  if (iconFillCheckIconIndeterminatePathHover) {
    styles += colorPropertyStyled(iconFillCheckIconIndeterminatePathHover, 'fill');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table__resizer {`;

  const sliderSizeTableResizer = getResponsiveSetting(settings, 'resize_slider_size');

  if (sliderSizeTableResizer) {
    styles += sizeStyled(sliderSizeTableResizer, 'width');
  }

  const backgroundColorTableResizer = getResponsiveSetting(settings, 'resize_slider_color');

  if (backgroundColorTableResizer) {
    styles += colorPropertyStyled(backgroundColorTableResizer, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table__resizer:hover {`;

  const sliderSizeTableResizerHover = getResponsiveSetting(settings, 'resize_slider_size', ':hover');

  if (sliderSizeTableResizerHover) {
    styles += sizeStyled(sliderSizeTableResizerHover, 'width');
  }

  const backgroundColorTableResizerHover = getResponsiveSetting(settings, 'resize_slider_color', ':hover');

  if (backgroundColorTableResizerHover) {
    styles += colorPropertyStyled(backgroundColorTableResizerHover, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table__resizer.altrp-table__resizer_resizing {`;

  const backgroundColorTableResizerResizing = getResponsiveSetting(settings, 'active_resize_slider_color');

  if (backgroundColorTableResizerResizing) {
    styles += colorPropertyStyled(backgroundColorTableResizerResizing, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-table__resizer.altrp-table__resizer_resizing:hover {`;

  const backgroundColorTableResizerResizingHover = getResponsiveSetting(settings, 'active_resize_slider_color', ':hover');

  if (backgroundColorTableResizerResizingHover) {
    styles += colorPropertyStyled(backgroundColorTableResizerResizingHover, 'background-color');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-image {`;

  const filtersImage = getResponsiveSetting(settings, 'filter_style_border_shadow');

  if (filtersImage) {
    styles += filtersControllerToStyles(filtersImage);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-image:hover {`;

  const filtersImageHover = getResponsiveSetting(settings, 'filter_style_border_shadow', ':hover');

  if (filtersImageHover) {
    styles += filtersControllerToStyles(filtersImageHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp_table-zIndex {`;

  const zIndex = getResponsiveSetting(settings, 'table_position_style_z_index');

  if (zIndex) {
    styles += simplePropertyStyled(zIndex, 'z-index');
  }

  styles += `} `;

  return styles;
}
