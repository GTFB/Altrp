import {styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

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
    //state-disabled
    "bp3-input.bp3-input",
    ["", "typographic", "typographic", ".state-disabled"],
    ["color", "color", "color", ".state-disabled"],
    () => {
      const value = getResponsiveSetting(settings, "width", ".state-disabled");

      if(value) {
        return `width: ${value};`
      }
    },
    () => {
      const value = getResponsiveSetting(settings, "height", ".state-disabled");

      if(value) {
        return `height: ${value};`
      }
    },
    ["background-color", "background", "color", ".state-disabled"],
    ["padding", "padding", "dimensions", ".state-disabled"],
    ["border-radius", "border_radius", "dimensions", ".state-disabled"],
    "}",
    //state-active
    "bp3-input.bp3-input",
    ["", "typographic", "typographic", ".active"],
    ["color", "color", "color", ".active"],
    () => {
      const value = getResponsiveSetting(settings, "width", ".active");

      if(value) {
        return `width: ${value};`
      }
    },
    () => {
      const value = getResponsiveSetting(settings, "height", ".active");

      if(value) {
        return `height: ${value};`
      }
    },
    ["background-color", "background", "color", ".active"],
    ["padding", "padding", "dimensions", ".active"],
    ["border-radius", "border_radius", "dimensions", ".active"],
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

    //state disabled
    "bp3-datepicker",
    ["background-color", "popover_background", "color", ".state-disabled"],
    ["padding", "popover_padding", "dimensions", ".state-disabled"],
    ["border-radius", "popover_border_radius", "dimensions", ".state-disabled"],
    "}",

    "&.bp3-popover",
    ["", "popover_shadow", "shadow", ".state-disabled"],
    ["border-radius", "popover_border_radius", "dimensions", ".state-disabled"],
    "}",

    "bp3-popover-content.bp3-popover-content",
    ["border-radius", "popover_border_radius", "dimensions", ".state-disabled"],
    "}",

    "bp3-daterangepicker-shortcuts",
    ["", "shortcuts_typographic", "typographic", ".state-disabled"],
    ["color", "shortcuts_color", "color", ".state-disabled"],
    "}",

    "bp3-daterangepicker-shortcuts .bp3-menu-item",
    ["background-color", "shortcuts_background_shortcut", "color", ".state-disabled"],
    "}",

    //state active
    "bp3-datepicker",
    ["background-color", "popover_background", "color", ".active"],
    ["padding", "popover_padding", "dimensions", ".active"],
    ["border-radius", "popover_border_radius", "dimensions", ".active"],
    "}",

    "&.bp3-popover",
    ["", "popover_shadow", "shadow", ".active"],
    ["border-radius", "popover_border_radius", "dimensions", ".active"],
    "}",

    "bp3-popover-content.bp3-popover-content",
    ["border-radius", "popover_border_radius", "dimensions", ".active"],
    "}",

    "bp3-daterangepicker-shortcuts",
    ["", "shortcuts_typographic", "typographic", ".active"],
    ["color", "shortcuts_color", "color", ".active"],
    "}",

    "bp3-daterangepicker-shortcuts .bp3-menu-item",
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

    "bp3-divider",
    () => {
      const value = getResponsiveSetting(settings, "popover_dividers", ".state-disabled");

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

    "bp3-divider",
    () => {
      const value = getResponsiveSetting(settings, "popover_dividers", ".active");

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

    //state-disabled
    ".state-disabled DayPicker-Caption",
    ["background-color", "caption_background", "color", ".state-disabled"],
    ["padding", "caption_padding", "dimensions", ".state-disabled"],
    "}",

    "& .state-disabled span.bp3-icon-chevron-left svg, & span.bp3-icon-chevron-right svg, & span.bp3-icon-double-caret-vertical svg",
    ["fill", "caption_arrow_color", "color", ".state-disabled"],
    "}",

    ".state-disabled DayPicker-NavButton svg",
    ["height", "caption_arrow_size", "slider", ".state-disabled"],
    ["width", "caption_arrow_size", "slider", ".state-disabled"],
    "}",

    "& .state-disabled div.DayPicker-Caption select",
    ["", "caption_typographic", "typographic", ".state-disabled"],
    ["color", "caption_color", "color", ".state-disabled"],
    ["background-color", "caption_select_background_color", "color", ".state-disabled"],
    "}",

    ".state-disabled DayPicker-Weekday",
    ["", "calendar_weekday_typographic", "typographic", ".state-disabled"],
    ["color", "calendar_weekday_color", "color", ".state-disabled"],
    "}",

    ".state-disabled DayPicker-Day",
    ["", "calendar_typographic", "typographic", ".state-disabled"],
    ["color", "calendar_color", "color", ".state-disabled"],
    ["background-color", "calendar_background_color", "color", ".state-disabled"],
    "}",

    ".state-disabled DayPicker-Day.DayPicker-Day--selected-range",
    ["color", "calendar_range_color", "color", ".state-disabled"],
    ["background-color", "calendar_range_background_color", "color", ".state-disabled"],
    "}",

    //state active
    ".active DayPicker-Caption",
    ["background-color", "caption_background", "color", ".active"],
    ["padding", "caption_padding", "dimensions", ".active"],
    "}",

    "& .active span.bp3-icon-chevron-left svg, & span.bp3-icon-chevron-right svg, & span.bp3-icon-double-caret-vertical svg",
    ["fill", "caption_arrow_color", "color", ".active"],
    "}",

    ".active DayPicker-NavButton svg",
    ["height", "caption_arrow_size", "slider", ".active"],
    ["width", "caption_arrow_size", "slider", ".active"],
    "}",

    "& .active div.DayPicker-Caption select",
    ["", "caption_typographic", "typographic", ".active"],
    ["color", "caption_color", "color", ".active"],
    ["background-color", "caption_select_background_color", "color", ".active"],
    "}",

    ".active DayPicker-Weekday",
    ["", "calendar_weekday_typographic", "typographic", ".active"],
    ["color", "calendar_weekday_color", "color", ".active"],
    "}",

    ".active DayPicker-Day",
    ["", "calendar_typographic", "typographic", ".active"],
    ["color", "calendar_color", "color", ".active"],
    ["background-color", "calendar_background_color", "color", ".active"],
    "}",

    ".active DayPicker-Day.DayPicker-Day--selected-range",
    ["color", "calendar_range_color", "color", ".active"],
    ["background-color", "calendar_range_background_color", "color", ".active"],
    "}",

  ];

  const popover = `.altrp-portal${id} {${styledString(popoverStyles, settings)}}`

  return target + popover
}
