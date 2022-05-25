import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/functions/getResponsiveSetting";

const PaginationComponent = styled.div`
& .altrp-pagination-pages__item{
${({settings}) => {
  let styles = '';
  const width_count_item = getResponsiveSetting(settings, 'width_count_item');
  const height_count_item = getResponsiveSetting(settings, 'height_count_item');
  if (!width_count_item) {
    styles += `width: 35px;`;
    styles += `padding-left: 0;`;
    styles += `padding-right: 0;`;
  } else if(width_count_item.size && width_count_item.unit){
    styles += `width: ${width_count_item.size}${width_count_item.unit};`;
    styles += `padding-left: 0;`;
    styles += `padding-right: 0;`;
  }
  if (! height_count_item) {
    styles += `height: 35px;`;
    styles += `padding-top: 0;`;
    styles += `padding-bottom: 0;`;
  } else if(height_count_item.size && height_count_item.unit){
    styles += `height: ${height_count_item.size}${height_count_item.unit};`;
    styles += `padding-top: 0;`;
    styles += `padding-bottom: 0;`;
  }
  return styles;
}}
}
`;

export default PaginationComponent;
