import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

/**
 * @return {string}
 */

export default function AdvancedComponent(settings) {

  const styles = [
    ["z-index", "z_index"],

    () => {
      const value = getResponsiveSetting(settings, "advanced_opacity");

      if(value && value.size) {
        console.log(`opacity: ${value.size};`);
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },

    ["padding", "positioning_padding", "dimensions"],
    ["margin", "positioning_margin", "dimensions"],

    ["width", "positioning_width_type"],
    ["width", "positioning_custom_width", "slider"],

    ["align-self", "positioning_vertical_align"],

    ["position", "positioning_position_type", "", "", true],

    ["left", "positioning_horizontal_offset", "slider"],
    ["bottom", "positioning_vertical_offset", "slider"],

    "& > .altrp-tooltip",
      ["padding", "tooltip_position_padding", "dimensions"],
      ["left", "tooltip_horizontal_offset", "slider"],
      ["bottom", "tooltip_vertical_offset", "slider"],
      ["", "tooltip_font_typographic", "typographic"],
      ["color", "tooltip_font_color", "color"],
      ["background-color", "tooltip_background_color", "color"],
      ["border-radius", "tooltip_border_radius", "dimensions"],
      ["", "tooltip_background_shadow", "shadow"],
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
    "}",

    () => {
      const value = getResponsiveSetting(settings, "arrow_size");
      const slider = sliderStyled(value);

      return `
        & > .altrp-tooltip::after { border-width: ${slider}; }
        & > .altrp-tooltip--top { bottom: calc(100% + ${slider}); }
        & > .altrp-tooltip--bottom { top: calc(100% + ${slider}); }
        & > .altrp-tooltip--right { left: calc(100% + ${slider}); }
        & > .altrp-tooltip--left { right: calc(100% + ${slider}); }
        & > .altrp-tooltip--top::after { margin-left: -${slider}; }
        & > .altrp-tooltip--bottom::after { margin-left: -${slider}; }
        & > .altrp-tooltip--right::after { margin-top: -${slider}; }
        & > .altrp-tooltip--left::after { margin-top: -${slider}; }
      `
    },
  ];

  console.log(styledString(styles, settings));

  return "width:100%;" + styledString(styles, settings)
}
