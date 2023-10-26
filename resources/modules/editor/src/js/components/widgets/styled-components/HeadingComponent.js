
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  sizeStyled,
  textShadowControllerToStyles,
  opacityStyled,
  gradientStyled,
  backgroundImageControllerToStyles,
  translateStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

const HeadingComponent = styled.div`
  /* && .altrp-heading,
  & .altrp-heading-wrapper.altrp-heading-wrapper {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'heading_settings_alignment');
      }

      if (justifyContent) {
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent, textShadow, typographic, padding, color, backgroundColor, width;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'sub_heading_settings_alignment');
      }

      if (justifyContent) {
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'text_shadow_sub_heading');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_sub_heading');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_sub_heading');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_sub_heading');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'bg_sub_heading');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'width_sub_heading');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-sub.altrp-heading-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let justifyContent, textShadow, typographic, padding, color, backgroundColor, width;

      //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        justifyContent = getResponsiveSetting(settings, 'sub_heading_settings_alignment', ':hover');
      }

      if (justifyContent) {
        styles += simplePropertyStyled(justifyContent, 'justify-content');
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'text_shadow_sub_heading', ':hover');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typographic_sub_heading', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_sub_heading', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_sub_heading', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'bg_sub_heading', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        width = getResponsiveSetting(settings, 'width_sub_heading', ':hover');
      }

      if (width) {
        styles += sizeStyled(width, 'width');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-wrapper-sub-bottom .altrp-heading-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginTop;

      //Получаем значения margin-top из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_sub_heading');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-wrapper-sub-bottom.altrp-heading-wrapper-sub-bottom .altrp-heading-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginTop;

      //Получаем значения margin-top из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginTop = getResponsiveSetting(settings, 'spacing_sub_heading', ':hover');
      }

      if (marginTop) {
        styles += sizeStyled(marginTop, 'margin-top');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-wrapper-sub-top .altrp-heading-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_sub_heading');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-wrapper-sub-top.altrp-heading-wrapper-sub-top .altrp-heading-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottom;

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottom = getResponsiveSetting(settings, 'spacing_sub_heading', ':hover');
      }

      if (marginBottom) {
        styles += sizeStyled(marginBottom, 'margin-bottom');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-wrapper-sub-left .altrp-heading-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_sub_heading');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-wrapper-sub-left.altrp-heading-wrapper-sub-left .altrp-heading-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginRight;

      //Получаем значения margin-right из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginRight = getResponsiveSetting(settings, 'spacing_sub_heading', ':hover');
      }

      if (marginRight) {
        styles += sizeStyled(marginRight, 'margin-right');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-wrapper-sub-right .altrp-heading-sub {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft;

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_sub_heading');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-wrapper-sub-right.altrp-heading-wrapper-sub-right .altrp-heading-sub:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginLeft;

      //Получаем значения margin-left из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginLeft = getResponsiveSetting(settings, 'spacing_sub_heading', ':hover');
      }

      if (marginLeft) {
        styles += sizeStyled(marginLeft, 'margin-left');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-advanced-wrapper {

    ${props => {

      const { settings } = props;
      let styles = '';

      let textAlign;

      //Получаем значения text-align из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textAlign = getResponsiveSetting(settings, 'alignment_advanced_heading_content');
      }

      if (textAlign) {
        styles += simplePropertyStyled(textAlign, 'text-align');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-advanced {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, color, padding, typographic, textShadow, borderType, borderWidth, borderColor, borderRadius, opacity;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_advanced_heading_style');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_advanced_heading_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_advanced_heading_style');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typography_advanced_heading_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'text_shadow_advanced_heading_style');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type_advanced_heading_style');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width_advanced_heading_style');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color_advanced_heading_style');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_advanced_heading_style');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'opacity_advanced_heading_style');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      return styles;

    }
    }
  }

  & .altrp-heading-advanced.altrp-heading-advanced:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundColor, color, padding, typographic, textShadow, borderType, borderWidth, borderColor, borderRadius, opacity;

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'background_color_advanced_heading_style', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_advanced_heading_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'padding_advanced_heading_style', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'typography_advanced_heading_style', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'text_shadow_advanced_heading_style', ':hover');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'border_type_advanced_heading_style', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'border_width_advanced_heading_style', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'border_color_advanced_heading_style', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'border_radius_advanced_heading_style', ':hover');
      }

      if (borderRadius) {
        styles += dimensionsControllerToStyles(borderRadius, 'border-radius');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'opacity_advanced_heading_style', ':hover');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      return styles;

    }
    }
  } */

  /* && .altrp-icon-header {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottomForHorizontal, marginBottomForVertical, marginBottomForRotate;

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForHorizontal = getResponsiveSetting(settings, 'horizontal_offset_advanced_heading_content');
      }

      if (marginBottomForHorizontal) {
        styles += sizeStyled(marginBottomForHorizontal, 'margin-bottom');
      }

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForVertical = getResponsiveSetting(settings, 'vertical_offset_advanced_heading_content');
      }

      if (marginBottomForVertical) {
        styles += sizeStyled(marginBottomForVertical, 'margin-bottom');
      }

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForRotate = getResponsiveSetting(settings, 'rotate_offset_advanced_heading_content');
      }

      if (marginBottomForRotate) {
        styles += sizeStyled(marginBottomForRotate, 'margin-bottom');
      }

      return styles;

    }
    }
  }

  & .altrp-icon-header.altrp-icon-header:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let marginBottomForHorizontal, marginBottomForVertical, marginBottomForRotate;

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForHorizontal = getResponsiveSetting(settings, 'horizontal_offset_advanced_heading_content', ':hover');
      }

      if (marginBottomForHorizontal) {
        styles += sizeStyled(marginBottomForHorizontal, 'margin-bottom');
      }

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForVertical = getResponsiveSetting(settings, 'vertical_offset_advanced_heading_content', ':hover');
      }

      if (marginBottomForVertical) {
        styles += sizeStyled(marginBottomForVertical, 'margin-bottom');
      }

      //Получаем значения margin-bottom из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        marginBottomForRotate = getResponsiveSetting(settings, 'rotate_offset_advanced_heading_content', ':hover');
      }

      if (marginBottomForRotate) {
        styles += sizeStyled(marginBottomForRotate, 'margin-bottom');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading {

    ${props => {

      const { settings } = props;
      let styles = '';

      let borderType, borderWidth, borderColor, borderRadius;

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'style_border_type');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'style_border_width');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'style_border_color');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'style_border_radius');
      }

      if (borderRadius) {
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading,
  & .altrp-heading.altrp-heading a {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic, textShadow, margin, padding, zIndex, backgroundColor, opacity, gradient, transform;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'heading_style_color');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'heading_style_typographic');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'heading_style_text_shadow');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'style_position_margin');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'style_position_padding');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        zIndex = getResponsiveSetting(settings, 'position_z_index');
      }

      if (zIndex) {
        styles += simplePropertyStyled(zIndex, 'z-index');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'style_background_color');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'style_background_opacity');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        gradient = getResponsiveSetting(settings, 'gradient');
      }

      if (gradient) {
        styles += gradientStyled(gradient);
      }

      //Получаем значения transform из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transform = getResponsiveSetting(settings, 'transform_style');
      }

      if (transform) {
        styles += translateStyled(transform);
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let color, typographic, textShadow, margin, padding, zIndex, backgroundColor, opacity, gradient, borderType, borderWidth, borderColor, borderRadius, transform;

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'heading_style_color', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'heading_style_typographic', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения text-shadow из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        textShadow = getResponsiveSetting(settings, 'heading_style_text_shadow', ':hover');
      }

      if (textShadow) {
        styles += textShadowControllerToStyles(textShadow);
      }

      //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        margin = getResponsiveSetting(settings, 'style_position_margin', ':hover');
      }

      if (margin) {
        styles += dimensionsControllerToStyles(margin, 'margin');
      }

      //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        padding = getResponsiveSetting(settings, 'style_position_padding', ':hover');
      }

      if (padding) {
        styles += dimensionsControllerToStyles(padding);
      }

      //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        zIndex = getResponsiveSetting(settings, 'position_z_index', ':hover');
      }

      if (zIndex) {
        styles += simplePropertyStyled(zIndex, 'z-index');
      }

      //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundColor = getResponsiveSetting(settings, 'style_background_color', ':hover');
      }

      if (backgroundColor) {
        styles += colorPropertyStyled(backgroundColor, 'background-color');
      }

      //Получаем значения opacity из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        opacity = getResponsiveSetting(settings, 'style_background_opacity', ':hover');
      }

      if (opacity) {
        styles += opacityStyled(opacity);
      }

      //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        gradient = getResponsiveSetting(settings, 'gradient', ':hover');
      }

      if (gradient) {
        styles += gradientStyled(gradient);
      }

      //Получаем значения border-type из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderType = getResponsiveSetting(settings, 'style_border_type', ':hover');
      }

      if (borderType) {
        styles += simplePropertyStyled(borderType, 'border-style');
      }

      //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderWidth = getResponsiveSetting(settings, 'style_border_width', ':hover');
      }

      if (borderWidth) {
        styles += borderWidthStyled(borderWidth);
      }

      //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderColor = getResponsiveSetting(settings, 'style_border_color', ':hover');
      }

      if (borderColor) {
        styles += colorPropertyStyled(borderColor, 'border-color');
      }

      //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        borderRadius = getResponsiveSetting(settings, 'style_border_radius', ':hover');
      }

      if (borderRadius) {
        styles += sizeStyled(borderRadius, 'border-radius');
      }

      //Получаем значения transform из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        transform = getResponsiveSetting(settings, 'transform_style', ':hover');
      }

      if (transform) {
        styles += translateStyled(transform);
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading.altrp-background-image {

    ${props => {

      const { settings } = props;
      let styles = '';

      let backgroundImage, backgroundPosition, backgroundAttachment, backgroundRepeat, backgroundSizeInUnits, backgroundSize;

      //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundImage = getResponsiveSetting(settings, 'background_image');
      }

      if (backgroundImage) {
        styles += backgroundImageControllerToStyles(backgroundImage);
      }

      //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundPosition = getResponsiveSetting(settings, 'background_position');
      }

      if (backgroundPosition) {
        styles += simplePropertyStyled(backgroundPosition, 'background-position');
      }

      //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundAttachment = getResponsiveSetting(settings, 'background_attachment');
      }

      if (backgroundAttachment) {
        styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
      }

      //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundRepeat = getResponsiveSetting(settings, 'background_repeat');
      }

      if (backgroundRepeat) {
        styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
      }

      //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSizeInUnits = getResponsiveSetting(settings, 'background_image_width');
      }

      if (backgroundSizeInUnits) {
        styles += sizeStyled(backgroundSizeInUnits, 'background-size');
      }

      //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        backgroundSize = getResponsiveSetting(settings, 'background_size');
      }

      if (backgroundSize) {
        styles += simplePropertyStyled(backgroundSize, 'background-size');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-animating-text {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'animated_text_headline_animating_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'animated_text_color_headline_animating_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-animating-text:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'animated_text_headline_animating_style', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'animated_text_color_headline_animating_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-heading-no-animating-text {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'text_headline_animating_style');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_headline_animating_style');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  }

  & .altrp-heading-no-animating-text.altrp-heading-no-animating-text:hover {

    ${props => {

      const { settings } = props;
      let styles = '';

      let typographic, color;

      //Получаем значения typographic из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        typographic = getResponsiveSetting(settings, 'text_headline_animating_style', ':hover');
      }

      if (typographic) {
        styles += typographicControllerToStyles(typographic);
      }

      //Получаем значения color из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'text_color_headline_animating_style', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'color');
      }

      return styles;

    }
    }
  } */

  /* && .altrp-animating-highlighted-svg svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let strokeWidth, color;

      //Получаем значения stroke-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        strokeWidth = getResponsiveSetting(settings, 'width_shape_animating');
      }

      if (strokeWidth) {
        styles += sizeStyled(strokeWidth, 'stroke-width');
      }

      //Получаем значения stroke: color; из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_shape_animating');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'stroke');
      }

      return styles;

    }
    }
  }

  & .altrp-animating-highlighted-svg.altrp-animating-highlighted-svg:hover svg path {

    ${props => {

      const { settings } = props;
      let styles = '';

      let strokeWidth, color;

      //Получаем значения stroke-width из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        strokeWidth = getResponsiveSetting(settings, 'width_shape_animating', ':hover');
      }

      if (strokeWidth) {
        styles += sizeStyled(strokeWidth, 'stroke-width');
      }

      //Получаем значения stroke: color; из контроллера, обрабатываем и добавляем в styles

      if (settings !== undefined) {
        color = getResponsiveSetting(settings, 'color_shape_animating', ':hover');
      }

      if (color) {
        styles += colorPropertyStyled(color, 'stroke');
      }

      return styles;

    }
    }
  } */

`;

export default HeadingComponent;
