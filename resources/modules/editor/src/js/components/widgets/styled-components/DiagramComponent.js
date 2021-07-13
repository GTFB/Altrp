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
  ];
  return styledString(styles, settings)
}
