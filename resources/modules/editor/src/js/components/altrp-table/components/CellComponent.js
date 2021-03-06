import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";
import {verticalAlignToAlignItems} from "../../../../../../front-app/src/js/helpers/styles";

const CellComponent = styled.div`${({settings, column})=>{
  const {
    table_transpose,
  } = settings;
  if(! table_transpose){
    return ''
  }
  const {column_cell_vertical_alignment, header_full_width} = column;
  const table_style_other_width = getResponsiveSetting(settings, 'table_style_other_width');
  let verticalAlign = getResponsiveSetting(settings, 'cell_vertical_alignment');
  verticalAlign = verticalAlignToAlignItems(verticalAlign);
  if(column_cell_vertical_alignment){
    verticalAlign = verticalAlignToAlignItems(column_cell_vertical_alignment);
  }
  let styles = '&.altrp-table-td{';
  if(verticalAlign){
    styles += `
    display: flex;
    align-items: ${verticalAlign};
    .altrp-table-td__default-content{
      display: block;
      width: 100%;
    }
    `
  }
  if(header_full_width){
    return `&.altrp-table-td{display:none;}`
  }
  styles += `
  width: ${_.get(table_style_other_width, 'size') + (_.get(table_style_other_width, 'unit') || 'px')};
  `;
  styles += `}`;
  return styles;
}}`;

export default CellComponent;