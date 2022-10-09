import getResponsiveSetting from "../../../../../../front-app/src/js/functions/getResponsiveSetting"
import {
  simplePropertyStyled,
  borderWidthStyled,
  dimensionsStyled,
  colorPropertyStyled,
  dimensionsControllerToStyles,
  sizeStyled,
  shadowControllerToStyles,
  gradientStyled,
  backgroundImageControllerToStyles, sliderStyled, styledString, filtersControllerToStyles,
} from "../../../../../../front-app/src/js/helpers/styles";

function borderGradientFunc(settings, state = '') {
  let styles = '';
  let borderGradient, backgroundColor, gradient;

  if (settings !== undefined) {
    borderGradient = getResponsiveSetting(settings, 'section_style_border_gradient_custom', state);
  }

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'section_style_background_color', state);
  }

  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient', state);
  }

  if (borderGradient) {
    let bg = backgroundColor?.color ? backgroundColor.color : 'rgba(255,255,255,1)'
    let textareaText = getResponsiveSetting(settings, 'section_style_gradient_text', state)?.replace(/;/g, '') || ''
    styles += `background: ${gradient?.isWithGradient ? gradient.value.replace(/;/g, '') : `linear-gradient(${bg},${bg})`} padding-box, ${textareaText} border-box; border-color: transparent;`;
  }

  return styles
}

function altrpSection(settings) {
  let styles = '';

  let flexWrap, verticalAlign, gorizontalAlign, flexDirection, minHeight, overflow, borderStyle, borderWidth, borderColor, borderRadius, boxShadow, borderGradient, backdropBlur;

  //Получаем значения borderGradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderGradient = getResponsiveSetting(settings, 'section_style_border_gradient_custom');
  }

  //Получаем значения flex-wrap из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    flexWrap = getResponsiveSetting(settings, 'layout_flex_wrap_content');
  }
  if (flexWrap) {
    styles += simplePropertyStyled(flexWrap, 'flex-wrap');
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

  if (borderColor && !borderGradient) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'section_style_border_radius');
  }


  if (borderRadius) {
    styles += '& > .background_section {'
    styles += dimensionsStyled(borderRadius, "border-radius");
    styles += '}'
  }

  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'section_style_box_shadow');
  }

  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }

  if (settings !== undefined) {
    backdropBlur = getResponsiveSetting(settings, 'backdrop_blur');
  }

  if (backdropBlur) {
    styles += `backdrop-filter: blur(${sliderStyled(backdropBlur)});`;
  }

  return styles;
}

function altrpSectionHover(settings,state=':hover') {
  let styles = '';

  let borderStyle, borderWidth, borderColor, boxShadow, borderRadius, borderGradient;

  //Получаем значения borderGradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderGradient = getResponsiveSetting(settings, 'section_style_border_gradient_custom', state);
  }

  //Получаем значения border-style из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderStyle = getResponsiveSetting(settings, 'section_style_border_type', state);
  }

  if (borderStyle) {
    styles += simplePropertyStyled(borderStyle, 'border-style');
  }

  //Получаем значения border-width из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderWidth = getResponsiveSetting(settings, 'section_style_border_width', state);
  }

  if (borderWidth) {
    styles += borderWidthStyled(borderWidth);
  }

  //Получаем значения border-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderColor = getResponsiveSetting(settings, 'section_style_border_color', state);
  }

  if (borderColor && !borderGradient) {
    styles += colorPropertyStyled(borderColor, 'border-color');
  }

  //Получаем значения border-radius из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderRadius = getResponsiveSetting(settings, 'section_style_border_radius', state);
  }


  if (borderRadius) {
    styles += '& > .background_section {'
    styles += dimensionsStyled(borderRadius, "border-radius");
    styles += '}'
  }


  //Получаем значения box-shadow из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    boxShadow = getResponsiveSetting(settings, 'section_style_box_shadow', state);
  }

  if (boxShadow) {
    styles += shadowControllerToStyles(boxShadow);
  }

  return styles;
}

function sectionBackground(settings) {
  let styles = '';
  let backgroundColor,
      backgroundImage,
      backgroundSize,
      backgroundRepeat,
      backgroundSizeInUnit, backgroundAttachment, backgroundPosition, gradient, borderGradient;

  //Получаем значения borderGradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderGradient = getResponsiveSetting(settings, 'section_style_border_gradient_custom');
  }

  //Получаем значения background-color из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'section_style_background_color');
  }

  if (backgroundColor && !borderGradient) {
    styles += colorPropertyStyled(backgroundColor, 'background');
  }

  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, 'background_image');
  }

  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }

  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, 'background_size');
  }

  if (backgroundSize !== "") {
    styles += simplePropertyStyled(backgroundSize, 'background-size');
  } else {
    styles += '';
  }

  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, 'background_repeat');
  }

  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
  }

  if (settings !== undefined) {
    backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width');
  }

  if (backgroundSizeInUnit &&  backgroundSize === "") {
    styles += sizeStyled(backgroundSizeInUnit, 'background-size');
  } else {
    styles += '';
  }

  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(settings, 'background_attachment');
  }

  if (backgroundAttachment) {
    styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
  }

  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, 'background_position');
  }

  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, 'background-position');
  }

  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient');
  }

  if (gradient && !borderGradient) {
    styles += gradientStyled(gradient);
  }

  return styles;
}

