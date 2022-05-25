import {getResponsiveSetting} from "../../functions/getResponsiveSetting";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  shadowControllerToStyles, sliderStyled, colorStyled, dimensionsStyled,
} from "../../helpers/styles";

const getTabsStyles = (settings, id) => {
  let styles = "";

  let justifyContent, backgroundColor;
  let color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;
  let fill, background, fontSize, marginBottom, marginRight, marginLeft, marginTop;

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-tabs .bp3-tab-list  {`;

  //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'alignment_tabs');
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_tab_style');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tabs .bp3-tab-list:hover {`;

  //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'alignment_tabs', ':hover');
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_tab_style', ':hover');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tabs.altrp-tabs .bp3-tab p {`;
  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'background_text_color_tab_style');
  }

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }
  styles += "}";

  styles += `${parentClass} .altrp-tabs.altrp-tabs-without-animation.altrp-tabs-horizontal .bp3-tab[aria-selected="true"] {`;
  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'indicator_color');
  }

  if (color) {
    if (color) {
      if (color.color) {
        styles += `box-shadow: inset 0 -3px 0 ${color.color};`;
      }
    }
  }
  styles += "}";

  styles += `${parentClass} .altrp-tabs.altrp-tabs-without-animation.altrp-tabs-vertical .bp3-tab[aria-selected="true"] {`;
  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'indicator_color');
  }

  if (color) {
    if (color) {
      if (color.color) {
        styles += colorStyled(color, "background-color");
      }
    }
  }
  styles += "}";

  styles += `${parentClass} .altrp-tabs.altrp-tabs .bp3-tab.active p {`;
  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'background_text_color_tab_style', ".active");
  }

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }

  styles += "}";

  styles += `${parentClass} .altrp-tabs  .bp3-tab.bp3-tab.bp3-tab {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style');
  }

  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_tab_style');
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_tab_style');
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_tab_style');
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_tab_style');
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_tab_style');
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }

  //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_tab_style');
  }

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tabs  .bp3-tab.bp3-tab.bp3-tab.active {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', ".active");
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', ".active");
  }

  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_tab_style', ".active");
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_tab_style', ".active");
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_tab_style', ".active");
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_tab_style', ".active");
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_tab_style', ".active");
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }

  //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_tab_style', ".active");
  }

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tabs.altrp-tabs  .bp3-tab:hover p {`;
  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'background_text_color_tab_style', ":hover");
  }

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }

  styles += "}";

  styles += `${parentClass} .altrp-tabs .bp3-tab.bp3-tab.bp3-tab:hover {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', ':hover');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', ':hover');
  }

  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_tab_style', ':hover');
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_tab_style', ':hover');
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_tab_style', ':hover');
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_tab_style', ':hover');
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_tab_style', ':hover');
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }

  //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_tab_style', ':hover');
  }

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-content {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_content_style');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_content_style');
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_content_style');
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_content_style');
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_content_style');
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles


  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_content_style');
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-content:hover {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_content_style', ':hover');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_content_style', ':hover');
  }

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_content_style', ':hover');
  }

  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_content_style', ':hover');
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_content_style', ':hover');
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles


  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_content_style', ':hover');
  }

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, 'border-radius');
  }


  styles += "} ";

  styles += `${parentClass} .altrp-tab {`;

  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'text_color_content_style');
  }

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }

  //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_content_style');
  }

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab:hover {`;

  //Получаем значения color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'text_color_content_style', ':hover');
  }

  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }

  //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_content_style', ':hover');
  }

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  styles += "} ";

  const i_size = getResponsiveSetting(settings, 'i_size')
  if(i_size){
    styles += `${parentClass} .altrp-tab-btn-icon img, ${parentClass} .altrp-tab-btn-icon svg{`;

    styles += `width:${sliderStyled(i_size)};height:${sliderStyled(i_size)};`

    styles += "} ";

  }
  styles += `${parentClass} .altrp-tab-btn-icon svg path {`;

  //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    fill = getResponsiveSetting(settings, 'color_icon_style');
  }

  if (fill) {
    styles += colorPropertyStyled(fill, 'fill');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-btn-icon:hover svg path {`;

  //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    fill = getResponsiveSetting(settings, 'color_icon_style', ':hover');
  }

  if (fill) {
    styles += colorPropertyStyled(fill, 'fill');
  }

  styles += "} ";


  styles += `${parentClass} .altrp-tab-btn-column {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-right');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-btn-column:hover {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-right');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-tab-btn-row {`;

  //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs');
  }

  if (marginBottom) {
    styles += sizeStyled(marginBottom, 'margin-bottom');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-btn-row:hover {`;

  //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
  }

  if (marginBottom) {
    styles += sizeStyled(marginBottom, 'margin-bottom');
  }

  styles += "} ";

  styles += `${parentClass} .altrp-tab-vertical.bp3-tab-panel {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-left');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-tab-vertical.bp3-tab {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-bottom');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-tab-horizontal.bp3-tab-panel {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-top');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-tab-horizontal.bp3-tab {`;

  //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
  }

  if (marginRight) {
    styles += sizeStyled(marginRight, 'margin-right');
  }

  styles += `} `;

  styles += `${parentClass} .bp3-tab-indicator-wrapper {`;

  styles += `} `;


  styles += `${parentClass} .bp3-tab-indicator.bp3-tab-indicator.bp3-tab-indicator.bp3-tab-indicator {`;

  let indicatorColor = getResponsiveSetting(settings, 'indicator_color')

  if (indicatorColor && indicatorColor.color) {
    styles += colorPropertyStyled(indicatorColor, "background-color",);
  }
  styles += `} `;

  if (indicatorColor && indicatorColor.color) {
    styles += `${parentClass} .altrp-tabs-horizontal .bp3-tab-indicator-wrapper ~ .altrp-tab-btn.active {`;
    styles += `box-shadow: inset 0 -3px ${indicatorColor.color};`
    styles += `} `;
  }
  styles += `${parentClass} .altrp-tab {`;

  let contentBackgroundColor,
    contentPadding,
    contentBorderType,
    contentBorderWidth,
    contentBorderColor,
    contentBorderRadius;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBackgroundColor = getResponsiveSetting(settings, 'background_content_style');
  }

  if (contentBackgroundColor) {
    styles += colorPropertyStyled(contentBackgroundColor, 'background-color');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentPadding = getResponsiveSetting(settings, 'padding_content_style');
  }

  if (contentPadding) {
    styles += dimensionsControllerToStyles(contentPadding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderType = getResponsiveSetting(settings, 'border_type_content_style');
  }

  if (contentBorderType) {
    styles += simplePropertyStyled(contentBorderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderWidth = getResponsiveSetting(settings, 'border_width_content_style');
  }

  if (contentBorderWidth) {
    styles += borderWidthStyled(contentBorderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderColor = getResponsiveSetting(settings, 'border_color_content_style');
  }

  if (contentBorderColor) {
    styles += colorPropertyStyled(contentBorderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderRadius = getResponsiveSetting(settings, 'border_radius_content_style');
  }

  if (contentBorderRadius) {
    styles += dimensionsStyled(contentBorderRadius, 'border-radius');
  }

  styles += `} `;

  styles += `${parentClass} .altrp-tab:hover {`;

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBackgroundColor = getResponsiveSetting(settings, 'background_content_style', ':hover');
  }

  if (contentBackgroundColor) {
    styles += colorPropertyStyled(contentBackgroundColor, 'background-color');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentPadding = getResponsiveSetting(settings, 'padding_content_style', ':hover');
  }

  if (contentPadding) {
    styles += dimensionsControllerToStyles(contentPadding);
  }

  //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderType = getResponsiveSetting(settings, 'border_type_content_style', ':hover');
  }

  if (contentBorderType) {
    styles += simplePropertyStyled(contentBorderType, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderWidth = getResponsiveSetting(settings, 'border_width_content_style', ':hover');
  }

  if (contentBorderWidth) {
    styles += borderWidthStyled(contentBorderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderColor = getResponsiveSetting(settings, 'border_color_content_style', ':hover');
  }

  if (contentBorderColor) {
    styles += colorPropertyStyled(contentBorderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    contentBorderRadius = getResponsiveSetting(settings, 'border_radius_content_style', ':hover');
  }

  if (contentBorderRadius) {
    styles += dimensionsStyled(contentBorderRadius, 'border-radius');
  }

  styles += `} `;

  return styles;
}

export default getTabsStyles;
