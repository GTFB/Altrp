import {
  styledString
} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

export default function ProgressBarComponent(settings) {
  const styles = [
    "&.altrp-element",
      ["align-items", "alignment"],
    "}",

    "bp3-progress-bar",
      () => {
        const value = getResponsiveSetting(settings, "width");

        if(value) {
          return `width: ${value};`
        } else {
          return ""
        }
      },
    "}",

    //state disabled
    ".state-disabled &.altrp-element",
    ["align-items", "alignment", "", ".state-disabled"],
    "}",

    ".state-disabled .bp3-progress-bar",
    () => {
      const value = getResponsiveSetting(settings, "width", ".state-disabled");

      if(value) {
        return `width: ${value};`
      } else {
        return ""
      }
    },
    "}",

    //state active
    ".active &.altrp-element",
    ["align-items", "alignment", "", ".active"],
    "}",

    ".active .bp3-progress-bar",
    () => {
      const value = getResponsiveSetting(settings, "width", ".active");

      if(value) {
        return `width: ${value};`
      } else {
        return ""
      }
    },
    "}",

    "bp3-progress-meter.bp3-progress-meter.bp3-progress-meter",
      ["background-color", "color", "color"],
      () => {
        const value = getResponsiveSetting(settings, "stripes_color");
        const firstColor = getResponsiveSetting(settings, "color")?.color || "rgba(92, 112, 128, 0.8)";
        const switcher = getResponsiveSetting(settings, "stripes", "", true);

        if (value && switcher) {
          if (value.color) {
            const color = value.color;

            return `background: linear-gradient(-45deg, ${firstColor}  25%, ${color} 25%, ${color} 50%, ${firstColor} 50%, ${firstColor} 75%, ${color} 75%); background-size: 30px 30px;`
          } else return "";
        } else return "";
      },
    "}",

    //state disabled
    ".state-disabled .bp3-progress-meter.bp3-progress-meter.bp3-progress-meter",
    ["background-color", "color", "color", ".state-disabled"],
    () => {
      const value = getResponsiveSetting(settings, "stripes_color", ".state-disabled");
      const firstColor = getResponsiveSetting(settings, "color", ".state-disabled")?.color || "rgba(92, 112, 128, 0.8)";
      const switcher = getResponsiveSetting(settings, "stripes", ".state-disabled", true);

      if (value && switcher) {
        if (value.color) {
          const color = value.color;

          return `background: linear-gradient(-45deg, ${firstColor}  25%, ${color} 25%, ${color} 50%, ${firstColor} 50%, ${firstColor} 75%, ${color} 75%); background-size: 30px 30px;`
        } else return "";
      } else return "";
    },
    "}",

    //state active
    ".active .bp3-progress-meter.bp3-progress-meter.bp3-progress-meter",
    ["background-color", "color", "color", ".active"],
    () => {
      const value = getResponsiveSetting(settings, "stripes_color", ".active");
      const firstColor = getResponsiveSetting(settings, "color", ".active")?.color || "rgba(92, 112, 128, 0.8)";
      const switcher = getResponsiveSetting(settings, "stripes", ".active", true);

      if (value && switcher) {
        if (value.color) {
          const color = value.color;

          return `background: linear-gradient(-45deg, ${firstColor}  25%, ${color} 25%, ${color} 50%, ${firstColor} 50%, ${firstColor} 75%, ${color} 75%); background-size: 30px 30px;`
        } else return "";
      } else return "";
    },
    "}",


  ];

  return styledString(styles, settings)
}
