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
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";

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

  styles += `${parentClass} .altrp-text ol {`;

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
