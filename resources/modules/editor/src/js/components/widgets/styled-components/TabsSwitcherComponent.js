
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

export default function TabsSwitcherComponent(settings) {
  const styles = [
    "& div.altrp-tabs-switcher_switch-wrapper span.bp3-control-indicator.bp3-control-indicator.bp3-control-indicator",
      ["background", "box_around_color_one", "color"],
      ["border-radius", "box_border_radius", "slider"],
      () => {
        const value = getResponsiveSetting(settings, "size");
        const slider = sliderStyled(value);

        if(slider) {
          return `
            height: ${slider};
            width: calc(${slider} * 2);

            &:before {
              height: calc(${slider} - 4px);
              width: calc(${slider} - 4px);
            }
          `
        } else {
          return ""
        }
      },
    "}",

    "& div.altrp-tabs-switcher_switch-wrapper span.bp3-control-indicator.bp3-control-indicator.bp3-control-indicator::before",
      ["border-radius", "switch_border_radius", "slider"],
    "}",

    "& div.altrp-tabs-switcher_switch-wrapper .altrp-tabs-switcher_switch:hover span.bp3-control-indicator.bp3-control-indicator.bp3-control-indicator::before",
    ["border-radius", "switch_border_radius", "slider", ":hover"],
    "}",


    "altrp-tabs-switcher_switch-wrapper span.bp3-control-indicator.bp3-control-indicator::before",
      ["background", "switch_color", "color"],
    "}",

    "altrp-tabs-switcher_switch-wrapper .altrp-tabs-switcher_switch:hover span.bp3-control-indicator.bp3-control-indicator::before",
    ["background", "switch_color", "color", ":hover"],
    "}",

    "altrp-tabs-switcher_switch-wrapper .altrp-tabs-switcher_switch:hover span.bp3-control-indicator.bp3-control-indicator",
      ["background", "box_around_color_one", "color", ":hover"],
      ["border-radius", "box_border_radius", "slider", ":hover"],
    "}",

    "altrp-tabs-switcher_switch-wrapper .altrp-tabs-switcher_switch:hover input:checked ~ span.bp3-control-indicator.bp3-control-indicator",
      ["background", "box_around_color_two", "color", ":hover"],
    "}",

    "& div.altrp-tabs-switcher_switch-wrapper input:checked ~ span.bp3-control-indicator.bp3-control-indicator.bp3-control-indicator",
      ["background", "box_around_color_two", "color"],
      () => {
        const value = getResponsiveSetting(settings, "size");
        const slider = sliderStyled(value);

        if(slider) {
          return `
            &:before {
              left: calc(100% - ${slider});
            }
          `
        } else {
          return ""
        }
      },
    "}",

    "altrp-tabs-switcher_label-one",
      ["margin-right", "spacing", "slider"],
    "}",

    "altrp-tabs-switcher_label-two",
      ["margin-left", "spacing", "slider"],
    "}",

    "altrp-tabs-switcher_wrapper",
      ["margin-bottom", "margin_bottom", "slider"],
    "}",

    "altrp-tabs-switcher_label-one",
      ["", "typographic_title_one", "typographic"],
      ["color", "color_title_one", "color"],
    "}",

    "altrp-tabs-switcher_label-one:hover",
      ["", "typographic_title_one", "typographic", ":hover"],
      ["color", "color_title_one", "color", ":hover"],
    "}",

    "altrp-tabs-switcher_label-two",
    ["", "typographic_title_two", "typographic"],
    ["color", "color_title_two", "color"],
    "}",

    "altrp-tabs-switcher_label-two:hover",
    ["", "typographic_title_two", "typographic", ":hover"],
    ["color", "color_title_two", "color", ":hover"],
    "}",


    "altrp-tabs-switcher_content-one",
    ["", "typographic_section_one", "typographic"],
    ["color", "color_section_one", "color"],
    "}",

    "altrp-tabs-switcher_content-one:hover",
    ["", "typographic_section_one", "typographic", ":hover"],
    ["color", "color_section_one", "color", ":hover"],
    "}",

    "altrp-tabs-switcher_content-two",
    ["", "typographic_section_two", "typographic"],
    ["color", "color_section_two", "color"],
    "}",

    "altrp-tabs-switcher_content-two:hover",
    ["", "typographic_section_two", "typographic", ":hover"],
    ["color", "color_section_two", "color", ":hover"],
    "}",
  ];

  return styledString(styles, settings)
}
