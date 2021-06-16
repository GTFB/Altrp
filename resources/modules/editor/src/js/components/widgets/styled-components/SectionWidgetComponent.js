import styled from "styled-components";
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  simplePropertyStyled,
  borderWidthStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  sizeStyled,
  shadowControllerToStyles,
  gradientStyled,
  backgroundImageControllerToStyles, sliderStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * @return {string}
 */

export default function SectionWidgetComponent(settings) {

  console.log(settings)
  function altrpSection() {
    let styles = '';

    let backgroundColor, flexWrap, verticalAlign, gorizontalAlign, flexDirection, minHeight, overflow, borderStyle, borderWidth, borderColor, borderRadius, boxShadow;

    //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundColor = getResponsiveSetting(settings, 'section_style_background_color');
    }

    if (backgroundColor) {
      styles += colorPropertyStyled(backgroundColor, 'background');
    }

    //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      flexWrap = getResponsiveSetting(settings, 'layout_flex_wrap_content');
    }

    if (flexWrap) {
      styles += simplePropertyStyled(flexWrap, 'flex-wrap', '!important');
    }

    //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      verticalAlign = getResponsiveSetting(settings, 'layout_column_position');
    }

    if (verticalAlign) {
      styles += simplePropertyStyled(verticalAlign, 'align-content');
      styles += simplePropertyStyled(verticalAlign, 'align-items');
    }

    //Получаем значения gorizontal-align из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      gorizontalAlign = getResponsiveSetting(settings, 'layout_justify_content');
    }

    if (gorizontalAlign) {
      styles += simplePropertyStyled(gorizontalAlign, 'justify-content');
    }

    //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      flexDirection = getResponsiveSetting(settings, 'layout_column_direction');
    }

    if (flexDirection) {
      styles += simplePropertyStyled(flexDirection, 'flex-direction');
    }

    //Получаем значения min-height из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      minHeight = getResponsiveSetting(settings, 'label_style_min_height');
    }

    if (minHeight) {
      styles += sizeStyled(minHeight, 'min-height');
    }

    //Получаем значения overflow из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      overflow = getResponsiveSetting(settings, 'layout_overflow');
    }

    if (overflow) {
      styles += simplePropertyStyled(overflow, 'overflow');
    }

    //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderStyle = getResponsiveSetting(settings, 'section_style_border_type');
    }

    if (borderStyle) {
      styles += simplePropertyStyled(borderStyle, 'border-style');
    }

    //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidth = getResponsiveSetting(settings, 'section_style_border_width');
    }

    if (borderWidth) {
      styles += borderWidthStyled(borderWidth);
    }

    //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColor = getResponsiveSetting(settings, 'section_style_border_color');
    }

    if (borderColor) {
      styles += colorPropertyStyled(borderColor, 'border-color');
    }

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadius = getResponsiveSetting(settings, 'section_style_border_radius');
    }

    if (borderRadius) {
      styles += sizeStyled(borderRadius, 'border-radius');
    }

    //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      boxShadow = getResponsiveSetting(settings, 'section_style_box_shadow');
    }

    if (boxShadow) {
      styles += shadowControllerToStyles(boxShadow);
    }

    console.log(styles)
    return styles;
  }

  function altrpSectionHover() {
    let styles = '';

    let backgroundColor, flexWrap, verticalAlign, gorizontalAlign, flexDirection, minHeight, overflow, borderStyle, borderWidth, borderColor, borderRadius, boxShadow;

    //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundColor = getResponsiveSetting(settings, 'section_style_background_color', ':hover');
    }

    if (backgroundColor) {
      styles += colorPropertyStyled(backgroundColor, 'background');
    }

    //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      flexWrap = getResponsiveSetting(settings, 'layout_flex_wrap_content', ':hover');
    }

    if (flexWrap) {
      styles += simplePropertyStyled(flexWrap, 'flex-wrap', '!important');
    }

    //Получаем значения vertical-align из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      verticalAlign = getResponsiveSetting(settings, 'layout_column_position', ':hover');
    }

    if (verticalAlign) {
      styles += simplePropertyStyled(verticalAlign, 'align-content');
      styles += simplePropertyStyled(verticalAlign, 'align-items');
    }

    //Получаем значения gorizontal-align из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      gorizontalAlign = getResponsiveSetting(settings, 'layout_justify_content', ':hover');
    }

    if (gorizontalAlign) {
      styles += simplePropertyStyled(gorizontalAlign, 'justify-content');
    }

    //Получаем значения flex-direction из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      flexDirection = getResponsiveSetting(settings, 'layout_column_direction', ':hover');
    }

    if (flexDirection) {
      styles += simplePropertyStyled(flexDirection, 'flex-direction');
    }

    //Получаем значения min-height из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      minHeight = getResponsiveSetting(settings, 'label_style_min_height', ':hover');
    }

    if (minHeight) {
      styles += sizeStyled(minHeight, 'min-height');
    }

    //Получаем значения overflow из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      overflow = getResponsiveSetting(settings, 'layout_overflow', ':hover');
    }

    if (overflow) {
      styles += simplePropertyStyled(overflow, 'overflow');
    }

    //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderStyle = getResponsiveSetting(settings, 'section_style_border_type', ':hover');
    }

    if (borderStyle) {
      styles += simplePropertyStyled(borderStyle, 'border-style');
    }

    //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderWidth = getResponsiveSetting(settings, 'section_style_border_width', ':hover');
    }

    if (borderWidth) {
      styles += borderWidthStyled(borderWidth);
    }

    //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderColor = getResponsiveSetting(settings, 'section_style_border_color', ':hover');
    }

    if (borderColor) {
      styles += colorPropertyStyled(borderColor, 'border-color');
    }

    //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      borderRadius = getResponsiveSetting(settings, 'section_style_border_radius', ':hover');
    }

    if (borderRadius) {
      styles += sizeStyled(borderRadius, 'border-radius');
    }

    //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      boxShadow = getResponsiveSetting(settings, 'section_style_box_shadow', ':hover');
    }

    if (boxShadow) {
      styles += shadowControllerToStyles(boxShadow);
    }

    return styles;
  }

  function altrpSectionColumn() {
    let styles = '';

    let padding;

    //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      padding = getResponsiveSetting(settings, 'layout_columns_gap');
    }

    if (padding && padding !== 'none') {
      styles += `padding: ${padding}px; `;
    }

    return styles;
  }

  function altrpSectionColumnHover() {
    let styles = '';

    let padding;

    //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      padding = getResponsiveSetting(settings, 'layout_columns_gap', ':hover');
    }

    if (padding && padding !== 'none') {
      styles += `padding: ${padding}px; `;
    }

    return styles;
  }

  function altrpSectionSecond() {
    let styles = '';

    let gradient, positionTop, positionRight, positionLeft, positionBottom, zIndex;

    //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      gradient = getResponsiveSetting(settings, 'gradient');
    }

    if (gradient) {
      styles += gradientStyled(gradient);
    }

    //Получаем значения position-top из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionTop = getResponsiveSetting(settings, 'position_top');
    }

    if (positionTop) {
      styles += simplePropertyStyled(positionTop, 'top');
    }

    //Получаем значения position-right из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionRight = getResponsiveSetting(settings, 'position_right');
    }

    if (positionRight) {
      styles += simplePropertyStyled(positionRight, 'right');
    }

    //Получаем значения position-left из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionLeft = getResponsiveSetting(settings, 'position_left');
    }

    if (positionLeft) {
      styles += simplePropertyStyled(positionLeft, 'left');
    }

    //Получаем значения position-bottom из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionBottom = getResponsiveSetting(settings, 'position_bottom');
    }

    if (positionBottom) {
      styles += simplePropertyStyled(positionBottom, 'bottom');
    }

    //Получаем значения z-index из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      zIndex = getResponsiveSetting(settings, 'position_style_z_index');
    }

    if (zIndex) {
      styles += simplePropertyStyled(zIndex, 'z-index');
    }

    return styles;
  }

  function altrpSectionSecondHover() {
    let styles = '';

    let gradient, positionTop, positionRight, positionLeft, positionBottom;

    //Получаем значения gradient из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      gradient = getResponsiveSetting(settings, 'gradient', ':hover');
    }

    if (gradient) {
      styles += gradientStyled(gradient);
    }

    //Получаем значения position-top из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionTop = getResponsiveSetting(settings, 'position_top', ':hover');
    }

    if (positionTop) {
      styles += simplePropertyStyled(positionTop, 'top');
    }

    //Получаем значения position-right из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionRight = getResponsiveSetting(settings, 'position_right', ':hover');
    }

    if (positionRight) {
      styles += simplePropertyStyled(positionRight, 'right');
    }

    //Получаем значения position-left из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionLeft = getResponsiveSetting(settings, 'position_left', ':hover');
    }

    if (positionLeft) {
      styles += simplePropertyStyled(positionLeft, 'left');
    }

    //Получаем значения position-bottom из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      positionBottom = getResponsiveSetting(settings, 'position_bottom', ':hover');
    }

    if (positionBottom) {
      styles += simplePropertyStyled(positionBottom, 'bottom');
    }

    return styles;
  }

  function altrpBackgroundImage() {
    let styles = '';

    let backgroundSize, backgroundRepeat, backgroundSizeInUnit, backgroundAttachment, backgroundPosition, backgroundImage;

    //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundSize = getResponsiveSetting(settings, 'background_size');
    }

    if (backgroundSize) {
      styles += simplePropertyStyled(backgroundSize, 'background-size');
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
      backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width');
    }

    if (backgroundSizeInUnit) {
      styles += sizeStyled(backgroundSizeInUnit, 'background-size');
    }

    //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundAttachment = getResponsiveSetting(settings, 'background_attachment');
    }

    if (backgroundAttachment) {
      styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
    }

    //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundPosition = getResponsiveSetting(settings, 'background_position');
    }

    if (backgroundPosition) {
      styles += simplePropertyStyled(backgroundPosition, 'background-position');
    }

    //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundImage = getResponsiveSetting(settings, 'background_image');
    }

    if (backgroundImage) {
      styles += backgroundImageControllerToStyles(backgroundImage);
    }

    return styles;
  }

  function altrpBackgroundImageHover() {
    let styles = '';

    let backgroundSize, backgroundRepeat, backgroundSizeInUnit, backgroundAttachment, backgroundPosition, backgroundImage;

    //Получаем значения background-size из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundSize = getResponsiveSetting(settings, 'background_size', ':hover');
    }

    if (backgroundSize) {
      styles += simplePropertyStyled(backgroundSize, 'background-size');
    }

    //Получаем значения background-repeat из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', ':hover');
    }

    if (backgroundRepeat) {
      styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
    }

    //Получаем значения background-size в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', ':hover');
    }

    if (backgroundSizeInUnit) {
      styles += sizeStyled(backgroundSizeInUnit, 'background-size');
    }

    //Получаем значения background-attachment из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', ':hover');
    }

    if (backgroundAttachment) {
      styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
    }

    //Получаем значения background-position из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundPosition = getResponsiveSetting(settings, 'background_position', ':hover');
    }

    if (backgroundPosition) {
      styles += simplePropertyStyled(backgroundPosition, 'background-position');
    }

    //Получаем значения background-image из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      backgroundImage = getResponsiveSetting(settings, 'background_image', ':hover');
    }

    if (backgroundImage) {
      styles += backgroundImageControllerToStyles(backgroundImage);
    }

    return styles;
  }

  function altrpSectionBoxed() {
    let styles = '';

    let width;

    //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      width = getResponsiveSetting(settings, 'layout_content_width');
    }

    if (width) {
      width = sliderStyled(width);
      styles += `width: ${width} !important`;
    }

    return styles;
  }

  function altrpSectionBoxedHover() {
    let styles = '';

    return styles;
  }

  function altrpSectionSectionBoxed() {
    let styles = '';

    let padding;

    //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      padding = getResponsiveSetting(settings, 'layout_content_width');
    }

    if (padding) {
      styles += `padding-left: calc((100vw - ${padding.size + padding.unit}) / 2); padding-right: calc((100vw - ${padding.size + padding.unit}) / 2); width: 100vw; `;
    }

    return styles;
  }

  function altrpSectionSectionBoxedHover() {
    let styles = '';

    let padding;

    //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      padding = getResponsiveSetting(settings, 'layout_content_width', ':hover');
    }

    if (padding) {
      styles += `padding-left: calc((100vw - ${padding.size + padding.unit}) / 2); padding-right: calc((100vw - ${padding.size + padding.unit}) / 2); width: 100vw; `;
    }

    return styles;
  }

  function altrpSectionFull() {
    let styles = '';

    let margin;

    //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      margin = getResponsiveSetting(settings, 'position_style_position_margin');
    }

    if (margin) {
      styles += dimensionsControllerToStyles(margin, 'margin');
    }

    return styles;
  }

  function altrpSectionFullHover() {
    let styles = '';

    let margin;

    //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

    if (settings !== undefined) {
      margin = getResponsiveSetting(settings, 'position_style_position_margin', ':hover');
    }

    if (margin) {
      styles += dimensionsControllerToStyles(margin, 'margin');
    }

    return styles;
  }

  return `

  & .altrp-section,
  & .altrp-section-full-fill {
    ${altrpSection()}
  } 

  & .altrp-section:hover,
  & .altrp-section-full-fill:hover {
    ${altrpSectionHover()}
  } 

  & .altrp-section .altrp-column {
    ${altrpSectionColumn()}
  }

  & .altrp-section:hover .altrp-column:hover {
    ${altrpSectionColumnHover()}
  }

  & .altrp-section {
    ${altrpSectionSecond()}
  }

  & .altrp-section:hover {
    ${altrpSectionSecondHover()}
  }

  & .altrp-section.altrp-background-image {
    ${altrpBackgroundImage()}
  }

  & .altrp-section.altrp-background-image:hover {
    ${altrpBackgroundImageHover()}
  }

  &.altrp-section_boxed,
  &.altrp-section_section_boxed {
    ${altrpSectionBoxed()}
  }

  &.altrp-section_boxed:hover,
  &.altrp-section_section_boxed:hover {
    ${altrpSectionBoxedHover()}
  }

  & .altrp-section_section-boxed {
    ${altrpSectionSectionBoxed()}
  }

  & .altrp-section_section-boxed:hover {
    ${altrpSectionSectionBoxedHover()}
  }

  &,
  & .altrp-section-full-fill {
    ${altrpSectionFull()}
  }

  &:hover,
  & .altrp-section-full-fill:hover {
    ${altrpSectionFullHover()}
  }

`
}
