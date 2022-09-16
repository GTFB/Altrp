import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles,
  simplePropertyStyled,
  colorPropertyStyled,
  borderWidthStyled,
  shadowControllerToStyles,
  sizeStyled,
} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * Стили для класса .altrp-input-wrapper
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const inputWrapperStyle = (settings) => {
  let styles = `&& .altrp-input-wrapper {`;
  let width, height;
  //width begin
  settings && (width = getResponsiveSetting(settings, "field_width"));
  width && (styles += sizeStyled(width, "width"));
  //width end

  console.log(height);

  styles += "}";
  return styles;
};

/**
 * Стили для класса altrp-field-container
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const containerStyle = (settings) => {
  let styles = `&& .altrp-field-container {`;
  let margin;

  //margin begin
  settings && (margin = getResponsiveSetting(settings, "position_margin"));
  margin && (styles += dimensionsControllerToStyles(margin, "margin"));
  //margin end

  styles += "}";
  return styles;
};

const wysiwygStyle = (settings) => {
  let padding,
    fontColor,
    widthWysiwyg,
    placeholderColor,
    reqColor,
    backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    boxShadow,
    borderRadius,
    height;

  const { placeholder_and_value_alignment_position_section, position_z_index } =
    settings;

  let styles = `&& .ck-content, .ck.ck-editor__editable_inline[dir=ltr], .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners {`;

  settings && (padding = getResponsiveSetting(settings, "position_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (fontColor = getResponsiveSetting(settings, "field_font_color"));
  fontColor && (styles += colorPropertyStyled(fontColor, "color"));

  settings && (widthWysiwyg = getResponsiveSetting(settings, "field_width"));
  widthWysiwyg && (styles += sizeStyled(widthWysiwyg, "width"));

  settings && (height = getResponsiveSetting(settings, "field_height"));
  height && (styles += sizeStyled(height, "height"));

  placeholder_and_value_alignment_position_section &&
    (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);

  settings &&
    (placeholderColor = getResponsiveSetting(
      settings,
      "placeholder_style_font_color"
    ));
  placeholderColor &&
    (styles += colorPropertyStyled(placeholderColor, "color"));

  settings &&
    (reqColor = getResponsiveSetting(settings, "required_style_font_color"));
  reqColor && (styles += colorPropertyStyled(reqColor, "color"));

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "background_style_background_color"
    ));

  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings && (borderType = getResponsiveSetting(settings, "border_type"));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings && (borderColor = getResponsiveSetting(settings, "border_color"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius") ||
      getResponsiveSetting(settings, "global_filter_input_border_radius"));

  borderRadius &&
    (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  //state-disabled
  settings &&
    (padding = getResponsiveSetting(
      settings,
      "position_padding",
      ".state-disabled"
    ));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings &&
    (fontColor = getResponsiveSetting(
      settings,
      "field_font_color",
      ".state-disabled"
    ));
  fontColor && (styles += colorPropertyStyled(fontColor, "color"));

  settings &&
    (widthWysiwyg = getResponsiveSetting(
      settings,
      "field_width",
      ".state-disabled"
    ));
  widthWysiwyg && (styles += sizeStyled(widthWysiwyg, "width"));

  settings &&
    (height = getResponsiveSetting(
      settings,
      "field_height",
      ".state-disabled"
    ));
  height && (styles += sizeStyled(height, "height"));

  settings &&
    (placeholderColor = getResponsiveSetting(
      settings,
      "placeholder_style_font_color",
      ".state-disabled"
    ));
  placeholderColor &&
    (styles += colorPropertyStyled(placeholderColor, "color"));

  settings &&
    (reqColor = getResponsiveSetting(
      settings,
      "required_style_font_color",
      ".state-disabled"
    ));
  reqColor && (styles += colorPropertyStyled(reqColor, "color"));

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "background_style_background_color",
      ".state-disabled"
    ));

  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings &&
    (borderType = getResponsiveSetting(
      settings,
      "border_type",
      ".state-disabled"
    ));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings &&
    (borderWidth = getResponsiveSetting(
      settings,
      "border_width",
      ".state-disabled"
    ));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderColor = getResponsiveSetting(
      settings,
      "border_color",
      ".state-disabled"
    ));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (boxShadow = getResponsiveSetting(
      settings,
      "box_shadow",
      ".state-disabled"
    ));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ".state-disabled") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
        ".state-disabled"
      ));

  borderRadius &&
    (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  //state active

  settings &&
    (padding = getResponsiveSetting(settings, "position_padding", ".active"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings &&
    (fontColor = getResponsiveSetting(settings, "field_font_color", ".active"));
  fontColor && (styles += colorPropertyStyled(fontColor, "color"));

  settings &&
    (widthWysiwyg = getResponsiveSetting(settings, "field_width", ".active"));
  widthWysiwyg && (styles += sizeStyled(widthWysiwyg, "width"));

  settings &&
    (height = getResponsiveSetting(settings, "field_height", ".active"));
  height && (styles += sizeStyled(height, "height"));

  settings &&
    (placeholderColor = getResponsiveSetting(
      settings,
      "placeholder_style_font_color",
      ".active"
    ));
  placeholderColor &&
    (styles += colorPropertyStyled(placeholderColor, "color"));

  settings &&
    (reqColor = getResponsiveSetting(
      settings,
      "required_style_font_color",
      ".active"
    ));
  reqColor && (styles += colorPropertyStyled(reqColor, "color"));

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "background_style_background_color",
      ".active"
    ));

  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings &&
    (borderType = getResponsiveSetting(settings, "border_type", ".active"));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings &&
    (borderWidth = getResponsiveSetting(settings, "border_width", ".active"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderColor = getResponsiveSetting(settings, "border_color", ".active"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (boxShadow = getResponsiveSetting(settings, "box_shadow", ".active"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ".active") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
        ".active"
      ));

  borderRadius &&
    (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  styles += "}";

  styles += `&& .ck-content:hover, .ck.ck-editor__editable_inline[dir=ltr]:hover, .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-rounded-corners:hover {`;

  settings &&
    (padding = getResponsiveSetting(settings, "position_padding", ":hover"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings &&
    (fontColor = getResponsiveSetting(settings, "field_font_color", ":hover"));
  fontColor && (styles += colorPropertyStyled(fontColor, "color"));

  settings &&
    (widthWysiwyg = getResponsiveSetting(settings, "field_width", ":hover"));
  widthWysiwyg && (styles += sizeStyled(widthWysiwyg, "width"));

  settings &&
    (height = getResponsiveSetting(settings, "field_height", ":hover"));
  height && (styles += sizeStyled(height, "height"));

  // hover alignment and hover z-index
  // placeholder_and_value_alignment_position_section &&
  // (styles += `text-align:${placeholder_and_value_alignment_position_section};`)
  //
  // position_z_index && (styles += `z-index:${position_z_index};`)

  settings &&
    (placeholderColor = getResponsiveSetting(
      settings,
      "placeholder_style_font_color",
      ":hover"
    ));
  placeholderColor &&
    (styles += colorPropertyStyled(placeholderColor, "color"));

  settings &&
    (reqColor = getResponsiveSetting(
      settings,
      "required_style_font_color",
      ":hover"
    ));
  reqColor && (styles += colorPropertyStyled(reqColor, "color"));

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "background_style_background_color",
      ":hover"
    ));

  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));

  settings &&
    (borderType = getResponsiveSetting(settings, "border_type", ":hover"));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings &&
    (borderWidth = getResponsiveSetting(settings, "border_width", ":hover"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderColor = getResponsiveSetting(settings, "border_color", ":hover"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (boxShadow = getResponsiveSetting(settings, "box_shadow", ":hover"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ":hover") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
        ":hover"
      ));

  borderRadius &&
    (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  styles += "}";

  return styles;
};

/**
 * Стили для класса altrp-field
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldStyle = (settings) => {
  let styles = `&& .altrp-field {`;
  let padding,
    color,
    typographic,
    backgroundColor,
    borderType,
    borderWidth,
    borderColor,
    borderRadius,
    widthTextArea,
    boxShadow,
    toggle,
    height;

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
    cross_size,
  } = settings;

  settings &&
    (widthTextArea = getResponsiveSetting(settings, "field_width_textarea"));
  widthTextArea && (styles += sizeStyled(widthTextArea, "width"));

  settings && (height = getResponsiveSetting(settings, "field_height"));
  height && (styles += sizeStyled(height, "height"));

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (toggle = getResponsiveSetting(settings, "disable_box_shadow"));
  toggle && (styles += "box-shadow: none;");

  settings &&
    (typographic = getResponsiveSetting(settings, "field_font_typographic"));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings && (padding = getResponsiveSetting(settings, "position_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings && (borderType = getResponsiveSetting(settings, "border_type"));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings && (borderColor = getResponsiveSetting(settings, "border_color"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings && (borderWidth = getResponsiveSetting(settings, "border_width"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius") ||
      getResponsiveSetting(settings, "global_filter_input_border_radius"));

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

  styles += "&& .altrp-field-option{";

  input_position && (styles += `flex-direction:${input_position};`);

  styles += "}";

  styles += "&& .altrp-image-select{";

  justify_options && (styles += `justify-content:${justify_options};`);

  styles += "}";

  styles += "&& .altrp-image-select>.altrp-field{";

  if (image_select_item_width?.size && image_select_item_width?.unit) {
    styles += `width:${image_select_item_width.size}${image_select_item_width.unit};`;
  }

  if (image_select_item_height?.size && image_select_item_height?.unit) {
    styles += `height:${image_select_item_height.size}${image_select_item_height.unit};`;
  }

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

  styles += `&& .altrp-field:hover {`;

  settings &&
    (boxShadow = getResponsiveSetting(settings, "box_shadow", ":hover"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "field_font_typographic",
      ":hover"
    ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (borderColor = getResponsiveSetting(settings, "border_color", ":hover"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (borderWidth = getResponsiveSetting(settings, "border_width", ":hover"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ":hover") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
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

  styles += "}";

  styles += `&& .altrp-field:focus {`;

  settings &&
    (boxShadow = getResponsiveSetting(settings, "box_shadow", ":focus"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "field_font_typographic",
      ":focus"
    ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (borderColor = getResponsiveSetting(settings, "border_color", ":focus"));
  borderColor &&
    (styles += colorPropertyStyled(borderColor, "border-color", "!important"));

  settings &&
    (borderWidth = getResponsiveSetting(settings, "border_width", ":focus"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ":focus") ||
      getResponsiveSetting(
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

  styles += "}";

  styles += `&& .state-disabled {`;

  settings &&
    (widthTextArea = getResponsiveSetting(
      settings,
      "field_width_textarea",
      ".state-disabled"
    ));
  widthTextArea && (styles += sizeStyled(widthTextArea, "width"));

  settings &&
    (boxShadow = getResponsiveSetting(
      settings,
      "box_shadow",
      ".state-disabled"
    ));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (toggle = getResponsiveSetting(
      settings,
      "disable_box_shadow",
      ".state-disabled"
    ));
  toggle && (styles += "box-shadow: none;");

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "field_font_typographic",
      ".state-disabled"
    ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings &&
    (padding = getResponsiveSetting(
      settings,
      "position_padding",
      ".state-disabled"
    ));
  padding &&
    (styles += dimensionsControllerToStyles(
      padding,
      "padding",
      ".state-disabled"
    ));

  settings &&
    (color = getResponsiveSetting(
      settings,
      "field_font_color",
      ".state-disabled"
    ));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (borderType = getResponsiveSetting(
      settings,
      "border_type",
      ".state-disabled"
    ));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings &&
    (borderColor = getResponsiveSetting(
      settings,
      "border_color",
      ".state-disabled"
    ));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (borderWidth = getResponsiveSetting(
      settings,
      "border_width",
      ".state-disabled"
    ));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ".state-disabled") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
        ".state-disabled"
      ));

  borderRadius &&
    (styles += dimensionsControllerToStyles(borderRadius, "border-radius"));

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "background_style_background_color",
      ".state-disabled"
    ));
  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));

  placeholder_and_value_alignment_position_section &&
    (styles += `text-align:${placeholder_and_value_alignment_position_section};`);

  position_z_index && (styles += `z-index:${position_z_index};`);
  textarea_resize && (styles += `resize:${textarea_resize};`);

  styles += "}";

  styles += "&& .altrp-field-option{";

  input_position && (styles += `flex-direction:${input_position};`);

  styles += "}";

  styles += "&& .altrp-image-select{";

  justify_options && (styles += `justify-content:${justify_options};`);

  styles += "}";

  styles += "&& .altrp-image-select> .state-disabled{";

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

  settings &&
    (color = getResponsiveSetting(settings, "cross_color", ".state-disabled"));
  color && (styles += colorPropertyStyled(color, "color"));

  styles += "}";

  styles += `&& .active {`;

  settings &&
    (widthTextArea = getResponsiveSetting(
      settings,
      "field_width_textarea",
      ".active"
    ));
  widthTextArea && (styles += sizeStyled(widthTextArea, "width"));

  settings &&
    (boxShadow = getResponsiveSetting(settings, "box_shadow", ".active"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings &&
    (toggle = getResponsiveSetting(settings, "disable_box_shadow", ".active"));
  toggle && (styles += "box-shadow: none;");

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "field_font_typographic",
      ".active"
    ));
  typographic && (styles += typographicControllerToStyles(typographic));

  settings &&
    (padding = getResponsiveSetting(settings, "position_padding", ".active"));
  padding &&
    (styles += dimensionsControllerToStyles(padding, "padding", ".active"));

  settings &&
    (color = getResponsiveSetting(settings, "field_font_color", ".active"));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (borderType = getResponsiveSetting(settings, "border_type", ".active"));
  borderType &&
    (styles += simplePropertyStyled(borderType, "border-style", "!important"));

  settings &&
    (borderColor = getResponsiveSetting(settings, "border_color", ".active"));
  borderColor && (styles += colorPropertyStyled(borderColor, "border-color"));

  settings &&
    (borderWidth = getResponsiveSetting(settings, "border_width", ".active"));
  borderWidth && (styles += borderWidthStyled(borderWidth));

  settings &&
    (borderRadius =
      getResponsiveSetting(settings, "border_radius", ".active") ||
      getResponsiveSetting(
        settings,
        "global_filter_input_border_radius",
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

  styles += "&& .altrp-field-option{";

  input_position && (styles += `flex-direction:${input_position};`);

  styles += "}";

  styles += "&& .altrp-image-select{";

  justify_options && (styles += `justify-content:${justify_options};`);

  styles += "}";

  styles += "&& .altrp-image-select> .active{";

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

  settings &&
    (color = getResponsiveSetting(settings, "cross_color", ".active"));
  color && (styles += colorPropertyStyled(color, "color"));

  //TODO не нашел как активировать эту штуку
  //cross_size && (styles += `font-size:${cross_size.size}${cross_size.unit};`);

  styles += "}";

  return styles;
};

/**
 * Стили для класса altrp-field-select2__control
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldSelect2ControlStyle = (settings) => {
  let styles = `&& .altrp-field-select2__control {`;
  let padding,
    color,
    backgroundColor,
    borderType,
    borderColor,
    borderWidth,
    borderRadius,
    boxShadow;

  const { placeholder_and_value_alignment_position_section, position_z_index } =
    settings;

  settings && (boxShadow = getResponsiveSetting(settings, "box_shadow"));
  boxShadow && (styles += shadowControllerToStyles(boxShadow));

  settings && (padding = getResponsiveSetting(settings, "position_padding"));
  padding && (styles += dimensionsControllerToStyles(padding, "padding"));

  settings && (color = getResponsiveSetting(settings, "field_font_color"));
  color && (styles += colorPropertyStyled(color, "color"));

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

  placeholder_and_value_alignment_position_section &&
    (styles += `text-align:${placeholder_and_value_alignment_position_section}`);
  position_z_index && (styles += `z-index:${position_z_index};`);

  styles += "}";
  return styles;
};

/**
 * Стили для класса altrp-image-select__label
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const imageSelectLabel = (settings) => {
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
const fieldSelect2SingleValueStyle = (settings) => {
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
const fieldLabelContainerStyle = (settings) => {
  let styles = `&& .altrp-field-label-container {`;
  let backgroundColor, padding, width;
  const { label_position_top, label_position_left, label_icon_position } =
    settings;

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

  if (label_position_top?.size && label_position_top?.unit) {
    styles += `top:${label_position_top.size}${label_position_top.unit};`;
  }
  if (label_position_left?.size && label_position_left?.unit) {
    styles += `left:${label_position_left.size}${label_position_left.unit};`;
  }
  label_icon_position && (styles += `flex-direction:${label_icon_position};`);

  styles += "}";

  styles += `&& .altrp-field-container:hover .altrp-field-label-container {`;

  settings &&
    (backgroundColor = getResponsiveSetting(
      settings,
      "label_background_color",
      ":hover"
    ));
  backgroundColor &&
    (styles += colorPropertyStyled(backgroundColor, "background-color"));
  styles += "}";

  return styles;
};

let styles = `&& .altrp-field-label-container {`;
/**
 * Стили для класса altrp-field-label
 * @param {Object} settings style settings of element
 * @returns {String} CSS style string
 */
