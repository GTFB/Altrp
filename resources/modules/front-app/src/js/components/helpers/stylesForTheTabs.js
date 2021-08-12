import { getResponsiveSetting } from '../../helpers';
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  shadowControllerToStyles, sliderStyled, colorStyled,
} from "../../helpers/styles";

  const getTabsStyles = (settings,id)=>{
    let styles ="";

    let justifyContent, backgroundColor;
    let color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;
    let fill,background,fontSize, marginBottom,marginRight, marginLeft,marginTop;

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

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs .bp3-tab-list:hover {`;

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

      styles+=`${parentClass} .altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab p {`;
        //Получаем значения color из контроллера, обрабатываем и добавляем в styles

        if (settings !== undefined) {
          color = getResponsiveSetting(settings, 'background_text_color_tab_style');
        }

        if (color) {
          styles += colorPropertyStyled(color, 'color');
        }
      styles+= "}";

      styles+=`${parentClass} .altrp-tabs.altrp-tabs-without-animation.altrp-tabs-horizontal .bp3-tab[aria-selected="true"] {`;
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
      styles+= "}";

    styles+=`${parentClass} .altrp-tabs.altrp-tabs-without-animation.altrp-tabs-vertical .bp3-tab[aria-selected="true"] {`;
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
    styles+= "}";

      styles+=`${parentClass} .altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab.active p {`;
      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'background_text_color_tab_style', ".active");
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      styles+= "}";

      styles+=`${parentClass} .altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab {`;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color', "!important");
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow, "!important");
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

      styles+=`${parentClass} .altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab.active {`;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', ".active");
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color', "!important");
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', ".active");
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow, "!important");
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
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_tab_style', ".active");
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab:hover p {`;
      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'background_text_color_tab_style', ":hover");
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      styles+= "}";

      styles+=`${parentClass} .altrp-tabs.altrp-tabs .bp3-tab-indicator-wrapper ~ .bp3-tab:hover {`;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color', "!important");
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow, "!important");
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

      styles+=`${parentClass} .altrp-tab-content, ${parentClass} .altrp-tab-btn.bp3-tab-panel {`;

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
        styles += `border-radius: ${sliderStyled(borderRadius)};`;
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-content:hover, ${parentClass} .altrp-tab-btn.bp3-tab-panel:hover {`;

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
        styles += `border-radius: ${sliderStyled(borderRadius)};`;
      }

      styles+="} ";

      styles+=`${parentClass} .altrp-tab-content div, ${parentClass} .altrp-tab-btn.bp3-tab-panel div {`;

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

      styles+=`${parentClass} .altrp-tab-content div:hover, ${parentClass} .altrp-tab-btn.bp3-tab-panel div:hover {`;

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

      styles+=`${parentClass} .altrp-tab-vertical .altrp-tab {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-left');
      }

      styles+=`} `;

      styles+=`${parentClass} .altrp-tab-vertical.altrp-tab-btn {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-bottom');
      }

      styles+=`} `;

      styles+=`${parentClass} .altrp-tab-horizontal .altrp-tab {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-top');
      }

      styles+=`} `;

      styles+=`${parentClass} .altrp-tab-horizontal.altrp-tab-btn {`;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      styles+=`} `;

    styles+=`${parentClass} .bp3-tab-indicator-wrapper {`;

    //Получаем значения height в точных юнитах из контроллера, обрабатываем и добавляем в styles

    let indicatorHeight = "";

    if (settings !== undefined) {
      indicatorHeight = getResponsiveSetting(settings, 'indicator_height');
    }

    if (indicatorHeight) {
      styles += `height: ${sliderStyled(indicatorHeight)} !important;`;
    }

    styles+=`} `;

    styles+=`${parentClass} .bp3-tab-indicator {`;

    let indicatorColor = getResponsiveSetting(settings, 'indicator_color')

    if (indicatorColor && indicatorColor.color) {
      styles += colorPropertyStyled(indicatorColor, "background-color", "!important");
    }

    styles+=`} `;

    console.log(styles)
    return styles;
  }

export default getTabsStyles;
