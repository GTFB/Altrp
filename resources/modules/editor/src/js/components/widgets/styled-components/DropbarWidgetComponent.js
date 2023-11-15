import {sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {btnStyles} from "./ButtonComponent";

/**
 * @return {string}
 */
export default function DropbarWidgetComponent(settings) {

  const styles = [
    ...btnStyles(settings, true)
  ];

  const justify = getResponsiveSetting(settings, "justify_content", );
  let stylesInString = ''
  if(justify){
    stylesInString += `
& .btn-container-column{
  width: 100%;
}
& .btn-container-row{
  width: 100%;
  justify-content: ${justify};
}
& .altrp-btn{
  justify-content: ${justify};
}

`
  }
  stylesInString +=  styledString(styles, settings);

  return stylesInString
}
