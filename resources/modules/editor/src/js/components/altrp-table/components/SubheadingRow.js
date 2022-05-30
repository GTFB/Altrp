import styled from 'styled-components';
import {getResponsiveSetting} from "../../../../../../front-app/src/js/functions/getResponsiveSetting";
import {
  dimensionsControllerToStyles,
  typographicControllerToStyles
} from "../../../../../../front-app/src/js/helpers/styles";
const SubheadingRow = styled.div`
${
  (props)=>{
    const {settings, groupIndex} = props;
    const groupsStylesSettings = getResponsiveSetting(settings, 'tables_groups');
    const groupsSettings = getResponsiveSetting(settings, 'tables_settings_for_subheading');
    const {transition} = _.get(groupsSettings, groupIndex - 1, {});
    if(! _.isArray(groupsStylesSettings) || ! groupIndex){
      return '';
    }
    let styles;
    if(groupIndex > groupsStylesSettings.length){
      styles = groupsStylesSettings[groupsStylesSettings.length - 1];
    } else {
      styles = groupsStylesSettings[groupIndex - 1];
    }
    if(! styles){
      return '';
    }
    if(! _.isObject(styles)){
      return '';
    }
    const {
      cell_alignment,
      padding,
      color,
      bg_color,
      typographic,
    } = styles;
    let stringStyles =  `&.altrp-table-tr .altrp-table-td{`;
    if(transition?.size){
      stringStyles += `transition-duration: ${transition.size}s;`;
    }
    if(_.isObject(padding)){
      stringStyles += dimensionsControllerToStyles(padding)
    }
    if(_.isObject(typographic)){
      stringStyles += typographicControllerToStyles(typographic)
    }
    if(cell_alignment){
      stringStyles += `text-align: ${cell_alignment};`;
    }
    if(color?.color){
      stringStyles += `color: ${color.color};`;
    }
    if(bg_color?.color){
      stringStyles += `background-color: ${bg_color.color};`;
    }

    stringStyles += `}&.altrp-table-tr .altrp-table-td:hover{`;

    const cell_alignment_hover = styles['cell_alignment_:hover_'];
    const padding_hover = styles['padding_:hover_'];
    const color_hover = styles['color_:hover_'];
    const bg_color_hover = styles['bg_color_:hover_'];
    const typographic_hover = styles['typographic_:hover_'];

    if(_.isObject(padding_hover)){
      stringStyles += dimensionsControllerToStyles(padding_hover)
    }
    if(_.isObject(typographic_hover)){
      stringStyles += typographicControllerToStyles(typographic_hover)
    }
    if(cell_alignment_hover){
      stringStyles += `text-align: ${cell_alignment_hover};`;
    }
    if(color_hover?.color){
      stringStyles += `color: ${color_hover.color};`;
    }
    if(bg_color_hover?.color){
      stringStyles += `background-color: ${bg_color_hover.color};`;
    }
    stringStyles += `}`;
    return stringStyles;
  }
}`;

export default SubheadingRow
