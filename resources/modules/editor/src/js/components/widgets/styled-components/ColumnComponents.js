import styled from 'styled-components';
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";
import { dimensionsControllerToStyles } from "../../../../../../front-app/src/js/helpers/styles";

const settingsToStyles = ({ settings }) => {
  let styles = '';

  styles += '&.altrp-column{';
  const style_position_padding = getResponsiveSetting(settings, 'style_position_padding');
  if (style_position_padding) {
    styles += dimensionsControllerToStyles(style_position_padding);
  }
  const layout_column_width = getResponsiveSetting(settings, 'layout_column_width');
  if (layout_column_width) {
    if (Number(layout_column_width)) {
      styles += `width:${layout_column_width}%;`;
    } else {
      styles += `width:${layout_column_width};`;
    }
  }

  styles += '}';
  return styles;
};

export const ColumnDivComponent = styled.div`${settingsToStyles}`;
export const ColumnHeaderComponent = styled.header`${settingsToStyles}`;
export const ColumnFooterComponent = styled.footer`${settingsToStyles}`;
export const ColumnMainComponent = styled.main`${settingsToStyles}`;
export const ColumnArticleComponent = styled.article`${settingsToStyles}`;
export const ColumnSectionComponent = styled.section`${settingsToStyles}`;
export const ColumnAsideComponent = styled.aside`${settingsToStyles}`;
export const ColumnNavComponent = styled.nav`${settingsToStyles}`;

