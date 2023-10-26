import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  iconSizeStyled,
  shadowControllerToStyles
} from "../../../../../../front-app/src/js/helpers/styles";

const PostsComponent = styled.div`

  & .altrp-pagination__previous.altrp-pagination__previous {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, color, typographic, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'prev_icon_position');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'posts_prev_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_prev_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'posts_prev_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'posts_prev_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'posts_prev_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'posts_prev_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'posts_prev_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_prev_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_prev_background_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, color, typographic, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'prev_icon_position', ':hover');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'posts_prev_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_prev_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'posts_prev_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'posts_prev_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'posts_prev_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'posts_prev_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'posts_prev_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_prev_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_prev_background_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous svg,
  & .altrp-pagination__previous.altrp-pagination__previous img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_icon_padding');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover svg,
  & .altrp-pagination__previous.altrp-pagination__previous:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_icon_padding', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'prev_icon_size');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'prev_icon_size', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'prev_icon_size');
      }

      if (height) {
        styles += sizeStyled(height, 'height');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'prev_icon_size', ':hover');
      }

      if (height) {
        styles += sizeStyled(height, 'height');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'prev_icon_color');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'prev_icon_color', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, color, typographic, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'next_icon_position');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'posts_next_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_next_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'posts_next_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'posts_next_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'posts_next_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'posts_next_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'posts_next_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_next_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_next_background_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin, padding, color, typographic, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'next_icon_position',':hover');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'posts_next_margin',':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_next_padding',':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'posts_next_color',':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'posts_next_typographic',':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'posts_next_border_type',':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'posts_next_border_width',':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'posts_next_border_color',':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_next_radius',':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'style_next_background_shadow',':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next svg,
  & .altrp-pagination__next.altrp-pagination__next img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_icon_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover svg,
  & .altrp-pagination__next.altrp-pagination__next:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_icon_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'next_icon_size');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let size;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'next_icon_size', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'next_icon_size');
      }

      if (height) {
        styles += sizeStyled(height, 'height');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let height;

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        height = getResponsiveSetting(settings, 'next_icon_size', ':hover');
      }

      if (height) {
        styles += sizeStyled(height, 'height');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'next_icon_color');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let fill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        fill = getResponsiveSetting(settings, 'next_icon_color', ':hover');
      }

      if (fill) {
        styles += colorPropertyStyled(fill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__count.altrp-pagination__count {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, backgroundColor, padding;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_buttons_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_count_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding_count');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__count.altrp-pagination__count:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, backgroundColor, padding;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_buttons_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_count_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding_count', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__count.altrp-pagination__count,
  & .altrp-pagination-pages__item.altrp-pagination-pages__item {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_count_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__count.altrp-pagination__count:hover,
  & .altrp-pagination-pages__item.altrp-pagination-pages__item:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination-pages__item.altrp-pagination-pages__item {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, backgroundColor, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_button_item_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'table_style_count_item_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_count_item_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination-pages__item.altrp-pagination-pages__item:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, backgroundColor, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_button_item_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_count_item_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'table_style_count_item_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_count_item_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_count_item_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .active.altrp-pagination-pages__item.active.altrp-pagination-pages__item {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, borderColor;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_active_count_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      return styles;

    }
    }
  }

  & .active.altrp-pagination-pages__item.active.altrp-pagination-pages__item:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, borderColor;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_active_count_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_active_count_item_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination-pages__item {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination-pages__item:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_item_count_pagination_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

    }
    }
  }

  & .altrp-pagination__ellipsis.altrp-pagination__ellipsis {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, color, typographic;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'ellipsis_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'ellipsis_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'ellipsis_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__ellipsis.altrp-pagination__ellipsis:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, color, typographic;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'ellipsis_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'ellipsis_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'ellipsis_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__goto-page.altrp-pagination__goto-page {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, padding, color, backgroundColor, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'goto-page_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'page_input_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'page_input_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'page_input_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'page_input_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'page_input_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'page_input_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'page_input_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'page_input_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__goto-page.altrp-pagination__goto-page:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, padding, color, backgroundColor, borderType, borderWidth, borderColor, borderRadius, boxShadow;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'goto-page_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'page_input_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'page_input_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'page_input_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'page_input_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'page_input_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'page_input_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'page_input_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'page_input_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-posts.altrp-posts.altrp-posts {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'position_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-posts.altrp-posts:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'position_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  && > .altrp-pagination-pages {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_pagination_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  && > .altrp-pagination-pages:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'posts_pagination_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__goto-page {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__goto-page:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, '.altrp-pagination .altrp-pagination__goto-page', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next,
  & .altrp-pagination-pages__item.altrp-pagination-pages__item,
  & .altrp-pagination__count.altrp-pagination__count,
  & .altrp-pagination__previous.altrp-pagination__previous {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_pagination_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover,
  & .altrp-pagination-pages__item.altrp-pagination-pages__item:hover,
  & .altrp-pagination__count.altrp-pagination__count:hover,
  & .altrp-pagination__previous.altrp-pagination__previous:hover{

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_pagination_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'pagination_select_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'pagination_select_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size .altrp-field-select2__control {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'pagination_select_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size .altrp-field-select2__control:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'pagination_select_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__select-size {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__select-size:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_pagination_select__pagination_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size .altrp-field-select2__control {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderType, borderWidth, borderRadius, borderColor, boxShadow, color, backgroundColor;

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'pagination_select_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'pagination_select_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'pagination_select_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'pagination_select_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_select_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'pagination_select_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'pagination_select_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__select-size.altrp-pagination__select-size .altrp-field-select2__control:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderType, borderWidth, borderRadius, borderColor, boxShadow, color, backgroundColor;

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'pagination_select_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'pagination_select_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'pagination_select_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'pagination_select_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_select_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'pagination_select_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'pagination_select_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

`;

export default PostsComponent;
