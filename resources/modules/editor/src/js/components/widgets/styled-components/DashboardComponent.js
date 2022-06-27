import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export function dashboardStyles(settings){

    const style_font_typographic =() => {
        const value = getResponsiveSetting(settings, "style_font_typographic");

        if(value) {
          if(value.family) {
            if(_.isString(value.family)) {
              return `font-family: "${value.family}" sans-serif !important;`;
            }
          }
        }
      }

    return [
        "altrp-dashboard__card--background",
          ["background-color", "style_background_color", "color", "", true],
        "}",

        "altrp-dashboard__card--settings-tooltip-background",
          ["background-color", "style_settings_tooltip_background_color", "color", "", true],
        "}",

        "altrp-dashboard__card--settings-tooltip-icon-background",
          ["background-color", "style_settings_tooltip_icon_background_color", "color", "", true],
        "}",

        "altrp-dashboard__card--border-color",
          ["border-color", "style_border_color", "color"],
        "}",

        "altrp-dashboard__card--border-style",
          ["border-style", "style_border_style"],
        "}",

        "altrp-dashboard__card--border",
          ["border-width", "style_border_width", "slider"],
        "}",

        "altrp-dashboard__card--border-radius",
          ["border-radius", "style_border_radius", "slider"],
        "}",

        "altrp-dashboard__card--font",
          ["border-style", "border_type_card"],
          ["border-width", "border_width_card", "dimensions"],
          ["border-color", "altrp-dashboard__card--font", "color"],
          ["border-radius", "border_radius_card", "dimensions"],
          ["", "style_background_shadow", "shadow"],
          style_font_typographic(),
          "& text",
            style_font_typographic(),
          "}",
        "}",

        "altrp-dashboard__card--font-color",
          ["color", "style_font_color", "color"],
        "}",

        "altrp-dashboard__card--font-size",
          ["font-size", "style_font_size", "slider"],
        "}",

        "altrp-dashboard__card--font-weight",
          ["font-weight", "style_font_weight", "slider"],
        "}",

        "altrp-dashboard__tooltip--label-background",
          ["margin", "style_margin_tooltip", "dimensions"],
          ["background-color", "style_background_color_tooltip", "color", "", true],
          ["", "style_background_tooltip_shadow", "shadow"],
          ["border-style", "border_type_tooltip"],
          ["border-width", "border_width_tooltip", "dimensions"],
          ["border-color", "border_color_tooltip", "color"],
        "}",

        "altrp-dashboard__tooltip--font",
          ["padding", "style_padding_tooltip", "dimensions"],
          ["", "style_font_tooltip", "typographic"],
          ["color", "style_font_color_tooltip", "color"],
        "}",
      ];
}

export default function DashboardComponent(settings){
    const styles=[
        ...dashboardStyles(settings)
    ];

    return styledString(styles,settings);
}
