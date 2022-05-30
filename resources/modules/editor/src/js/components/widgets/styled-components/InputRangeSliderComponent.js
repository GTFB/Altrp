
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

export default function InputRangeSliderComponent(settings) {
  const styles = [
    "bp3-slider-axis .bp3-slider-label",
      ["", "label_typographic", "typographic"],
      ["color", "label_color", "color"],
    "}",

    "bp3-slider-axis .bp3-slider-label:hover",
      ["", "label_typographic", "typographic", ":hover"],
      ["color", "label_color", "color", ":hover"],
    "}",

    "bp3-slider-handle span.bp3-slider-label",
      ["", "current_label_typographic", "typographic"],
      ["color", "current_label_color", "color"],
    "}",

    "bp3-slider-handle:hover span.bp3-slider-label",
      ["", "current_label_typographic", "typographic", ":hover"],
      ["color", "current_label_color", "color", ":hover"],
    "}",

    "altrp-field-slider-horizontal .bp3-slider-handle",
      () => {
        let width = getResponsiveSetting(settings, "size");

        width = sliderStyled(width);

        if(width) {
          return `width: calc(${width} / 2);`
        } else {
          return ""
        }
      },
      ["height", "handle_size", "slider"],
      ["width", "handle_width", "slider"],
    "}",


    "bp3-slider-handle",
      ["border-radius", "handle_radius", "dimensions"],
    "}",

    "bp3-slider-handle.bp3-start",
      ["border-radius", "handle_radius", "dimensions"],
    "}",

    "bp3-slider-handle.bp3-end",
      ["border-radius", "handle_radius_second", "dimensions"],
    "}",

    "altrp-field-slider-horizontal .altrp-field-slider",
      ["width", "width", "slider"],
    "}",

    "altrp-field-slider-vertical .altrp-field-slider",
      ["height", "length", "slider"],
    "}",

    () => {
      let tr_x = getResponsiveSetting(settings, "tr_x", '', 0) ;
      let tr_y = getResponsiveSetting(settings, "tr_y", '', 0) ;
      if(! tr_x && ! tr_y){
        return ''
      }
      return `& .bp3-slider-handle{transform:translate(${tr_x + 'px'},${tr_y + 'px'});}`
    },

    "bp3-slider-progress, & .bp3-slider-track",
      ["height", "height", "slider"],
    "}",

    "altrp-field-slider-vertical .bp3-slider-progress.bp3-slider-progress, & .altrp-field-slider-vertical .bp3-slider-track.bp3-slider-track",
      ["width", "thickness", "slider"],
    "}",

    "altrp-field-slider-horizontal .bp3-slider-label",
      () => {
        let height = getResponsiveSetting(settings, "height", "", { size: 6, unit: "px" })

        height = sliderStyled(height)

        return `transform: translate(-50%, calc(14px + ${height}));`
      },
    "}",

    "altrp-field-slider-vertical .bp3-slider-label.bp3-slider-label.bp3-slider-label",
      () => {
        let thickness = getResponsiveSetting(settings, "thickness", "", { size: 6, unit: "px" })

        thickness = sliderStyled(thickness)

        return `transform: translate(calc(14px + ${thickness}), 50%);`
      },
    "}",

    "bp3-slider-handle .bp3-slider-label, & .bp3-slider-handle.bp3-active .bp3-slider-label",
      ["background-color", "tooltip_color", "color"],
    "}",

    "bp3-slider-handle, & .bp3-slider-handle.bp3-active",
      ["background-color", "handle_color", "color"],
    "}",

    "bp3-slider-handle:hover, & .bp3-slider-handle:hover.bp3-active",
      ["background-color", "handle_color", "color", ":hover"],
    "}",

    "bp3-slider-handle:active, & .bp3-slider-handle:active.bp3-active ",
    ["background-color", "handle_color", "color", ".active"],
    "}",

    "bp3-slider-progress.bp3-intent-primary",
      ["background-color", "filled_color", "color"],
    "}",

    "bp3-slider-progress",
      ["background-color", "blank_color", "color"],
    "}",
    // .state-disabled
    ".state-disabled bp3-slider-axis .bp3-slider-label",
    ["", "label_typographic", "typographic", ".state-disabled"],
    ["color", "label_color", "color", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-handle span.bp3-slider-label",
    ["", "current_label_typographic", "typographic", ".state-disabled"],
    ["color", "current_label_color", "color", ".state-disabled"],
    "}",

    ".state-disabled altrp-field-slider-horizontal .bp3-slider-handle",
    () => {
      let width = getResponsiveSetting(settings, "size", ".state-disabled");

      width = sliderStyled(width);

      if(width) {
        return `width: calc(${width} / 2);`
      } else {
        return ""
      }
    },
    ["height", "handle_size", "slider", ".state-disabled"],
    ["width", "handle_width", "slider", ".state-disabled"],
    "}",


    ".state-disabled bp3-slider-handle",
    ["border-radius", "handle_radius", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-handle.bp3-start",
    ["border-radius", "handle_radius", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-handle.bp3-end",
    ["border-radius", "handle_radius_second", "dimensions", ".state-disabled"],
    "}",

    ".state-disabled altrp-field-slider-horizontal .altrp-field-slider",
    ["width", "width", "slider", ".state-disabled"],
    "}",

    ".state-disabled altrp-field-slider-vertical .altrp-field-slider",
    ["height", "length", "slider", ".state-disabled"],
    "}",

    () => {
      let tr_x = getResponsiveSetting(settings, "tr_x", ".state-disabled", 0) ;
      let tr_y = getResponsiveSetting(settings, "tr_y", ".state-disabled", 0) ;
      if(! tr_x && ! tr_y){
        return ''
      }
      return `& .bp3-slider-handle{transform:translate(${tr_x + 'px'},${tr_y + 'px'});}`
    },

    ".state-disabled bp3-slider-progress, & .bp3-slider-track",
    ["height", "height", "slider", ".state-disabled"],
    "}",

    ".state-disabled altrp-field-slider-vertical .bp3-slider-progress.bp3-slider-progress, & .altrp-field-slider-vertical .bp3-slider-track.bp3-slider-track",
    ["width", "thickness", "slider", ".state-disabled"],
    "}",

    ".state-disabled altrp-field-slider-horizontal .bp3-slider-label",
    () => {
      let height = getResponsiveSetting(settings, "height", ".state-disabled", { size: 6, unit: "px" })

      height = sliderStyled(height)

      return `transform: translate(-50%, calc(14px + ${height}));`
    },
    "}",

    ".state-disabled altrp-field-slider-vertical .bp3-slider-label.bp3-slider-label.bp3-slider-label",
    () => {
      let thickness = getResponsiveSetting(settings, "thickness", ".state-disabled", { size: 6, unit: "px" })

      thickness = sliderStyled(thickness)

      return `transform: translate(calc(14px + ${thickness}), 50%);`
    },
    "}",

    ".state-disabled bp3-slider-handle .bp3-slider-label, & .bp3-slider-handle.bp3-active .bp3-slider-label",
    ["background-color", "tooltip_color", "color", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-handle, & .bp3-slider-handle.bp3-active",
    ["background-color", "handle_color", "color", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-progress.bp3-intent-primary",
    ["background-color", "filled_color", "color", ".state-disabled"],
    "}",

    ".state-disabled bp3-slider-progress",
    ["background-color", "blank_color", "color", ".state-disabled"],
    "}",


    //state active
    ".active bp3-slider-axis .bp3-slider-label",
    ["", "label_typographic", "typographic", ".active"],
    ["color", "label_color", "color", ".active"],
    "}",

    ".active bp3-slider-handle span.bp3-slider-label",
    ["", "current_label_typographic", "typographic", ".active"],
    ["color", "current_label_color", "color", ".active"],
    "}",

    ".active altrp-field-slider-horizontal .bp3-slider-handle",
    () => {
      let width = getResponsiveSetting(settings, "size", ".active");

      width = sliderStyled(width);

      if(width) {
        return `width: calc(${width} / 2);`
      } else {
        return ""
      }
    },
    ["height", "handle_size", "slider", ".active"],
    ["width", "handle_width", "slider", ".active"],
    "}",


    ".active bp3-slider-handle",
    ["border-radius", "handle_radius", "dimensions", ".active"],
    "}",

    ".active bp3-slider-handle.bp3-start",
    ["border-radius", "handle_radius", "dimensions", ".active"],
    "}",

    ".active bp3-slider-handle.bp3-end",
    ["border-radius", "handle_radius_second", "dimensions", ".active"],
    "}",

    ".active altrp-field-slider-horizontal .altrp-field-slider",
    ["width", "width", "slider", ".active"],
    "}",

    ".active altrp-field-slider-vertical .altrp-field-slider",
    ["height", "length", "slider", ".active"],
    "}",

    () => {
      let tr_x = getResponsiveSetting(settings, "tr_x", ".active", 0) ;
      let tr_y = getResponsiveSetting(settings, "tr_y", ".active", 0) ;
      if(! tr_x && ! tr_y){
        return ''
      }
      return `& .active .bp3-slider-handle{transform:translate(${tr_x + 'px'},${tr_y + 'px'});}`
    },

    ".active bp3-slider-progress, & .bp3-slider-track",
    ["height", "height", "slider", ".active"],
    "}",

    ".active altrp-field-slider-vertical .bp3-slider-progress.bp3-slider-progress, & .altrp-field-slider-vertical .bp3-slider-track.bp3-slider-track",
    ["width", "thickness", "slider", ".active"],
    "}",

    ".active altrp-field-slider-horizontal .bp3-slider-label",
    () => {
      let height = getResponsiveSetting(settings, "height", ".active", { size: 6, unit: "px" })

      height = sliderStyled(height)

      return `transform: translate(-50%, calc(14px + ${height}));`
    },
    "}",

    ".active altrp-field-slider-vertical .bp3-slider-label.bp3-slider-label.bp3-slider-label",
    () => {
      let thickness = getResponsiveSetting(settings, "thickness", ".active", { size: 6, unit: "px" })

      thickness = sliderStyled(thickness)

      return `transform: translate(calc(14px + ${thickness}), 50%);`
    },
    "}",

    ".active bp3-slider-handle .bp3-slider-label, & .bp3-slider-handle.bp3-active .bp3-slider-label",
    ["background-color", "tooltip_color", "color", ".active"],
    "}",

    ".active bp3-slider-handle, & .bp3-slider-handle.bp3-active",
    ["background-color", "handle_color", "color", ".active"],
    "}",

    ".active bp3-slider-progress.bp3-intent-primary",
    ["background-color", "filled_color", "color", ".active"],
    "}",

    ".active bp3-slider-progress",
    ["background-color", "blank_color", "color", ".active"],
    "}",
  ];

  return styledString(styles, settings)
}