function sectionBackgroundHover(settings, state=':hover') {
  let styles = '';
  let backgroundColor, backgroundImage, backgroundSize, backgroundRepeat, backgroundSizeInUnit, backgroundAttachment, backgroundPosition, gradient, borderGradient;

  //Получаем значения borderGradient из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    borderGradient = getResponsiveSetting(settings, 'section_style_border_gradient_custom', state);
  }

  if (settings !== undefined) {
    backgroundColor = getResponsiveSetting(settings, 'section_style_background_color', state);
  }

  if (backgroundColor && !borderGradient) {
    styles += colorPropertyStyled(backgroundColor, 'background');
  }

  if (settings !== undefined) {
    backgroundImage = getResponsiveSetting(settings, 'background_image', state);
  }

  if (backgroundImage) {
    styles += backgroundImageControllerToStyles(backgroundImage);
  }

  if (settings !== undefined) {
    backgroundSize = getResponsiveSetting(settings, 'background_size', state);
  }

  if (backgroundSize) {
    styles += simplePropertyStyled(backgroundSize, 'background-size');
  }

  if (settings !== undefined) {
    backgroundRepeat = getResponsiveSetting(settings, 'background_repeat', state);
  }

  if (backgroundRepeat) {
    styles += simplePropertyStyled(backgroundRepeat, 'background-repeat');
  }

  if (settings !== undefined) {
    backgroundSizeInUnit = getResponsiveSetting(settings, 'background_image_width', state);
  }

  if (backgroundSizeInUnit === undefined || backgroundSizeInUnit?.size === '0' || backgroundSizeInUnit?.size === '' ) {
    styles += '';
  } else {
    styles += sizeStyled(backgroundSizeInUnit, 'background-size');
  }

  if (settings !== undefined) {
    backgroundAttachment = getResponsiveSetting(settings, 'background_attachment', state);
  }

  if (backgroundAttachment) {
    styles += simplePropertyStyled(backgroundAttachment, 'background-attachment');
  }

  if (settings !== undefined) {
    backgroundPosition = getResponsiveSetting(settings, 'background_position', state);
  }

  if (backgroundPosition) {
    styles += simplePropertyStyled(backgroundPosition, 'background-position');
  }

  if (settings !== undefined) {
    gradient = getResponsiveSetting(settings, 'gradient', state);
  }

  if (gradient && !borderGradient) {
    styles += gradientStyled(gradient);
  }

  return styles;
}

function altrpSectionColumn(settings) {
  let styles = '';

  let padding;

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'layout_columns_gap_padding');
  }

  if (padding && padding !== 'none') {
    styles += `padding: ${padding}px; `;
  }

  return styles;
}

function altrpSectionColumnGap(settings) {
  let styles = '';

  let margin;

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'layout_columns_gap-margin');
  }

  if (margin && margin !== 'none') {
    styles += dimensionsStyled(margin, 'margin');
  }

  return styles;
}

function altrpSectionColumnsHeight(settings) {
  let styles = '';

  let height;

  if (settings !== undefined) {
    height = getResponsiveSetting(settings, 'layout_columns_height');
  }

  if (Number(height)) {
    styles += `height: ${height}%; `;
  } else if (height !== null) {
    styles += `height: ${height}; `;
  }

  return styles;
}

function altrpSectionVideo(settings) {
  let styles = '';

  let object_fit, filters;

  if (settings !== undefined) {
    object_fit = getResponsiveSetting(settings, 'object_fit_select');
  }

  if (object_fit) {
    styles += simplePropertyStyled(object_fit, 'object-fit');
  }

  if (settings !== undefined) {
    filters = getResponsiveSetting(settings, 'background_video_filter');
  }

  if (filters) {
    styles += filtersControllerToStyles(filters);
  }

  return styles;
}

function altrpSectionFilter(settings) {
  let styles = '';

  let  filters;

  if (settings !== undefined) {
    filters = getResponsiveSetting(settings, 'background_style_filter');
  }

  if (filters) {
    styles += filtersControllerToStyles(filters);
  }

  return styles;
}

function altrpSectionColumnHover(settings) {
  let styles = '';

  let padding;


  return styles;
}

