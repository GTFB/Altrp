import styled from "styled-components";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import { dimensionsControllerToStyles, backgroundColorControllerToStyles, gradientControllerToStyles, filtersControllerToStyles } from "../../../../../../front-app/src/js/helpers/styles";

export default styled.div`

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

  const background_color = getResponsiveSetting(settings, 'background_color');

  if (background_color) {
    styles += backgroundColorControllerToStyles(background_color);
  }

  const background_color_hover = getResponsiveSetting(settings, 'background_color_:hover_')

  if (background_color_hover) {
    styles += backgroundColorControllerToStyles(background_color_hover, 'hover');
  }

  const gradient = getResponsiveSetting(settings, 'gradient');

  if (gradient) {
    styles += gradientControllerToStyles(gradient);
  }

  const filters = getResponsiveSetting(settings, 'image_style_text_shadow')

  if (filters) {
    styles += filtersControllerToStyles(filters);
  }

  return styles;
}
}
`;

