
import  getResponsiveSetting  from "../../../../../../front-app/src/js/functions/getResponsiveSetting";

const settingsToStyles = ({ settings }) => {
   let styles = '';

   styles += '&.altrp-column{';
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

export const ElementWrapperDivComponent = styled.div`${settingsToStyles}`;
