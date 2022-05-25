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
  sliderStyled, dimensionsStyled
} from "../../helpers/styles";
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";

const headingTransformToStyles = (settings, state) => {
  let styles = 'transform:'

  const rotate = getResponsiveSetting(settings, 'transform_rotate', state)
  const scaleX = getResponsiveSetting(settings, 'transform_scaleX', state)
  const scaleY = getResponsiveSetting(settings, 'transform_scaleY', state)
  const skewX = getResponsiveSetting(settings, 'transform_skewX', state)
  const skewY = getResponsiveSetting(settings, 'transform_skewY', state)
  const translateX = getResponsiveSetting(settings, 'transform_translateX', state)
  const translateY = getResponsiveSetting(settings, 'transform_translateY', state)

  if (rotate?.size) {
    styles += ` rotate(${rotate?.size}deg)`
  }

  if (scaleX?.size) {
    styles += ` scaleX(${scaleX?.size})`
  }

  if (scaleY?.size) {
    styles += ` scaleY(${scaleY?.size})`
  }

  if (skewX?.size) {
    styles += ` skewX(${skewX?.size}deg)`
  }

  if (skewY?.size) {
    styles += ` skewY(${skewY?.size}deg)`
  }

  if (translateX?.size) {
    styles += ` translateX(${translateX?.size}px)`
  }

  if (translateY?.size) {
    styles += ` translateY(${translateY?.size}px)`
  }

  return styles == 'transform:' ? '' : styles + ';';
}

/**
 * Преобразует объект стилей, который задается в виджете Heading в строку css для вставки в GlobalStyles
 * @param {{}} settings
 * @param {string} id
 * @return {string}
 */

