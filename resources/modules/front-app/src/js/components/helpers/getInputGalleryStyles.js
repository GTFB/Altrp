import {styledString} from "../../helpers/styles";
const {getResponsiveSetting} = window.altrpHelpers;

/**
 *
 * @param {{}} settings
 * @param {string} elementId
 */
export default function getInputGalleryStyles(settings, elementId) {
  let styles = [
    ()=>{
      let styles ='&{';
      let columns = getResponsiveSetting(settings, 'columns')
      if(! columns){
        columns = 6
      }
      styles += '.input-gallery-wrapper{grid-template-columns:'
      for(let i = 0; i < columns; i++){
        styles += '1fr '
      }
      styles +=';'
      styles +='}'
      styles +='}'
      return styles
    },
    //<editor-fold description=items>
    '.input-gallery__item',
    ['background-color', 'background', 'color'],
    '}',
    /**
     * hover
     */
    '.bp3-file-input_preview:hover',
    ['background-color', 'background', 'color', ':hover'],
    '}',
    /**
     * active
     */
    '.bp3-file-input_preview:active',
    ['background-color', 'background', 'color', '.active'],
    '}',
    //</editor-fold>
  ];
  return styledString(styles, settings)
}

