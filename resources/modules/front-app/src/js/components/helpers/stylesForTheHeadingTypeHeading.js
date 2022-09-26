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
import getResponsiveSetting from "../../functions/getResponsiveSetting";

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

  //state disabled
  styles += `${parentClass} .state-disabled .altrp-heading, ${parentClass} .altrp-heading a {`;

  const colorDisabled = getResponsiveSetting(settings, "heading_style_color", ".state-disabled");

  if (colorDisabled) {
    styles += colorPropertyStyled(colorDisabled, "color");
  }

  const typographicDisabled = getResponsiveSetting(
    settings,
    "heading_style_typographic", ".state-disabled"
  );

  if (typographicDisabled) {
    styles += typographicControllerToStyles(typographicDisabled);
  }

  const textShadowDisabled = getResponsiveSetting(
    settings,
    "heading_style_text_shadow", ".state-disabled"
  );

  if (textShadowDisabled) {
    styles += textShadowControllerToStyles(textShadowDisabled);
  }

  const marginDisabled = getResponsiveSetting(settings, "style_position_margin", ".state-disabled");

  if (marginDisabled) {
    styles += dimensionsControllerToStyles(marginDisabled, "margin");
  }

  const paddingDisabled = getResponsiveSetting(settings, "style_position_padding", ".state-disabled");

  if (paddingDisabled) {
    styles += dimensionsControllerToStyles(paddingDisabled);
  }

  const zIndexDisabled = getResponsiveSetting(settings, "position_z_index", ".state-disabled");

  if (zIndexDisabled) {
    styles += simplePropertyStyled(zIndexDisabled, "z-index");
  }

  const backgroundColorDisabled = getResponsiveSetting(
    settings,
    "style_background_color", ".state-disabled"
  );

  if (backgroundColorDisabled) {
    styles += colorPropertyStyled(backgroundColorDisabled, "background-color");
  }

  const opacityDisabled = getResponsiveSetting(settings, "style_background_opacity", ".state-disabled");

  if (opacityDisabled) {
    styles += opacityStyled(opacityDisabled);
  }

  const gradientDisabled = getResponsiveSetting(settings, "gradient", ".state-disabled");

  if (gradientDisabled) {
    styles += gradientStyled(gradientDisabled);
  }

  styles += headingTransformToStyles(settings, '')

  styles += `} `;
  //end of disabled
  //state active
  styles += `${parentClass} .active .altrp-heading, ${parentClass} .altrp-heading a {`;

  const colorActive = getResponsiveSetting(settings, "heading_style_color", ".active");

  if (colorActive) {
    styles += colorPropertyStyled(colorActive, "color");
  }

  const typographicActive = getResponsiveSetting(
    settings,
    "heading_style_typographic", ".active"
  );

  if (typographicActive) {
    styles += typographicControllerToStyles(typographicActive);
  }

  const textShadowActive = getResponsiveSetting(
    settings,
    "heading_style_text_shadow", ".active"
  );

  if (textShadowActive) {
    styles += textShadowControllerToStyles(textShadowActive);
  }

  const marginActive = getResponsiveSetting(settings, "style_position_margin", ".active");

  if (marginActive) {
    styles += dimensionsControllerToStyles(marginActive, "margin");
  }

  const paddingActive = getResponsiveSetting(settings, "style_position_padding", ".active");

  if (paddingActive) {
    styles += dimensionsControllerToStyles(paddingActive);
  }

  const zIndexActive = getResponsiveSetting(settings, "position_z_index", ".active");

  if (zIndexActive) {
    styles += simplePropertyStyled(zIndexActive, "z-index");
  }

  const backgroundColorActive = getResponsiveSetting(
    settings,
    "style_background_color", ".active"
  );

  if (backgroundColorActive) {
    styles += colorPropertyStyled(backgroundColorActive, "background-color");
  }

  const opacityActive = getResponsiveSetting(settings, "style_background_opacity", ".active");

  if (opacityActive) {
    styles += opacityStyled(opacityActive);
  }

  const gradientActive = getResponsiveSetting(settings, "gradient", ".active");

  if (gradientActive) {
    styles += gradientStyled(gradientActive);
  }

  styles += headingTransformToStyles(settings, '')

  styles += `} `;
  //end of state active

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
  styles += `} `;

  //state disabled
  styles += `${parentClass} .state-disabled .altrp-heading {`;

  const borderTypeDisabled = getResponsiveSetting(settings, "style_border_type", ".state-disabled");

  if (borderTypeDisabled) {
    styles += simplePropertyStyled(borderTypeDisabled, "border-style");
  }

  const borderWidthDisabled = getResponsiveSetting(settings, "style_border_width", ".state-disabled");

  if (borderWidthDisabled) {
    styles += borderWidthStyled(borderWidthDisabled);
  }

  const borderColorDisabled = getResponsiveSetting(settings, "style_border_color", ".state-disabled");

  if (borderColorDisabled) {
    styles += colorPropertyStyled(borderColorDisabled, "border-color");
  }

  const borderRadiusDisabled = getResponsiveSetting(settings, "style_border_radius", ".state-disabled");

  if (borderRadiusDisabled) {
    styles += dimensionsStyled(borderRadiusDisabled, "border-radius");
  }
  styles += `} `;
  //end of state disabled
  //start state active
  styles += `${parentClass} .active .altrp-heading {`;

  const borderTypeActive = getResponsiveSetting(settings, "style_border_type", ".active");

  if (borderTypeActive) {
    styles += simplePropertyStyled(borderTypeActive, "border-style");
  }

  const borderWidthActive = getResponsiveSetting(settings, "style_border_width", ".active");

  if (borderWidthActive) {
    styles += borderWidthStyled(borderWidthActive);
  }

  const borderColorActive = getResponsiveSetting(settings, "style_border_color", ".active");

  if (borderColorActive) {
    styles += colorPropertyStyled(borderColorActive, "border-color");
  }

  const borderRadiusActive = getResponsiveSetting(settings, "style_border_radius", ".active");

  if (borderRadiusActive) {
    styles += dimensionsStyled(borderRadiusActive, "border-radius");
  }
  styles += `} `;
  //end state active


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

  //start state disabled
  styles += `${parentClass} .state-disabled .altrp-heading.altrp-background-image {`;

  const backgroundImageDisabled = getResponsiveSetting(settings, "background_image", ".state-disabled");

  if (backgroundImageDisabled) {
    styles += backgroundImageControllerToStyles(backgroundImageDisabled);
  }

  const backgroundPositionDisabled = getResponsiveSetting(
    settings,
    "background_position", ".state-disabled"
  );

  if (backgroundPositionDisabled) {
    styles += simplePropertyStyled(backgroundPositionDisabled, "background-position");
  }

  const backgroundAttachmentDisabled = getResponsiveSetting(
    settings,
    "background_attachment", ".state-disabled"
  );

  if (backgroundAttachmentDisabled) {
    styles += simplePropertyStyled(
      backgroundAttachmentDisabled,
      "background-attachment"
    );
  }

  const backgroundRepeatDisabled = getResponsiveSetting(settings, "background_repeat", ".state-disabled");

  if (backgroundRepeatDisabled) {
    styles += simplePropertyStyled(backgroundRepeatDisabled, "background-repeat");
  }

  const backgroundSizeInUnitsDisabled = getResponsiveSetting(settings, "background_image_width", ".state-disabled");

  const backgroundSizeDisabled = getResponsiveSetting(settings, "background_size", ".state-disabled");

  if (backgroundSizeInUnitsDisabled && backgroundSizeDisabled === "") {
    styles += sizeStyled(backgroundSizeInUnitsDisabled, "background-size");
  } else {
    styles += ""
  }

  if (backgroundSizeDisabled !== "") {
    styles += simplePropertyStyled(backgroundSizeDisabled, "background-size");
  } else {
    styles += ""
  }

  styles += `} `;
  //end state disabled

  //start state active
  styles += `${parentClass} .active .altrp-heading.altrp-background-image {`;

  const backgroundImageActive = getResponsiveSetting(settings, "background_image", ".active");

  if (backgroundImageActive) {
    styles += backgroundImageControllerToStyles(backgroundImageActive);
  }

  const backgroundPositionActive = getResponsiveSetting(
    settings,
    "background_position", ".active"
  );

  if (backgroundPositionActive) {
    styles += simplePropertyStyled(backgroundPositionActive, "background-position");
  }

  const backgroundAttachmentActive = getResponsiveSetting(
    settings,
    "background_attachment", ".active"
  );

  if (backgroundAttachmentActive) {
    styles += simplePropertyStyled(
      backgroundAttachmentActive,
      "background-attachment"
    );
  }

  const backgroundRepeatActive = getResponsiveSetting(settings, "background_repeat", ".active");

  if (backgroundRepeatActive) {
    styles += simplePropertyStyled(backgroundRepeatActive, "background-repeat");
  }

  const backgroundSizeInUnitsActive = getResponsiveSetting(settings, "background_image_width", ".active");

  const backgroundSizeActive = getResponsiveSetting(settings, "background_size", ".active");

  if (backgroundSizeInUnitsActive && backgroundSizeActive === "") {
    styles += sizeStyled(backgroundSizeInUnitsActive, "background-size");
  } else {
    styles += ""
  }

  if (backgroundSizeActive !== "") {
    styles += simplePropertyStyled(backgroundSizeActive, "background-size");
  } else {
    styles += ""
  }

  styles += `} `;
  //end state active


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

  styles += `${parentClass} .text-stroke-included {`

  const styleTextStrokeSwitch = getResponsiveSetting(
    settings,
    "style_text_stroke_switcher"
  );

  const styleTextStrokeSlider = getResponsiveSetting(
    settings,
    "style_text_stroke_slider"
  );

  const styleTextStrokeColor = getResponsiveSetting(
    settings,
    "style_text_stroke_color"
  );

  const styleTextStrokeFillColor = getResponsiveSetting(
    settings,
    "style_text_stroke_fill_color"
  );

  if (styleTextStrokeSwitch) {
    styles += `-webkit-text-stroke: ${styleTextStrokeSlider?.size + styleTextStrokeSlider?.unit || "1px"} ${styleTextStrokeColor?.colorPickedHex || "black"}; -webkit-text-fill-color: ${styleTextStrokeFillColor?.colorPickedHex || "white"};`
  }

  styles += `} `;

  styles += `${parentClass} .altrp-heading {`
  const gradientColor = getResponsiveSetting(
    settings,
    "style_text_gradient_switcher"
  );

  const gradientTextarea = getResponsiveSetting(
    settings,
    "style_text_gradient_textarea"
  ) || ''

  if (gradientColor) {
    styles += `background-image: ${gradientTextarea.replace(/;/g, '')}; -webkit-text-fill-color: transparent;`
  }

  styles += `} `;


  styles += `${parentClass} .altrp-heading:hover {`
  const gradientColorH = getResponsiveSetting(
    settings,
    "style_text_gradient_switcher",
    ":hover"
  );

  const gradientTextareaH = getResponsiveSetting(
    settings,
    "style_text_gradient_textarea",
    ":hover"
  ) || ''

  if (gradientColorH) {
    styles += `background-image: ${gradientTextareaH.replace(/;/g, '')}; -webkit-text-fill-color: transparent;`
  }

  styles += `} `;

  return styles;
}
