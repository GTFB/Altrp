
import {borderRadiusStyled, defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

export default function TabsSwitcherComponent(settings) {
  const styles = [
    ".bp3-control-indicator",
      ["background", "box_around_color_one", "color"],
      () => {
        const boxBorderRadius = getResponsiveSetting(settings, 'box_border_radius')

        return `border-radius: ${boxBorderRadius?.size}${boxBorderRadius?.unit} !important;`
      },
      () => {
        const value = getResponsiveSetting(settings, "size");
        const slider = sliderStyled(value);

        if(slider) {
          return `
            height: ${slider} !important;
            width: calc(${slider} * 2) !important;

            &:before {
              height: calc(${slider} - 4px) !important;
              width: calc(${slider} - 4px) !important;
            }
          `
        }
        return ''
      },
      ['outline-style', 'switch_button_outline_style'],
      ['outline-color', 'switch_button_outline_color', 'color'],
      ['outline-width', 'switch_button_outline_width', 'slider'],
      ['outline-offset', 'switch_button_outline_offset', 'slider'],
    "}",

    "bp3-control-indicator::before",
      () => {
        const switchColor = getResponsiveSetting(settings, 'switch_color')

        return `background-color: ${switchColor?.colorPickedHex} !important;`
      },
      () => {
        const switchBorderRadius = getResponsiveSetting(settings, 'switch_border_radius')

        return `border-radius: ${switchBorderRadius?.size}${switchBorderRadius?.unit} !important;`
      },
    "}",

    "altrp-tabs-switcher_switch-wrapper input:checked ~ .bp3-control-indicator",
      ["background", "box_around_color_two", "color"],
      () => {
        const value = getResponsiveSetting(settings, "size");
        const slider = sliderStyled(value);

        if(slider) {
          return `
            &:before {
              left: calc(100% - ${slider}) !important;
            }
          `
        }

        return ''
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


    "altrp-tabs-switcher_label-two",
    ["", "typographic_title_two", "typographic"],
    ["color", "color_title_two", "color"],
    "}",

    // Hover

    "altrp-tabs-switcher_switch:hover span.bp3-control-indicator.bp3-control-indicator::before",
      () => {
        const switchColor = getResponsiveSetting(settings, 'switch_color', ':hover')

        return `background-color: ${switchColor?.colorPickedHex} !important;`
      },
      () => {
        const switchBorderRadius = getResponsiveSetting(settings, 'switch_border_radius', ':hover')

        return `border-radius: ${switchBorderRadius?.size}${switchBorderRadius?.unit} !important;`
      },
    "}",

    "altrp-tabs-switcher_switch:hover input:checked ~ .bp3-control-indicator",
      ["background", "box_around_color_two", "color", ":hover"],
    "}",

    "altrp-tabs-switcher_switch:hover .bp3-control-indicator",
      () => {
        const value = getResponsiveSetting(settings, "size", ':hover');

        const slider = sliderStyled(value);

        if(slider) {
          return `
            height: ${slider} !important;
            width: calc(${slider} * 2) !important;

            &:before {
              height: calc(${slider} - 4px) !important;
              width: calc(${slider} - 4px) !important;
            }
          `
        }

        return ""
      },

      ['outline-style', 'switch_button_outline_style', '', ':hover'],
      ['outline-color', 'switch_button_outline_color', 'color', ':hover'],
      ['outline-width', 'switch_button_outline_width', 'slider', ':hover'],
      ['outline-offset', 'switch_button_outline_offset', 'slider', ':hover'],
      ["background", "box_around_color_one", "color", ":hover"],
      () => {
        const boxBorderRadius = getResponsiveSetting(settings, 'box_border_radius', ':hover')

        return `border-radius: ${boxBorderRadius?.size}${boxBorderRadius?.unit} !important;`
      },
    "}",

    "altrp-tabs-switcher_switch-wrapper input:checked:hover ~ .bp3-control-indicator",
      ["background", "box_around_color_two", "color", ':hover'],
      () => {
        const value = getResponsiveSetting(settings, "size", ':hover');
        const slider = sliderStyled(value);

        if(slider) {
          return `
            &:before {
              left: calc(100% - ${slider}) !important;
            }
          `
        }

        return ''
      },
    '}',

    "altrp-tabs-switcher_label-one:hover",
        ["", "typographic_title_one", "typographic", ":hover"],
        ["color", "color_title_one", "color", ":hover"],
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

    // Focus

    'altrp-tabs-switcher_switch input:focus + .bp3-control-indicator',
      ["background", "box_around_color_one", "color", ":focus"],
      () => {
        const boxBorderRadius = getResponsiveSetting(settings, 'box_border_radius', ':focus')

        return `border-radius: ${boxBorderRadius?.size}${boxBorderRadius?.unit} !important;`
      },
      () => {
        const value = getResponsiveSetting(settings, "size", ':focus');

        const slider = sliderStyled(value);

        if(slider) {
          return `
            height: ${slider} !important;
            width: calc(${slider} * 2) !important;

            &:before {
              height: calc(${slider} - 4px) !important;
              width: calc(${slider} - 4px) !important;
            }
          `
        }

        return ''
      },

      ['outline-style', 'switch_button_outline_style', '', ':focus'],
      ['outline-color', 'switch_button_outline_color', 'color', ':focus'],
      ['outline-width', 'switch_button_outline_width', 'slider', ':focus'],
      ['outline-offset', 'switch_button_outline_offset', 'slider', ':focus'],
    '}',

    "altrp-tabs-switcher_switch-wrapper input:checked:focus ~ .bp3-control-indicator",
      ["background", "box_around_color_two", "color", ':focus'],
      () => {
        const value = getResponsiveSetting(settings, "size", ':focus');
        const slider = sliderStyled(value);

        if(slider) {
          return `
            &:before {
              left: calc(100% - ${slider}) !important;
            }
          `
        }

        return ''
      },
    '}',

    'altrp-tabs-switcher_switch input:focus:checked + .bp3-control-indicator',
      ["background", "box_around_color_two", "color", ":focus"],
    '}',

    'altrp-tabs-switcher_switch input:focus + .bp3-control-indicator::before',
      () => {
        const switchBorderRadius = getResponsiveSetting(settings, 'switch_border_radius', ':focus')

        return `border-radius: ${switchBorderRadius?.size}${switchBorderRadius?.unit} !important;`
      },
      () => {
        const switchColor = getResponsiveSetting(settings, 'switch_color', ':focus')

        return `background-color: ${switchColor?.colorPickedHex} !important;`
      },
    '}',

    // Active

    'altrp-tabs-switcher_switch input:active + .bp3-control-indicator::before',
    () => {
      const switchBorderRadius = getResponsiveSetting(settings, 'switch_border_radius', '.active')

      return `border-radius: ${switchBorderRadius?.size}${switchBorderRadius?.unit} !important;`
    },
      () => {
        const switchColor = getResponsiveSetting(settings, 'switch_color', '.active')

        return `background-color: ${switchColor?.colorPickedHex} !important;`
      },
    '}',

    'altrp-tabs-switcher_switch input:active + .bp3-control-indicator',
      () => {
        const backgroundColor = getResponsiveSetting(settings, 'box_around_color_one', '.active')

        return `background-color: ${backgroundColor?.colorPickedHex} !important;`
      },
      () => {
        const boxBorderRadius = getResponsiveSetting(settings, 'box_border_radius', '.active')

        return `border-radius: ${boxBorderRadius?.size}${boxBorderRadius?.unit} !important;`
      },
      () => {
        const value = getResponsiveSetting(settings, "size", '.active');

        const slider = sliderStyled(value);

        if(slider) {
          return `
            height: ${slider} !important;
            width: calc(${slider} * 2) !important;

            &:before {
              height: calc(${slider} - 4px) !important;
              width: calc(${slider} - 4px) !important;
            }
          `
        }

        return ''
      },

      ['outline-style', 'switch_button_outline_style', '', '.active'],
      ['outline-color', 'switch_button_outline_color', 'color', '.active'],
      ['outline-width', 'switch_button_outline_width', 'slider', '.active'],
      ['outline-offset', 'switch_button_outline_offset', 'slider', '.active'],
    '}',

    'altrp-tabs-switcher_switch input:active:checked + .bp3-control-indicator',
      () => {
        const backgroundColor = getResponsiveSetting(settings, 'box_around_color_two', '.active')

        return `background-color: ${backgroundColor?.colorPickedHex} !important;`
      },
      () => {
        const value = getResponsiveSetting(settings, "size", '.active');
        const slider = sliderStyled(value);

        if(slider) {
          return `
            &:before {
              left: calc(100% - ${slider}) !important;
            }
          `
        }

        return ''
      },
    '}',



    `.state-disabled altrp-tabs-switcher_switch`,
    ["background-color", "switch_color", "color", ".state-disabled"],
    ["background", "box_around_color_one", "", ".state-disabled"],
    ["background", "box_around_color_two", "", ".state-disabled"],
    ["", "size", "slider", ".state-disabled"],
    ["border-radius", "box_border_radius", "", ".state-disabled"],
    ["border-radius", "switch_border_radius", "", ".state-disabled"],
    ["outline-style", "switch_button_outline_style", "", ".state-disabled"],
    ["outline-color", "switch_button_outline_color", "color", ".state-disabled"],
    ["outline-width", "switch_button_outline_width", "slider", ".state-disabled"],
    ["outline-offset", "switch_button_outline_offset", "slider", ".state-disabled"],
    "}",

    `.active altrp-tabs-switcher_switch`,
    ["background-color", "switch_color", "color", ".active"],
    ["background", "box_around_color_one", "", ".active"],
    ["background", "box_around_color_two", "", ".active"],
    ["", "size", "slider", ".active"],
    ["border-radius", "box_border_radius", "", ".active"],
    ["border-radius", "switch_border_radius", "", ".active"],
    ["outline-style", "switch_button_outline_style", "", ".active"],
    ["outline-color", "switch_button_outline_color", "color", ".active"],
    ["outline-width", "switch_button_outline_width", "slider", ".active"],
    ["outline-offset", "switch_button_outline_offset", "slider", ".active"],
    "}",



  ];

  return styledString(styles, settings)
}
