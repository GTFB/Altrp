import styled from 'styled-components';
import {getResponsiveSetting, isEditor} from "../../../../../../front-app/src/js/helpers";
import {dimensionsControllerToStyles} from "../../../../../../front-app/src/js/helpers/styles";
const settingsToStyles = ({settings, columns = []})=>{
  let styles = '';

  styles += '&.altrp-section{z-index: 45;display: flex;';
  const position_style_position_padding = getResponsiveSetting(settings, 'position_style_position_padding');
  if(position_style_position_padding){
    styles += dimensionsControllerToStyles(position_style_position_padding);
  }

  styles += '}';
  if(! isEditor()){
    columns = columns.filter(c=>{
      return _.get(c,'wrapper.state.elementDisplay');
    });
  }
  if(columns.length){
    styles += '& > .altrp-element_column{';
    styles += `width:${100/columns.length}%;`;
    styles += '}';

  }
  return styles;
};

export const SectionDivComponent = styled.div`${settingsToStyles}`;
export const SectionHeaderComponent = styled.header`${settingsToStyles}`;
export const SectionFooterComponent = styled.footer`${settingsToStyles}`;
export const SectionMainComponent = styled.main`${settingsToStyles}`;
export const SectionArticleComponent = styled.article`${settingsToStyles}`;
export const SectionSectionComponent = styled.section`${settingsToStyles}`;
export const SectionAsideComponent = styled.aside`${settingsToStyles}`;
export const SectionNavComponent = styled.nav`${settingsToStyles}`;

