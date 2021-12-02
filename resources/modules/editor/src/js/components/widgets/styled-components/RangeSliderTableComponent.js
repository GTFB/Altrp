import {styledString} from "../../../../../../front-app/src/js/helpers/styles";


export default function RangeSliderTableComponent(settings) {
  const styles = [
    "bp3-slider-progress.bp3-intent-primary",
    ["background-color", "color_range-slider_style", "color"],
    "}",

    "bp3-slider-progress",
    ["background-color", "color_range-slider_progress", "color"],
    "}",

    "bp3-slider-handle .bp3-slider-label",
    ["background-color", "color_range-slider_label-background", "color"],
    ["color", "color_range-slider_label-text", "color"],
    ["", "typographic_range-slider_label-text", "typographic"],
    "}",

    "bp3-slider-label",
    ["color", "color_range-slider_label-text-stages", "color"],
    ["", "typographic_range-slider_label-text-stages", "typographic"],
    "}",

    "bp3-slider-handle.bp3-start",
    ["background-color", "color_range-slider_controller-start", "color"],
    "}",

    "bp3-slider-handle.bp3-end",
    ["background-color", "color_range-slider_controller-end", "color"],
    "}",
  ];

  return styledString(styles, settings)
}
