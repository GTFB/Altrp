import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  borderRadiusStyled,
  columnGapStyled,
  opacityStyled,
  sliderStyled,
  shadowControllerToStyles,
  textShadowControllerToStyles,
  dimensionsStyled,
} from '../../helpers/styles';
import getResponsiveSetting from "../../functions/getResponsiveSetting";

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

  styles += `${parentClass} .altrp-text table tr {
    ${colorPropertyStyled(getResponsiveSetting(settings,"text_table_rows_color"),"background")};
  }`

  //state disabled
  styles += `${parentClass} .altrp-text table tr {
    ${colorPropertyStyled(getResponsiveSetting(settings,"text_table_rows_color", ".state-disabled"),"background")};
  }`

  styles += `${parentClass} .altrp-text {`;

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

  const zIndexStyle = getResponsiveSetting(settings, 'position_z_index');

  if (zIndexStyle) {
    styles += simplePropertyStyled(zIndexStyle, 'z-index');
  }

  const backgroundColor = getResponsiveSetting(settings, 'text_style_background_color');

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  const opacity = getResponsiveSetting(settings, 'text_style_background_opacity');

  if (opacity) {
    styles += opacityStyled(opacity, 'opacity');
  }

  const borderStyle = getResponsiveSetting(settings, 'text_style_border_type');

  if (borderStyle) {
    styles += simplePropertyStyled(borderStyle, 'border-style');
  }

  const borderWidth = getResponsiveSetting(settings, 'text_style_border_width');

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  const borderColor = getResponsiveSetting(settings, 'text_style_border_color', '');

  styles += colorPropertyStyled(borderColor, 'border-color', ' !important')

  const borderRadius = getResponsiveSetting(settings, 'text_style_border_radius');

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, "border-radius");
  }

  styles += `} `;


  //state disabled
  styles += `${parentClass} .altrp-text {`;
  const paddingDisabled = getResponsiveSetting(settings, 'text_style_position_padding', '.state-disabled');

  if (paddingDisabled) {
    styles += dimensionsControllerToStyles(paddingDisabled);
  }

  const marginDisabled = getResponsiveSetting(settings, 'text_style_position_margin','.state-disabled');

  if (marginDisabled) {
    styles += dimensionsControllerToStyles(marginDisabled, 'margin');
  }

  const zIndexDisabled = getResponsiveSetting(settings, 'text_position_z_index', '.state-disabled');

  if (zIndexDisabled) {
    styles += simplePropertyStyled(zIndexDisabled, 'z-index');
  }

  const zIndexStyleDisabled = getResponsiveSetting(settings, 'position_z_index', '.state-disabled');

  if (zIndexStyleDisabled) {
    styles += simplePropertyStyled(zIndexStyleDisabled, 'z-index');
  }

  const backgroundColorDisabled = getResponsiveSetting(settings, 'text_style_background_color', '.state-disabled');

  if (backgroundColorDisabled) {
    styles += colorPropertyStyled(backgroundColorDisabled, 'background-color');
  }

  const opacityDisabled = getResponsiveSetting(settings, 'text_style_background_opacity', '.state-disabled');

  if (opacityDisabled) {
    styles += opacityStyled(opacityDisabled, 'opacity');
  }

  const borderStyleDisabled = getResponsiveSetting(settings, 'text_style_border_type', '.state-disabled');

  if (borderStyleDisabled) {
    styles += simplePropertyStyled(borderStyleDisabled, 'border-style');
  }

  const borderWidthDisabled = getResponsiveSetting(settings, 'text_style_border_width', '.state-disabled');

  if (borderWidthDisabled) {
    styles += borderWidthStyled(borderWidthDisabled);
  }

  const borderColorDisabled = getResponsiveSetting(settings, 'text_style_border_color', '.state-disabled');

  styles += colorPropertyStyled(borderColorDisabled, 'border-color', ' !important')

  const borderRadiusDisabled = getResponsiveSetting(settings, 'text_style_border_radius', '.state-disabled');

  if (borderRadiusDisabled) {
    styles += dimensionsStyled(borderRadiusDisabled, "border-radius");
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-text {`;
  const paddingActive = getResponsiveSetting(settings, 'text_style_position_padding', '.active');

  if (paddingActive) {
    styles += dimensionsControllerToStyles(paddingActive);
  }

  const marginActive = getResponsiveSetting(settings, 'text_style_position_margin','.active');

  if (marginActive) {
    styles += dimensionsControllerToStyles(marginActive, 'margin');
  }

  const zIndexActive = getResponsiveSetting(settings, 'text_position_z_index', '.active');

  if (zIndexActive) {
    styles += simplePropertyStyled(zIndexActive, 'z-index');
  }

  const zIndexStyleActive = getResponsiveSetting(settings, 'position_z_index', '.active');

  if (zIndexStyleActive) {
    styles += simplePropertyStyled(zIndexStyleActive, 'z-index');
  }

  const backgroundColorActive = getResponsiveSetting(settings, 'text_style_background_color', '.active');

  if (backgroundColorActive) {
    styles += colorPropertyStyled(backgroundColorActive, 'background-color');
  }

  const opacityActive = getResponsiveSetting(settings, 'text_style_background_opacity', '.active');

  if (opacityActive) {
    styles += opacityStyled(opacityActive, 'opacity');
  }

  const borderStyleActive = getResponsiveSetting(settings, 'text_style_border_type', '.active');

  if (borderStyleActive) {
    styles += simplePropertyStyled(borderStyleActive, 'border-style');
  }

  const borderWidthActive = getResponsiveSetting(settings, 'text_style_border_width', '.active');

  if (borderWidthActive) {
    styles += borderWidthStyled(borderWidthActive);
  }

  const borderColorActive = getResponsiveSetting(settings, 'text_style_border_color', '.active');

  styles += colorPropertyStyled(borderColorActive, 'border-color', ' !important')

  const borderRadiusActive = getResponsiveSetting(settings, 'text_style_border_radius', '.active');

  if (borderRadiusActive) {
    styles += dimensionsStyled(borderRadiusActive, "border-radius");
  }

  styles += `} `;

  //hover

  styles+=`${parentClass} .altrp-text p {`

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_paragraph_color'), 'color')
  styles += typographicControllerToStyles(getResponsiveSetting(settings, 'text_paragraph_typographic'))

  const paragraphMargin = getResponsiveSetting(settings, 'text_paragraph_margin');

  if (paragraphMargin) {
    styles += dimensionsControllerToStyles(paragraphMargin, 'margin', ' !important');
  }

  const textIndent = getResponsiveSetting(settings,"text_paragraph_indent");

  if (textIndent){
    styles+=`text-indent:${sliderStyled(textIndent)};`;
  }

  styles += `} `;

  //state disabled
  styles+=`${parentClass} .altrp-text p {`

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_paragraph_color', '.state-disabled'), 'color')
  styles += typographicControllerToStyles(getResponsiveSetting(settings, 'text_paragraph_typographic', '.state-disabled'))

  const paragraphMarginDisabled = getResponsiveSetting(settings, 'text_paragraph_margin', '.state-disabled');

  if (paragraphMarginDisabled) {
    styles += dimensionsControllerToStyles(paragraphMarginDisabled, 'margin', ' !important');
  }

  const textIndentDisabled = getResponsiveSetting(settings,"text_paragraph_indent", '.state-disabled');

  if (textIndentDisabled){
    styles+=`text-indent:${sliderStyled(textIndentDisabled)};`;
  }

  styles += `} `;
  //state active
  styles+=`${parentClass} .altrp-text p {`

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_paragraph_color', '.active'), 'color')
  styles += typographicControllerToStyles(getResponsiveSetting(settings, 'text_paragraph_typographic', '.active'))

  const paragraphMarginActive = getResponsiveSetting(settings, 'text_paragraph_margin', '.active');

  if (paragraphMarginActive) {
    styles += dimensionsControllerToStyles(paragraphMarginActive, 'margin', ' !important');
  }

  const textIndentActive = getResponsiveSetting(settings,"text_paragraph_indent", '.active');

  if (textIndentActive){
    styles+=`text-indent:${sliderStyled(textIndentActive)};`;
  }

  styles += `} `;

  styles+=`${parentClass} .altrp-text blockquote {`

  const blockquoteMargin = getResponsiveSetting(settings, 'text_blockquote_margin');

  if (blockquoteMargin) {
    styles += dimensionsControllerToStyles(blockquoteMargin, 'margin');
  }

  const blockquotePadding = getResponsiveSetting(settings, 'text_blockquote_padding');

  if (blockquotePadding) {
    styles += dimensionsControllerToStyles(blockquotePadding, 'padding');
  }

  const blockquoteBackgroundColor = getResponsiveSetting(settings, 'text_blockquote_background_color');

  if (blockquoteBackgroundColor) {
    styles += colorPropertyStyled(blockquoteBackgroundColor, 'background-color');
  }

  const blockquoteBorderStyle = getResponsiveSetting(settings, 'text_blockquote_border_type');

  if (blockquoteBorderStyle) {
    styles += simplePropertyStyled(blockquoteBorderStyle, 'border-style');
  }

  const blockquoteBorderWidth = getResponsiveSetting(settings, 'text_blockquote_border_width');

  if (blockquoteBorderWidth) {
    styles += borderWidthStyled(blockquoteBorderWidth);
  }

  const blockquoteBorderColor = getResponsiveSetting(settings, 'text_blockquote_border_color');

  if (blockquoteBorderColor) {
    styles += colorPropertyStyled(blockquoteBorderColor, 'border-color');
  }

  const blockquoteBorderRadius = getResponsiveSetting(settings, 'text_blockquote_border_radius');

  if (blockquoteBorderRadius) {
    styles += dimensionsStyled(blockquoteBorderRadius, "border-radius");
  }

  const blockquoteBoxShadow = getResponsiveSetting(
    settings,
    "text_blockquote_box_shadow"
  );

  if (blockquoteBoxShadow) {
    styles += shadowControllerToStyles(blockquoteBoxShadow);
  }

  const blockquoteTypographic = getResponsiveSetting(settings, 'text_blockquote_font_typographic');

  if (blockquoteTypographic) {
    styles += typographicControllerToStyles(blockquoteTypographic);
  }


  const blockquoteTextShadow = getResponsiveSetting(
    settings,
    "text_blockquote_text_shadow"
  );

  if (blockquoteTextShadow) {
    styles += textShadowControllerToStyles(blockquoteTextShadow);
  }

  styles += `} `;


  //state disabled
  styles+=`${parentClass} .altrp-text blockquote {`

  const blockquoteMarginDisabled = getResponsiveSetting(settings, 'text_blockquote_margin', '.state-disabled');

  if (blockquoteMarginDisabled) {
    styles += dimensionsControllerToStyles(blockquoteMarginDisabled, 'margin');
  }

  const blockquotePaddingDisabled = getResponsiveSetting(settings, 'text_blockquote_padding', '.state-disabled');

  if (blockquotePaddingDisabled) {
    styles += dimensionsControllerToStyles(blockquotePaddingDisabled, 'padding');
  }

  const blockquoteBackgroundColorDisabled = getResponsiveSetting(settings, 'text_blockquote_background_color', '.state-disabled');

  if (blockquoteBackgroundColorDisabled) {
    styles += colorPropertyStyled(blockquoteBackgroundColorDisabled, 'background-color');
  }

  const blockquoteBorderStyleDisabled = getResponsiveSetting(settings, 'text_blockquote_border_type', '.state-disabled');

  if (blockquoteBorderStyleDisabled) {
    styles += simplePropertyStyled(blockquoteBorderStyleDisabled, 'border-style');
  }

  const blockquoteBorderWidthDisabled = getResponsiveSetting(settings, 'text_blockquote_border_width', '.state-disabled');

  if (blockquoteBorderWidthDisabled) {
    styles += borderWidthStyled(blockquoteBorderWidthDisabled);
  }

  const blockquoteBorderColorDisabled = getResponsiveSetting(settings, 'text_blockquote_border_color', '.state-disabled');

  if (blockquoteBorderColorDisabled) {
    styles += colorPropertyStyled(blockquoteBorderColorDisabled, 'border-color');
  }

  const blockquoteBorderRadiusDisabled = getResponsiveSetting(settings, 'text_blockquote_border_radius', '.state-disabled');

  if (blockquoteBorderRadiusDisabled) {
    styles += dimensionsStyled(blockquoteBorderRadiusDisabled, "border-radius");
  }

  const blockquoteBoxShadowDisabled = getResponsiveSetting(
    settings,
    "text_blockquote_box_shadow", '.state-disabled'
  );

  if (blockquoteBoxShadowDisabled) {
    styles += shadowControllerToStyles(blockquoteBoxShadowDisabled);
  }

  const blockquoteTypographicDisabled = getResponsiveSetting(settings, 'text_blockquote_font_typographic', '.state-disabled');

  if (blockquoteTypographicDisabled) {
    styles += typographicControllerToStyles(blockquoteTypographicDisabled);
  }


  const blockquoteTextShadowDisabled = getResponsiveSetting(
    settings,
    "text_blockquote_text_shadow", '.state-disabled'
  );

  if (blockquoteTextShadowDisabled) {
    styles += textShadowControllerToStyles(blockquoteTextShadowDisabled);
  }

  styles += `} `;

  //state active
  styles+=`${parentClass} .altrp-text blockquote {`

  const blockquoteMarginActive = getResponsiveSetting(settings, 'text_blockquote_margin', '.active');

  if (blockquoteMarginActive) {
    styles += dimensionsControllerToStyles(blockquoteMarginActive, 'margin');
  }

  const blockquotePaddingActive = getResponsiveSetting(settings, 'text_blockquote_padding', '.active');

  if (blockquotePaddingActive) {
    styles += dimensionsControllerToStyles(blockquotePaddingActive, 'padding');
  }

  const blockquoteBackgroundColorActive = getResponsiveSetting(settings, 'text_blockquote_background_color', '.active');

  if (blockquoteBackgroundColorActive) {
    styles += colorPropertyStyled(blockquoteBackgroundColorActive, 'background-color');
  }

  const blockquoteBorderStyleActive = getResponsiveSetting(settings, 'text_blockquote_border_type', '.active');

  if (blockquoteBorderStyleActive) {
    styles += simplePropertyStyled(blockquoteBorderStyleActive, 'border-style');
  }

  const blockquoteBorderWidthActive = getResponsiveSetting(settings, 'text_blockquote_border_width', '.active');

  if (blockquoteBorderWidthActive) {
    styles += borderWidthStyled(blockquoteBorderWidthActive);
  }

  const blockquoteBorderColorActive = getResponsiveSetting(settings, 'text_blockquote_border_color', '.active');

  if (blockquoteBorderColorActive) {
    styles += colorPropertyStyled(blockquoteBorderColorActive, 'border-color');
  }

  const blockquoteBorderRadiusActive = getResponsiveSetting(settings, 'text_blockquote_border_radius', '.active');

  if (blockquoteBorderRadiusActive) {
    styles += dimensionsStyled(blockquoteBorderRadiusActive, "border-radius");
  }

  const blockquoteBoxShadowActive = getResponsiveSetting(
    settings,
    "text_blockquote_box_shadow", '.active'
  );

  if (blockquoteBoxShadowActive) {
    styles += shadowControllerToStyles(blockquoteBoxShadowActive);
  }

  const blockquoteTypographicActive = getResponsiveSetting(settings, 'text_blockquote_font_typographic', '.active');

  if (blockquoteTypographicActive) {
    styles += typographicControllerToStyles(blockquoteTypographicActive);
  }


  const blockquoteTextShadowActive = getResponsiveSetting(
    settings,
    "text_blockquote_text_shadow", '.active'
  );

  if (blockquoteTextShadowActive) {
    styles += textShadowControllerToStyles(blockquoteTextShadowActive);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-text table {`

  const tableMargin = getResponsiveSetting(settings, 'text_table_margin');

  if (tableMargin) {
    styles += dimensionsControllerToStyles(tableMargin, 'margin');
  }

  const tableBorderStyle = getResponsiveSetting(settings, 'text_table_border_type');

  if (tableBorderStyle) {
    styles += simplePropertyStyled(tableBorderStyle, 'border-style',"!important");
  }

  const tableBorderWidth = getResponsiveSetting(settings, 'text_table_border_width');

  if (tableBorderWidth) {
    styles += borderWidthStyled(tableBorderWidth,"!important");
  }

  const tableBorderColor = getResponsiveSetting(settings, 'text_table_border_color');

  if (tableBorderColor) {
    styles += colorPropertyStyled(tableBorderColor, 'border-color',"!important");
  }

  // const tableBorderRadius = getResponsiveSetting(settings, 'text_table_border_radius');

  // if (tableBorderRadius) {
  //   styles += borderRadiusStyled(tableBorderRadius);
  // }

  const tableOddRowsColor = getResponsiveSetting(settings,"text_table_odd_rows_color");

  if(tableOddRowsColor){
    styles+=`tr:nth-child(odd) {${colorPropertyStyled(tableOddRowsColor,"background")}}`
  }

  styles+= "th,td {";

  const tableCellsPadding = getResponsiveSetting(settings, 'text_table_padding');

  if (tableCellsPadding) {
    styles += dimensionsStyled(tableCellsPadding, 'padding',"!important");
  }

  const tableCellsBorderStyle = getResponsiveSetting(settings, 'text_table_cells_border_type');

  if (tableCellsBorderStyle) {
    styles += simplePropertyStyled(tableCellsBorderStyle, 'border-style',"!important");
  }

  const tableCellsBorderWidth = getResponsiveSetting(settings, 'text_table_cells_border_width');

  if (tableCellsBorderWidth) {
    styles += borderWidthStyled(tableCellsBorderWidth,"!important");
  }

  const tableCellsBorderColor = getResponsiveSetting(settings, 'text_table_cells_border_color');

  if (tableCellsBorderColor) {
    styles += colorPropertyStyled(tableCellsBorderColor, 'border-color',"!important");
  }

  // const tableCellsBorderRadius = getResponsiveSetting(settings, 'text_table_cells_border_radius');

  // if (tableCellsBorderRadius) {
  //   styles += borderRadiusStyled(tableCellsBorderRadius);
  // }

  const tableCellsTypographic = getResponsiveSetting(settings, 'text_table_cells_font_typographic');

  if (tableCellsTypographic) {
    styles += typographicControllerToStyles(tableCellsTypographic);
  }


  const tableCellsTextShadow = getResponsiveSetting(
    settings,
    "text_table_cells_text_shadow"
  );

  if (tableCellsTextShadow) {
    styles += textShadowControllerToStyles(tableCellsTextShadow);
  }

  styles+="}"

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-text table {`

  const tableMarginDisabled = getResponsiveSetting(settings, 'text_table_margin', '.state-disabled');

  if (tableMarginDisabled) {
    styles += dimensionsControllerToStyles(tableMarginDisabled, 'margin');
  }

  const tableBorderStyleDisabled = getResponsiveSetting(settings, 'text_table_border_type', '.state-disabled');

  if (tableBorderStyleDisabled) {
    styles += simplePropertyStyled(tableBorderStyleDisabled, 'border-style',"!important");
  }

  const tableBorderWidthDisabled = getResponsiveSetting(settings, 'text_table_border_width', '.state-disabled');

  if (tableBorderWidthDisabled) {
    styles += borderWidthStyled(tableBorderWidthDisabled,"!important");
  }

  const tableBorderColorDisabled = getResponsiveSetting(settings, 'text_table_border_color', '.state-disabled');

  if (tableBorderColorDisabled) {
    styles += colorPropertyStyled(tableBorderColorDisabled, 'border-color',"!important");
  }

  const tableOddRowsColorDisabled = getResponsiveSetting(settings,"text_table_odd_rows_color", '.state-disabled');

  if(tableOddRowsColorDisabled){
    styles+=`tr:nth-child(odd) {${colorPropertyStyled(tableOddRowsColorDisabled,"background")}}`
  }

  styles+= "th,td {";

  const tableCellsPaddingDisabled = getResponsiveSetting(settings, 'text_table_padding', '.state-disabled');

  if (tableCellsPaddingDisabled) {
    styles += dimensionsStyled(tableCellsPaddingDisabled, 'padding',"!important");
  }

  const tableCellsBorderStyleDisabled = getResponsiveSetting(settings, 'text_table_cells_border_type', '.state-disabled');

  if (tableCellsBorderStyleDisabled) {
    styles += simplePropertyStyled(tableCellsBorderStyleDisabled, 'border-style',"!important");
  }

  const tableCellsBorderWidthDisabled = getResponsiveSetting(settings, 'text_table_cells_border_width', '.state-disabled');

  if (tableCellsBorderWidthDisabled) {
    styles += borderWidthStyled(tableCellsBorderWidthDisabled,"!important");
  }

  const tableCellsBorderColorDisabled = getResponsiveSetting(settings, 'text_table_cells_border_color', '.state-disabled');

  if (tableCellsBorderColorDisabled) {
    styles += colorPropertyStyled(tableCellsBorderColorDisabled, 'border-color',"!important");
  }

  const tableCellsTypographicDisabled = getResponsiveSetting(settings, 'text_table_cells_font_typographic', '.state-disabled');

  if (tableCellsTypographicDisabled) {
    styles += typographicControllerToStyles(tableCellsTypographicDisabled);
  }


  const tableCellsTextShadowDisabled = getResponsiveSetting(
    settings,
    "text_table_cells_text_shadow", '.state-disabled'
  );

  if (tableCellsTextShadowDisabled) {
    styles += textShadowControllerToStyles(tableCellsTextShadowDisabled);
  }

  styles+="}"

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-text table {`

  const tableMarginActive = getResponsiveSetting(settings, 'text_table_margin', '.active');

  if (tableMarginActive) {
    styles += dimensionsControllerToStyles(tableMarginActive, 'margin');
  }

  const tableBorderStyleActive = getResponsiveSetting(settings, 'text_table_border_type', '.active');

  if (tableBorderStyleActive) {
    styles += simplePropertyStyled(tableBorderStyleActive, 'border-style',"!important");
  }

  const tableBorderWidthActive = getResponsiveSetting(settings, 'text_table_border_width', '.active');

  if (tableBorderWidthActive) {
    styles += borderWidthStyled(tableBorderWidthActive,"!important");
  }

  const tableBorderColorActive = getResponsiveSetting(settings, 'text_table_border_color', '.active');

  if (tableBorderColorActive) {
    styles += colorPropertyStyled(tableBorderColorActive, 'border-color',"!important");
  }

  const tableOddRowsColorActive = getResponsiveSetting(settings,"text_table_odd_rows_color", '.active');

  if(tableOddRowsColorActive){
    styles+=`tr:nth-child(odd) {${colorPropertyStyled(tableOddRowsColorActive,"background")}}`
  }

  styles+= "th,td {";

  const tableCellsPaddingActive = getResponsiveSetting(settings, 'text_table_padding', '.active');

  if (tableCellsPaddingActive) {
    styles += dimensionsStyled(tableCellsPaddingActive, 'padding',"!important");
  }

  const tableCellsBorderStyleActive = getResponsiveSetting(settings, 'text_table_cells_border_type', '.active');

  if (tableCellsBorderStyleActive) {
    styles += simplePropertyStyled(tableCellsBorderStyleActive, 'border-style',"!important");
  }

  const tableCellsBorderWidthActive = getResponsiveSetting(settings, 'text_table_cells_border_width', '.active');

  if (tableCellsBorderWidthActive) {
    styles += borderWidthStyled(tableCellsBorderWidthActive,"!important");
  }

  const tableCellsBorderColorActive = getResponsiveSetting(settings, 'text_table_cells_border_color', '.active');

  if (tableCellsBorderColorActive) {
    styles += colorPropertyStyled(tableCellsBorderColorActive, 'border-color',"!important");
  }

  const tableCellsTypographicActive = getResponsiveSetting(settings, 'text_table_cells_font_typographic', '.active');

  if (tableCellsTypographicActive) {
    styles += typographicControllerToStyles(tableCellsTypographicActive);
  }


  const tableCellsTextShadowActive = getResponsiveSetting(
    settings,
    "text_table_cells_text_shadow", '.active'
  );

  if (tableCellsTextShadowActive) {
    styles += textShadowControllerToStyles(tableCellsTextShadowActive);
  }

  styles+="}"

  styles += `} `;

  styles += `${parentClass} .altrp-text a {`;

  const linkTypographic = getResponsiveSetting(settings, 'text_link_font_typographic');

  if (linkTypographic) {
    styles += typographicControllerToStyles(linkTypographic);
  }

  const linkTextShadow = getResponsiveSetting(settings, "text_link_text_shadow");

  if (linkTextShadow) {
    styles += textShadowControllerToStyles(linkTextShadow);
  }

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_link_color'), 'color')

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-text a {`;

  const linkTypographicDisabled = getResponsiveSetting(settings, 'text_link_font_typographic', '.state-disabled');

  if (linkTypographicDisabled) {
    styles += typographicControllerToStyles(linkTypographicDisabled);
  }

  const linkTextShadowDisabled = getResponsiveSetting(settings, "text_link_text_shadow", '.state-disabled');

  if (linkTextShadowDisabled) {
    styles += textShadowControllerToStyles(linkTextShadowDisabled);
  }

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_link_color', '.state-disabled'), 'color')

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-text a {`;

  const linkTypographicActive = getResponsiveSetting(settings, 'text_link_font_typographic', '.active');

  if (linkTypographicActive) {
    styles += typographicControllerToStyles(linkTypographicActive);
  }

  const linkTextShadowActive = getResponsiveSetting(settings, "text_link_text_shadow", '.active');

  if (linkTextShadowActive) {
    styles += textShadowControllerToStyles(linkTextShadowActive);
  }

  styles += colorPropertyStyled(getResponsiveSetting(settings, 'text_link_color', '.active'), 'color')

  styles += `} `;


  const startNumber = getResponsiveSetting(settings, 'start_number')
  styles += `${parentClass} .altrp-text ol {`;

  styles += `counter-reset:list-number ${startNumber};`

  styles += `li {
    list-style:none;
  }`;
  styles += `li::before{
      margin: 0px 5px 0px 0px;
      content:counter(list-number) ".";
      counter-increment:list-number;
   }`;

  const numberedListMargin = getResponsiveSetting(settings, 'text_numbered_list_margin');

  if (numberedListMargin) {
    styles += dimensionsControllerToStyles(numberedListMargin, 'margin');
  }

  const numberedListItemMargin = getResponsiveSetting(settings, 'text_numbered_list_item_margin');

  if (numberedListItemMargin) {
    styles += `li{
      ${dimensionsControllerToStyles(numberedListItemMargin, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_numbered_list_color'), 'color')};
    }`;
  }


  const numberedListStyle = getResponsiveSetting(settings, 'text_numbered_list_style_type');

  if (numberedListStyle) {
    styles += simplePropertyStyled(numberedListStyle, 'list-style-type');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-text ol {`;

  const numberedListMarginDisabled = getResponsiveSetting(settings, 'text_numbered_list_margin', '.state-disabled');

  if (numberedListMarginDisabled) {
    styles += dimensionsControllerToStyles(numberedListMarginDisabled, 'margin');
  }

  const numberedListItemMarginDisabled = getResponsiveSetting(settings, 'text_numbered_list_item_margin', '.state-disabled');

  if (numberedListItemMarginDisabled) {
    styles += `li{
      ${dimensionsControllerToStyles(numberedListItemMarginDisabled, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_numbered_list_color', '.state-disabled'), 'color')};
    }`;
  }

  const numberedListStyleDisabled = getResponsiveSetting(settings, 'text_numbered_list_style_type', '.state-disabled');

  if (numberedListStyleDisabled) {
    styles += simplePropertyStyled(numberedListStyleDisabled, 'list-style-type');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-text ol {`;

  const numberedListMarginActive = getResponsiveSetting(settings, 'text_numbered_list_margin', '.active');

  if (numberedListMarginActive) {
    styles += dimensionsControllerToStyles(numberedListMarginActive, 'margin');
  }

  const numberedListItemMarginActive = getResponsiveSetting(settings, 'text_numbered_list_item_margin', '.active');

  if (numberedListItemMarginActive) {
    styles += `li{
      ${dimensionsControllerToStyles(numberedListItemMarginActive, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_numbered_list_color', '.active'), 'color')};
    }`;
  }

  const numberedListStyleActive = getResponsiveSetting(settings, 'text_numbered_list_style_type', '.active');

  if (numberedListStyleActive) {
    styles += simplePropertyStyled(numberedListStyleActive, 'list-style-type');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-text ul {`;

  const unorderedListMargin = getResponsiveSetting(settings, 'text_unordered_list_margin');

  if (unorderedListMargin) {
    styles += dimensionsControllerToStyles(unorderedListMargin, 'margin');
  }

  const unorderedListItemMargin = getResponsiveSetting(settings, 'text_unordered_list_item_margin');

  if (unorderedListItemMargin) {
    styles += `li{
      ${dimensionsControllerToStyles(unorderedListItemMargin, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_unordered_list_color'), 'color')};
    }`;
  }

  const unorderedListStyle = getResponsiveSetting(settings, 'text_unordered_list_style_type');

  if (unorderedListStyle) {
    styles += simplePropertyStyled(unorderedListStyle, 'list-style-type');
  }

  styles += `} `;

  //state disabled
  styles += `${parentClass} .altrp-text ul {`;

  const unorderedListMarginDisabled = getResponsiveSetting(settings, 'text_unordered_list_margin', '.state-disabled');

  if (unorderedListMarginDisabled) {
    styles += dimensionsControllerToStyles(unorderedListMarginDisabled, 'margin');
  }

  const unorderedListItemMarginDisabled = getResponsiveSetting(settings, 'text_unordered_list_item_margin', '.state-disabled');

  if (unorderedListItemMarginDisabled) {
    styles += `li{
      ${dimensionsControllerToStyles(unorderedListItemMarginDisabled, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_unordered_list_color', '.state-disabled'), 'color')};
    }`;
  }

  const unorderedListStyleDisabled = getResponsiveSetting(settings, 'text_unordered_list_style_type', '.state-disabled');

  if (unorderedListStyleDisabled) {
    styles += simplePropertyStyled(unorderedListStyleDisabled, 'list-style-type');
  }

  styles += `} `;

  //state active
  styles += `${parentClass} .altrp-text ul {`;

  const unorderedListMarginActive = getResponsiveSetting(settings, 'text_unordered_list_margin', '.active');

  if (unorderedListMarginActive) {
    styles += dimensionsControllerToStyles(unorderedListMarginActive, 'margin');
  }

  const unorderedListItemMarginActive = getResponsiveSetting(settings, 'text_unordered_list_item_margin', '.active');

  if (unorderedListItemMarginActive) {
    styles += `li{
      ${dimensionsControllerToStyles(unorderedListItemMarginActive, 'margin')};
      ${colorPropertyStyled(getResponsiveSetting(settings, 'text_unordered_list_color', '.active'), 'color')};
    }`;
  }

  const unorderedListStyleActive = getResponsiveSetting(settings, 'text_unordered_list_style_type', '.active');

  if (unorderedListStyleActive) {
    styles += simplePropertyStyled(unorderedListStyleActive, 'list-style-type');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-text img {`;

  styles += `max-width: 100%; `

  styles += `} `;

  styles += `${parentClass} .ck.ck-editor__editable_inline {`;

  styles += `padding: 0; `

  styles += `} `;

  styles += `${parentClass} .altrp-text:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_style_background_color', ':hover'), 'background-color')};
    ${opacityStyled(getResponsiveSetting(settings, 'text_style_background_opacity', ':hover'), 'opacity')};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_style_border_color', ':hover'), 'border-color', ' !important')};
    ${borderRadiusStyled(getResponsiveSetting(settings, 'text_style_border_radius', ':hover'))};
    ${borderWidthStyled(getResponsiveSetting(settings, 'text_style_border_width', ':hover'))};
  }`


  styles+=`${parentClass} .altrp-text p:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_paragraph_color', ':hover'), 'color')};
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'text_paragraph_typographic', ':hover'))};
  }`


  styles+=`${parentClass} .altrp-text blockquote:hover {
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_blockquote_margin', ':hover'), 'margin')};
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_blockquote_padding', ':hover'), 'padding')};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_blockquote_background_color', ':hover'), 'background-color')};
    ${simplePropertyStyled(getResponsiveSetting(settings, 'text_blockquote_border_type', ':hover'), 'border-style')};
    ${borderWidthStyled(getResponsiveSetting(settings, 'text_blockquote_border_width', ':hover'))};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_blockquote_border_color', ':hover'), 'border-color')};
    ${borderRadiusStyled(getResponsiveSetting(settings, 'text_blockquote_border_radius', ':hover'))};
    ${shadowControllerToStyles(getResponsiveSetting(settings, "text_blockquote_box_shadow", ':hover'))};
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'text_blockquote_font_typographic', ':hover'))};
    ${textShadowControllerToStyles(getResponsiveSetting(settings, "text_blockquote_text_shadow", ':hover'))};
  }`


  styles += `${parentClass} .altrp-text table:hover {
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_table_margin', ':hover'), 'margin')};
    ${simplePropertyStyled(getResponsiveSetting(settings, 'text_table_border_type', ':hover'), 'border-style',"!important")};
    ${borderWidthStyled(getResponsiveSetting(settings, 'text_table_border_width', ':hover'),"!important")};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_table_border_color', ':hover'), 'border-color',"!important")};
  }`

  styles += `${parentClass} .altrp-text table tr:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings,"text_table_rows_color", ':hover'),"background")};
  }`

  styles += `${parentClass} .altrp-text table tr:nth-child(odd):hover {
    ${colorPropertyStyled(getResponsiveSetting(settings,"text_table_odd_rows_color", ':hover'),"background")};
  }`

  styles += `${parentClass} .altrp-text table th:hover,td:hover {
    ${dimensionsStyled(getResponsiveSetting(settings, 'text_table_padding', ':hover'), 'padding',"!important")};
    ${simplePropertyStyled(getResponsiveSetting(settings, 'text_table_cells_border_type', ':hover'), 'border-style',"!important")};
    ${borderWidthStyled(getResponsiveSetting(settings, 'text_table_cells_border_width', ':hover'),"!important")};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_table_cells_border_color', ':hover'), 'border-color',"!important")};
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'text_table_cells_font_typographic', ':hover'))};
    ${textShadowControllerToStyles(getResponsiveSetting(settings, "text_table_cells_text_shadow", ':hover'))};
  }`

  styles += `${parentClass} .altrp-text a:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_link_color', ':hover'), 'color')};
    ${typographicControllerToStyles(getResponsiveSetting(settings, 'text_link_font_typographic', ':hover'))};
    ${textShadowControllerToStyles(getResponsiveSetting(settings, "text_link_text_shadow", ':hover'))};
  }`

  styles += `${parentClass} .altrp-text ol:hover {
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_numbered_list_margin', ':hover'), 'margin')};
  }`

  styles += `${parentClass} .altrp-text ol li:hover {
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_numbered_list_color', ':hover'), 'color')};
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_numbered_list_item_margin', ':hover'), 'margin')};
  }`

  styles += `${parentClass} .altrp-text ul:hover {
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_unordered_list_margin', ':hover'), 'margin')};
  }`

  styles += `${parentClass} .altrp-text ul li:hover {
    ${dimensionsControllerToStyles(getResponsiveSetting(settings, 'text_unordered_list_item_margin', ':hover'), 'margin')};
    ${colorPropertyStyled(getResponsiveSetting(settings, 'text_unordered_list_color', ':hover'), 'color')};
  }`

  return styles;
}
