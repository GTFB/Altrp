import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * @return {string}
 */

export default function DividerComponent(settings) {
  const styles = [
    "altrp-divider-separator",

    ["width", "divider_width", "slider"],

    "}",

    "&",

    ["align-items", "divider_alignment"],

    "}",

    "altrp-divider",

    ["margin", "position_margin", "dimensions"],
    ["z-index", "position_z_index"],
    () => {
      const value = getResponsiveSetting(settings, "divider_style_gap");
      const slider = sliderStyled(value);

      if(slider) {
        return ` padding-top: ${slider}; padding-bottom: ${slider}; `
      }
    },

    "}",

    "altrp-divider-label",

    ["color", "text_style_color", "color"],
    ["", "text_style_typographic", "typographic"],

    "}",

    "altrp-divider .altrp-divider-separator",
    ["border-color", "divider_style_color", "color"],
    "}",
    "altrp-divider.active",

    ["margin", "position_margin", "dimensions", ".active"],
    () => {
      const value = getResponsiveSetting(settings, "divider_style_gap", ".active");
      const slider = sliderStyled(value);

      if(slider) {
        return ` padding-top: ${slider}; padding-bottom: ${slider}; `
      }
    },

    "& .altrp-divider-label",

    ["color", "text_style_color", "color", ".active"],

    "}",

    "}",
    "altrp-divider.active .altrp-divider-separator",
    ["border-color", "divider_style_color", "color", ".active"],
    "}",

  ];

  return styledString(styles, settings)
}
