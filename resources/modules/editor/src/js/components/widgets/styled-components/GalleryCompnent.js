import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

const GalleryComponent = styled.div`& .altrp-gallery-img-container{
${({settings}) => {
  let styles = '';
  const border_type = getResponsiveSetting(settings, 'border_type');
  styles += '';
  if(border_type){
    styles += `border-style: ${border_type};`
  }
  return styles;
}
}}
& .altrp-gallery-img-container:hover{
${({settings}) => {
  let styles = '';
  const border_type = getResponsiveSetting(settings, 'border_type', ':hover');
  styles += '';
  if(border_type){
    styles += `border-style: ${border_type};`
  }
  return styles;
}
    }}`;

export default GalleryComponent;