import styled from 'styled-components';
import {dimensionsControllerToStyles, borderWidthStyled} from "../../../../../front-app/src/js/helpers/styles";
import getResponsiveSetting from "../../../../../front-app/src/js/functions/getResponsiveSetting";

const AltrpCarouselWrapper = styled.div`
& .altrp-carousel-slide{
${(props)=>{
  let slideStyles = '';
  const {settings} = props;
  const {
    border_color_slides_style,
    border_width_slides_style,
    border_type_slide,
  } = settings;
  if(border_color_slides_style){
    slideStyles += `border-color:${border_color_slides_style.color};`
  }
  if(border_type_slide){
    slideStyles += `border-style:${border_type_slide};`
  }
  if(border_width_slides_style) {
    slideStyles += borderWidthStyled(border_width_slides_style)
  }
  return slideStyles;
}}
}
& .slick-current .altrp-carousel-slide{
${(props)=>{
  let slideStyles = '';
  const {settings} = props;
  const
    border_color_slides_style = getResponsiveSetting(settings, 'border_color_slides_style', '.active'),
    border_width_slides_style = getResponsiveSetting(settings, 'border_width_slides_style', '.active'),
    border_type_slide = getResponsiveSetting(settings, 'border_type_slide', '.active');

  if(border_color_slides_style){
    slideStyles += `border-color:${border_color_slides_style.color};`
  }
  if(border_type_slide){
    slideStyles += `border-style:${border_type_slide};`
  }
  if(border_width_slides_style) {
    slideStyles += borderWidthStyled(border_width_slides_style)
  }
  return slideStyles;
}}
}`;

export default AltrpCarouselWrapper;
