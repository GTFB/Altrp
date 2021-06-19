import { getResponsiveSetting } from '../../helpers';
import {
    simplePropertyStyled,
    borderWidthStyled,
    colorPropertyStyled,
    dimensionsControllerToStyles,
    typographicControllerToStyles,
    sizeStyled,
    shadowControllerToStyles,
  } from "../../helpers/styles";

  const getTabsStyles = (settings,id)=>{
    let styles ="";

    let justifyContent, backgroundColor;
    let color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;
    let fill,background,fontSize, marginBottom,marginRight, marginLeft,marginTop;

    const parentClass = `.altrp-element${id}`;

    styles += `${parentClass} .altrp-tab-btn-container {`;

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

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-container:hover {`;

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

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn {`;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'background_text_color_tab_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
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
        styles += simplePropertyStyled(borderType, 'border-type');
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
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_tab_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn:hover {`;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'background_text_color_tab_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
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
        styles += simplePropertyStyled(borderType, 'border-type');
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
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_tab_style', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-content {`;

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
        styles += simplePropertyStyled(borderRadius, 'border-radius');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-content:hover {`;

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
        styles += simplePropertyStyled(borderRadius, 'border-radius');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-content div {`;

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

      styles+="} ";
      
      styles+=`${parentClass} .altrp-tab-content div:hover {`;

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

      styles+="} ";


      styles+=`${parentClass} .altrp-tab-btn-icon svg path {`;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_icon_style');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-icon:hover svg path {`;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_icon_style', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher_off {`;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'box_around_color_after_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher_on  {`;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'box_around_color_before_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher__caret  {`;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'switch_after_color_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_switch_switch_button_style');
      }

      if (borderRadius) {
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-label-section-one  {`;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_title_section_one_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_title_section_one_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-section-one-text  {`;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_content_section_one_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-section-one-text p  {`;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_content_section_one_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-label-section-two  {`;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_title_section_two_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_title_section_two_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-section-two-text p  {`;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_content_section_two_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-section-two-text  {`;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_content_section_two_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher_on .altrp-tabs-switcher__caret {`;

       //Получаем значения background из контроллера, обрабатываем и добавляем в styles

       if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'switch_before_color_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher-container {`;

      //Получаем значения font-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fontSize = getResponsiveSetting(settings, 'size_switch_button_style');
      }

      if (fontSize) {
        styles += sizeStyled(fontSize, 'font-size');
      }

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'margin_bottom_switch_button_style');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs-switcher {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_switch_button_style');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_switch_button_style');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_box_switch_button_style');
      }

      if (borderRadius) {
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-column {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-column:hover {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      styles+=`} `;

      styles+=`${parentClass} .altrp-tab-btn-row {`;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-row:hover {`;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-top {`;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-top:hover {`;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover ');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-bottom {`;

      //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-bottom:hover {`;

      //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-left {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-left:hover {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-right {`;

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-btn-right:hover {`;
      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      styles+="} ";

      return styles;
  }

export default getTabsStyles;