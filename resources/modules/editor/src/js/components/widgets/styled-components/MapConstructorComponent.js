import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function MapConstructorComponent(settings) {
  const styles = [
    "altrp-image",
    ["height", "style_height", "slider"],
    "}",

    "altrp-btn",
    ["margin", "style_margin", "dimensions"],
    "}"
  ];

  return styledString(styles, settings)
}

