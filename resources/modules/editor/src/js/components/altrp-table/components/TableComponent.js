import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/functions/getResponsiveSetting";

const TableComponent = styled.div`${({settings, rows})=>{
  if(! getResponsiveSetting(settings, 'table_transpose')){
    return'';
  }
  const table_style_main_width = getResponsiveSetting(settings, 'table_style_main_width');
  const table_style_other_width = getResponsiveSetting(settings, 'table_style_other_width');
  if(_.get(table_style_main_width, 'unit') !== '%'
    && _.get(table_style_other_width, 'unit') !== '%'){
    return'';
  }
  let styles = '';
  styles += `grid-template-columns:${_.get(table_style_main_width, 'size')}${_.get(table_style_main_width, 'unit') || 'px'}`;
  for(let row of rows){
    styles += ` ${_.get(table_style_other_width, 'size')}${_.get(table_style_other_width, 'unit') || 'px'}`;
  }
   styles += ';&&&{width:100%;}';
  return styles
}}`;


export default TableComponent;
