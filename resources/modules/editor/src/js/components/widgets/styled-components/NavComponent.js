import  getResponsiveSetting  from "../../../../../../front-app/src/js/functions/getResponsiveSetting";
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
} from "../../../../../../front-app/src/js/helpers/styles";

const NavComponent = styled.div`

  && .altrp-nav-menu-dropdown-wrapper {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'toggle_align_dropdown_menu_layout');
      }

      if (justifyContent) {
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-label {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_main_menu_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_main_menu_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-label:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_main_menu_style', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_main_menu_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, horizontalPadding, verticalPadding;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_main_menu_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения horizontal-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'horizontal_padding_main_menu_style');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      //Получаем значения vertical-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalPadding = getResponsiveSetting(settings, 'vertical_padding_main_menu_style');
      }

      if (verticalPadding) {
        styles += sizeStyled(verticalPadding, 'padding-top');
        styles += sizeStyled(verticalPadding, 'padding-bottom');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, horizontalPadding, verticalPadding;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_main_menu_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения horizontal-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'horizontal_padding_main_menu_style', ':hover');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      //Получаем значения vertical-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalPadding = getResponsiveSetting(settings, 'vertical_padding_main_menu_style', ':hover');
      }

      if (verticalPadding) {
        styles += sizeStyled(verticalPadding, 'padding-top');
        styles += sizeStyled(verticalPadding, 'padding-bottom');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill, stroke;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'fill_chevron_main_menu_style');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'stroke_chevron_main_menu_style');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill, stroke;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'fill_chevron_main_menu_style', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'stroke_chevron_main_menu_style', ':hover');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'size_chevron_main_menu_style');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'size_chevron_main_menu_style', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'space_between_main_menu_style');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'space_between_main_menu_style', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link .altrp-nav-menu-li-link-icon {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft, transformRotate;

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'dropdown_indicator_space_main_menu_style');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_rotate_main_menu_style');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link:hover .altrp-nav-menu-li-link-icon {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft, transformRotate;

      //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'dropdown_indicator_space_main_menu_style', ':hover');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_rotate_main_menu_style', ':hover');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-overline:before,
  && .altrp-nav-menu-li-underLine:after,
  && .altrp-nav-menu-li-doubleLine:before,
  && .altrp-nav-menu-li-framed:before,
  && .altrp-nav-menu-li-framed:after,
  && .altrp-nav-menu-li-background:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'pointer_color_main_menu_style');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-overline:hover::before,
  && .altrp-nav-menu-li-underLine:hover::after,
  && .altrp-nav-menu-li-doubleLine:hover::before,
  && .altrp-nav-menu-li-framed:hover::before,
  && .altrp-nav-menu-li-framed:hover::after,
  && .altrp-nav-menu-li-background:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'pointer_color_main_menu_style', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-animation-text:hover .altrp-nav-menu-li-link-label {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'pointer_color_main_menu_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-underline:after,
  && .altrp-nav-menu-li-overline:before,
  && .altrp-nav-menu-li-doubleLine:before {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'pointer_height_main_menu_style');
      }

      if (height) {
        styles += sizeStyled(height, 'height');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-framed:hover::after {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'pointer_height_main_menu_style');
      }

      if (borderWidth) {
        styles += sizeStyled(borderWidth, 'border-right-width');
        styles += sizeStyled(borderWidth, 'border-bottom-width');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-framed:hover:before {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'pointer_height_main_menu_style');
      }

      if (borderWidth) {
        styles += sizeStyled(borderWidth, 'border-top-width');
        styles += sizeStyled(borderWidth, 'border-left-width');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-doubleLine:after {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'pointer_height_main_menu_style');
      }

      if (height) {
        styles += heightCalcStyled(height);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-label-dropdown {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_dropdown_menu_section');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_dropdown_menu_section');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-label-dropdown:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_dropdown_menu_section', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_dropdown_menu_section', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-dropdown {

    ${props => {

      const { settings } = props;
      let styles = '';

      let horizontalPadding, verticalPadding;

      //Получаем значения horizontal padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'horizontal_padding_dropdown_menu_section');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      //Получаем значения vertical padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalPadding = getResponsiveSetting(settings, 'vertical_padding_dropdown_menu_section');
      }

      if (verticalPadding) {
        styles += sizeStyled(verticalPadding, 'padding-top');
        styles += sizeStyled(verticalPadding, 'padding-bottom');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-dropdown:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let horizontalPadding, verticalPadding;

      //Получаем значения horizontal padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'horizontal_padding_dropdown_menu_section', ':hover');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      //Получаем значения vertical padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalPadding = getResponsiveSetting(settings, 'vertical_padding_dropdown_menu_section', ':hover');
      }

      if (verticalPadding) {
        styles += sizeStyled(verticalPadding, 'padding-top');
        styles += sizeStyled(verticalPadding, 'padding-bottom');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-s-content-divider {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderTopStyle, borderTopColor, borderTopWidth;

      //Получаем значения border-top-style padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopStyle = getResponsiveSetting(settings, 'divider_type_dropdown_menu_section');
      }

      if (borderTopStyle) {
        styles += simplePropertyStyled(borderTopStyle, 'border-top-style');
      }

      //Получаем значения borderTopColor из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopColor = getResponsiveSetting(settings, 'divider_color_dropdown_menu_section');
      }

      if (borderTopColor) {
        styles += colorPropertyStyled(borderTopColor, 'border-top-color');
      }

      //Получаем значения border-top-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopWidth = getResponsiveSetting(settings, 'divider_width_dropdown_menu_section');
      }

      if (borderTopWidth) {
        styles += sizeStyled(borderTopWidth, 'border-top-width');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-s-content-divider:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderTopStyle, borderTopColor, borderTopWidth;

      //Получаем значения border-top-style padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopStyle = getResponsiveSetting(settings, 'divider_type_dropdown_menu_section', ':hover');
      }

      if (borderTopStyle) {
        styles += simplePropertyStyled(borderTopStyle, 'border-top-style');
      }

      //Получаем значения borderTopColor из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopColor = getResponsiveSetting(settings, 'divider_color_dropdown_menu_section', ':hover');
      }

      if (borderTopColor) {
        styles += colorPropertyStyled(borderTopColor, 'border-top-color');
      }

      //Получаем значения border-top-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderTopWidth = getResponsiveSetting(settings, 'divider_width_dropdown_menu_section', ':hover');
      }

      if (borderTopWidth) {
        styles += sizeStyled(borderTopWidth, 'border-top-width');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-chevron-dropdown {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size, transformRotate;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'chevron_width_dropdown_menu_section');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_rotate_dropdown_menu_section');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-chevron-dropdown:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size, transformRotate;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'chevron_width_dropdown_menu_section', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_rotate_dropdown_menu_section', ':hover');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-active-chevron-dropdown {

    ${props => {

      const { settings } = props;
      let styles = '';

      let transformRotate;

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_active_rotate_dropdown_menu_section');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-active-chevron-dropdown:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let transformRotate;

      //Получаем значения transform rotate в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transformRotate = getResponsiveSetting(settings, 'chevron_active_rotate_dropdown_menu_section', ':hover');
      }

      if (transformRotate) {
        styles += transformRotateStyled(transformRotate);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-button svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'size_toggle_button_dropdown_menu_section');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-button:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'size_toggle_button_dropdown_menu_section', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }


  && .altrp-nav-menu-dropdown-button svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill, stroke;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_toggle_button_fill_dropdown_menu_section');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'color_toggle_button_stroke_dropdown_menu_section');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-button:hover svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill, stroke;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'color_toggle_button_fill_dropdown_menu_section', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'color_toggle_button_stroke_dropdown_menu_section', ':hover');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-button {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_toggle_button_dropdown_menu_section');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_toggle_button_dropdown_menu_section');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type_toggle_button_dropdown_menu_section');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width_toggle_button_dropdown_menu_section');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color_toggle_button_dropdown_menu_section');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_toggle_button_dropdown_menu_section');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-dropdown-button:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, padding, borderType, borderWidth, borderColor, borderRadius;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_toggle_button_dropdown_menu_section', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_toggle_button_dropdown_menu_section', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type_toggle_button_dropdown_menu_section', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width_toggle_button_dropdown_menu_section', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color_toggle_button_dropdown_menu_section', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_toggle_button_dropdown_menu_section', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent, alignItems;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'breadcrumbs_style_alignment');
      }

      if (justifyContent) {
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      //Получаем значения align-items из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        alignItems = getResponsiveSetting(settings, 'breadcrumbs_style_vertical_alignment');
      }

      if (alignItems) {
        styles += simplePropertyStyled(alignItems, 'align-items');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-link {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_links_style_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_links_style_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-link:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_links_style_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_links_style_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-link:visited {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_links_visited_style_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-default,
  && .altrp-nav-breadcrumbs-separator-text {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_separator_default_style_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_separator_style_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-default:hover,
  && .altrp-nav-breadcrumbs-separator-text:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_separator_default_style_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_separator_style_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-icon svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let stroke, size;

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'breadcrumbs_separator_stroke_style_color');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'breadcrumbs_separator_icon_width_style');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-icon:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let stroke;

      //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        stroke = getResponsiveSetting(settings, 'breadcrumbs_separator_stroke_style_color', ':hover');
      }

      if (stroke) {
        styles += colorPropertyStyled(stroke, 'stroke');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-icon svg:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'breadcrumbs_separator_icon_width_style', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-current {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_current_page_style_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_current_page_style_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-current:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'breadcrumbs_current_page_style_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'breadcrumbs_current_page_style_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-icon svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'breadcrumbs_separator_style_color');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-separator-icon:hover svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'breadcrumbs_separator_style_color', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-label {

    ${props => {

      const { settings } = props;
      let styles = '';

      let horizontalPadding;

      //Получаем значения horizontal-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'breadcrumbs_style_space_between');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-breadcrumbs-label:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let horizontalPadding;

      //Получаем значения horizontal-padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        horizontalPadding = getResponsiveSetting(settings, 'breadcrumbs_style_space_between', ':hover');
      }

      if (horizontalPadding) {
        styles += sizeStyled(horizontalPadding, 'padding-left');
        styles += sizeStyled(horizontalPadding, 'padding-right');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-chevron-dropdown path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения fill и color  из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'chevron_color_dropdown_menu_section');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'fill');
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-link-chevron-dropdown:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения fill и color  из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'chevron_color_dropdown_menu_section', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'fill');
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-dropdown {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_dropdown_menu_section');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-dropdown:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_dropdown_menu_section', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, color;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_sub_dropdown_menu_section');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_sub_dropdown_menu_section');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  && .altrp-nav-menu-li-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, color;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_sub_dropdown_menu_section', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_sub_dropdown_menu_section', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  ${props => {

    const {settings, elementId} = props;

    if (!elementId) {
      return '';
    }

    let transformRotate, typographic, color, stroke, backgroundColor, width, borderType, borderWidth, borderColor, borderRadius, marginTop, borderRadiusTopRight;
    let borderRadiusBottomLeft, marginLeft, typographicSubmenu, colorSubmenu, strokeSubmenu, background, widthSubmenu, borderTypeSubmenu, borderWidthSubmenu;
    let borderColorSubmenu, borderRadiusSubmenu, marginRight, borderTopStyle, borderTopWidth, borderRadiusSubmenu2, borderRadiusTopRight2, borderRadiusBottomLeft2, borderTop2;

    let styles = `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon, .${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon {`;

    //Получаем значения transform rotate из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      transformRotate = getResponsiveSetting(settings, 'chevron_rotate_dropdown_main_menu_style');
    }

    if (transformRotate) {
      styles += transformRotateStyled(transformRotate);
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:hover .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon, .${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:hover .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon {`;

    //Получаем значения transform rotate из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      transformRotate = getResponsiveSetting(settings, 'chevron_rotate_dropdown_main_menu_style', ':hover');
    }

    if (transformRotate) {
      styles += transformRotateStyled(transformRotate);
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-li-dropdown-hor-ver-link-label {`;

    //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      typographic = getResponsiveSetting(settings, 'typographic_dropdown_hor_ver_menu_section');
    }

    if (typographic) {
      styles += typographicControllerToStyles(typographic);
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-li-dropdown-hor-ver-link-label:hover {`;

    //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      typographic = getResponsiveSetting(settings, 'typographic_dropdown_hor_ver_menu_section', ':hover');
    }

    if (typographic) {
      styles += typographicControllerToStyles(typographic);
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li .altrp-nav-menu-li-dropdown-hor-ver-link-label {`;

    //Получаем значения color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      color = getResponsiveSetting(settings, 'text_color_dropdown_hor_ver_menu_section');
    }

    if (color) {
      styles += colorPropertyStyled(color, 'color');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:hover .altrp-nav-menu-li-dropdown-hor-ver-link-label {`;

    //Получаем значения color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      color = getResponsiveSetting(settings, 'text_color_dropdown_hor_ver_menu_section', ':hover');
    }

    if (color) {
      styles += colorPropertyStyled(color, 'color');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon path {`;

    //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      stroke = getResponsiveSetting(settings, 'text_color_dropdown_hor_ver_menu_section');
    }

    if (stroke) {
      styles += colorPropertyStyled(stroke, 'stroke');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:hover .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon path {`;

    //Получаем значения stroke из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      stroke = getResponsiveSetting(settings, 'text_color_dropdown_hor_ver_menu_section', ':hover');
    }

    if (stroke) {
      styles += colorPropertyStyled(stroke, 'stroke');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li {`;

    //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundColor = getResponsiveSetting(settings, 'background_color_dropdown_hor_ver_menu_section');
    }

    if (backgroundColor) {
      styles += colorPropertyStyled(backgroundColor, 'background-color');
    }

    //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      width = getResponsiveSetting(settings, 'width_dropdown_hor_ver_menu_section');
    }

    if (width) {
      styles += sizeStyled(width, 'width');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:hover {`;

    //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundColor = getResponsiveSetting(settings, 'background_color_dropdown_hor_ver_menu_section', ':hover');
    }

    if (backgroundColor) {
      styles += colorPropertyStyled(backgroundColor, 'background-color');
    }

    //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      width = getResponsiveSetting(settings, 'width_dropdown_hor_ver_menu_section', ':hover');
    }

    if (width) {
      styles += sizeStyled(width, 'width');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver {`;

    //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderType = getResponsiveSetting(settings, 'border_type_dropdown_hor_ver_menu_section');
    }

    if (borderType) {
      styles += simplePropertyStyled(borderType, 'border-style');
    }

    //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidth = getResponsiveSetting(settings, 'border_width_dropdown_hor_ver_menu_section');
    }

    if (borderWidth) {
      styles += borderWidthStyled(borderWidth);
    }

    //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColor = getResponsiveSetting(settings, 'border_color_dropdown_hor_ver_menu_section');
    }

    if (borderColor) {
      styles += colorPropertyStyled(borderColor, 'border-color');
    }

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadius = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section');
    }

    if (borderRadius) {
      styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
    }

    //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginTop = getResponsiveSetting(settings, 'distance_dropdown_hor_ver_menu_section');
    }

    if (marginTop) {
      styles += sizeStyled(marginTop, 'margin-top');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver:hover {`;

    //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderType = getResponsiveSetting(settings, 'border_type_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderType) {
      styles += simplePropertyStyled(borderType, 'border-style');
    }

    //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidth = getResponsiveSetting(settings, 'border_width_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderWidth) {
      styles += borderWidthStyled(borderWidth);
    }

    //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColor = getResponsiveSetting(settings, 'border_color_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderColor) {
      styles += colorPropertyStyled(borderColor, 'border-color');
    }

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadius = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderRadius) {
      styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
    }

    //Получаем значения margin-top в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginTop = getResponsiveSetting(settings, 'distance_dropdown_hor_ver_menu_section', ':hover');
    }

    if (marginTop) {
      styles += sizeStyled(marginTop, 'margin-top');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:first-child {`;

    //Получаем значения border-radius-top-right из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusTopRight = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusTopRight) {
      styles += `border-radius: ${borderRadiusTopRight.top}${borderRadiusTopRight.unit} ${borderRadiusTopRight.right}${borderRadiusTopRight.unit} 0 0; `;
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:first-child:hover {`;

    //Получаем значения border-radius-top-right из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusTopRight = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderRadiusTopRight) {
      styles += `border-radius: ${borderRadiusTopRight.top}${borderRadiusTopRight.unit} ${borderRadiusTopRight.right}${borderRadiusTopRight.unit} 0 0; `;
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:last-child {`;

    //Получаем значения border-radius-bottom-left из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusBottomLeft = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusBottomLeft) {
      styles += `border-radius: 0 0 ${borderRadiusBottomLeft.bottom}${borderRadiusBottomLeft.unit} ${borderRadiusBottomLeft.left}${borderRadiusBottomLeft.unit}; `;
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:last-child:hover {`;

    //Получаем значения border-radius-bottom-left из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusBottomLeft = getResponsiveSetting(settings, 'border_radius_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderRadiusBottomLeft) {
      styles += `border-radius: 0 0 ${borderRadiusBottomLeft.bottom}${borderRadiusBottomLeft.unit} ${borderRadiusBottomLeft.left}${borderRadiusBottomLeft.unit}; `;
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon {`;

    //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginLeft = getResponsiveSetting(settings, 'submenu_indicator_space_main_menu_style');
    }

    if (marginLeft) {
      styles += sizeStyled(marginLeft, 'margin-left');
    }

    //Получаем значения typographic-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      typographicSubmenu = getResponsiveSetting(settings, 'typographic_submenu_dropdown_hor_ver_menu_section');
    }

    if (typographicSubmenu) {
      styles += typographicControllerToStyles(typographicSubmenu);
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li-link-icon:hover {`;

    //Получаем значения margin-left в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginLeft = getResponsiveSetting(settings, 'submenu_indicator_space_main_menu_style', ':hover');
    }

    if (marginLeft) {
      styles += sizeStyled(marginLeft, 'margin-left');
    }

    //Получаем значения typographic-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      typographicSubmenu = getResponsiveSetting(settings, 'typographic_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (typographicSubmenu) {
      styles += typographicControllerToStyles(typographicSubmenu);
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li .altrp-nav-menu-li-dropdown-children-hor-ver-link-label {`;

    //Получаем значения color-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      colorSubmenu = getResponsiveSetting(settings, 'text_color_submenu_dropdown_hor_ver_menu_section');
    }

    if (colorSubmenu) {
      styles += colorPropertyStyled(colorSubmenu, 'color');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:hover .altrp-nav-menu-li-dropdown-children-hor-ver-link-label {`;

    //Получаем значения color-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      colorSubmenu = getResponsiveSetting(settings, 'text_color_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (colorSubmenu) {
      styles += colorPropertyStyled(colorSubmenu, 'color');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li .altrp-nav-menu-ul-dropdown-children-hor-ver-li-link-icon path {`;

    //Получаем значения stroke-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      strokeSubmenu = getResponsiveSetting(settings, 'text_color_submenu_dropdown_hor_ver_menu_section');
    }

    if (strokeSubmenu) {
      styles += colorPropertyStyled(strokeSubmenu, 'stroke');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:hover .altrp-nav-menu-ul-dropdown-children-hor-ver-li-link-icon path {`;

    //Получаем значения stroke-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      strokeSubmenu = getResponsiveSetting(settings, 'text_color_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (strokeSubmenu) {
      styles += colorPropertyStyled(strokeSubmenu, 'stroke');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li {`;

    //Получаем значения background из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      background = getResponsiveSetting(settings, 'background_color_submenu_dropdown_hor_ver_menu_section');
    }

    if (background) {
      styles += colorPropertyStyled(background, 'background');
    }

    //Получаем значения width-submenu в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      widthSubmenu = getResponsiveSetting(settings, 'width_submenu_dropdown_hor_ver_menu_section');
    }

    if (widthSubmenu) {
      styles += sizeStyled(widthSubmenu, 'width');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:hover {`;

    //Получаем значения background из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      background = getResponsiveSetting(settings, 'background_color_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (background) {
      styles += colorPropertyStyled(background, 'background');
    }

    //Получаем значения width-submenu в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      widthSubmenu = getResponsiveSetting(settings, 'width_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (widthSubmenu) {
      styles += sizeStyled(widthSubmenu, 'width');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver {`;

    //Получаем значения border-type-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTypeSubmenu = getResponsiveSetting(settings, 'border_type_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderTypeSubmenu) {
      styles += simplePropertyStyled(borderTypeSubmenu, 'border-style');
    }

    //Получаем значения border-width-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidthSubmenu = getResponsiveSetting(settings, 'border_width_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderWidthSubmenu) {
      styles += borderWidthStyled(borderWidthSubmenu);
    }

    //Получаем значения border-color-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColorSubmenu = getResponsiveSetting(settings, 'border_color_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderColorSubmenu) {
      styles += colorPropertyStyled(borderColorSubmenu, 'border-color');
    }

    //Получаем значения border-radius-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusSubmenu = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusSubmenu) {
      styles += dimensionsControllerToStyles(borderRadiusSubmenu, 'border-radius');
    }

    //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginRight = getResponsiveSetting(settings, 'distance_submenu_dropdown_hor_ver_menu_section');
    }

    if (marginRight) {
      styles += sizeStyled(marginRight, 'margin-right');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver:hover {`;

    //Получаем значения border-type-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTypeSubmenu = getResponsiveSetting(settings, 'border_type_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderTypeSubmenu) {
      styles += simplePropertyStyled(borderTypeSubmenu, 'border-style');
    }

    //Получаем значения border-width-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidthSubmenu = getResponsiveSetting(settings, 'border_width_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderWidthSubmenu) {
      styles += borderWidthStyled(borderWidthSubmenu);
    }

    //Получаем значения border-color-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColorSubmenu = getResponsiveSetting(settings, 'border_color_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderColorSubmenu) {
      styles += colorPropertyStyled(borderColorSubmenu, 'border-color');
    }

    //Получаем значения border-radius-submenu из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusSubmenu = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderRadiusSubmenu) {
      styles += dimensionsControllerToStyles(borderRadiusSubmenu, 'border-radius');
    }

    //Получаем значения margin-right в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      marginRight = getResponsiveSetting(settings, 'distance_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (marginRight) {
      styles += sizeStyled(marginRight, 'margin-right');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li-divider {`;

    //Получаем значения border-top-style из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTopStyle = getResponsiveSetting(settings, 'type_divider_dropdown_hor_ver_menu_section');
    }

    if (borderTopStyle) {
      styles += simplePropertyStyled(borderTopStyle, 'border-top-style');
    }

    //Получаем значения border-top-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTopWidth = getResponsiveSetting(settings, 'height_divider_dropdown_hor_ver_menu_section');
    }

    if (borderTopWidth) {
      styles += sizeStyled(borderTopWidth, 'border-top-width');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li-divider:hover {`;

    //Получаем значения border-top-width в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTopWidth = getResponsiveSetting(settings, 'height_divider_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderTopWidth) {
      styles += sizeStyled(borderTopWidth, 'border-top-width');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-only .altrp-nav-menu-ul-dropdown-children-hor-ver-li {`;

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusSubmenu2 = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusSubmenu2) {
      styles += dimensionsControllerToStyles(borderRadiusSubmenu2, 'border-radius');
    }

    styles += `} `;

    //hover

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-only:hover .altrp-nav-menu-ul-dropdown-children-hor-ver-li {`;

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusSubmenu2 = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section', ':hover');
    }

    if (borderRadiusSubmenu2) {
      styles += dimensionsControllerToStyles(borderRadiusSubmenu2, 'border-radius');
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:first-child {`;

    //Получаем значения border-radius-top-right из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusTopRight2 = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusTopRight2) {
      styles += `border-radius: ${borderRadiusTopRight2.top}${borderRadiusTopRight2.unit} ${borderRadiusTopRight2.right}${borderRadiusTopRight2.unit} 0 0; `;
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-li:last-child {`;

    //Получаем значения border-radius-bottom-left из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadiusBottomLeft2 = getResponsiveSetting(settings, 'border-radius_submenu_dropdown_hor_ver_menu_section');
    }

    if (borderRadiusBottomLeft2) {
      styles += `border-radius: 0 0 ${borderRadiusBottomLeft2.bottom}${borderRadiusBottomLeft2.unit} ${borderRadiusBottomLeft2.left}${borderRadiusBottomLeft2.unit}; `;
    }

    styles += `} `;

    styles += `.${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-hor-ver-li:last-child .altrp-nav-menu-ul-dropdown-hor-ver-li-divider, .${elementId}-altrp-portal .altrp-nav-menu-ul-dropdown-children-hor-ver-ul .altrp-nav-menu-ul-dropdown-children-hor-ver-li:last-child .altrp-nav-menu-ul-dropdown-hor-ver-li-divider {`;

    //Получаем значения border-top из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderTop2 = getResponsiveSetting(settings, 'height_divider_dropdown_hor_ver_menu_section');
    }

    if (borderTop2) {
      styles += `border-top: none; `;
    }

    styles += `} `;

    return styles;
    }
  }

`;

export default NavComponent;
