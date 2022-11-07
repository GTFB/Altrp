import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {btnStyles} from "./ButtonComponent";

/**
 * @return {string}
 */
export default function DropbarWidgetComponent(settings) {

  const styles = [
    ...btnStyles(settings)
  ];

  return styledString(styles, settings);
}