function altrpSectionSecond(settings) {
  let styles = '';

  let positionTop, positionRight, positionLeft, positionBottom, zIndex;

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

function altrpSectionSecondHover(settings) {
  let styles = '';

  let positionTop, positionRight, positionLeft, positionBottom;

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

function altrpSectionBoxed(settings) {
  let styles = '';

  let width;

  //Получаем значения width в точных юнитах из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    width = getResponsiveSetting(settings, 'layout_content_width');
  }

  if (width) {
    styles += sizeStyled(width, "width");
  } else {
    styles += ''
  }

  return styles;
}

function altrpSectionBoxedHover(settings) {
  let styles = '';

  return styles;
}

function altrpSectionSectionBoxed(settings) {
  let styles = '';

  let padding;

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'layout_content_width');
  }
  let width = '100vw';
  if(window?.page_areas?.length > 4){//todo:weak place
    width = '100%';
  }
  if (padding) {
    if(padding.size === undefined || padding.size === '0' || padding.size === '') {
      styles += '';
    } else {
      styles += `padding-left:calc((${width} - ${padding.size + padding.unit}) / 2);padding-right:calc((${width} - ${padding.size + padding.unit}) / 2);width:${width};`
    }
  }

  return styles;
}

function altrpSectionFull(settings) {
  let styles = '';

  let margin, padding;

  //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'position_style_position_margin');
  }

  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'position_style_position_padding');
  }

  if (padding) {
    styles += ` > .altrp-section{${dimensionsControllerToStyles(padding, 'padding')}}`;
  }

  return styles;
}

function altrpSectionFullHover(settings, state=':hover') {
  let styles = '';

  let margin, padding;

  //Получаем значения margin из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    margin = getResponsiveSetting(settings, 'position_style_position_margin', state);
  }

  if (margin) {
    styles += dimensionsControllerToStyles(margin, 'margin');
  }

  //Получаем значения padding из контроллера, обрабатываем и добавляем в styles

  if (settings !== undefined) {
    padding = getResponsiveSetting(settings, 'position_style_position_padding', state);
  }

  if (padding) {
    styles += ` > .altrp-section{${dimensionsControllerToStyles(padding, 'padding')}}`;
  }

  return styles;
}
/**
 * @return {string}
 */

export default function SectionWidgetComponent(settings, childrenLength, elementId) {
  return `

  & > .altrp-section,
  & > .altrp-section-full-fill {
    ${altrpSection(settings)}
    ${borderGradientFunc(settings)}
  }

  & > .altrp-section:hover,
  & > .altrp-section-full-fill:hover {
    ${altrpSectionHover(settings)}
    ${borderGradientFunc(settings, ":hover")}
  }

  & .altrp-section .altrp-background-image${elementId} {
    ${sectionBackground(settings)}
  }

  & .altrp-section .altrp-background-image${elementId} {
    ${altrpSectionFilter(settings)}
  }

  & .altrp-section:hover .altrp-background-image${elementId}:hover{
    ${sectionBackgroundHover(settings)}
  }

  & > .altrp-section .section-video-controllers {
    ${altrpSectionVideo(settings)}
  }

  & > .altrp-section .section-video-controllers {
    ${altrpSectionFilter(settings)}
  }

  & > .altrp-section.active,
  & > .altrp-section-full-fill.active {
    ${altrpSectionHover(settings,'.active')}
     ${borderGradientFunc(settings, ".active")}
    ${(()=>{
      const  styles = [
        ['margin', 'position_style_position_margin', 'dimensions', '.active'],
        ['padding', 'position_style_position_padding', 'dimensions', '.active'],
      ];
      return styledString(styles, settings);
    })()
  }
  }
  & > .altrp-section .altrp-column {
    ${altrpSectionColumn(settings)}
  }

  & > .altrp-section .altrp-element_column {
    ${altrpSectionColumnGap(settings)}
  }

  & > .altrp-section .altrp-element_column {
    ${altrpSectionColumnsHeight(settings)}
  }

  & > .altrp-section:hover .altrp-column:hover {
    ${altrpSectionColumnHover(settings)}
  }

  & > .altrp-section {
    ${altrpSectionSecond(settings)}
  }

  & > .altrp-section:hover {
    ${altrpSectionSecondHover(settings)}
  }

  & > .altrp-section_boxed,
  & > .altrp-section_section_boxed {
    ${altrpSectionBoxed(settings)}
  }

  & > .altrp-section_boxed:hover,
  & > .altrp-section_section_boxed:hover {
    ${altrpSectionBoxedHover(settings)}
  }

  & > .altrp-section_section-boxed.altrp-section_section-boxed.altrp-section_section-boxed{
    ${altrpSectionSectionBoxed(settings)}
  }

  &,
  & > .altrp-section-full-fill {
    ${altrpSectionFull(settings)}
  }

  &:hover,
  & > .altrp-section-full-fill:hover {
    ${altrpSectionFullHover(settings)}
  }
`
}
