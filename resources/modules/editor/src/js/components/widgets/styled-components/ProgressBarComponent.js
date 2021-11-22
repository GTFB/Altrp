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


  ];

  return styledString(styles, settings)
}
