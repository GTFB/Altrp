import styled from "styled-components";
import {
  getResponsiveSetting,
  isEditor
} from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  sizeStyled,
  gradientStyled,
  shadowStyled,
  backgroundImageControllerToStyles,
  sliderStyled
} from "../../../../../../front-app/src/js/helpers/styles";
const settingsToStyles = ({ settings, columns = [] }) => {
  let styles = "";

  styles += "&&.altrp-section{z-index: 45;display: flex;";
  const position_style_position_padding = getResponsiveSetting(
    settings,
    "position_style_position_padding"
  );
  if (position_style_position_padding) {
    styles += dimensionsControllerToStyles(position_style_position_padding);
  }

  styles += "} ";
  if (!isEditor()) {
    columns = columns.filter(c => {
      return _.get(c, "wrapper.state.elementDisplay");
    });
  }
  if (columns.length) {
    styles += "& > .altrp-element_column{";
    styles += `width:${100 / columns.length}%;`;
    styles += "} ";
  }

  let flexWrap,
    align,
    justifyContent,
    flexDirection,
    minHeight,
    overflow,
    backgroundColor,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow;

  styles += "& > .altrp-section, & > .altrp-section-full-fill {";

  //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexWrap = getResponsiveSetting(settings, "layout_flex_wrap_content");
  }

  if (flexWrap) {
    styles += simplePropertyStyled(flexWrap, "flex-wrap", "!important");
  }

  //Получаем значения align из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    align = getResponsiveSetting(settings, "layout_column_position");
  }

  if (align) {
    styles += simplePropertyStyled(align, "align-content");
    styles += simplePropertyStyled(align, "align-items");
  }

  //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    justifyContent = getResponsiveSetting(settings, "layout_justify_content");
  }

  if (justifyContent) {
    styles += simplePropertyStyled(justifyContent, "justify-content");
  }

  //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexDirection = getResponsiveSetting(settings, "layout_column_direction");
  }

  if (flexDirection) {
    styles += simplePropertyStyled(flexDirection, "flex-direction");
  }

  //Получаем значения min-height в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    minHeight = getResponsiveSetting(settings, "label_style_min_height");
  }

  if (minHeight) {
    styles += sizeStyled(minHeight, "min-height");
  }

  //Получаем значения overflow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    overflow = getResponsiveSetting(settings, "layout_overflow");
  }

  if (overflow) {
    styles += simplePropertyStyled(overflow, "overflow");
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(
      settings,
      "section_style_background_color"
    );
  }

  if (backgroundColor) {
    styles += colorPropertyStyled(backgroundColor, "background-color");
  }

  //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderStyle = getResponsiveSetting(settings, "section_style_border_type");
  }

  if (borderStyle) {
    styles += simplePropertyStyled(borderStyle, "border-style");
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, "section_style_border_width");
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, "section_style_border_color");
  }

  if (borderColor) {
    styles += colorPropertyStyled(borderColor, "border-color");
  }

  //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(
      settings,
      "section_style_border_radius"
    );
  }


  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, "section_style_box_shadow");
  }

  if (boxShadow) {
    styles += shadowStyled(boxShadow);
  }

  styles += "} ";

  //hover

  let flexWrapH,
    alignH,
    justifyContentH,
    flexDirectionH,
    minHeightH,
    overflowH,
    backgroundColorH,
    borderStyleH,
    borderWidthH,
    borderColorH,
    borderRadiusH,
    boxShadowH;

  styles += "& > .altrp-section:hover, & > .altrp-section-full-fill:hover {";

  //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexWrapH = getResponsiveSetting(
      settings,
      "layout_flex_wrap_content",
      ":hover"
    );
  }

  if (flexWrapH) {
    styles += simplePropertyStyled(flexWrapH, "flex-wrap", "!important");
  }

  //Получаем значения align из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    alignH = getResponsiveSetting(settings, "layout_column_position", ":hover");
  }

  if (alignH) {
    styles += simplePropertyStyled(alignH, "align-content");
    styles += simplePropertyStyled(alignH, "align-items");
  }

  //Получаем значения justify-content из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    justifyContentH = getResponsiveSetting(
      settings,
      "layout_justify_content",
      ":hover"
    );
  }

  if (justifyContentH) {
    styles += simplePropertyStyled(justifyContentH, "justify-content");
  }

  //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexDirectionH = getResponsiveSetting(
      settings,
      "layout_column_direction",
      ":hover"
    );
  }

  if (flexDirectionH) {
    styles += simplePropertyStyled(flexDirectionH, "flex-direction");
  }

  //Получаем значения min-height в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    minHeightH = getResponsiveSetting(
      settings,
      "label_style_min_height",
      ":hover"
    );
  }

  if (minHeightH) {
    styles += sizeStyled(minHeightH, "min-height");
  }

  //Получаем значения overflow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    overflowH = getResponsiveSetting(settings, "layout_overflow", ":hover");
  }

  if (overflowH) {
    styles += simplePropertyStyled(overflowH, "overflow");
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColorH = getResponsiveSetting(
      settings,
      "section_style_background_color",
      ":hover"
    );
  }

  if (backgroundColorH) {
    styles += colorPropertyStyled(backgroundColorH, "background-color");
  }

  //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderStyleH = getResponsiveSetting(
      settings,
      "section_style_border_type",
      ":hover"
    );
  }

  if (borderStyleH) {
    styles += simplePropertyStyled(borderStyleH, "border-style");
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidthH = getResponsiveSetting(
      settings,
      "section_style_border_width",
      ":hover"
    );
  }

  if (borderWidthH) {
    styles += borderWidthStyled(borderWidthH);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColorH = getResponsiveSetting(
      settings,
      "section_style_border_color",
      ":hover"
    );
  }

  if (borderColorH) {
    styles += colorPropertyStyled(borderColorH, "border-color");
  }

  //Получаем значения border-radius в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadiusH = getResponsiveSetting(
      settings,
      "section_style_border_radius",
      ":hover"
    );
  }

  if (borderRadiusH) {
    styles += sizeStyled(borderRadiusH, "border-radius");
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadowH = getResponsiveSetting(
      settings,
      "section_style_box_shadow",
      ":hover"
    );
  }

  if (boxShadowH) {
    styles += shadowStyled(boxShadowH);
  }

  styles += "} ";

  let width;

  styles += "&&.altrp-section_boxed, &&.altrp-section_section_boxed {";

  //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    width = getResponsiveSetting(settings, "layout_content_width");
  }

  if (width) {
    width = sliderStyled(width);
    styles += `width: ${width} !important`;
  }

  styles += "} ";

  //hover

  let widthH;

  styles +=
    "&&.altrp-section_boxed:hover, &&.altrp-section_section_boxed:hover {";

  styles += "} ";

  styles += "& > .altrp-section_section-boxed {";

  //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    width = getResponsiveSetting(settings, "layout_content_width");
  }

  if (width) {
    styles += `padding-left: calc((100vw - ${width.size +
      width.unit}) / 2); padding-right: calc((100vw - ${width.size +
      width.unit}) / 2); width: 100vw; `;
  }

  styles += "} ";

  //hover

  styles += "& > .altrp-section_section-boxed:hover {";

  //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    widthH = getResponsiveSetting(settings, "layout_content_width", ":hover");
  }

  if (widthH) {
    if(widthH.size) {
      styles += `padding-left: calc((100vw - ${widthH.size +
      widthH.unit}) / 2); padding-right: calc((100vw - ${widthH.size +
      widthH.unit}) / 2); width: 100vw; `;
    }
  }

  styles += "} ";

  let padding;

  styles += "& > .altrp-section .altrp-column {";

  //Получаем значения padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, "layout_columns_gap");
  }

  if (padding) {
    styles += `padding: ${padding}px; `;
  }

  styles += "} ";

  //hover

  let paddingH;

  styles += "& > .altrp-section:hover .altrp-column:hover {";

  //Получаем значения padding в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    paddingH = getResponsiveSetting(settings, "layout_columns_gap", ":hover");
  }

  if (paddingH) {
    styles += `padding: ${paddingH}px; `;
  }

  styles += "} ";

  let gradient, zIndex, top, right, left, bottom;

  styles += "& > .altrp-section {";

  //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, "gradient");
  }

  if (gradient) {
    styles += gradientStyled(gradient);
  }

  //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    zIndex = getResponsiveSetting(settings, "position_style_z_index");
  }

  if (zIndex) {
    styles += simplePropertyStyled(zIndex, "z-index");
  }

  //Получаем значения position-top из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    top = getResponsiveSetting(settings, "position_top");
  }

  if (top) {
    styles += simplePropertyStyled(top, "top");
  }

  //Получаем значения position-right из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    right = getResponsiveSetting(settings, "position_right");
  }

  if (right) {
    styles += simplePropertyStyled(right, "right");
  }

  //Получаем значения position-left из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    left = getResponsiveSetting(settings, "position_left");
  }

  if (left) {
    styles += simplePropertyStyled(left, "left");
  }

  //Получаем значения position-bottom из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    bottom = getResponsiveSetting(settings, "position_bottom");
  }

  if (bottom) {
    styles += simplePropertyStyled(bottom, "bottom");
  }

  styles += "} ";

  //hover

  let gradientH, topH, rightH, leftH, bottomH;

  styles += "& > .altrp-section:hover {";

  //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    gradientH = getResponsiveSetting(settings, "gradient", ":hover");
  }

  if (gradientH) {
    styles += gradientStyled(gradientH);
  }

  //Получаем значения position-top из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    topH = getResponsiveSetting(settings, "position_top", ":hover");
  }

  if (topH) {
    styles += simplePropertyStyled(topH, "top");
  }

  //Получаем значения position-right из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    rightH = getResponsiveSetting(settings, "position_right", ":hover");
  }

  if (rightH) {
    styles += simplePropertyStyled(rightH, "right");
  }

  //Получаем значения position-left из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    leftH = getResponsiveSetting(settings, "position_left", ":hover");
  }

  if (leftH) {
    styles += simplePropertyStyled(leftH, "left");
  }

  //Получаем значения position-bottom из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    bottomH = getResponsiveSetting(settings, "position_bottom", ":hover");
  }

  if (bottomH) {
    styles += simplePropertyStyled(bottomH, "bottom");
  }

  styles += "} ";

  let backgroundImage,
    backgroundPosition,
    backgroundAttachment,
    backgroundRepeat,
    backgroundSizeInUnits,
    backgroundSize;

  styles += "& > .altrp-section.altrp-background-image {";

  //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, "background_image");
  }

  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }

  //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, "background_position");
  }

  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, "background-position");
  }

  //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(
      settings,
      "background_attachment"
    );
  }

  if (backgroundAttachment) {
    styles += simplePropertyStyled(
      backgroundAttachment,
      "background-attachment"
    );
  }

  //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, "background_repeat");
  }

  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, "background-repeat");
  }

  //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeInUnits = getResponsiveSetting(
      settings,
      "background_image_width"
    );
  }

  if (backgroundSizeInUnits) {
    styles += sizeStyled(backgroundSizeInUnits, "background-size");
  }

  //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, "background_size");
  }

  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, "background-size");
  }

  styles += "} ";

  //hover

  let backgroundImageH,
    backgroundPositionH,
    backgroundAttachmentH,
    backgroundRepeatH,
    backgroundSizeInUnitsH,
    backgroundSizeH;

  styles += "& > .altrp-section.altrp-background-image:hover {";

  //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundImageH = getResponsiveSetting(
      settings,
      "background_image",
      ":hover"
    );
  }

  if (backgroundImageH) {
    styles += backgroundImageControllerToStyles(backgroundImageH);
  }

  //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundPositionH = getResponsiveSetting(
      settings,
      "background_position",
      ":hover"
    );
  }

  if (backgroundPositionH) {
    styles += simplePropertyStyled(backgroundPositionH, "background-position");
  }

  //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundAttachmentH = getResponsiveSetting(
      settings,
      "background_attachment",
      ":hover"
    );
  }

  if (backgroundAttachmentH) {
    styles += simplePropertyStyled(
      backgroundAttachmentH,
      "background-attachment"
    );
  }

  //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundRepeatH = getResponsiveSetting(
      settings,
      "background_repeat",
      ":hover"
    );
  }

  if (backgroundRepeatH) {
    styles += simplePropertyStyled(backgroundRepeatH, "background-repeat");
  }

  //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeInUnitsH = getResponsiveSetting(
      settings,
      "background_image_width",
      ":hover"
    );
  }

  if (backgroundSizeInUnitsH) {
    styles += sizeStyled(backgroundSizeInUnitsH, "background-size");
  }

  //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundSizeH = getResponsiveSetting(
      settings,
      "background_size",
      ":hover"
    );
  }

  if (backgroundSizeH) {
    styles += simplePropertyStyled(backgroundSizeH, "background-size");
  }

  styles += "} ";

  let margin;

  styles += "&&, & > .altrp-section-full-fill {";

  //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, "position_style_position_margin");
  }

  if (margin) {
    styles += dimensionsControllerToStyles(margin, "margin");
  }

  styles += "} ";

  //hover

  let marginH;

  styles += "&&:hover, & > .altrp-section-full-fill:hover {";

  //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    marginH = getResponsiveSetting(
      settings,
      "position_style_position_margin",
      ":hover"
    );
  }

  if (marginH) {
    styles += dimensionsControllerToStyles(marginH, "margin");
  }

  styles += "} ";

  let widthCustom;

  styles += "&&.fixed-section > .altrp-section {";

  //Получаем значения width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    widthCustom = getResponsiveSetting(settings, "custom_width");
  }

  if (widthCustom) {
    styles += simplePropertyStyled(widthCustom, "width");
  }

  styles += "} ";

  //hover

  let widthCustomH;

  styles += "&&.fixed-section > .altrp-section:hover {";

  //Получаем значения width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    widthCustomH = getResponsiveSetting(settings, "custom_width");
  }

  if (widthCustomH) {
    styles += simplePropertyStyled(widthCustomH, "width");
  }

  styles += "} ";

  return styles;
};

export const SectionDivComponent = styled.div`
  ${settingsToStyles}
`;
export const SectionHeaderComponent = styled.header`
  ${settingsToStyles}
`;
export const SectionFooterComponent = styled.footer`
  ${settingsToStyles}
`;
export const SectionMainComponent = styled.main`
  ${settingsToStyles}
`;
export const SectionArticleComponent = styled.article`
  ${settingsToStyles}
`;
export const SectionSectionComponent = styled.section`
  ${settingsToStyles}
`;
export const SectionAsideComponent = styled.aside`
  ${settingsToStyles}
`;
export const SectionNavComponent = styled.nav`
  ${settingsToStyles}
`;
