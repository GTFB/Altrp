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
  translateStyled
} from "../../helpers/styles";
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";

/**
 * Преобразует объект стилей, который задается в виджете Heading в строку css для вставки в GlobalStyles
 * @param {{}} settings
 * @param {string} id
 * @return {string}
 */

export function getHeadingStyles(settings, id) {
  let styles = "";

  if (settings === undefined) {
    return styles;
  }

  const parentClass = `.altrp-element${id}`;

  styles += `${parentClass} .altrp-heading, ${parentClass} .altrp-heading-wrapper {`;

  const justifyContent = getResponsiveSetting(
    settings,
    "heading_settings_alignment"
  );

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, "justify-content");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-sub {`;

  const justifyContentHeaddingSub = getResponsiveSetting(
    settings,
    "sub_heading_settings_alignment"
  );

  if (justifyContentHeaddingSub) {
    styles += simplePropertyStyled(
      justifyContentHeaddingSub,
      "justify-content"
    );
  }

  const textShadowHeaddingSub = getResponsiveSetting(
    settings,
    "text_shadow_sub_heading"
  );

  if (textShadowHeaddingSub) {
    styles += textShadowControllerToStyles(textShadowHeaddingSub);
  }

  const typographicHeaddingSub = getResponsiveSetting(
    settings,
    "typographic_sub_heading"
  );

  if (typographicHeaddingSub) {
    styles += typographicControllerToStyles(typographicHeaddingSub);
  }

  const paddingHeaddingSub = getResponsiveSetting(
    settings,
    "padding_sub_heading"
  );

  if (paddingHeaddingSub) {
    styles += dimensionsControllerToStyles(paddingHeaddingSub);
  }

  const colorHeaddingSub = getResponsiveSetting(settings, "color_sub_heading");

  if (colorHeaddingSub) {
    styles += colorPropertyStyled(colorHeaddingSub, "color");
  }

  const backgroundColorHeaddingSub = getResponsiveSetting(
    settings,
    "bg_sub_heading"
  );

  if (backgroundColorHeaddingSub) {
    styles += colorPropertyStyled(
      backgroundColorHeaddingSub,
      "background-color"
    );
  }

  const widthHeaddingSub = getResponsiveSetting(settings, "width_sub_heading");

  if (widthHeaddingSub) {
    styles += sizeStyled(widthHeaddingSub, "width");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-sub:hover {`;

  const justifyContentHeaddingSubHover = getResponsiveSetting(
    settings,
    "sub_heading_settings_alignment",
    ":hover"
  );

  if (justifyContentHeaddingSubHover) {
    styles += simplePropertyStyled(
      justifyContentHeaddingSubHover,
      "justify-content"
    );
  }

  const textShadowHeaddingSubHover = getResponsiveSetting(
    settings,
    "text_shadow_sub_heading",
    ":hover"
  );

  if (textShadowHeaddingSubHover) {
    styles += textShadowControllerToStyles(textShadowHeaddingSubHover);
  }

  const typographicHeaddingSubHover = getResponsiveSetting(
    settings,
    "typographic_sub_heading",
    ":hover"
  );

  if (typographicHeaddingSubHover) {
    styles += typographicControllerToStyles(typographicHeaddingSubHover);
  }

  const paddingHeaddingSubHover = getResponsiveSetting(
    settings,
    "padding_sub_heading",
    ":hover"
  );

  if (paddingHeaddingSubHover) {
    styles += dimensionsControllerToStyles(paddingHeaddingSubHover);
  }

  const colorHeaddingSubHover = getResponsiveSetting(
    settings,
    "color_sub_heading",
    ":hover"
  );

  if (colorHeaddingSubHover) {
    styles += colorPropertyStyled(colorHeaddingSubHover, "color");
  }

  const backgroundColorHeaddingSubHover = getResponsiveSetting(
    settings,
    "bg_sub_heading",
    ":hover"
  );

  if (backgroundColorHeaddingSubHover) {
    styles += colorPropertyStyled(
      backgroundColorHeaddingSubHover,
      "background-color"
    );
  }

  const widthHeaddingSubHover = getResponsiveSetting(
    settings,
    "width_sub_heading",
    ":hover"
  );

  if (widthHeaddingSubHover) {
    styles += sizeStyled(widthHeaddingSubHover, "width");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-bottom .altrp-heading-sub {`;

  const marginTop = getResponsiveSetting(settings, "spacing_sub_heading");

  if (marginTop) {
    styles += sizeStyled(marginTop, "margin-top");
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-heading-wrapper-sub-bottom .altrp-heading-sub:hover {`;

  const marginTopHover = getResponsiveSetting(
    settings,
    "spacing_sub_heading",
    ":hover"
  );

  if (marginTopHover) {
    styles += sizeStyled(marginTopHover, "margin-top");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-top .altrp-heading-sub {`;

  const marginBottom = getResponsiveSetting(settings, "spacing_sub_heading");

  if (marginBottom) {
    styles += sizeStyled(marginBottom, "margin-bottom");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-top .altrp-heading-sub:hover {`;

  const marginBottomHover = getResponsiveSetting(
    settings,
    "spacing_sub_heading",
    ":hover"
  );

  if (marginBottomHover) {
    styles += sizeStyled(marginBottomHover, "margin-bottom");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-left .altrp-heading-sub {`;

  const marginRight = getResponsiveSetting(settings, "spacing_sub_heading");

  if (marginRight) {
    styles += sizeStyled(marginRight, "margin-right");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-left .altrp-heading-sub:hover {`;

  const marginRightHover = getResponsiveSetting(
    settings,
    "spacing_sub_heading",
    ":hover"
  );

  if (marginRightHover) {
    styles += sizeStyled(marginRightHover, "margin-right");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-right .altrp-heading-sub {`;

  const marginLeft = getResponsiveSetting(settings, "spacing_sub_heading");

  if (marginLeft) {
    styles += sizeStyled(marginLeft, "margin-left");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-wrapper-sub-right .altrp-heading-sub:hover {`;

  const marginLeftHover = getResponsiveSetting(
    settings,
    "spacing_sub_heading",
    ":hover"
  );

  if (marginLeftHover) {
    styles += sizeStyled(marginLeftHover, "margin-left");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-advanced-wrapper {`;

  const textAlignAdvancedWrapper = getResponsiveSetting(
    settings,
    "alignment_advanced_heading_content"
  );

  if (textAlignAdvancedWrapper) {
    styles += simplePropertyStyled(textAlignAdvancedWrapper, "text-align");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-advanced {`;

  const backgroundColorHeadingAdvanced = getResponsiveSetting(
    settings,
    "background_color_advanced_heading_style"
  );

  if (backgroundColorHeadingAdvanced) {
    styles += colorPropertyStyled(
      backgroundColorHeadingAdvanced,
      "background-color"
    );
  }

  const colorHeadingAdvanced = getResponsiveSetting(
    settings,
    "color_advanced_heading_style"
  );

  if (colorHeadingAdvanced) {
    styles += colorPropertyStyled(colorHeadingAdvanced, "color");
  }

  const paddingHeadingAdvanced = getResponsiveSetting(
    settings,
    "padding_advanced_heading_style"
  );

  if (paddingHeadingAdvanced) {
    styles += dimensionsControllerToStyles(paddingHeadingAdvanced);
  }

  const typographicHeadingAdvanced = getResponsiveSetting(
    settings,
    "typography_advanced_heading_style"
  );

  if (typographicHeadingAdvanced) {
    styles += typographicControllerToStyles(typographicHeadingAdvanced);
  }

  const textShadowHeadingAdvanced = getResponsiveSetting(
    settings,
    "text_shadow_advanced_heading_style"
  );

  if (textShadowHeadingAdvanced) {
    styles += textShadowControllerToStyles(textShadowHeadingAdvanced);
  }

  const borderTypeHeadingAdvanced = getResponsiveSetting(
    settings,
    "border_type_advanced_heading_style"
  );

  if (borderTypeHeadingAdvanced) {
    styles += simplePropertyStyled(borderTypeHeadingAdvanced, "border-style");
  }

  const borderWidthHeadingAdvanced = getResponsiveSetting(
    settings,
    "border_width_advanced_heading_style"
  );

  if (borderWidthHeadingAdvanced) {
    styles += borderWidthStyled(borderWidthHeadingAdvanced);
  }

  const borderColorHeadingAdvanced = getResponsiveSetting(
    settings,
    "border_color_advanced_heading_style"
  );

  if (borderColorHeadingAdvanced) {
    styles += colorPropertyStyled(borderColorHeadingAdvanced, "border-color");
  }

  const borderRadiusHeadingAdvanced = getResponsiveSetting(
    settings,
    "border_radius_advanced_heading_style"
  );

  if (borderRadiusHeadingAdvanced) {
    styles += dimensionsControllerToStyles(
      borderRadiusHeadingAdvanced,
      "border-radius"
    );
  }

  const opacityHeadingAdvanced = getResponsiveSetting(
    settings,
    "opacity_advanced_heading_style"
  );

  if (opacityHeadingAdvanced) {
    styles += opacityStyled(opacityHeadingAdvanced);
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-heading-advanced:hover {`;

  const backgroundColorHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "background_color_advanced_heading_style",
    ":hover"
  );

  if (backgroundColorHeadingAdvancedHover) {
    styles += colorPropertyStyled(
      backgroundColorHeadingAdvancedHover,
      "background-color"
    );
  }

  const colorHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "color_advanced_heading_style",
    ":hover"
  );

  if (colorHeadingAdvancedHover) {
    styles += colorPropertyStyled(colorHeadingAdvancedHover, "color");
  }

  const paddingHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "padding_advanced_heading_style",
    ":hover"
  );

  if (paddingHeadingAdvancedHover) {
    styles += dimensionsControllerToStyles(paddingHeadingAdvancedHover);
  }

  const typographicHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "typography_advanced_heading_style",
    ":hover"
  );

  if (typographicHeadingAdvancedHover) {
    styles += typographicControllerToStyles(typographicHeadingAdvancedHover);
  }

  const textShadowHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "text_shadow_advanced_heading_style",
    ":hover"
  );

  if (textShadowHeadingAdvancedHover) {
    styles += textShadowControllerToStyles(textShadowHeadingAdvancedHover);
  }

  const borderTypeHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "border_type_advanced_heading_style",
    ":hover"
  );

  if (borderTypeHeadingAdvancedHover) {
    styles += simplePropertyStyled(
      borderTypeHeadingAdvancedHover,
      "border-style"
    );
  }

  const borderWidthHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "border_width_advanced_heading_style",
    ":hover"
  );

  if (borderWidthHeadingAdvancedHover) {
    styles += borderWidthStyled(borderWidthHeadingAdvancedHover);
  }

  const borderColorHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "border_color_advanced_heading_style",
    ":hover"
  );

  if (borderColorHeadingAdvancedHover) {
    styles += colorPropertyStyled(
      borderColorHeadingAdvancedHover,
      "border-color"
    );
  }

  const borderRadiusHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "border_radius_advanced_heading_style",
    ":hover"
  );

  if (borderRadiusHeadingAdvancedHover) {
    styles += dimensionsControllerToStyles(
      borderRadiusHeadingAdvancedHover,
      "border-radius"
    );
  }

  const opacityHeadingAdvancedHover = getResponsiveSetting(
    settings,
    "opacity_advanced_heading_style",
    ":hover"
  );

  if (opacityHeadingAdvancedHover) {
    styles += opacityStyled(opacityHeadingAdvancedHover);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-icon-header {`;

  const marginBottomForHorizontal = getResponsiveSetting(
    settings,
    "horizontal_offset_advanced_heading_content"
  );

  if (marginBottomForHorizontal) {
    styles += sizeStyled(marginBottomForHorizontal, "margin-bottom");
  }

  const marginBottomForVertical = getResponsiveSetting(
    settings,
    "vertical_offset_advanced_heading_content"
  );

  if (marginBottomForVertical) {
    styles += sizeStyled(marginBottomForVertical, "margin-bottom");
  }

  const marginBottomForRotate = getResponsiveSetting(
    settings,
    "rotate_offset_advanced_heading_content"
  );

  if (marginBottomForRotate) {
    styles += sizeStyled(marginBottomForRotate, "margin-bottom");
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-icon-header:hover {`;

  const marginBottomForHorizontalHover = getResponsiveSetting(
    settings,
    "horizontal_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForHorizontalHover) {
    styles += sizeStyled(marginBottomForHorizontalHover, "margin-bottom");
  }

  const marginBottomForVerticalHover = getResponsiveSetting(
    settings,
    "vertical_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForVerticalHover) {
    styles += sizeStyled(marginBottomForVerticalHover, "margin-bottom");
  }

  const marginBottomForRotateHover = getResponsiveSetting(
    settings,
    "rotate_offset_advanced_heading_content",
    ":hover"
  );

  if (marginBottomForRotateHover) {
    styles += sizeStyled(marginBottomForRotateHover, "margin-bottom");
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

  const transform = getResponsiveSetting(settings, "transform_style");

  if (transform) {
    styles += translateStyled(transform);
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading, ${parentClass} .altrp-heading a:hover {`;

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
    styles += sizeStyled(borderRadius, "border-radius");
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

  const transformHover = getResponsiveSetting(
    settings,
    "transform_style",
    ":hover"
  );

  if (transformHover) {
    styles += translateStyled(transformHover);
  }

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

  const backgroundSizeInUnits = getResponsiveSetting(
    settings,
    "background_image_width"
  );

  if (backgroundSizeInUnits) {
    styles += sizeStyled(backgroundSizeInUnits, "background-size");
  }

  const backgroundSize = getResponsiveSetting(settings, "background_size");

  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, "background-size");
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

  styles += `${parentClass} .altrp-animating-text {`;

  const typographicAnimating = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style"
  );

  if (typographicAnimating) {
    styles += typographicControllerToStyles(typographicAnimating);
  }

  const colorAnimating = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style"
  );

  if (colorAnimating) {
    styles += colorPropertyStyled(colorAnimating, "color");
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-animating-text:hover {`;

  const typographicAnimatingHover = getResponsiveSetting(
    settings,
    "animated_text_headline_animating_style",
    ":hover"
  );

  if (typographicAnimatingHover) {
    styles += typographicControllerToStyles(typographicAnimatingHover);
  }

  const colorAnimatingHover = getResponsiveSetting(
    settings,
    "animated_text_color_headline_animating_style",
    ":hover"
  );

  if (colorAnimatingHover) {
    styles += colorPropertyStyled(colorAnimatingHover, "color");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading-no-animating-text {`;

  const typographicNoAnimating = getResponsiveSetting(
    settings,
    "text_headline_animating_style"
  );

  if (typographicNoAnimating) {
    styles += typographicControllerToStyles(typographicNoAnimating);
  }

  const colorNoAnimating = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style"
  );

  if (colorNoAnimating) {
    styles += colorPropertyStyled(colorNoAnimating, "color");
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-heading-no-animating-text:hover {`;

  const typographicNoAnimatingHover = getResponsiveSetting(
    settings,
    "text_headline_animating_style",
    ":hover"
  );

  if (typographicNoAnimatingHover) {
    styles += typographicControllerToStyles(typographicNoAnimatingHover);
  }

  const colorNoAnimatingHover = getResponsiveSetting(
    settings,
    "text_color_headline_animating_style",
    ":hover"
  );

  if (colorNoAnimatingHover) {
    styles += colorPropertyStyled(colorNoAnimatingHover, "color");
  }

  styles += `} `;

  styles += `${parentClass} .altrp-animating-highlighted-svg svg path {`;

  const strokeWidthAnimatingSvg = getResponsiveSetting(
    settings,
    "width_shape_animating"
  );

  if (strokeWidthAnimatingSvg) {
    styles += sizeStyled(strokeWidthAnimatingSvg, "stroke-width");
  }

  const colorAnimatingSvg = getResponsiveSetting(
    settings,
    "color_shape_animating"
  );

  if (colorAnimatingSvg) {
    styles += colorPropertyStyled(colorAnimatingSvg, "stroke");
  }

  styles += `} `;
  //hover
  styles += `${parentClass} .altrp-animating-highlighted-svg:hover svg path {`;

  const strokeWidthAnimatingSvgHover = getResponsiveSetting(
    settings,
    "width_shape_animating",
    ":hover"
  );

  if (strokeWidthAnimatingSvgHover) {
    styles += sizeStyled(strokeWidthAnimatingSvgHover, "stroke-width");
  }

  const colorAnimatingSvgHover = getResponsiveSetting(
    settings,
    "color_shape_animating",
    ":hover"
  );

  if (colorAnimatingSvgHover) {
    styles += colorPropertyStyled(colorAnimatingSvgHover, "stroke");
  }

  styles += `} `;

  return styles;
}
