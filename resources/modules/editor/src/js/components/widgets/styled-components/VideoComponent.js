
import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";

export default function VideoComponent(settings) {
  const styles = [
    "altrp-video",
    ["width", "video_width", "slider"],
    ["height", "video_height", "slider"],
    "}",
    //state disabled
    ".state-disabled .altrp-video",
    ["width", "video_width", "slider", ".state-disabled"],
    ["height", "video_height", "slider", ".state-disabled"],
    "}",
    //state active
    ".active .altrp-video",
    ["width", "video_width", "slider", ".active"],
    ["height", "video_height", "slider", ".active"],
    "}"
  ];

  return styledString(styles, settings)
}
