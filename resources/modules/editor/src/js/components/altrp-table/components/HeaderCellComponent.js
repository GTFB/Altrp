import styled from 'styled-components';
import getResponsiveSetting from "../../../../../../front-app/src/js/functions/getResponsiveSetting";
import {verticalAlignToAlignItems} from "../../../../../../front-app/src/js/helpers/styles";

const HeaderCellComponent = styled.div`${({settings, column})=>{
  const {
    table_transpose,
  } = settings;

  if(! table_transpose){
    return `& .altrp-filter-group_range-slider{
    padding-left: 20px;
    padding-right: 20px;
  }`
  }
  const {
    column_cell_vertical_alignment,
    header_full_width,
    header_bg} = column;

  const table_style_main_width = getResponsiveSetting(settings, 'table_style_main_width');
  const table_style_other_width = getResponsiveSetting(settings, 'table_style_other_width');
  let styles = '&.altrp-table-th.altrp-table-cell{';

  let verticalAlign = getResponsiveSetting(settings, 'cell_vertical_alignment');
  verticalAlign = verticalAlignToAlignItems(verticalAlign);
  if (column_cell_vertical_alignment) {
    verticalAlign = verticalAlignToAlignItems(column_cell_vertical_alignment);
  }
  if (verticalAlign) {
    styles += `
    display: flex;
    align-items: ${verticalAlign};
    > span{
      display: block;
      width: 100%;
    }
    `
  }
  if(header_bg){
    styles += `background-color:${header_bg.color};`;
  }
  if(header_full_width){
    styles += `
      grid-column-start: 1;
      grid-column-end: ${column.filteredRows.length + 2};
      width: calc(${_.get(table_style_main_width, 'size') + (_.get(table_style_main_width, 'unit') || 'px')} + (${_.get(table_style_other_width, 'size') + (_.get(table_style_other_width, 'unit') || 'px')}) * ${column.filteredRows.length})
    `;
  } else {
  }

  if(_.get(table_style_main_width, 'unit') !== '%') {
    styles += `
      width: ${_.get(table_style_main_width, 'size') + (_.get(table_style_main_width, 'unit') || 'px')}
    `;
  }

  styles += `}`;

  return styles;
}}`;

export default HeaderCellComponent;
