
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

export default function TooltipComponent(settings) {
  const styles = [
    ["", "tooltip_background_shadow", "shadow"],
    ["border-radius", "tooltip_border_radius", "dimensions"],
    () => {
      const value = getResponsiveSetting(settings, "tooltip_background_color");
      if(value) {
        if(value.color) {
          return `border-color: transparent transparent ${value.color}`
        } else {
          return ""
        }
      } else {
        return ""
      }
    },

    "&::after",
    ["border-width", "arrow_size", "slider"],
    "}",

    "bp3-popover2-content",
      ["background-color", "tooltip_background_color", "color"],
      ["padding", "tooltip_position_padding", "dimensions"],
      ["color", "tooltip_font_color", "color"],
      ["", "tooltip_font_typographic", "typographic"],
      ["border-radius", "tooltip_border_radius", "dimensions"],
    "}",

    "bp3-popover2-arrow-fill",
      ["fill", "tooltip_background_color", "color"],
    "}",

    "bp3-popover2-arrow svg",
      ["color", "tooltip_background_color", "color"],
    "}",
  ];

  return styledString(styles, settings)
}
