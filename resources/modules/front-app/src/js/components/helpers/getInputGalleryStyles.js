import {styledString} from '../../helpers/styles';
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
      let width = 100 / columns + '%';
      let v_gap = getResponsiveSetting(settings, 'v_gap')
      if(v_gap && v_gap.size && columns > 1){
        width = `calc(${width} - ${(v_gap.size * (columns - 1)) / columns  + (v_gap.unit || 'px')})`
      }
      styles += `repeat(${columns}, ${width});`
      const alignment = getResponsiveSetting(settings, 'alignment');

      styles +='}'
      styles +='}'
      return styles
    },

    '.input-gallery-wrapper',
    ['column-gap', 'v_gap', 'slider'],
    ['row-gap', 'h_gap', 'slider'],
    '}',
    //<editor-fold description=items>
    '.input-gallery__item.input-gallery__item',
    ['height', 'height', 'slider'],
    ['background-color', 'background', 'color'],
    ['background-image', 'gradient', 'gradient'],
    ['box-shadow', 'box_shadow', 'shadow'],
    ['border-radius', 'radius', 'dimensions'],
    ['border-style', 'b_style', '',],
    ['border-width', 'b_width', 'dimensions',],
    ['border-color', 'b_color', 'color',],
    '}',
    /**
     * hover
     */

    '.input-gallery__item.input-gallery__item:hover',
    ['background-color', 'background', 'color', ':hover'],
    ['background-image', 'gradient', 'gradient', ':hover'],
    ['box-shadow', 'box_shadow', 'shadow', ':hover'],
    ['border-radius', 'radius', 'dimensions', ':hover'],
    ['border-style', 'b_style', '', ':hover'],
    ['border-width', 'b_width', 'dimensions', ':hover'],
    ['border-color', 'b_color', 'color', ':hover'],
    '}',
    /**
     * active
     */

    //</editor-fold>
    //<editor-fold description=delete>

    '.input-gallery__delete.input-gallery__delete',
    ['height', 'delete_s', 'slider'],
    ['width', 'delete_s', 'slider'],
    ['top', 'delete_o', 'slider'],
    ['right', 'delete_o', 'slider'],

    '}',
    //</editor-fold>
    //state-disabled
    '.state-disabled .input-gallery-wrapper.input-gallery-wrapper',
    ['column-gap', 'v_gap', 'slider', '.state-disabled'],
    ['row-gap', 'h_gap', 'slider', '.state-disabled'],
    '}',
    //<editor-fold description=items>
    '.state-disabled .input-gallery__item.input-gallery__item.input-gallery__item',
    ['height', 'height', 'slider', '.state-disabled'],
    ['background-color', 'background', 'color', '.state-disabled'],
    ['background-image', 'gradient', 'gradient', '.state-disabled'],
    ['box-shadow', 'box_shadow', 'shadow', '.state-disabled'],
    ['border-radius', 'radius', 'dimensions', '.state-disabled'],
    ['border-style', 'b_style', '', '.state-disabled'],
    ['border-width', 'b_width', 'dimensions', '.state-disabled'],
    ['border-color', 'b_color', 'color', '.state-disabled'],
    '}',

    '.state-disabled .input-gallery__delete.input-gallery__delete.input-gallery__delete',
    ['height', 'delete_s', 'slider', '.state-disabled'],
    ['width', 'delete_s', 'slider', '.state-disabled'],
    ['top', 'delete_o', 'slider', '.state-disabled'],
    ['right', 'delete_o', 'slider', '.state-disabled'],
    '}',
    //state active
    '.active .input-gallery-wrapper',
    ['column-gap', 'v_gap', 'slider', '.active'],
    ['row-gap', 'h_gap', 'slider', '.active'],
    '}',
    //<editor-fold description=items>
    '.active .input-gallery__item.input-gallery__item',
    ['height', 'height', 'slider', '.active'],
    ['background-color', 'background', 'color', '.active'],
    ['background-image', 'gradient', 'gradient', '.active'],
    ['box-shadow', 'box_shadow', 'shadow', '.active'],
    ['border-radius', 'radius', 'dimensions', '.active'],
    ['border-style', 'b_style', '', '.active'],
    ['border-width', 'b_width', 'dimensions', '.active'],
    ['border-color', 'b_color', 'color', '.active'],
    '}',

    '.active .input-gallery__delete.input-gallery__delete',
    ['height', 'delete_s', 'slider', '.active'],
    ['width', 'delete_s', 'slider', '.active'],
    ['top', 'delete_o', 'slider', '.active'],
    ['right', 'delete_o', 'slider', '.active'],
    '}',
  ];
  return styledString(styles, settings)
}

