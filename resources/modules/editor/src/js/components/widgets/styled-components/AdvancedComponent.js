import {defaultStyled, sliderStyled, styledString} from "../../../../../../front-app/src/js/helpers/styles";
import {getResponsiveSetting} from "../../../../../../front-app/src/js/helpers";

/**
 * @return {string}
 */

export default function AdvancedComponent(settings) {

  const styles = [
    ["z-index", "z_index"],

    () => {
      const value = getResponsiveSetting(settings, "advanced_opacity");

      if(value && value.size) {
        return `opacity: ${value.size};`
      } else {
        return ''
      }
    },
    // () => {
    //   let element_css_editor = getResponsiveSetting(settings, "element_css_editor");
    //   console.log(element_css_editor);
    //   return _.isString(element_css_editor) ? element_css_editor.replace(/__selector__/g, '&') : '';
    // },

    ["padding", "positioning_padding", "dimensions"],
    ["margin", "positioning_margin", "dimensions"],

    ["width", "positioning_width_type"],
    ["width", "positioning_custom_width", "slider"],

    ["align-self", "positioning_vertical_align"],

    ["position", "positioning_position_type", "", ""],

    ["left", "positioning_horizontal_offset", "slider"],
    ["bottom", "positioning_vertical_offset", "slider"],
  ];

  return styledString(styles, settings)
}
