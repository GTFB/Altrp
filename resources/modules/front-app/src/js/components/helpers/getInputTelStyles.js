import {colorPropertyStyled, gradientStyled, styledString, typographicControllerToStyles} from "../../helpers/styles";
import getResponsiveSetting from "../../functions/getResponsiveSetting";

/**
 *
 * @param {{}} settings
 * @param {string} elementId
 */
export default function getInputTextCommonStyles(settings, elementId) {
  let styles = [
    //<editor-fold description="стили лэйбла">
    '.altrp-field-label',
      ['background-color', 'label_background_color', 'color'],
      ['padding', 'label_padding', 'dimensions'],
      ['color', 'label_style_font_color', 'color'],
      ['', 'label_style_font_typographic', 'typographic'],
      ['top', 'label_position_top', 'slider'],
      ['left', 'label_position_left', 'slider'],
    '}',
    '.altrp-field-label:hover',
      ['background-color', 'label_background_color', 'color', ':hover'],
      ['color', 'label_style_font_color', 'color', ':hover'],
      ['', 'label_style_font_typographic', 'typographic', ':hover'],
    '}',
    '.altrp-field-label-container',
      ['width', 'label_width', 'slider'],
    '}',
    '.altrp-label-icon',
      ['padding', 'icon_padding', 'dimensions'],
      ['width', 'icon_size', 'slider'],
      ['height', 'icon_size', 'slider'],
    '}',
    '.altrp-label-icon:hover',
      ['padding', 'icon_padding', 'dimensions', ':hover'],
      ['width', 'icon_size', 'slider', ':hover'],
      ['height', 'icon_size', 'slider', ':hover'],
    '}',

    '.altrp-label-icon svg',
      ['width', 'icon_size', 'slider'],
      ['height', 'icon_size', 'slider'],
      ['background-color', 'icon_color_background', 'color'],
      ['fill', 'icon_color', 'color'],
      ['stroke', 'icon_color', 'color'],
    '}',
    '.altrp-label-icon svg path',
      ['fill', 'icon_color', 'color'],
      ['stroke', 'icon_color', 'color'],
    '}',
    '.altrp-label-icon img',
      ['width', 'icon_size', 'slider'],
      ['height', 'icon_size', 'slider'],
      ['background-color', 'icon_color_background', 'color'],
    '}',
    '.altrp-label-icon:hover svg path',
      ['fill', 'icon_color', 'color', ':hover'],
      ['stroke', 'icon_color', 'color', ':hover'],
    '}',
    '.altrp-label-icon:hover img',
      ['width', 'icon_size', 'slider', ':hover'],
      ['height', 'icon_size', 'slider', ':hover'],
      ['background-color', 'icon_color_background', 'color', ':hover'],
    '}',
    //</editor-fold>
    //<editor-fold description="стили инпута">
    '.bp3-input-group',
      ['width', 'field_width', 'slider'],
      ['padding', 'position_margin', 'dimensions'],
    '}',

    'input:-internal-autofill-selected',
      ['background-color', 'background_style_background_color', 'color',],

    '}',
    '.flag-dropdown.flag-dropdown',
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom");
      const borderColor = getResponsiveSetting(settings, "border_color");
      if (borderColor && !borderGradient) {
        return colorPropertyStyled(borderColor, 'border-color');
      }
    },
    '}',
    '.bp3-input.bp3-input.bp3-input.bp3-input.bp3-input.bp3-input',
    ['padding', 'position_padding', 'dimensions'],

    '}',
    '.bp3-input.bp3-input.bp3-input',
      ['height', 'field_height', 'slider'],
      ['text-align', 'placeholder_and_value_alignment_position_section', ],
      ['', 'field_font_typographic', 'typographic'],
      ['color', 'field_font_color', 'color'],
      // ['background-color', 'background_style_background_color', 'color'],
      () => {
        const opacitySetting = getResponsiveSetting(settings, 'background_section_opacity');
        return opacitySetting ? `opacity: ${opacitySetting.size};` : '';
      },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom");
      const backgroundColor = getResponsiveSetting(settings, "background_style_background_color");
      if (borderGradient) {
        let bg = backgroundColor?.color ? backgroundColor.color : 'rgba(255,255,255,1)'
        let textareaText = getResponsiveSetting(settings, 'input_style_gradient_text')?.replace(/;/g, '') || ''
        return `background: linear-gradient(${bg},${bg}) padding-box, ${textareaText} border-box; border-color: transparent;`;
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom");
      const backgroundColor = getResponsiveSetting(settings, "background_style_background_color");
      if (backgroundColor && !borderGradient) {
        return colorPropertyStyled(backgroundColor, 'background');
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom");
      const borderColor = getResponsiveSetting(settings, "border_color");
      if (borderColor && !borderGradient) {
        return colorPropertyStyled(borderColor, 'border-color');
      }
    },
      ['border-style', 'border_type',],
      ['border-width', 'border_width', 'dimensions'],
      // ['border-color', 'border_color', 'color'],
      ['border-radius', 'border_radius', 'dimensions'],
      ['', 'box_shadow', 'shadow'],
    () => {
      const toggle = getResponsiveSetting(settings, "disable_box_shadow")
      if (toggle) {
        return 'box-shadow: none'
      }
    },
    '}',

    '.state-disabled .bp3-input.bp3-input.bp3-input.bp3-input.bp3-input',
      ['height', 'field_height', 'slider', '.state-disabled'],
      ['text-align', 'placeholder_and_value_alignment_position_section', '', '.state-disabled' ],
      ['padding', 'position_padding', 'dimensions', '.state-disabled'],
      ['', 'field_font_typographic', 'typographic', '.state-disabled'],
      ['color', 'field_font_color', 'color', '.state-disabled'],
      ['background-color', 'background_style_background_color', 'color', '.state-disabled'],
      () => {
        const opacitySetting = getResponsiveSetting(settings, 'background_section_opacity', '.state-disabled');
        return opacitySetting ? `opacity: ${opacitySetting.size};` : '';
      },
      ['border-style', 'border_type', '', '.state-disabled'],
      ['border-width', 'border_width', 'dimensions', '.state-disabled'],
      ['border-color', 'border_color', 'color', '.state-disabled'],
      ['border-radius', 'border_radius', 'dimensions', '.state-disabled'],
      ['', 'box_shadow', 'shadow', '.state-disabled'],
    () => {
      const toggle = getResponsiveSetting(settings, "disable_box_shadow", '.state-disabled')
      if (toggle) {
        return 'box-shadow: none'
      }
    },
    '}',

    '.active .bp3-input.bp3-input.bp3-input.bp3-input.bp3-input',
    ['height', 'field_height', 'slider', '.active'],
    ['text-align', 'placeholder_and_value_alignment_position_section', '', '.active' ],
    ['padding', 'position_padding', 'dimensions', '.active'],
    ['', 'field_font_typographic', 'typographic', '.active'],
    ['color', 'field_font_color', 'color', '.active'],
    ['background-color', 'background_style_background_color', 'color', '.active'],
    () => {
      const opacitySetting = getResponsiveSetting(settings, 'background_section_opacity', '.active');
      return opacitySetting ? `opacity: ${opacitySetting.size};` : '';
    },
    ['border-style', 'border_type', '', '.active'],
    ['border-width', 'border_width', 'dimensions', '.active'],
    ['border-color', 'border_color', 'color', '.active'],
    ['border-radius', 'border_radius', 'dimensions', '.active'],
    ['', 'box_shadow', 'shadow', '.active'],
    () => {
      const toggle = getResponsiveSetting(settings, "disable_box_shadow", '.active')
      if (toggle) {
        return 'box-shadow: none'
      }
    },
    '}',

    '.bp3-input.bp3-input.bp3-input.bp3-input::placeholder',
      ['', 'placeholder_style_font_typographic', 'typographic'],
      ['color', 'placeholder_style_font_color', 'color'],
    '}',

    'bp3-input:hover',
      ['', 'field_font_typographic', 'typographic', ':hover'],
      ['color', 'field_font_color', 'color', ':hover'],
      // ['background-color', 'background_style_background_color', 'color',':hover'],
      // ['border-color', 'border_color', 'color',':hover'],
      ['border-radius', 'border_radius', 'dimensions',':hover'],
      ['', 'box_shadow', 'shadow',':hover'],
      () => {
        const opacitySetting = getResponsiveSetting(settings, 'background_section_opacity', ':hover');
        return opacitySetting ? `opacity: ${opacitySetting.size};` : '';
      },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom", ":hover");
      const backgroundColor = getResponsiveSetting(settings, "background_style_background_color", ":hover");
      if (borderGradient) {
        let bg = backgroundColor?.color ? backgroundColor.color : 'rgba(255,255,255,1)'
        let textareaText = getResponsiveSetting(settings, 'input_style_gradient_text', ":hover")?.replace(/;/g, '') || ''
        return `background: linear-gradient(${bg},${bg}) padding-box, ${textareaText} border-box; border-color: transparent;`;
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom", ":hover");
      const backgroundColor = getResponsiveSetting(settings, "background_style_background_color", ":hover");
      if (backgroundColor && !borderGradient) {
        return colorPropertyStyled(backgroundColor, 'background');
      }
    },
    () => {
      const borderGradient = getResponsiveSetting(settings, "input_style_border_gradient_custom", ":hover");
      const borderColor = getResponsiveSetting(settings, "border_color", ":hover");
      if (borderColor && !borderGradient) {
        return colorPropertyStyled(borderColor, 'border-color');
      }
    },
    '}',
    '.bp3-input.bp3-input.bp3-input.bp3-input:focus',
      ['', 'field_font_typographic', 'typographic', ':focus'],
      ['color', 'field_font_color', 'color', ':focus'],
      ['background-color', 'background_style_background_color', 'color',':focus'],
      ['border-color', 'border_color', 'color',':focus'],
      ['border-radius', 'border_radius', 'dimensions',':focus'],
      ['', 'box_shadow', 'shadow',':focus'],
      () => {
        const opacitySetting = getResponsiveSetting(settings, 'background_section_opacity', ':focus');
        return opacitySetting ? `opacity: ${opacitySetting.size};` : '';
      },
    '}',
    '.bp3-input.bp3-input.bp3-input.bp3-input:hover::placeholder',
      ['', 'placeholder_style_font_typographic', 'typographic',':hover'],
      ['color', 'placeholder_style_font_color', 'color', ':hover'],
    '}',
    '.bp3-input.bp3-input.bp3-input.bp3-input:focus::placeholder',
      ['', 'placeholder_style_font_typographic', 'typographic',':focus'],
      ['color', 'placeholder_style_font_color', 'color', ':focus'],
    '}',
    //</editor-fold>
    '.altrp-field-label--required::after',
    ['', 'required_style_font_typographic', 'typographic'],
    ['color', 'required_style_font_color', 'color'],
    '}',
    '.mask-mismatch-message',
    ['margin', 'mismatch_message_margin', 'dimensions'],
    ['padding', 'mismatch_message_padding', 'dimensions'],
    ['color', 'mismatch_message_font_color', 'color'],
    ['', 'mismatch_message_typographic', 'typographic'],
    '}',
    '.react-tel-input .flag-dropdown',
    ['width', 'dd_w', 'slider'],
    '}',
  ];
  return styledString(styles, settings)
}
