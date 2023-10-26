
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
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
} from "../../../../../../front-app/src/js/helpers/styles";

const TableComponent = styled.div`
  & .altrp-table.altrp-table {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderType, borderWidth, borderColor;

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_table_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style', '!important');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_table_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth, '!important');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_table_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      return styles;

    }
    }
  }

  & .altrp-table.altrp-table:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderType, borderWidth, borderColor;

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_table_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style', '!important');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_table_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth, '!important');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_table_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'next_icon_position');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_page_button_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'next_icon_position', ':hover');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_page_button_margin', ':hover');
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

      let margin, iconSize;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_icon_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'next_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, iconSize;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'next_icon_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'next_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'next_icon_size');
      }

      if (iconSize) {
        styles += sizeStyled(iconSize, 'width');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'next_icon_size', ':hover');
      }

      if (iconSize) {
        styles += sizeStyled(iconSize, 'width');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'next_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'next_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'prev_icon_position');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_page_button_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let flexDirection, margin;

      //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        flexDirection = getResponsiveSetting(settings, 'prev_icon_position', ':hover');
      }

      if (flexDirection) {
        styles += simplePropertyStyled(flexDirection, 'flex-direction');
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_page_button_margin', ':hover');
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

      let margin, iconSize;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_icon_padding');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'prev_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, iconSize;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'prev_icon_padding', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'prev_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'prev_icon_size');
      }

      if (iconSize) {
        styles += sizeStyled(iconSize, 'width');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'prev_icon_size', ':hover');
      }

      if (iconSize) {
        styles += sizeStyled(iconSize, 'width');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'prev_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'prev_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .replace-text.replace-text {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'replace_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'replace_text_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .replace-text.replace-text:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'replace_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'replace_text_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .replace-picture.replace-picture {

    ${props => {

      const { settings } = props;
      let styles = '';

      let widthPicture, heightPicture;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        widthPicture = getResponsiveSetting(settings, 'replace_image_width');
      }

      if (widthPicture) {
        styles += sizeStyled(widthPicture, 'width');
      }

      //Получаем значения height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        heightPicture = getResponsiveSetting(settings, 'replace_image_height');
      }

      if (heightPicture) {
        styles += sizeStyled(heightPicture, 'height');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th .grouped-column {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'grouped_column_icon_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover .grouped-column {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'grouped_column_icon_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'grouped_column_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'grouped_column_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th .grouped-column,
  & .altrp-table-th.altrp-table-th svg,
  & .altrp-table-th.altrp-table-th img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'grouped_column_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover .grouped-column,
  & .altrp-table-th.altrp-table-th:hover svg,
  & .altrp-table-th.altrp-table-th:hover img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'grouped_column_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th .not-grouped-column {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'not_grouped_column_icon_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover .not-grouped-column {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'not_grouped_column_icon_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th .not-grouped-column path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'not_grouped_column_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover .not-grouped-column path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'not_grouped_column_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th .not-grouped-column,
  & .altrp-table-th.altrp-table-th .not-grouped-column svg,
  & .altrp-table-th.altrp-table-th .not-grouped-column img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'not_grouped_column_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover .not-grouped-column,
  & .altrp-table-th.altrp-table-th:hover .not-grouped-column svg,
  & .altrp-table-th.altrp-table-th:hover .not-grouped-column img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'not_grouped_column_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'expanded_row_icon_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'expanded_row_icon_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'expanded_row_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'expanded_row_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row,
  & .expanded-row.expanded-row svg,
  & .expanded-row.expanded-row img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'expanded_row_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .expanded-row.expanded-row:hover,
  & .expanded-row.expanded-row svg:hover,
  & .expanded-row.expanded-row img:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'expanded_row_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'not_expanded_row_icon_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'not_expanded_row_icon_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'not_expanded_row_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'not_expanded_row_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row,
  & .not-expanded-row.not-expanded-row svg,
  & .not-expanded-row.not-expanded-row img {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'not_expanded_row_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .not-expanded-row.not-expanded-row:hover,
  & .not-expanded-row.not-expanded-row svg:hover,
  & .not-expanded-row.not-expanded-row img:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'not_expanded_row_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody--striped.altrp-table-tbody--striped tr:nth-child(2n),
  & .altrp-table-tbody--striped.altrp-table-tbody--striped .altrp-table-tr:nth-child(2n) {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения stripe-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_table_stripe_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody--striped.altrp-table-tbody--striped tr:nth-child(2n):hover,
  & .altrp-table-tbody--striped.altrp-table-tbody--striped .altrp-table-tr:nth-child(2n):hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color;

      //Получаем значения stripe-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_table_stripe_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-field.altrp-field,
  & .altrp-table__filter-select.altrp-table__filter-select>.altrp-field-select2__control,
  & .altrp-label_slider.altrp-label_slider>.altrp-btn {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, inputPadding, typographic, borderType, borderWidth, borderColor;

      //Получаем значения filter-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'filter_style_table_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color', '!important');
      }

      //Получаем значения filter-background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'filter_style_table_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color', '!important');
      }

      //Получаем значения filter-input-padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        inputPadding = getResponsiveSetting(settings, 'filter_padding');
      }

      if (inputPadding) {
        styles += dimensionsControllerToStyles(inputPadding);
      }

      //Получаем значения filter-typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'filter_style_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения filter-border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'filter_style_table_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style', '!important');
      }

      //Получаем значения filter-border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'filter_style_table_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth, '!important');
      }

      //Получаем значения filter-border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'filter_style_table_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      return styles;

    }
    }
  }

  & .altrp-field.altrp-field:hover,
  & .altrp-table__filter-select.altrp-table__filter-select:hover>.altrp-field-select2__control {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, inputPadding, typographic, borderType, borderWidth, borderColor;

      //Получаем значения filter-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'filter_style_table_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color', '!important');
      }

      //Получаем значения filter-background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'filter_style_table_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color', '!important');
      }

      //Получаем значения filter-input-padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        inputPadding = getResponsiveSetting(settings, 'filter_padding', ':hover');
      }

      if (inputPadding) {
        styles += dimensionsControllerToStyles(inputPadding);
      }

      //Получаем значения filter-typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'filter_style_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения filter-border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'filter_style_table_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style', '!important');
      }

      //Получаем значения filter-border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'filter_style_table_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth, '!important');
      }

      //Получаем значения filter-border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'filter_style_table_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color', '!important');
      }

      return styles;

    }
    }
  }

  & .altrp-label.altrp-label {

    ${props => {

      const { settings } = props;
      let styles = '';

      let labelPadding;

      //Получаем значения filter-label-padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        labelPadding = getResponsiveSetting(settings, 'label_padding');
      }

      if (labelPadding) {
        styles += dimensionsControllerToStyles(labelPadding);
      }

      return styles;

    }
    }
  }

  & .altrp-label.altrp-label:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let labelPadding;

      //Получаем значения filter-label-padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        labelPadding = getResponsiveSetting(settings, 'label_padding', ':hover');
      }

      if (labelPadding) {
        styles += dimensionsControllerToStyles(labelPadding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color, padding, borderType, borderColor, borderWidth, backgroundColor, textAlign;

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_table_header_alignment');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_header_font');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_header_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_header_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_header_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_header_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_header_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-table-th.altrp-table-th:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color, padding, borderType, borderColor, borderWidth, backgroundColor, textAlign;

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_table_header_alignment', ':hover');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_header_font', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_header_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_header_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_header_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_header_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_header_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-table-head.altrp-table-head {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_header_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-table-head.altrp-table-head:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_header_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-th:not(:first-child) {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-top из контроллера, обрабатываем и добавляем в styles свойство margin-top с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'top'); //здесь вернется строка вида: "margin-top: -10px"
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-th:not(:first-child):hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-top из контроллера, обрабатываем и добавляем в styles свойство margin-top с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'top'); //здесь вернется строка вида: "margin-top: -10px"
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-th {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-left из контроллера, обрабатываем и добавляем в styles свойство margin-left с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'left'); //здесь вернется строка вида: "margin-left: -10px"
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-th:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-left из контроллера, обрабатываем и добавляем в styles свойство margin-left с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_header_border_width', ':hover');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'left'); //здесь вернется строка вида: "margin-left: -10px"
      }

      return styles;

    }
    }
  }

  && div:not(.altrp-element) .altrp-table-th {

    ${props => {

      const { settings } = props;
      let styles = '';

      let verticalAlign;

      //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalAlign = getResponsiveSetting(settings, 'header_cell_vertical_alignment');
      }

      if (verticalAlign) {
        styles += simplePropertyStyled(verticalAlign, 'vertical-align');
      }

      return styles;

    }
    }
  }

  && div:not(.altrp-element) .altrp-table-th:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let verticalAlign;

      //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalAlign = getResponsiveSetting(settings, 'header_cell_vertical_alignment', ':hover');
      }

      if (verticalAlign) {
        styles += simplePropertyStyled(verticalAlign, 'vertical-align');
      }

      return styles;

    }
    }
  }

  & .altrp-table-td.altrp-table-td {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, borderType, borderColor, color, typographic, borderWidth, textAlign;

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_table_body_alignment');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_body_cell_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_body_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_body_border_color_');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_body_border_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_body_font');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      return styles;

    }
    }
  }

  & .altrp-table-td.altrp-table-td:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, borderType, borderColor, color, typographic, borderWidth, textAlign;

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_table_body_alignment', ':hover');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_body_cell_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_body_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_body_border_color_', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_body_border_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_body_font', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      return styles;

    }
    }
  }

  & .altrp-table-td.altrp-table-td a {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_link_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_link_font');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-td.altrp-table-td a:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_link_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_link_font', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody.altrp-table-tbody .altrp-table-background {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_body_border_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody.altrp-table-tbody .altrp-table-background:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_body_border_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-td:not(:first-child) {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-top из контроллера, обрабатываем и добавляем в styles свойство margin-top с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'top'); //здесь вернется строка вида: "margin-top: -10px"
      }

      return styles;

    }
    }
  }

  & .altrp-transpose_true.altrp-transpose_true .altrp-table-td:not(:first-child):hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-top из контроллера, обрабатываем и добавляем в styles свойство margin-top с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'top'); //здесь вернется строка вида: "margin-top: -10px"
      }

      return styles;

    }
    }
  }

   & .altrp-transpose_true.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-td {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-left из контроллера, обрабатываем и добавляем в styles свойство margin-left с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'left'); //здесь вернется строка вида: "margin-left: -10px"
      }

      return styles;

     }
     }
   }

   & .altrp-transpose_true.altrp-transpose_true .altrp-table-tr:not(:first-child) .altrp-table-td:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderWidth;

      //Получаем значения border-width-left из контроллера, обрабатываем и добавляем в styles свойство margin-left с таким же значением, но отритцательным

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_body_border_width', ':hover');
      }

      if (borderWidth) {
        styles += marginTopLeftStyled(borderWidth, 'left'); //здесь вернется строка вида: "margin-left: -10px"
      }

      return styles;

    }
    }
  }

   & .altrp-table-td__grouping.altrp-table-td__grouping {

     ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic, padding;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_group_border_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_group_font');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_group_cell_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

     }
     }
   }

   & .altrp-table-td__grouping.altrp-table-td__grouping:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic, padding;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_group_border_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_group_font', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_group_cell_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody.altrp-table-tbody .altrp-table-td__grouping {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, textAlign;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_group_border_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_style_group_cell_alignment');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      return styles;

    }
    }
  }

  & .altrp-table-tbody.altrp-table-tbody .altrp-table-td__grouping:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, textAlign;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_group_border_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_style_group_cell_alignment', ':hover');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      return styles;

    }
    }
  }

  && div:not(.altrp-element) .altrp-table-td {

    ${props => {

      const { settings } = props;
      let styles = '';

      let verticalAlign;

      //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalAlign = getResponsiveSetting(settings, 'cell_vertical_alignment');
      }

      if (verticalAlign) {
        styles += simplePropertyStyled(verticalAlign, 'vertical-align');
      }

      return styles;

    }
    }
  }

  && div:not(.altrp-element) .altrp-table-td:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let verticalAlign;

      //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        verticalAlign = getResponsiveSetting(settings, 'cell_vertical_alignment', ':hover');
      }

      if (verticalAlign) {
        styles += simplePropertyStyled(verticalAlign, 'vertical-align');
      }

      return styles;

    }
    }
  }

  & .altrp-table-td.altrp-table-td__grouping .altrp-table__collapse-icon svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize, iconLeftSpace, iconRightSpace, iconTopTranslate, iconLeftTranslate;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'table_style_group_icon_size');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconLeftSpace = getResponsiveSetting(settings, 'table_style_group_icon_left_space');
      }

      if (iconLeftSpace) {
        styles += sizeStyled(iconLeftSpace, 'margin-left');
      }

      //Получаем значения margin-right из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconRightSpace = getResponsiveSetting(settings, 'table_style_group_icon_right_space');
      }

      if (iconRightSpace) {
        styles += sizeStyled(iconRightSpace, 'margin-right');
      }

      //Получаем значения top из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconTopTranslate = getResponsiveSetting(settings, 'table_style_group_icon_top');
      }

      if (iconTopTranslate) {
        styles += sizeStyled(iconTopTranslate, 'top');
      }

      //Получаем значения left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconLeftTranslate = getResponsiveSetting(settings, 'table_style_group_icon_left');
      }

      if (iconLeftTranslate) {
        styles += sizeStyled(iconLeftTranslate, 'left');
      }

      return styles;

    }
    }
  }

  & .altrp-table-td__grouping.altrp-table-td__grouping:hover .altrp-table__collapse-icon svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconSize, iconLeftSpace, iconRightSpace, iconTopTranslate, iconLeftTranslate;

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconSize = getResponsiveSetting(settings, 'table_style_group_icon_size', ':hover');
      }

      if (iconSize) {
        styles += iconSizeStyled(iconSize);
      }

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconLeftSpace = getResponsiveSetting(settings, 'table_style_group_icon_left_space', ':hover');
      }

      if (iconLeftSpace) {
        styles += sizeStyled(iconLeftSpace, 'margin-left');
      }

      //Получаем значения margin-right из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconRightSpace = getResponsiveSetting(settings, 'table_style_group_icon_right_space', ':hover');
      }

      if (iconRightSpace) {
        styles += sizeStyled(iconRightSpace, 'margin-right');
      }

      //Получаем значения top из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconTopTranslate = getResponsiveSetting(settings, 'table_style_group_icon_top', ':hover');
      }

      if (iconTopTranslate) {
        styles += sizeStyled(iconTopTranslate, 'top');
      }

      //Получаем значения left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconLeftTranslate = getResponsiveSetting(settings, 'table_style_group_icon_left', ':hover');
      }

      if (iconLeftTranslate) {
        styles += sizeStyled(iconLeftTranslate, 'left');
      }

      return styles;

    }
    }
  }

  & .altrp-table-td__grouping.altrp-table-td__grouping .altrp-table__collapse-icon svg,
  & .altrp-table-td__grouping.altrp-table-td__grouping .altrp-table__collapse-icon path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'table_style_group_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-td__grouping.altrp-table-td__grouping:hover .altrp-table__collapse-icon svg,
  & .altrp-table-td__grouping.altrp-table-td__grouping:hover .altrp-table__collapse-icon path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'table_style_group_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .altrp-table-foot.altrp-table-foot .altrp-table-td {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, textAlign, backgroundColor, color, typographic;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_footer_cell_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_style_footer_cell_alignment');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_footer_border_background');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_footer_border_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_footer_font');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-foot.altrp-table-foot .altrp-table-td:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, textAlign, backgroundColor, color, typographic;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_footer_cell_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'table_style_footer_cell_alignment', ':hover');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_footer_border_background', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_footer_border_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_footer_font', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-global-filter.altrp-table-global-filter label {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, color, typographic;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'global_filter_label_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'global_filter_label_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'global_filter_label_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-global-filter.altrp-table-global-filter label:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, color, typographic;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'global_filter_label_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'global_filter_label_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'global_filter_label_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-table-global-filter.altrp-table-global-filter input {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, color, backgroundColor, typographic, width, marginLeft, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'global_filter_input_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'global_filter_input_width');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'global_filter_margin_left');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'global_filter_input_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'global_filter_input_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'global_filter_input_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'global_filter_input_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'global_filter_input_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'global_filter_input_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'global_filter_input_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'global_filter_input_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-table-global-filter.altrp-table-global-filter input:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding, color, backgroundColor, typographic, width, marginLeft, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'global_filter_input_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'global_filter_input_width', ':hover');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'global_filter_margin_left', ':hover');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'global_filter_input_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'global_filter_input_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'global_filter_input_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'global_filter_input_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'global_filter_input_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'global_filter_input_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'global_filter_input_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'global_filter_input_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }


      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let padding;

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }


      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__previous {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_prev_btn_pagination_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__previous:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_prev_btn_pagination_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__next {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_next_btn_pagination_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination.altrp-pagination .altrp-pagination__next:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_next_btn_pagination_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
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

      return styles;

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

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous,
  & .altrp-pagination__next.altrp-pagination__next {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, padding, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_buttons_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_buttons_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding_buttons');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_pagination_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_pagination_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'table_style_pagination_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_buttons_shadow');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__previous.altrp-pagination__previous:hover,
  & .altrp-pagination__next.altrp-pagination__next:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, backgroundColor, padding, borderType, borderWidth, borderRadius, borderColor, boxShadow;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_buttons_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'table_style_pagination_buttons_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'table_style_pagination_padding_buttons', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'table_style_pagination_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'table_style_pagination_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'table_style_pagination_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'table_style_pagination_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        boxShadow = getResponsiveSetting(settings, 'pagination_buttons_shadow', ':hover');
      }

      if (boxShadow) {
        styles += shadowControllerToStyles(boxShadow);
      }

      return styles;

    }
    }
  }

  & .altrp-pagination__next.altrp-pagination__next,
  & .altrp-pagination-pages__item.altrp-pagination-pages__item,
  & .altrp-pagination__count.altrp-pagination__count,
  & .altrp-pagination__previous.altrp-pagination__previous,
  & .altrp-pagination__goto-page.altrp-pagination__goto-page,
  & .altrp-pagination__select-size.altrp-pagination__select-size {

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
  & .altrp-pagination__previous.altrp-pagination__previous:hover,
  & .altrp-pagination__goto-page.altrp-pagination__goto-page:hover,
  & .altrp-pagination__select-size.altrp-pagination__select-size:hover {

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

  & .altrp-pagination__count.altrp-pagination__count {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, color, backgroundColor, padding;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_buttons_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_count_text_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
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

      let margin, color, backgroundColor, padding;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'count_buttons_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'table_style_pagination_count_text_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
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
        styles += colorPropertyStyled(borderColor, 'border-color');
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
        styles += colorPropertyStyled(borderColor, 'border-color');
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

  & .active.active.altrp-pagination-pages__item {

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
        styles += colorPropertyStyled(backgroundColor, 'background-color');
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

  & .active.active.altrp-pagination-pages__item:hover {

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
        styles += colorPropertyStyled(backgroundColor, 'background-color');
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

      let margin, color, padding, backgroundColor, borderType, borderWidth, borderRadius, borderColor, boxShadow;

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

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'page_input_border_radius');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'page_input_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
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

      let margin, color, padding, backgroundColor, borderType, borderWidth, borderRadius, borderColor, boxShadow;

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

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'page_input_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'page_input_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
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

  & .altrp-pagination.altrp-pagination .altrp-pagination__goto-page {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'table_style_page_input_pagination_typographic');
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
        typographic = getResponsiveSetting(settings, 'table_style_page_input_pagination_typographic', ':hover');
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

      let width, padding, borderType, borderWidth, borderRadius, borderColor, boxShadow, color, backgroundColor;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'pagination_select_width');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'pagination_select_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

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

      let width, padding, borderType, borderWidth, borderRadius, borderColor, boxShadow, color, backgroundColor;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'pagination_select_width', ':hover');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'pagination_select_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

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

  & .check-icon--checked.check-icon--checked svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'checked_icon_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'checked_size');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--checked.check-icon--checked svg:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'checked_icon_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'checked_size', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--unchecked.check-icon--unchecked svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'unchecked_icon_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'unchecked_size');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--unchecked.check-icon--unchecked svg:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'unchecked_icon_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'unchecked_size', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--indeterminate.check-icon--indeterminate svg {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'indeterminate_icon_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'indeterminate_size');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--indeterminate.check-icon--indeterminate svg:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let margin, size;

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'indeterminate_icon_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения width и height из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        size = getResponsiveSetting(settings, 'indeterminate_size', ':hover');
      }

      if (size) {
        styles += iconSizeStyled(size);
      }

      return styles;

    }
    }
  }

  & .check-icon--checked.check-icon--checked path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'checked_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .check-icon--checked.check-icon--checked:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'checked_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .check-icon--unchecked.check-icon--unchecked path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'unchecked_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .check-icon--unchecked.check-icon--unchecked:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'unchecked_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .check-icon--indeterminate.check-icon--indeterminate path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'indeterminate_icon_color');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & .check-icon--indeterminate.check-icon--indeterminate:hover path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let iconFill;

      //Получаем значения fill из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        iconFill = getResponsiveSetting(settings, 'indeterminate_icon_color', ':hover');
      }

      if (iconFill) {
        styles += colorPropertyStyled(iconFill, 'fill');
      }

      return styles;

    }
    }
  }

  & altrp-table__resizer.altrp-table__resizer {

    ${props => {

      const { settings } = props;
      let styles = '';

      let sliderSize, backgroundColor;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        sliderSize = getResponsiveSetting(settings, 'resize_slider_size');
      }

      if (sliderSize) {
        styles += sizeStyled(sliderSize, 'width');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'resize_slider_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & altrp-table__resizer.altrp-table__resizer:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let sliderSize, backgroundColor;

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        sliderSize = getResponsiveSetting(settings, 'resize_slider_size', ':hover');
      }

      if (sliderSize) {
        styles += sizeStyled(sliderSize, 'width');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'resize_slider_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & altrp-table__resizer.altrp-table__resizer.altrp-table__resizer_resizing {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'active_resize_slider_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & altrp-table__resizer.altrp-table__resizer.altrp-table__resizer_resizing:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'active_resize_slider_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      return styles;

    }
    }
  }

  & .altrp-image.altrp-image {

    ${props => {

      const { settings } = props;
      let styles = '';

      let filters;

      //Получаем значения filters из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        filters = getResponsiveSetting(settings, 'filter_style_border_shadow');
      }

      if (filters) {
        styles += filtersControllerToStyles(filters);
      }

      return styles;

      }
      }
    }

  & .altrp-image.altrp-image:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let filters;

      //Получаем значения filters из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        filters = getResponsiveSetting(settings, 'filter_style_border_shadow', ':hover');
      }

      if (filters) {
        styles += filtersControllerToStyles(filters);
      }

      return styles;

      }
      }
    }
`;

export default TableComponent;
