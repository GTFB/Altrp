import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  borderRadiusStyled,
  columnGapStyled,
  opacityStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

const TextComponent = styled.div`
  & .altrp-text.altrp-text {

    ${props => {
      const { settings } = props;
      let styles = '';

      let columnCount, columnGap, padding, margin, typographic, color, borderStyle, borderWidth, borderColor, borderRadius, zIndex, backgroundColor, opacity;

      //Получаем значения column-count из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        columnCount = getResponsiveSetting(settings, 'text_style_column-count');
      }

      if (columnCount) {
        styles += simplePropertyStyled(columnCount, 'column-count');
      }

      //Получаем значения column-gap из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        columnGap = getResponsiveSetting(settings, 'text_style_column-gap');
      }

      if (columnGap) {
        styles += columnGapStyled(columnGap);
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'text_style_position_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'text_style_position_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        zIndex = getResponsiveSetting(settings, 'text_position_z_index');
      }

      if (zIndex) {
        styles += simplePropertyStyled(zIndex, 'z-index');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'text_style_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'text_style_background_opacity');
      }

      if (opacity) {
        styles += opacityStyled(opacity, 'opacity');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'text_style_font_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles


      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_style_font_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles


      if (settings !== undefined) {
        borderStyle = getResponsiveSetting(settings, 'text_style_border_type');
      }

      if (borderStyle) {
        styles += simplePropertyStyled(borderStyle, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles


      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'text_style_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles


      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'text_style_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles


      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'text_style_border_radius');
      }

      if (borderRadius) {
        styles += borderRadiusStyled(borderRadius);
      }

      return styles;

      }
      }
  }

`;

export default TextComponent;
