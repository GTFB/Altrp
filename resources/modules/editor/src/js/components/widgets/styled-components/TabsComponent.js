import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  shadowControllerToStyles,
} from "../../../../../../front-app/src/js/helpers/styles";

//НЕ ИСПОЛЬЗУЕТСЯ
//НЕ ИСПОЛЬЗУЕТСЯ
//НЕ ИСПОЛЬЗУЕТСЯ
//НЕ ИСПОЛЬЗУЕТСЯ

const TabsComponent = styled.div`

  & .altrp-tab-btn-container.altrp-tab-btn-container {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent, backgroundColor;

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

      return styles;

    }
    }
  }


  & .state-disabled.state-disabled .altrp-tab-btn-container {

    ${props => {

  const { settings } = props;
  let styles = '';

  let justifyContent, backgroundColor;

  //state disabled

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'alignment_tabs', '.state-disabled');
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }
  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_tab_style', '.state-disabled');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  return styles;

}
}
  }

 & .active.active .altrp-tab-btn-container {

    ${props => {

  const { settings } = props;
  let styles = '';

  let justifyContent, backgroundColor;

  //state active

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, 'alignment_tabs', '.active');
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, 'justify-content');
  }
  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_tab_style', '.active');
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }

  return styles;

}
}
  }


  & .altrp-tab-btn-container.altrp-tab-btn-container:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent, backgroundColor;

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

      return styles;

    }
    }
  }

  && .bp3-tab {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor,color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;

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

      return styles;

    }
    }
  }


  & .state-disabled.state-disabled .bp3-tab {

    ${props => {

  const { settings } = props;
  let styles = '';

  let backgroundColor,color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;

  //state disabled

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', '.state-disabled');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'background_text_color_tab_style', '.state-disabled');
  }
  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }
  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', '.state-disabled');
  }
  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_tab_style', '.state-disabled');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_tab_style', '.state-disabled');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-type');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_tab_style', '.state-disabled');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_tab_style', '.state-disabled');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_tab_style', '.state-disabled');
  }
  if (borderRadius) {
    styles += sizeStyled(borderRadius, 'border-radius');
  }
  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_tab_style', '.state-disabled');
  }
  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  return styles;

}
}
  }


  & .active.active .bp3-tab {

    ${props => {

  const { settings } = props;
  let styles = '';

  let backgroundColor,color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;

  //state active

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_type_tab_style', '.active');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'background_text_color_tab_style', '.active');
  }
  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }
  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'box_shadow_tab_style', '.active');
  }
  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_tab_style', '.active');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_tab_style', '.active');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-type');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_tab_style', '.active');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_tab_style', '.active');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_tab_style', '.active');
  }
  if (borderRadius) {
    styles += sizeStyled(borderRadius, 'border-radius');
  }
  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_tab_style', '.active');
  }
  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  return styles;

}
}
  }


  && .altrp-tab-btn:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor,color, boxShadow, padding, borderType, borderWidth, borderColor, borderRadius, typographic;

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

      return styles;

    }
    }
  }

  && .altrp-tab-content {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

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

      return styles;

    }
    }
  }

   & .state-disabled.state-disabled .altrp-tab-content {

    ${props => {

  const { settings } = props;
  let styles = '';

  let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

  //state disabled

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_content_style', '.state-disabled');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_content_style', '.state-disabled');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_content_style', '.state-disabled');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_content_style', '.state-disabled');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_content_style', '.state-disabled');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_content_style', '.state-disabled');
  }
  if (borderRadius) {
    styles += simplePropertyStyled(borderRadius, 'border-radius');
  }

  return styles;

}
}
  }


     & .active.active .altrp-tab-content {

    ${props => {

  const { settings } = props;
  let styles = '';

  let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

  //state active

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'background_content_style', '.active');
  }
  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, 'background-color');
  }
  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'padding_content_style', '.active');
  }
  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }
  if (settings !== undefined) {
    borderType = getResponsiveSetting(settings, 'border_type_content_style', '.active');
  }
  if (borderType) {
    styles += simplePropertyStyled(borderType, 'border-style');
  }
  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'border_width_content_style', '.active');
  }
  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }
  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'border_color_content_style', '.active');
  }
  if (borderColor) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }
  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'border_radius_content_style', '.active');
  }
  if (borderRadius) {
    styles += simplePropertyStyled(borderRadius, 'border-radius');
  }

  return styles;

}
}
  }

  && .altrp-tab-content:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

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

      return styles;

    }
    }
  }

  && .altrp-tab-content div {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

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

      return styles;

    }
    }
  }



   & .state-disabled.state-disabled .altrp-tab-content div {

    ${props => {

  const { settings } = props;
  let styles = '';

  let color, typographic;

  //state disabled

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'text_color_content_style', '.state-disabled');
  }
  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }
  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_content_style', '.state-disabled');
  }
  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }
  return styles;

}
}
  }

     & .active.active .altrp-tab-content div {

    ${props => {

  const { settings } = props;
  let styles = '';

  let color, typographic;

  //state active

  if (settings !== undefined) {
    color = getResponsiveSetting(settings, 'text_color_content_style', '.active');
  }
  if (color) {
    styles += colorPropertyStyled(color, 'color');
  }
  if (settings !== undefined) {
    typographic = getResponsiveSetting(settings, 'typographic_content_style', '.active');
  }
  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }
  return styles;

}
}
  }


  && .altrp-tab-content div:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

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

      return styles;

    }
    }
  }

  && .altrp-tab-btn-icon svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_icon_style');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

   & .state-disabled.state-disabled .altrp-tab-btn-icon svg path {

    ${props => {

  const { settings } = props;
  let styles = '';

  let fill;

  //state disabled

  if (settings !== undefined) {
    fill = getResponsiveSetting(settings, 'color_icon_style', '.state-disabled');
  }
  if (fill) {
    styles += colorPropertyStyled(fill, 'fill');
  }

  return styles;

}
}
  }

   & .active.active .altrp-tab-btn-icon svg path {

    ${props => {

  const { settings } = props;
  let styles = '';

  let fill;

  //state active

  if (settings !== undefined) {
    fill = getResponsiveSetting(settings, 'color_icon_style', '.active');
  }
  if (fill) {
    styles += colorPropertyStyled(fill, 'fill');
  }

  return styles;

}
}
  }


  && .altrp-tab-btn-icon:hover svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_icon_style', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  && .altrp-tabs-switcher_off {

    ${props => {

      const { settings } = props;
      let styles = '';

      let background;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'box_around_color_after_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      return styles;

    }
    }
  }

  & .state-disabled.state-disabled .altrp-tabs-switcher_off {

    ${props => {

  const { settings } = props;
  let styles = '';

  let background;

  //state disabled

  if (settings !== undefined) {
    background = getResponsiveSetting(settings, 'box_around_color_after_switch_button_style', '.state-disabled');
  }

  if (background) {
    styles += colorPropertyStyled(background, 'background');
  }

  return styles;

}
}
  }

   & .active.active .altrp-tabs-switcher_off {

    ${props => {

  const { settings } = props;
  let styles = '';

  let background;

  //state active

  if (settings !== undefined) {
    background = getResponsiveSetting(settings, 'box_around_color_after_switch_button_style', '.active');
  }

  if (background) {
    styles += colorPropertyStyled(background, 'background');
  }

  return styles;

}
}
  }

  & .altrp-tabs-switcher_on.altrp-tabs-switcher_on  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let background;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'box_around_color_before_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher__caret.altrp-tabs-switcher__caret  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let background, borderRadius;

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

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-label-section-one.altrp-tabs-switcher-label-section-one  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

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

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-section-one-text .altrp-tabs-switcher-section-one-text  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_content_section_one_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-section-one-text.altrp-tabs-switcher-section-one-text p  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_content_section_one_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-label-section-two.altrp-tabs-switcher-label-section-two  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

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

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-section-two-text.altrp-tabs-switcher-section-two-text p  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_content_section_two_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-section-two-text.altrp-tabs-switcher-section-two-text  {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_content_section_two_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher_on.altrp-tabs-switcher_on .altrp-tabs-switcher__caret {

    ${props => {

      const { settings } = props;
      let styles = '';

      let background;

      //Получаем значения background из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        background = getResponsiveSetting(settings, 'switch_before_color_switch_button_style');
      }

      if (background) {
        styles += colorPropertyStyled(background, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher-container.altrp-tabs-switcher-container {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fontSize, marginBottom;

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

      return styles;

    }
    }
  }

  & .altrp-tabs-switcher.altrp-tabs-switcher {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight, marginLeft, borderRadius;

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

      return styles;

    }
    }
  }

  & .altrp-tab-btn-column.altrp-tab-btn-column {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-column:hover.altrp-tab-btn-column:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-row.altrp-tab-btn-row {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-row.altrp-tab-btn-row:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_column_tabs', ':hover');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-top.altrp-tab-btn-top {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-top.altrp-tab-btn-top:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover ');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-bottom.altrp-tab-btn-bottom {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginTop;

      //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-bottom.altrp-tab-btn-bottom:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginTop;

      //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-left.altrp-tab-btn-left {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-left.altrp-tab-btn-left:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-right.altrp-tab-btn-right {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft;

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_content_tabs');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      return styles;

    }
    }
  }

  & .altrp-tab-btn-right.altrp-tab-btn-right:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft;

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_content_tabs', ':hover');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      return styles;

    }
    }
  }

`;

  export default TabsComponent;
