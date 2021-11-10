import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

/**
 * @return {string}
 */

export default function AccordionComponent(settings) {
  const styles = [
    "altrp-accordion-item-label",

    ["", "font_typographic_title_style", "typographic"],
    ["text-align", "alignment_item_style"],
    ["color", "color_title_style", "color"],
    () => {
      const value = getResponsiveSetting(settings, "spacing_icon_style");
      const slider = sliderStyled(value);

      if(slider) {
        return `margin-left: ${slider}; margin-right: ${slider};`
      }
    },

    "}",

    "altrp-accordion-item-label:hover",

    ["color", "color_title_style", "color", ":hover"],
    ["", "font_typographic_title_style", "typographic", ":hover"],

    "}",

    "altrp-accordion-item-content",

    ["background-color", "background_color_content_style", "color"],
    ["color", "color_content_style", "color"],
    ["border-radius", "border_radius_content_style", "dimensions"],
    ["text-align", "alignment_item_style"],
    ["margin-top", "spacing_content_style", "slider"],
    ["", "typographic_content_style", "typographic"],
    ["border-color", "border_color_content_style", "color"],
    ["border-style", "border_type_content_style" ],
    ["border-width", "border_width_content_style", "dimensions"],

    "}",

    "altrp-accordion-item-content:hover",

    ["background-color", "background_color_content_style", "color", ":hover"],
    ["color", "color_content_style", "color", ":hover"],
    ["border-radius", "border_radius_content_style", "dimensions", ":hover"],

    "}",


    "altrp-accordion-item-content-text",

    ["padding", "padding_content_style", "dimensions"],
    ["", "typographic_content_style", "typographic"],

    "}",

    "altrp-accordion-item-content-text:hover",

    ["padding", "padding_content_style", "dimensions", ":hover"],
    ["", "typographic_content_style", "typographic", ":hover"],

    "}",

    "altrp-accordion-item",

    ["margin-top", "spacing_item_style", "slider"],

    "}",

    "altrp-accordion-item-button",

    ["flex-direction", "alignment_icon_style"],
    ["background-color", "background_color_title_style", "color"],
    ["border-style", "border_type_title_style" ],
    ["border-width", "border_width_title_style", "dimensions"],
    ["border-color", "border_color_title_style", "color"],
    ["border-radius", "border_radius_title_style", "dimensions"],
    ["padding", "padding_title_style", "dimensions"],
    ["", "box_shadow_title_style", "shadow"],

    "}",

    "altrp-accordion-item-button:hover",

    ["background-color", "background_color_title_style", "color", ":hover"],
    ["border-style", "border_type_title_style", null, ":hover"],
    ["border-width", "border_width_title_style", "dimensions", ":hover"],
    ["border-color", "border_color_title_style", "color", ":hover"],
    ["border-radius", "border_radius_title_style", "dimensions", ":hover"],
    ["padding", "padding_title_style", "dimensions", ":hover"],
    ["", "box_shadow_title_style", "shadow", ":hover"],

    "}",

    "altrp-accordion-item-button.active",

    ["background-color", "background_color_title_style", "color", ".active"],

    "}",

    "altrp-accordion-item-icon svg",
    () => {
      const value = getResponsiveSetting(settings, "spacing_icon_size");
      const slider = sliderStyled(value);

      if(slider) {
        return `width: ${slider}; height: ${slider};`
      }
    },
    "}",

    "altrp-accordion-item-icon svg path",

    ["fill", "color_icon_style", "color"],

    "}",
    "altrp-accordion-item.active .altrp-accordion-item-icon path",

    ["fill", "color_icon_style", "color", '.active'],

    "}",


    "altrp-accordion-item-button:hover .altrp-accordion-item-label",

    ["color", "color_title_style", "color", ":hover"],
    () => {
      const value = getResponsiveSetting(settings, "spacing_icon_style", ":hover");
      const slider = sliderStyled(value);

      if(slider) {
        return `margin-left: ${slider}; margin-right: ${slider};`
      } else {
        return ""
      }
    },

    "}",

    "altrp-accordion-item-button:hover .altrp-accordion-item-icon path",

    ["fill", "color_icon_style", "color", ":hover"],

    "}",
  ];

  return styledString(styles, settings)
}
