import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {colorPropertyStyled, defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function DiagramComponent(settings) {
  let appendStyles = ``
  let styles = [
    "altrp-diagram",
      ["width", "width", "slider"],
      ["height", "height", "slider"],
    "}",

    "altrp-btn",
      ["margin", "margin", "dimensions"],
    "}",

    "diagram-title",
      ["", "title_typography", "typographic"],
      ["color", "title_color", "color"],
      ["text-align", "title_alignment"],
      ["padding", "title_padding", "dimensions"],
    "}",

    "diagram-subtitle",
      ["", "subtitle_typography", "typographic"],
      ["color", "subtitle_color", "color"],
      ["text-align", "subtitle_alignment"],
      ["padding", "subtitle_padding", "dimensions"],
    "}",

    'centered-metric',
      ['', 'centered_metric_typography', 'typographic'],
      ['fill', 'centered_metric_color', 'color'],
    '}',

    'arc-label',
      ['', 'arc_label_typography', 'typographic'],
      ['fill', 'arc_label_color', 'color'],
    '}',

    //state disabled
    ".state-disabled .altrp-diagram",
    ["width", "width", "slider", ".state-disabled"],
    ["height", "height", "slider", ".state-disabled"],
    "}",

    ".state-disabled .altrp-btn",
    ["margin", "margin", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled .diagram-title",
    ["", "title_typography", "typographic", ".state-disabled"],
    ["color", "title_color", "color", ".state-disabled"],
    ["text-align", "title_alignment", "", ".state-disabled"],
    ["padding", "title_padding", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled .diagram-subtitle",
    ["", "subtitle_typography", "typographic", ".state-disabled"],
    ["color", "subtitle_color", "color", ".state-disabled"],
    ["text-align", "subtitle_alignment", "", ".state-disabled"],
    ["padding", "subtitle_padding", "dimensions", ".state-disabled"],
    "}",

    '.state-disabled .centered-metric',
    ['', 'centered_metric_typography', 'typographic', ".state-disabled"],
    ['fill', 'centered_metric_color', 'color', ".state-disabled"],
    '}',

    '.state-disabled .arc-label',
    ['', 'arc_label_typography', 'typographic', ".state-disabled"],
    ['fill', 'arc_label_color', 'color', ".state-disabled"],
    '}',
    //state active
    ".active .altrp-diagram",
    ["width", "width", "slider", ".active"],
    ["height", "height", "slider", ".active"],
    "}",

    ".active .altrp-btn",
    ["margin", "margin", "dimensions", ".active"],
    "}",

    ".active .diagram-title",
    ["", "title_typography", "typographic", ".active"],
    ["color", "title_color", "color", ".active"],
    ["text-align", "title_alignment", "", ".active"],
    ["padding", "title_padding", "dimensions", ".active"],
    "}",

    ".active .diagram-subtitle",
    ["", "subtitle_typography", "typographic", ".active"],
    ["color", "subtitle_color", "color", ".active"],
    ["text-align", "subtitle_alignment", "", ".active"],
    ["padding", "subtitle_padding", "dimensions", ".active"],
    "}",

    '.active .centered-metric',
    ['', 'centered_metric_typography', 'typographic', ".active"],
    ['fill', 'centered_metric_color', 'color', ".active"],
    '}',

    '.active .arc-label',
    ['', 'arc_label_typography', 'typographic', ".active"],
    ['fill', 'arc_label_color', 'color', ".active"],
    '}',
  ];

  if (settings.useCustomTooltips) {
    styles = [
      ...styles,
      "altrp-dashboard__tooltip",
        ["margin", "style_margin_tooltip", "dimensions"],
        ["padding", "style_padding_tooltip", "dimensions"],
        ["width", "style_width_tooltip"],
        ["", "style_font_tooltip", "typographic"],
        ["color", "style_font_color_tooltip", "color", "!important"],
        ["background-color", "style_background_color_tooltip", "color"],
        ['border-radius', 'border_radius_tooltip', 'slider'],
        ["background-color", "style_background_tooltip_shadow", "shadow"],
        ["border-style", "border_type_tooltip"],
        ["border-width", "border_width_tooltip", "dimensions"],
        ["border-color", "border_color_tooltip", "color"],
      "}",
    ]

    appendStyles += `.altrp-dashboard__tooltip--font {
      ${colorPropertyStyled(getResponsiveSetting(settings, 'style_font_color_tooltip'), 'color', '!important')}
    }`

    if (!getResponsiveSetting(settings, 'style_background_color_tooltip')) {
      appendStyles += `.altrp-dashboard__tooltip--label-background {
        background-color: white;
      }`
    }
  }

  //state disabled
  if (settings.useCustomTooltips) {
    styles = [
      ...styles,
      ".state-disabled .altrp-dashboard__tooltip",
      ["margin", "style_margin_tooltip", "dimensions", ".state-disabled"],
      ["padding", "style_padding_tooltip", "dimensions", ".state-disabled"],
      ["width", "style_width_tooltip", "", ".state-disabled"],
      ["", "style_font_tooltip", "typographic", ".state-disabled"],
      ["color", "style_font_color_tooltip", "color", ".state-disabled"],
      ["background-color", "style_background_color_tooltip", "color", ".state-disabled"],
      ['border-radius', 'border_radius_tooltip', 'slider', ".state-disabled"],
      ["background-color", "style_background_tooltip_shadow", "shadow", ".state-disabled"],
      ["border-style", "border_type_tooltip", "", ".state-disabled"],
      ["border-width", "border_width_tooltip", "dimensions", ".state-disabled"],
      ["border-color", "border_color_tooltip", "color", ".state-disabled"],
      "}",
    ]

    appendStyles += `.state-disabled .altrp-dashboard__tooltip--font {
      ${colorPropertyStyled(getResponsiveSetting(settings, 'style_font_color_tooltip', '.state-disabled'), 'color', '!important')}
    }`

    if (!getResponsiveSetting(settings, 'style_background_color_tooltip', '.state-disabled')) {
      appendStyles += `.altrp-dashboard__tooltip--label-background {
        background-color: white;
      }`
    }
  }

  //state active
  if (settings.useCustomTooltips) {
    styles = [
      ...styles,
      ".active .altrp-dashboard__tooltip",
      ["margin", "style_margin_tooltip", "dimensions", ".active"],
      ["padding", "style_padding_tooltip", "dimensions", ".active"],
      ["width", "style_width_tooltip", "", ".active"],
      ["", "style_font_tooltip", "typographic", ".active"],
      ["color", "style_font_color_tooltip", "color", ".active"],
      ["background-color", "style_background_color_tooltip", "color", ".active"],
      ['border-radius', 'border_radius_tooltip', 'slider', ".active"],
      ["background-color", "style_background_tooltip_shadow", "shadow", ".active"],
      ["border-style", "border_type_tooltip", "", ".active"],
      ["border-width", "border_width_tooltip", "dimensions", ".active"],
      ["border-color", "border_color_tooltip", "color", ".active"],
      "}",
    ]

    appendStyles += `.active .altrp-dashboard__tooltip--font {
      ${colorPropertyStyled(getResponsiveSetting(settings, 'style_font_color_tooltip', '.active'), 'color', '!important')}
    }`

    if (!getResponsiveSetting(settings, 'style_background_color_tooltip', '.active')) {
      appendStyles += `.altrp-dashboard__tooltip--label-background {
        background-color: white;
      }`
    }
  }

  // appendStyles += `.altrp-dashboard__tooltip < div {
  //   padding: 0 !important;
  // }`

  return styledString(styles, settings) + appendStyles
}
