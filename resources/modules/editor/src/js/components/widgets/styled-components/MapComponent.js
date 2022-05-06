import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function MapComponent(settings) {
  const styles = [
    "altrp-image",
    ["height", "style_height", "slider"],
    "}",

    "altrp-btn",
    ["margin", "style_margin", "dimensions"],
    "}",

    //state disabled
    "altrp-image",
    ["height", "style_height", "slider", ".state-disabled"],
    "}",

    "altrp-btn",
    ["margin", "style_margin", "dimensions", ".state-disabled"],
    "}",

    //state active
    "altrp-image",
    ["height", "style_height", "slider", ".active"],
    "}",

    "altrp-btn",
    ["margin", "style_margin", "dimensions", ".active"],
    "}"
  ]

  return styledString(styles, settings)
};
