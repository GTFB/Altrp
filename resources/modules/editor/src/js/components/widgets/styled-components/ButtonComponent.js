import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

/**
 * @return {string}
 */

export default function ButtonComponent(settings) {

  const styles = [

    // `.${element}-altrp-dropbar`,
    //   ["padding", "padding_dropbar_content_style", "dimensions"],
    //   ["background-color", "background_dropbar_content_style", "color"],
    // "}",

    // "&",
    //   ["font-family", "button_advanced_tooltip_font"],
    // "}",

    "altrp-btn-wrapper",

    ["align-items", "button_alignment"],

    "}",

    "altrp-btn",
    ["flex-direction", "button_icon_position"],
    ["margin", "position_margin", "dimensions"],
    ["padding", "position_padding", "dimensions"],
    ["z-index", "position_z_index"],
    ["transition-property", "button_transition_property"],
    () => {
      const value = getResponsiveSetting(settings, "button_transition_duration");

      if(value) {
        return `transition-duration: ${value.size}s;`;
      } else {
        return ''
      }
    },
    ["transition-timing-function", "button_transition_timing"],
    () => {
      const value = getResponsiveSetting(settings, "button_transition_delay");

      if (value) {
        return `transition-delay: ${value.size}s;`;
      } else {
        return ''
      }
    },
    () => {
      const value = getResponsiveSetting(settings, "position_opacity");

      if(value && value.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_color", "color"],
    ["", "gradient", "gradient"],
    ["", "background_image", "media"],
    ["border-style", "border_type"],
    ["border-width", "border_width", "dimensions"],
    ["border-color", "border_color", "color"],
    ["border-radius", "border_radius", "dimensions"],
    ["", "style_background_shadow", "shadow"],
    ["", "font_typographic", "typographic"],
    ["color", "font_color", "color"],

    "&:hover",
    ["margin", "position_margin", "dimensions", ":hover"],
    ["padding", "position_padding", "dimensions", ":hover"],
    ["background-color", "background_color", "color", ":hover"],
    ["", "gradient", "gradient", ":hover"],
    ["border-style", "border_type", "", ":hover"],
    ["border-width", "border_width", "dimensions", ":hover"],
    ["border-color", "border_color", "color", ":hover"],
    ["border-radius", "border_radius", "dimensions", ":hover"],
    ["", "style_background_shadow", "shadow", ":hover"],
    ["color", "font_color", "color", ":hover"],

    "& .altrp-btn-icon",
    ["padding", "icon_padding", "dimensions", ":hover"],
    // ["width", "icon_size", "slider", ":hover"],
    // ["height", "icon_size", "slider", ":hover"],

    "& svg",
    ["background-color", "icon_color_background", "color", ":hover"],
    ["width", "icon_size", "slider", ":hover"],
    ["height", "icon_size", "slider", ":hover"],
    "}",

    "& img",
    ["width", "icon_size", "slider", ":hover"],
    ["height", "icon_size", "slider", ":hover"],
    "}",

    "& path",
    ["fill", "icon_color", "color", ":hover"],
    ["stroke", "icon_color_stroke", "color", ":hover"],
    "}",
    "}",
    "}",

    "& .altrp-btn-icon",
    ["padding", "icon_padding", "dimensions"],
    // ["width", "icon_size", "slider"],
    // ["height", "icon_size", "slider"],

    "& svg",
    ["background-color", "icon_color_background", "color"],
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    "}",

    "& img",
    ["width", "icon_size", "slider"],
    ["height", "icon_size", "slider"],
    "}",

    "& path",
    ["fill", "icon_color", "color"],
    ["stroke", "icon_color_stroke", "color"],
    "}",
    "}",

    "}",

    "altrp-background-image",
    ["background-position", "background_position"],
    ["background-attachment", "background_attachment"],
    ["background-repeat", "background_repeat"],
    ["background-size", "background_size"],
    ["background-size", "background_image_width", "slider"],
    "}",
  ];

  return styledString(styles, settings) + "& .altrp-btn-wrapper{display:flex;flex-direction:column;}& img{max-width:100%;}";
}