export function getHeadingTypeHeadingStyles(settings, id) {
  let styles = "";

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-heading-wrapper {`;

  const justifyContent = getResponsiveSetting(
    settings,
    "heading_settings_alignment"
  );
  if (justifyContent) {

    styles += simplePropertyStyled(justifyContent, "justify-content");
    switch (justifyContent){
      case 'stretch':{
        styles += `& .altrp-heading{text-align:justify}`
      }break
      case 'center':{
        styles += `& .altrp-heading{text-align:center}`
      }break
      case 'flex-start':{
        styles += `& .altrp-heading{text-align:left}`
      }break
      case 'flex-end':{
        styles += `& .altrp-heading{text-align:right}`
      }break
    }
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading, ${parentClass} .altrp-heading a {`;

  const color = getResponsiveSetting(settings, "heading_style_color");

  if (color) {
    styles += colorPropertyStyled(color, "color");
  }

  const typographic = getResponsiveSetting(
    settings,
    "heading_style_typographic"
  );

  if (typographic) {
    styles += typographicControllerToStyles(typographic);
  }

  const textShadow = getResponsiveSetting(
    settings,
    "heading_style_text_shadow"
  );

  if (textShadow) {
    styles += textShadowControllerToStyles(textShadow);
  }

  const margin = getResponsiveSetting(settings, "style_position_margin");

  if (margin) {
    styles += dimensionsControllerToStyles(margin, "margin");
  }

  const padding = getResponsiveSetting(settings, "style_position_padding");

  if (padding) {
    styles += dimensionsControllerToStyles(padding);
  }

  const zIndex = getResponsiveSetting(settings, "position_z_index");

  if (zIndex) {
    styles += simplePropertyStyled(zIndex, "z-index");
  }

  const backgroundColor = getResponsiveSetting(
    settings,
    "style_background_color"
  );

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, "background-color");
  }

  const opacity = getResponsiveSetting(settings, "style_background_opacity");

  if (opacity) {
    styles += opacityStyled(opacity);
  }

  const gradient = getResponsiveSetting(settings, "gradient");

  if (gradient) {
    styles += gradientStyled(gradient);
  }

  styles += headingTransformToStyles(settings, '')

  styles += `} `;

  styles += `${parentClass} .altrp-heading:hover, ${parentClass} .altrp-heading a:hover {`;

  const colorLinkHover = getResponsiveSetting(settings, "heading_style_color", ":hover");

  if (colorLinkHover) {
    styles += colorPropertyStyled(colorLinkHover, "color");
    styles += "text-decoration: none; ";
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading {`;

  const borderType = getResponsiveSetting(settings, "style_border_type");

  if (borderType) {
    styles += simplePropertyStyled(borderType, "border-style");
  }

  const borderWidth = getResponsiveSetting(settings, "style_border_width");

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  const borderColor = getResponsiveSetting(settings, "style_border_color");

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, "border-color");
  }

  const borderRadius = getResponsiveSetting(settings, "style_border_radius");

  if (borderRadius) {
    styles += dimensionsStyled(borderRadius, "border-radius");
  }
  //fix display with <strong> and <b> tags
  styles += "display:block;";
  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-heading:hover {`;

  const colorHover = getResponsiveSetting(
    settings,
    "heading_style_color",
    ":hover"
  );

  if (colorHover) {
    styles += colorPropertyStyled(colorHover, "color");
  }

  const typographicHover = getResponsiveSetting(
    settings,
    "heading_style_typographic",
    ":hover"
  );

  if (typographicHover) {
    styles += typographicControllerToStyles(typographicHover);
  }

  const textShadowHover = getResponsiveSetting(
    settings,
    "heading_style_text_shadow",
    ":hover"
  );

  if (textShadowHover) {
    styles += textShadowControllerToStyles(textShadowHover);
  }

  const marginHover = getResponsiveSetting(
    settings,
    "style_position_margin",
    ":hover"
  );

  if (marginHover) {
    styles += dimensionsControllerToStyles(marginHover, "margin");
  }

  const paddingHover = getResponsiveSetting(
    settings,
    "style_position_padding",
    ":hover"
  );

  if (paddingHover) {
    styles += dimensionsControllerToStyles(paddingHover);
  }

  const zIndexHover = getResponsiveSetting(
    settings,
    "position_z_index",
    ":hover"
  );

  if (zIndexHover) {
    styles += simplePropertyStyled(zIndexHover, "z-index");
  }

  const backgroundColorHover = getResponsiveSetting(
    settings,
    "style_background_color",
    ":hover"
  );

  if (backgroundColorHover) {
    styles += colorPropertyStyled(backgroundColorHover, "background-color");
  }

  const opacityHover = getResponsiveSetting(
    settings,
    "style_background_opacity",
    ":hover"
  );

  if (opacityHover) {
    styles += opacityStyled(opacityHover);
  }

  const gradientHover = getResponsiveSetting(settings, "gradient", ":hover");

  if (gradientHover) {
    styles += gradientStyled(gradientHover);
  }

  const borderTypeHover = getResponsiveSetting(
    settings,
    "style_border_type",
    ":hover"
  );

  if (borderTypeHover) {
    styles += simplePropertyStyled(borderTypeHover, "border-style");
  }

  const borderWidthHover = getResponsiveSetting(
    settings,
    "style_border_width",
    ":hover"
  );

  if (borderWidthHover) {
    styles += borderWidthStyled(borderWidthHover);
  }

  const borderColorHover = getResponsiveSetting(
    settings,
    "style_border_color",
    ":hover"
  );

  if (borderColorHover) {
    styles += colorPropertyStyled(borderColorHover, "border-color");
  }

  const borderRadiusHover = getResponsiveSetting(
    settings,
    "style_border_radius",
    ":hover"
  );

  if (borderRadiusHover) {
    styles += sizeStyled(borderRadiusHover, "border-radius");
  }

  styles += headingTransformToStyles(settings, ":hover");

  styles += `} `;

  styles += `${parentClass} .altrp-heading.altrp-background-image {`;

  const backgroundImage = getResponsiveSetting(settings, "background_image");

  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }

  const backgroundPosition = getResponsiveSetting(
    settings,
    "background_position"
  );

  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, "background-position");
  }

  const backgroundAttachment = getResponsiveSetting(
    settings,
    "background_attachment"
  );

  if (backgroundAttachment) {
    styles += simplePropertyStyled(
      backgroundAttachment,
      "background-attachment"
    );
  }

  const backgroundRepeat = getResponsiveSetting(settings, "background_repeat");

  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, "background-repeat");
  }

  const backgroundSizeInUnits = getResponsiveSetting(settings, "background_image_width");

  const backgroundSize = getResponsiveSetting(settings, "background_size");

  if (backgroundSizeInUnits && backgroundSize === "") {
    styles += sizeStyled(backgroundSizeInUnits, "background-size");
  } else {
    styles += ""
  }

  if (backgroundSize !== "") {
    styles += simplePropertyStyled(backgroundSize, "background-size");
  } else {
    styles += ""
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading.altrp-background-image:hover {`;

  const backgroundImageHover = getResponsiveSetting(
    settings,
    "background_image",
    ":hover"
  );

  if (backgroundImageHover) {
    styles += backgroundImageControllerToStyles(backgroundImageHover);
  }

  const backgroundPositionHover = getResponsiveSetting(
    settings,
    "background_position",
    ":hover"
  );

  if (backgroundPositionHover) {
    styles += simplePropertyStyled(
      backgroundPositionHover,
      "background-position"
    );
  }

  const backgroundAttachmentHover = getResponsiveSetting(
    settings,
    "background_attachment",
    ":hover"
  );

  if (backgroundAttachmentHover) {
    styles += simplePropertyStyled(
      backgroundAttachmentHover,
      "background-attachment"
    );
  }

  const backgroundRepeatHover = getResponsiveSetting(
    settings,
    "background_repeat",
    ":hover"
  );

  if (backgroundRepeatHover) {
    styles += simplePropertyStyled(backgroundRepeatHover, "background-repeat");
  }

  const backgroundSizeInUnitsHover = getResponsiveSetting(
    settings,
    "background_image_width",
    ":hover"
  );

  if (backgroundSizeInUnitsHover) {
    styles += sizeStyled(backgroundSizeInUnitsHover, "background-size");
  }

  const backgroundSizeHover = getResponsiveSetting(
    settings,
    "background_size",
    ":hover"
  );

  if (backgroundSizeHover) {
    styles += simplePropertyStyled(backgroundSizeHover, "background-size");
  }

  styles += `} `;

  return styles;
}
