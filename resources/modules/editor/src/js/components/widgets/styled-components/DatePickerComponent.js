import { styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";

/**
 * @return {string}
 */

export default function DatePickerComponent(settings, elementId) {
  const styles = [
    `bp3-datepicker.altrp-date-picker${elementId}`,
      ["padding", "picker_padding", "dimensions"],
      ["background-color", "picker_background", "color"],
      ["border-style", "picker_border_type"],
      ["border-width", "picker_border_width", "dimensions"],
      ["border-color", "picker_border_color", "color"],
      ["border-radius", "picker_border_radius", "dimensions"],
      ["", "picker_shadow", "shadow"],
      ["", "picker_typographic", "typographic"],
      "bp3-datepicker-month-select select",
        ["", "picker_month_typographic", "typographic"],
        ["color", "picker_month_color", "color"],
      "}",
      "bp3-datepicker-year-select select",
        ["", "picker_year_typographic", "typographic"],
        ["color", "picker_year_color", "color"],
      "}",
      "bp3-icon > svg:not([fill])",
        ["fill", "picker_icons_color", "color"],
      "}",
      "DayPicker-Weekday",
        ["", "date_weekday_typographic", "typographic"],
        ["color", "date_weekday_color", "color"],
      "}",
      "DayPicker-Day.DayPicker-Day.DayPicker-Day",
        ["", "date_selected_typographic", "typographic"],
        ["background-color", "date_background_color", "color"],
        ["color", "date_font_color", "color"],
        ["border-radius", "date_radius", "dimensions"],
      "}",
      "DayPicker-Day.DayPicker-Day.DayPicker-Day:hover",
        ["background-color", "date_background_color", "color", ":hover"],
        ["color", "date_font_color", "color", ":hover"],
        ["border-radius", "date_radius", "dimensions", ":hover"],
      "}",
      "& div.DayPicker-Day--selected.DayPicker-Day--selected.DayPicker-Day--selected",
        ["color", "date_selected_font_color", "color"],
        ["background-color", "date_selected_background_color", "color"],
      "}",
      "& div.DayPicker-Day--selected.DayPicker-Day--selected.DayPicker-Day--selected:hover",
        ["color", "date_selected_font_color", "color", ":hover"],
        ["background-color", "date_selected_background_color", "color", ":hover"],
      "}",
      "DayPicker-Day--outside.DayPicker-Day--outside",
        ["color", "date_outside_font_color", "color"],
        ["background-color", "date_outside_background_color", "color"],
      "}",
      "DayPicker-Day--outside:hover",
        ["color", "date_outside_font_color", "color", ":hover"],
       ["background-color", "date_outside_background_color", "color", ":hover"],
      "}",
    "}",

    `altrp-date-picker${elementId}.state-disabled`,
    () => {
      const value = getResponsiveSetting(settings, "position_opacity", '.state-disabled');

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_style_background_color", "color", ".state-disabled"],
    ["border-style", "border_type", "", ".state-disabled"],
    ["border-style", "picker_border_type", "", ".state-disabled"],
    ["border-width", "border_width", "dimensions", ".state-disabled"],
    ["border-color", "border_color", "color", ".state-disabled"],
    ["border-radius", "border_radius", "dimensions", ".state-disabled"],
    ["", "style_background_shadow", "shadow", ".state-disabled"],
    ["", "picker_shadow", "shadow", ".state-disabled"],
    ["color", "label_style_font_color", "color", ".state-disabled"],
    ["color", "font_color", "color", ".state-disabled"],
    ["color", "field_font_color", "color", ".state-disabled"],
    ["color", "placeholder_style_font_color", "color", ".state-disabled"],
    ["color", "required_style_font_color", "color", ".state-disabled"],
    ["color", "date_font_color", "color", ".state-disabled"],
    ["color", "date_outside_font_color", "color", ".state-disabled"],
    ["color", "date_selected_font_color", "color", ".state-disabled"],
    ["", "image", "media", ".state-disabled"],
"}",

    `altrp-date-picker${elementId}.active`,
    () => {
      const value = getResponsiveSetting(settings, "background_section_opacity", '.active');

      if (value && value?.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    ["background-color", "background_style_background_color", "color", ".active"],
    ["border-style", "border_type", "", ".active"],
    ["border-style", "picker_border_type", "", ".active"],
    ["border-width", "border_width", "dimensions", ".active"],
    ["border-color", "border_color", "color", ".active"],
    ["border-radius", "border_radius", "dimensions", ".active"],
    ["", "style_background_shadow", "shadow", ".active"],
    ["", "picker_shadow", "shadow", ".active"],
    ["color", "label_style_font_color", "color", ".active"],
    ["color", "font_color", "color", ".active"],
    ["color", "field_font_color", "color", ".active"],
    ["color", "placeholder_style_font_color", "color", ".active"],
    ["color", "required_style_font_color", "color", ".active"],
    ["color", "date_font_color", "color", ".active"],
    ["color", "date_outside_font_color", "color", ".active"],
    ["color", "date_selected_font_color", "color", ".active"],
    ["", "image", "media", ".active"],
    "}",

    `altrp-date-picker-popover-${elementId}`,
      ["", "picker_shadow", "shadow"],
      ["border-radius", "picker_border_radius", "dimensions"],

      "bp3-popover-arrow-fill",
        ["fill", "picker_background", "color"],
      "}",

      "bp3-popover-content",
        ["border-radius", "picker_border_radius", "dimensions"],
      "}",
    "}"
  ];
  return styledString(styles, settings)
}
