import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function DiagramComponent(settings) {
  const styles = [
    "altrp-dashboard__tooltip--margin",
      ["margin", "style_margin_tooltip", "dimensions"],
      ["padding", "style_padding_tooltip", "dimensions"],
    "}",

    "altrp-dashboard__tooltip--width",
      ["padding-top", "style_width_tooltip"],
    "}",

    "altrp-dashboard__tooltip--font",
      ["", "style_font_tooltip", "typographic"],
    "}",

    "altrp-dashboard__tooltip--font-color",
      ["color", "style_font_color_tooltip", "color"],
    "}",

    "altrp-dashboard__tooltip--label-background",
      ["background-color", "style_background_color_tooltip", "color"],
    "}",

    "altrp-dashboard__tooltip--label-background-shadow",
      ["background-color", "style_background_tooltip_shadow", "shadow"],
    "}",

    "altrp-dashboard__tooltip--border-type",
      ["border-style", "border_type_tooltip"],
    "}",

    "altrp-dashboard__tooltip--border-width",
      ["border-width", "border_width_tooltip", "dimensions"],
    "}",

    "altrp-dashboard__tooltip--border-color",
      ["border-color", "border_color_tooltip", "color"],
    "}",

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
    '}'
  ];
  return styledString(styles, settings)
}