const fieldLabel = (settings) => {
  let styles = `&& .altrp-field-label {`;
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

  styles += `&& .altrp-field-container:hover .altrp-field-label {`;

  settings &&
    (color = getResponsiveSetting(
      settings,
      "label_style_font_color",
      ":hover"
    ));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "label_style_font_typographic",
      ":hover"
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
const labelIconStyle = (settings) => {
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
const placeholderStyle = (settings) => {
  let styles = `&& .altrp-field::placeholder{`;
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

  // settings &&
  //   (backgroundColor = getResponsiveSetting(
  //     settings,
  //     "background_style_background_color"
  //   ));
  // backgroundColor &&
  //   (styles += colorPropertyStyled(backgroundColor, "background-color"));

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
const fieldLabelRequired = (settings) => {
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

  styles += `&& .altrp-field-container:hover .altrp-field-label--required::after {`;

  settings &&
    (color = getResponsiveSetting(
      settings,
      "required_style_font_color",
      ":hover"
    ));
  color && (styles += colorPropertyStyled(color, "color"));

  settings &&
    (typographic = getResponsiveSetting(
      settings,
      "required_style_font_typographic",
      ":hover"
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
function FormComponent(settings) {
  let styles = "";
  const background_section_opacity = getResponsiveSetting(
    settings,
    "background_section_opacity"
  );
  //for all element
  if (background_section_opacity && background_section_opacity?.size) {
    styles += `opacity:${background_section_opacity.size};`;
  } else {
    styles += "";
  }
  //altrp-input-wrapper
  const inputWrapperStyles = inputWrapperStyle(settings);
  inputWrapperStyles && (styles += inputWrapperStyles);
  //altrp-field-container
  const containerStyles = containerStyle(settings);
  containerStyles && (styles += containerStyles);
  //wysiwygStyle ck-content
  const wysiwygStyles = wysiwygStyle(settings);
  wysiwygStyles && (styles += wysiwygStyles);
  //altrp-field
  const fieldStyles = fieldStyle(settings);
  fieldStyles && (styles += fieldStyles);
  //altrp-field-select2__control
  const filedSelect2ControllerStyles = fieldSelect2ControlStyle(settings);
  filedSelect2ControllerStyles && (styles += filedSelect2ControllerStyles);
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
  return styles;
}
export default {
  FormComponent: FormComponent,
  select2Options: fieldSelect2Option,
};
