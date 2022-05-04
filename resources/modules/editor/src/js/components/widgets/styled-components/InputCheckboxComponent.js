import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  shadowControllerToStyles,
  sizeStyled, sliderStyled, defaultStyled, colorStyled
} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * Стили для класса .altrp-input-wrapper
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const inputWrapperStyle = settings => {
  let styles = `&& .altrp-input-wrapper {`;
  let width;
  //width begin
  settings && (width = getResponsiveSetting(settings, "field_width"));
  width && (styles += sizeStyled(width, "width"));
  //width end
  styles += "}";
  return styles;
};

/**
 * Стили для класса altrp-field-container
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const containerStyle = settings => {
  let styles = `&& .altrp-field-container {`;
  let margin;

  //margin begin
  settings && (margin = getResponsiveSetting(settings, "position_margin"));
  margin && (styles += dimensionsControllerToStyles(margin, "margin"));
  //margin end

  styles += "}";
  return styles;
};

/**
 * Стили для класса altrp-field
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldStyle = settings => {
  const {
    placeholder_and_value_alignment_position_section,
    position_z_index,
    input_position,
    textarea_resize,
    justify_options,
    image_select_item_width,
    image_select_item_height,
    image_select_image_fit,
    image_select_image_position,
    cross_size
  } = settings;

  let styles = `&& .altrp-field, && .altrp-field-checkbox .bp3-control-indicator {`;
  let padding,
    color,
    typographic,
    backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow,
    size
  ;

  settings && (size = getResponsiveSetting(settings, "field_size"));
  size && (styles += `height:${sliderStyled(size)};width:${sliderStyled(size)};`);

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  // settings &&
  // (typographic = getResponsiveSetting(settings, "field_font_typographic"));
  // typographic && (styles += typographicControllerToStyles(typographic));

  settings && (padding = getResponsiveSetting(settings, "position_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  // settings && (color = getResponsiveSetting(settings, "field_font_color"));
  // color && (styles += colorPropertyStyled(color, "color"));

  settings && (borderType = getResponsiveSetting(settings, "border_type"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "border_radius"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";

  //checkbox .state-disabled

  settings && (size = getResponsiveSetting(settings, "field_size", ".state-disabled"));
  size && (styles += `height:${sliderStyled(size)};width:${sliderStyled(size)};`);

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow", ".state-disabled"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (padding = getResponsiveSetting(settings, "position_padding", ".state-disabled"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (borderType = getResponsiveSetting(settings, "border_type", ".state-disabled"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color", ".state-disabled"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width", ".state-disabled"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "border_radius", ".state-disabled"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color", ".state-disabled"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";
  // end of state disabled setting

  //checkbox .active

  settings && (size = getResponsiveSetting(settings, "field_size", ".active"));
  size && (styles += `height:${sliderStyled(size)};width:${sliderStyled(size)};`);

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow", ".active"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (padding = getResponsiveSetting(settings, "position_padding", ".active"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (borderType = getResponsiveSetting(settings, "border_type", ".active"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color", ".active"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width", ".active"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "border_radius", ".active"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color", ".active"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";
  // end of state active setting

  styles += `&& .altrp-field, && .altrp-field-checkbox .bp3-control-indicator:before {`;


  // settings &&
  // (typographic = getResponsiveSetting(settings, "field_font_typographic"));
  // typographic && (styles += typographicControllerToStyles(typographic));

  size && (styles += `height:${sliderStyled(size)};width:${sliderStyled(size)};`);

  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  // settings && (color = getResponsiveSetting(settings, "field_font_color"));
  // color && (styles += colorPropertyStyled(color, "color"));

  // settings &&
  // (borderRadius = getResponsiveSetting(
  //   settings,
  //   "global_filter_input_border_radius"
  // ));
  // borderRadius &&
  // (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  styles += "}";

  styles += `&& .altrp-field-radio-group {`;

  let fieldAlignment;

  settings && (fieldAlignment = getResponsiveSetting(settings, "field_alignment"));
  fieldAlignment && (styles += `justify-content: ${defaultStyled(fieldAlignment)};`);

  styles += "}";

  styles += "&& .altrp-field-option:hover span.bp3-control-indicator.bp3-control-indicator {";

  let backgroundColorHover;

  settings && (backgroundColorHover = getResponsiveSetting(settings, "background_style_background_color", ":hover"));

  backgroundColorHover && (styles += colorStyled(backgroundColorHover, "background-color"));

  let boxShadowHover;

  settings && (boxShadowHover = getResponsiveSetting(settings, "box_shadow", ":hover"));
  boxShadowHover && (styles += shadowControllerToStyles(boxShadowHover));

  styles += "}";

  styles += "&& .altrp-field-option label.altrp-field-option__label {";

  let fontTypographic;

  settings &&
  (fontTypographic = getResponsiveSetting(settings, "field_font_typographic"));
  fontTypographic && (styles += typographicControllerToStyles(fontTypographic));

  let fontColor;

  settings && (fontColor = getResponsiveSetting(settings, "field_font_color"));
  fontColor && (styles += colorPropertyStyled(fontColor, "color"));

  styles += "}";

  styles += "&& .altrp-field-option:hover label.altrp-field-option__label {";

  let fontTypographicHover;

  settings &&
  (fontTypographicHover = getResponsiveSetting(settings, "field_font_typographic", ":hover"));
  fontTypographicHover && (styles += typographicControllerToStyles(fontTypographicHover));

  let fontColorHover;

  settings && (fontColorHover = getResponsiveSetting(settings, "field_font_color", ":hover"));
  fontColorHover && (styles += colorPropertyStyled(fontColorHover, "color"));

  styles += "}";

  styles += "&& .altrp-field-option.active label.altrp-field-option__label {";

  let fontTypographicActive;

  settings &&
  (fontTypographicActive = getResponsiveSetting(settings, "field_font_typographic", ".active"));
  fontTypographicActive && (styles += typographicControllerToStyles(fontTypographicActive));

  let fontColorActive;

  settings && (fontColorActive = getResponsiveSetting(settings, "field_font_color", ".active"));
  fontColorActive && (styles += colorPropertyStyled(fontColorActive, "color"));

  styles += "}";

  styles += "&& .altrp-field-option.active span.bp3-control-indicator.bp3-control-indicator   {";

  let backgroundColorActive;

  settings && (backgroundColorActive = getResponsiveSetting(settings, "background_style_background_color", ".active"));

  backgroundColorActive && (styles += colorStyled(backgroundColorActive, "background-color"));

  let boxShadowActive;

  settings && (boxShadowActive = getResponsiveSetting(settings, "box_shadow", ".active"));
  boxShadowActive && (styles += shadowControllerToStyles(boxShadowActive));

  styles += "}";


  styles += "&& .altrp-image-select{";

  justify_options && (styles += `justify-content:${justify_options};`);

  styles += "}";

  styles += "&& .altrp-image-select>.altrp-field{";

  image_select_item_width &&
  (styles += `width:${image_select_item_width.size}${image_select_item_width.unit};`);

  image_select_item_height &&
  (styles += `height:${image_select_item_height.size}${image_select_item_height.unit};`);

  styles += "}";

  styles += "&& .altrp-image-select img{";
  image_select_image_fit && (styles += `object-fit:${image_select_image_fit};`);
  image_select_image_position &&
  (styles += `object-position:${image_select_image_position};`);
  styles += "}";

  styles += "&& .input-clear-btn{";

  settings && (color = getResponsiveSetting(settings, "cross_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  //TODO не нашел как активировать эту штуку
  //cross_size && (styles += `font-size:${cross_size.size}${cross_size.unit};`);
  styles += "}";

  styles += "}";

  return styles;
};

/**
 * Стили для класса altrp-field-option:hover
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldStyleHover = settings => {
  let styles = `&& .altrp-field, && .altrp-field-option:hover .altrp-field-checkbox .bp3-control-indicator {`;
  let backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow
  ;

  const {
    placeholder_and_value_alignment_position_section,
    position_z_index,
    textarea_resize,
  } = settings;

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow", ":hover"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (borderType = getResponsiveSetting(settings, "border_type", ":hover"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color", ":hover"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width", ":hover"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "border_radius",
    ":hover"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color",
    ":hover"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";

  return styles
};

const fieldStyleActive = settings => {
  let styles = `&& .altrp-field, && .altrp-field-option.active .altrp-field-checkbox .bp3-control-indicator {`;
  let backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow
  ;

  const {
    placeholder_and_value_alignment_position_section,
    position_z_index,
    textarea_resize,
  } = settings;

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow", ".active"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (borderType = getResponsiveSetting(settings, "border_type", ".active"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color", ".active"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width", ".active"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "border_radius",
    ".active"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color",
    ".active"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";

  return styles
};

/**
 * Стили для класса altrp-field:hover
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldStyleFocus = settings => {
  let styles = `&& .altrp-field:focus, && .bp3-input:focus {`;
  let padding,
    color,
    typographic,
    backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    borderRadius,
    boxShadow;

  const {
  } = settings;

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow", ":focus"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (color = getResponsiveSetting(settings, "field_font_color", ":focus"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings && (borderType = getResponsiveSetting(settings, "border_type", ":focus"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color", ":focus"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width", ":focus"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "global_filter_input_border_radius",
    ":focus"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color",
    ":focus"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  styles += "&& .input-clear-btn{";

  settings && (color = getResponsiveSetting(settings, "cross_color", ":focus"));
  color && (styles += colorPropertyStyled(color, "color"));

  //TODO не нашел как активировать эту штуку
  //cross_size && (styles += `font-size:${cross_size.size}${cross_size.unit};`);
  styles += "}";
  styles += "}";

  return styles;
};


/**
 * Стили для класса altrp-image-select__label
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const imageSelectLabel = settings => {
  let styles = `&& .altrp-image-select__label {`;
  let color, typographic;

  const { placeholder_and_value_alignment_position_section } = settings;

  settings &&
  (typographic = getResponsiveSetting(settings, "field_font_typographic"));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  placeholder_and_value_alignment_position_section &&
  (styles += `text-align:${placeholder_and_value_alignment_position_section}`);

  styles += "}";
  return styles;
};
/**
 * Стили для класса altrp-field-select2__single-value
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldSelect2SingleValueStyle = settings => {
  let styles = `&& .altrp-field-select2__single-value {`;
  let typographic, color;

  settings &&
  (typographic = getResponsiveSetting(settings, "field_font_typographic"));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  styles += "}";
  return styles;
};
/**
 * Стили для класса altrp-field-label-container
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldLabelContainerStyle = settings => {
  let styles = `&& .altrp-field-label-container {`;
  let backgroundColor, padding, width;
  const {
    label_position_top,
    label_position_left,
    label_icon_position
  } = settings;

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "label_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings && (padding = getResponsiveSetting(settings, "label_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (width = getResponsiveSetting(settings, "label_width"));
  width && (styles += `${sizeStyled(width, "width")};flex-shrink: 0;`);

  label_position_top && (styles += `top:${label_position_top};`);
  label_position_left && (styles += `left:${label_position_left};`);
  label_icon_position && (styles += `flex-direction:${label_icon_position};`);

  styles += "}";

  styles += `&& .altrp-field-container:hover .altrp-field-label-container {`

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "label_background_color",
      ':hover'
    ));
  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));
  styles += '}'

  return styles;
};
/**
 * Стили для класса altrp-field-label
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldLabel = settings => {
  let styles = `.altrp-field-label {`;
  let color, typographic;

  settings &&
  (color = getResponsiveSetting(settings, "label_style_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
  (typographic = getResponsiveSetting(
    settings,
    "label_style_font_typographic"
  ));
  typographic && (styles += typographicControllerToStyles(typographic));

  styles += "}";

  return styles;
};
/**
 * Стили для класса altrp-label-icon
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const labelIconStyle = settings => {
  let styles = `&& .altrp-label-icon {`;
  let padding, backgroundColor, iconSize;

  settings && (padding = getResponsiveSetting(settings, "icon_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (iconSize = getResponsiveSetting(settings, "icon_size"));
  iconSize &&
  (styles += `width:${iconSize.size}${iconSize.unit};height:${iconSize.size}${iconSize.unit};`);

  styles += "}";
  //for path
  styles += `&& .altrp-label-icon path{`;

  settings && (backgroundColor = getResponsiveSetting(settings, "icon_color"));
  backgroundColor && (styles += colorPropertyStyled(backgroundColor, "fill"));

  styles += "}";
  //for svg
  styles += `&& .altrp-label-icon svg{`;

  settings &&
  (backgroundColor = getResponsiveSetting(settings, "icon_color_background"));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background"));
  iconSize &&
  (styles += `width:${iconSize.size}${iconSize.unit};height:${iconSize.size}${iconSize.unit};`);

  styles += "}";
  //for img
  styles += `&& .altrp-label-icon img{`;

  iconSize &&
  (styles += `width:${iconSize.size}${iconSize.unit};height:${iconSize.size}${iconSize.unit};`);

  styles += "}";
  return styles;
};
/**
 * Стили для классов
 * altrp-field::placeholder
 * altrp-field-select2__placeholder
 * altrp-field-file__placeholder
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const placeholderStyle = settings => {
  let styles = `&& .altrp-field, && .bp3-input::placeholder{`;
  let color,
    typographic,
    backgroundColor,
    borderType,
    borderColor,
    borderWidth,
    borderRadius,
    boxShadow;

  settings &&
  (typographic = getResponsiveSetting(
    settings,
    "placeholder_style_font_typographic"
  ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings &&
  (color = getResponsiveSetting(settings, "placeholder_style_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  styles += "}";

  styles += `&& .altrp-field-select2__placeholder{`;

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings &&
  (color = getResponsiveSetting(settings, "placeholder_style_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  styles += "}";

  styles += `&& .altrp-field-file__placeholder{`;

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (borderType = getResponsiveSetting(settings, "border_type"));
  borderType &&
  (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
  (borderRadius = getResponsiveSetting(
    settings,
    "global_filter_input_border_radius"
  ));
  borderRadius &&
  (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "background_style_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings &&
  (typographic = getResponsiveSetting(
    settings,
    "placeholder_style_font_typographic"
  ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings &&
  (color = getResponsiveSetting(settings, "placeholder_style_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  styles += "}";
  return styles;
};
/**
 * Стили для класса altrp-field-label--required::after
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldLabelRequired = settings => {
  let styles = `&& .altrp-field-label--required::after{`;
  let color, typographic;

  settings &&
  (color = getResponsiveSetting(settings, "required_style_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
  (typographic = getResponsiveSetting(
    settings,
    "required_style_font_typographic"
  ));
  typographic && (styles += typographicControllerToStyles(typographic));

  styles += "}";
  return styles;
};
/**
 * Стили для класса altrp-field-select2__option
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldSelect2Option = (settings, id) => {
  let styles = `.${id}.altrp-field-select2__option{`;
  let backgroundColor;

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "option_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(
    backgroundColor,
    "background-color",
    "!important"
  ));

  styles += "}";

  styles += `.${id}.altrp-field-select2__option.altrp-field-select2__option--is-focused{`;

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "option_focused_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(
    backgroundColor,
    "background-color",
    "!important"
  ));

  styles += "}";

  styles += `.${id}.altrp-field-select2__option.altrp-field-select2__option--is-selected{`;

  settings &&
  (backgroundColor = getResponsiveSetting(
    settings,
    "option_selected_background_color"
  ));
  backgroundColor &&
  (styles += colorPropertyStyled(
    backgroundColor,
    "background-color",
    "!important"
  ));

  styles += "}";
  return styles;
};
/**
 * Стили для класса mask-mismatch-message
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const maskMismatchMessage = (settings, id) => {
  let styles = `&& .mask-mismatch-message{`;
  let margin, padding, color, typographic;

  settings &&
  (margin = getResponsiveSetting(settings, "mismatch_message_margin"));
  margin && (styles += dimensionsControllerToStyles(margin, "margin"));

  settings &&
  (padding = getResponsiveSetting(settings, "mismatch_message_padding"));
  padding && (styles += dimensionsControllerToStyles(margin, "padding"));

  settings &&
  (color = getResponsiveSetting(settings, "mismatch_message_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
  (typographic = getResponsiveSetting(
    settings,
    "mismatch_message_typographic"
  ));
  typographic && (styles += typographicControllerToStyles(typographic));

  styles += "}";
  return styles;
};
//Точка входа
function InputCheckboxComponent(settings, id) {
  const parentClass = `.altrp-element${id}`;

  let styles = ''

  styles += `.altrp-field-option {`;
  if (settings.input_position) {
    styles += `flex-direction:${settings.input_position};`
  }
  styles += "}";

  styles += `${parentClass} {`;
  const { background_section_opacity } = settings;
  //for all element
  background_section_opacity &&
  (styles += `opacity:${background_section_opacity.size};`);
  //altrp-input-wrapper
  const inputWrapperStyles = inputWrapperStyle(settings);
  inputWrapperStyles && (styles += inputWrapperStyles);
  //altrp-field-container
  const containerStyles = containerStyle(settings);
  containerStyles && (styles += containerStyles);
  //altrp-field
  const fieldStyles = fieldStyle(settings);
  fieldStyles && (styles += fieldStyles);
  //altrp-field:hover
  const fieldStylesHover = fieldStyleHover(settings);
  fieldStylesHover && (styles += fieldStylesHover);
  //altrp-field.active
  const fieldStylesActive = fieldStyleActive(settings);
  fieldStylesActive && (styles += fieldStylesActive);
  //altrp-field:focus
  const fieldStylesFocus = fieldStyleFocus(settings);
  fieldStylesFocus && (styles += fieldStylesFocus);
  //altrp-image-select__label
  const imageSelectLabelStyles = imageSelectLabel(settings);
  imageSelectLabelStyles && (styles += imageSelectLabelStyles);
  //altrp-field-select2__single-value
  const fieldSelect2SingleValueStyles = fieldSelect2SingleValueStyle(settings);
  fieldSelect2SingleValueStyles && (styles += fieldSelect2SingleValueStyles);
  //altrp-field-select2__single-value
  const fieldLabelContainerStyles = fieldLabelContainerStyle(settings);
  fieldLabelContainerStyles && (styles += fieldLabelContainerStyles);
  //altrp-field-label
  const fieldLabelStyles = fieldLabel(settings);
  fieldLabelStyles && (styles += fieldLabelStyles);
  //altrp-label-icon
  const labelIconStyles = labelIconStyle(settings);
  labelIconStyles && (styles += labelIconStyles);
  //altrp-field::placeholder altrp-field-select2__placeholder altrp-field-file__placeholder
  const placeholderStyles = placeholderStyle(settings);
  placeholderStyles && (styles += placeholderStyles);
  //altrp-field-label--required::after
  const fieldLabelRequiredStyles = fieldLabelRequired(settings);
  fieldLabelRequiredStyles && (styles += fieldLabelRequiredStyles);
  //mask-mismatch-message
  const maskMismatchMessageStyles = maskMismatchMessage(settings);
  maskMismatchMessageStyles && (styles += maskMismatchMessageStyles);
  //finish

  styles += '}'
  return styles;
}
export default InputCheckboxComponent
