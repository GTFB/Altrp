import {styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

export default function InputDateRangeComponent(settings, id, prefix) {
  const styles = [
    "bp3-input.bp3-input",
      ["", "typographic", "typographic"],
      ["color", "color", "color"],
      () => {
        const value = getResponsiveSetting(settings, "width");

        if(value) {
          return `width: ${value};`
        }
      },
      () => {
        const value = getResponsiveSetting(settings, "height");

        if(value) {
          return `height: ${value};`
        }
      },
      ["background-color", "background", "color"],
      ["padding", "padding", "dimensions"],
      ["border-radius", "border_radius", "dimensions"],
    "}",

    "bp3-input.bp3-input:hover",
      ["background-color", "background", "color", ":hover"],
      ["border-radius", "border_radius", "dimensions", ":hover"],
      ["color", "color", "color", ":hover"],
    "}",

    "bp3-input.bp3-input:focus",
      ["background-color", "background", "color", ":focus"],
      ["border-radius", "border_radius", "dimensions", ":hover"],
      ["color", "color", "color", ":focus"],
    "}",

    "bp3-input.bp3-input::placeholder",
      ["", "placeholder_typographic", "typographic"],
      ["color", "placeholder_color", "color"],
    "}",
  ];

  const target = `.${prefix}${id} {${styledString(styles, settings)}}`

  const popoverStyles = [
    "bp3-datepicker",
      ["background-color", "popover_background", "color"],
      ["padding", "popover_padding", "dimensions"],
      ["border-radius", "popover_border_radius", "dimensions"],
    "}",

    "&.bp3-popover",
      ["", "popover_shadow", "shadow"],
      ["border-radius", "popover_border_radius", "dimensions"],
    "}",

    "bp3-popover-content.bp3-popover-content",
      ["border-radius", "popover_border_radius", "dimensions"],
    "}",

    "bp3-daterangepicker-shortcuts",
      ["", "shortcuts_typographic", "typographic"],
      ["color", "shortcuts_color", "color"],
    "}",

    "bp3-daterangepicker-shortcuts .bp3-menu-item",
     ["background-color", "shortcuts_background_shortcut", "color"],
    "}",

    "bp3-daterangepicker-shortcuts .bp3-menu-item:hover",
      ["color", "shortcuts_color", "color", ":hover"],
      ["background-color", "shortcuts_background_shortcut", "color", ":hover"],
    "}",

    "bp3-daterangepicker-shortcuts .bp3-menu-item.bp3-active",
      ["color", "shortcuts_color", "color", ".active"],
      ["background-color", "shortcuts_background_shortcut", "color", ".active"],
    "}",

    "bp3-divider",
      () => {
        const value = getResponsiveSetting(settings, "popover_dividers");

        if (value) {
          if (value.color) {
            return `
            border-bottom: 1px solid ${value.color};
            border-right: 1px solid ${value.color};
            `
          } else return "";
        } else return "";
      },


    "}",

    "DayPicker-Caption",
      ["background-color", "caption_background", "color"],
      ["padding", "caption_padding", "dimensions"],
    "}",

    "& span.bp3-icon-chevron-left svg, & span.bp3-icon-chevron-right svg, & span.bp3-icon-double-caret-vertical svg",
      ["fill", "caption_arrow_color", "color"],
    "}",

    "DayPicker-NavButton:hover span.bp3-icon-chevron-left svg, & .DayPicker-NavButton:hover span.bp3-icon-chevron-right svg",
      ["fill", "caption_arrow_color", "color", ":hover"],
    "}",

    "DayPicker-Caption .bp3-html-select:hover .bp3-icon-double-caret-vertical svg",
      ["fill", "caption_arrow_color", "color", ":hover"],
    "}",

    "DayPicker-NavButton svg",
      ["height", "caption_arrow_size", "slider"],
      ["width", "caption_arrow_size", "slider"],
    "}",

    "& div.DayPicker-Caption select",
      ["", "caption_typographic", "typographic"],
      ["color", "caption_color", "color"],
      ["background-color", "caption_select_background_color", "color"],
    "}",

    "& div.DayPicker-Caption select:hover",
    ["color", "caption_color", "color", ":hover"],
    ["background-color", "caption_select_background_color", "color", ":hover"],
    "}",

    "DayPicker-Weekday",
      ["", "calendar_weekday_typographic", "typographic"],
      ["color", "calendar_weekday_color", "color"],
    "}",

    "DayPicker-Day",
      ["", "calendar_typographic", "typographic"],
      ["color", "calendar_color", "color"],
      ["background-color", "calendar_background_color", "color"],
    "}",

    "DayPicker-Day.DayPicker-Day:hover",
      ["color", "calendar_color", "color", ":hover"],
      ["background-color", "calendar_background_color", "color", ":hover"],
    "}",

    "DayPicker-Day.DayPicker-Day.DayPicker-Day--selected",
    ["color", "calendar_color", "color", ".active"],
    ["background-color", "calendar_background_color", "color", ".active"],
    "}",

    "DayPicker-Day.DayPicker-Day--selected-range",
      ["color", "calendar_range_color", "color"],
      ["background-color", "calendar_range_background_color", "color"],
    "}",

    "DayPicker-Day.DayPicker-Day.DayPicker-Day--hovered-range",
      ["color", "calendar_range_color", "color", ":hover"],
      ["background-color", "calendar_range_background_color", "color", ":hover"],
    "}",
  ];

  const popover = `.altrp-portal${id} {${styledString(popoverStyles, settings)}}`

  return target + popover
}
