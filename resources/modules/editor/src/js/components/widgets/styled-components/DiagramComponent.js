import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
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

  // appendStyles += `.altrp-dashboard__tooltip < div {
  //   padding: 0 !important;
  // }`

  return styledString(styles, settings) + appendStyles
}
