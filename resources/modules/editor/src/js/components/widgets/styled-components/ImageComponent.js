import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {dimensionsControllerToStyles} from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`
&& .altrp-image-container{
${props=>{
  const {settings} = props;
  let styles = '';
  const aspect_ratio_size = getResponsiveSetting(settings, 'aspect_ratio_size');

  if(Number(aspect_ratio_size) !== 0) {
    return 'padding:0;'
  }
  const position_padding = getResponsiveSetting(settings, 'position_padding');
  if(position_padding){
    styles +=dimensionsControllerToStyles(position_padding);
  }
  return styles;
}
}
`;