import {colorPropertyStyled, gradientStyled, styledString} from "../../helpers/styles";
import {getResponsiveSetting} from "../../functions/getResponsiveSetting";

/**
 *
 * @param {{}} settings
 */
export default function getInputSelectStyles(settings) {
  let styles = [
    //<editor-fold description="стили лэйбла">
    '.altrp-field-label-container',
    ['background-color', 'label_background_color', 'color'],
    ['padding', 'label_padding', 'dimensions'],
    ['color', 'label_style_font_color', 'color'],
    ['top', 'label_position_top', 'slider'],
    ['left', 'label_position_left', 'slider'],
    ['width', 'label_width', 'slider'],
    '}',
    '.altrp-field-label',
    ['', 'label_style_font_typographic', 'typographic'],
    '}',
    '.altrp-label-icon',
    ['padding', 'icon_padding', 'dimensions'],
    // ['width', 'icon_size', 'slider'],
    // ['height', 'icon_size', 'slider'],
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
    //<editor-fold description="стили иконок">
    '.bp3-icon_text-widget.bp3-icon_text-widget.bp3-icon_text-widget',
    ['margin', 'input_icons_margin', 'dimensions'],
    ['padding', 'input_icons_padding', 'dimensions'],
    ['border-radius', 'input_icons_radius', 'dimensions'],
    '}',
    '.bp3-icon_text-widget',
    ['background-color', 'input_icons_background', 'color', ],
    '}',
    '.bp3-icon_text-widget:hover',
    ['background-color', 'input_icons_background', 'color', ':hover'],
    '}',
    '.bp3-icon_text-widget:active',
    ['background-color', 'input_icons_background', 'color', '.active'],
    '}',
    '.bp3-icon_text-widget svg',
    ['width', 'input_icons_size', 'slider'],
    ['height', 'input_icons_size', 'slider'],
    '}',
    '.bp3-icon_text-widget svg,& .bp3-icon_text-widget path',
    ['fill', 'input_icons_fill', 'color'],
    ['stroke', 'input_icons_stroke', 'color'],
    '}',
    '.bp3-icon_text-widget:hover svg,& .bp3-icon_text-widget:hover path',
    ['fill', 'input_icons_fill', 'color', ':hover'],
    ['stroke', 'input_icons_stroke', 'color', ':hover'],
    '}',
    '.bp3-icon_text-widget:active svg,& .bp3-icon_text-widget:active path',
    ['fill', 'input_icons_fill', 'color', '.active'],
    ['stroke', 'input_icons_stroke', 'color', '.active'],
    '}',
    '.bp3-icon_text-widget img',
    ['width', 'input_icons_size', 'slider'],
    ['height', 'input_icons_size', 'slider'],
    '}',
    //</editor-fold>
    //<editor-fold description="стили кнопки">
    ()=>{
      const alignment = getResponsiveSetting(settings, 'alignment')
      switch (alignment){
        case 'flex-start':{
          return '& .bp3-popover-target.bp3-popover-target{flex-grow:0}'
        }
        case 'flex-end':{
          return '& .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:flex-end;}'
        }
        case 'center':{
          return '& .bp3-popover-target.bp3-popover-target{flex-grow:0}& .bp3-popover-wrapper{justify-content:center;}'
        }
      }
    },
    '.bp3-popover-target',
    ['width', 'field_width', 'slider'],
    ['margin', 'position_margin', 'dimensions'],
    '}',
    '.bp3-button.bp3-button',
    ['height', 'field_height', 'slider'],
    ['text-align', 'placeholder_and_value_alignment_position_section', ],
    ['padding', 'position_padding', 'dimensions'],
    ['', 'field_font_typographic', 'typographic'],
    ['color', 'field_font_color', 'color'],
    ['opacity', 'background_section_opacity', 'slider'],
    ['border-style', 'border_type',],
    ['border-width', 'border_width', 'dimensions'],
    ['border-color', 'border_color', 'color'],
    ['border-radius', 'border_radius', 'dimensions'],
    ['', 'box_shadow', 'shadow'],
    '}',
    ()=>{
      let styles = '.bp3-button.bp3-button{';
      let button_gradient = getResponsiveSetting(settings, 'button_gradient')

      if(button_gradient?.isWithGradient){
        styles += gradientStyled(button_gradient)
      } else {
        styles += colorPropertyStyled(getResponsiveSetting(settings, 'button_background_color'), 'background-color')
        styles += 'background-blend-mode: color-burn;'
      }

      styles += '}'
      styles += '.bp3-button:hover{'
      button_gradient = getResponsiveSetting(settings, 'button_gradient', ':hover')

      if(button_gradient?.isWithGradient){
        styles += gradientStyled(button_gradient)
      } else {
        styles += colorPropertyStyled(getResponsiveSetting(settings, 'button_background_color', ':hover'), 'background-color')
        styles += 'background-blend-mode: color-burn;'
      }

      styles += '}'
      styles += '.bp3-button.bp3-button:active{'
      button_gradient = getResponsiveSetting(settings, 'button_gradient', '.active')

      if(button_gradient?.isWithGradient){
        styles += gradientStyled(button_gradient)
      } else {
        styles += colorPropertyStyled(getResponsiveSetting(settings, 'button_background_color', '.active'), 'background-color', '!important')
        styles += 'background-blend-mode: color-burn;'
      }
      styles += '}'
      return styles;
    },
    '.bp3-button.bp3-button:hover',
    ['', 'field_font_typographic', 'typographic', ':hover'],
    ['color', 'field_font_color', 'color', ':hover'],
    ['border-color', 'border_color', 'color',':hover'],
    ['border-radius', 'border_radius', 'dimensions',':hover'],
    '.bp3-icon svg',
    ['height', 'i_size', 'slider',':hover'],
    ['width', 'i_size', 'slider',':hover'],
    ['margin', 'i_margin', 'dimensions',':hover'],
    '}',
    '.bp3-icon path',
    ['fill', 'i_color', 'color',':hover'],
    '}',
    '.bp3-icon img',
    ['height', 'i_size', 'slider',':hover'],
    ['width', 'i_size', 'slider',':hover'],
    ['margin', 'i_margin', 'dimensions',':hover'],
    '}',
    ['', 'box_shadow', 'shadow',':hover'],
    '}',
    '.bp3-button.bp3-button:active',
    ['', 'field_font_typographic', 'typographic', '.active'],
    ['color', 'field_font_color', 'color', '.active'],
    ['border-color', 'border_color', 'color','.active'],
    ['border-radius', 'border_radius', 'dimensions','.active'],
    ['', 'box_shadow', 'shadow','.active'],

    '.bp3-icon svg',
    ['height', 'i_size', 'slider','.active'],
    ['width', 'i_size', 'slider','.active'],
    ['margin', 'i_margin', 'dimensions','.active'],
    '}',
    '.bp3-icon path',
    ['fill', 'i_color', 'color','.active'],
    '}',
    '.bp3-icon img',
    ['height', 'i_size', 'slider','.active'],
    ['width', 'i_size', 'slider','.active'],
    ['margin', 'i_margin', 'dimensions','.active'],
    '}',
    '}',
    // '.bp3-input.bp3-input.bp3-input.bp3-input::placeholder',
    // ['', 'placeholder_style_font_typographic', 'typographic'],
    // ['color', 'placeholder_style_font_color', 'color'],
    // '}',
    // '.bp3-input.bp3-input.bp3-input.bp3-input:hover::placeholder',
    // ['', 'placeholder_style_font_typographic', 'typographic',':hover'],
    // ['color', 'placeholder_style_font_color', 'color', ':hover'],
    // '}',
    // '.bp3-input.bp3-input.bp3-input.bp3-input:focus::placeholder',
    // ['', 'placeholder_style_font_typographic', 'typographic',':focus'],
    // ['color', 'placeholder_style_font_color', 'color', ':focus'],
    // '}',
    //</editor-fold>
    //<editor-fold description="стили иконок">
    '.bp3-icon svg',
    ['height', 'i_size', 'slider'],
    ['width', 'i_size', 'slider'],
    ['margin', 'i_margin', 'dimensions'],
    '}',
    '.bp3-icon path',
    ['fill', 'i_color', 'color'],
    '}',
    '.bp3-icon img',
    ['height', 'i_size', 'slider'],
    ['width', 'i_size', 'slider'],
    ['margin', 'i_margin', 'dimensions'],
    '}',
    //</editor-fold>

  ];
  return styledString(styles, settings)
}

export function getInputSelectPopoverStyles(settings, elementId){
  let styles = [
  //<editor-fold description="стили поповера">
    `.altrp-portal${elementId}`,
    '.bp3-menu-item',
      ['background-color', 'background_style_background_color', 'color'],
      ['color', 'items_font_color', 'color'],
      ['', 'field_font_typographic', 'typographic',],
      ['padding', 'item_padding', 'dimensions'],
    '}',
    '.bp3-popover-content',
      () => `background-color: ${getResponsiveSetting(settings, 'drop_menu_background_color')?.color} !important;`,
    '}',
    '.bp3-menu',
      ['padding', 'menu_padding', 'dimensions'],
      ['background-color', 'drop_menu_background_color', 'color'],
    '}',
    '.bp3-menu-item:hover',
    ['color', 'items_font_color', 'color', ':hover'],
    ['background-color', 'background_style_background_color', 'color',':hover'],
    ['', 'field_font_typographic', 'typographic', ':hover'],
    '}',
    '.bp3-menu-item.bp3-active.bp3-active',
    ['color', 'items_font_color', 'color', '.active'],
    ['background-color', 'background_style_background_color', 'color','.active'],
    ['', 'field_font_typographic', 'typographic', '.active'],
    '}',
    '.bp3-input',
    ['', 'field_font_typographic', 'typographic'],
    ['height', 'si_size', 'slider'],
    ['padding', 'si_padding', 'dimensions'],
    ['color', 'si_color', 'color'],
    ['background-color', 'si_bg_color', 'color'],
    '}',
    '.bp3-input:hover',
    ['color', 'si_color', 'color', ':hover'],
    ['background-color', 'si_bg_color', 'color', ':hover'],
    '}',
    '.bp3-input:focus',
    ['color', 'si_color', 'color', ':focus'],
    ['background-color', 'si_bg_color', 'color', ':focus'],
    '}',
    '.bp3-input-group .bp3-icon svg',
      ['height', 'sii_size', 'slider'],
      ['width', 'sii_size', 'slider'],
      ['margin', 'sii_margin', 'dimensions'],
    '}',
    '.bp3-input-group .bp3-icon path',
      ['fill', 'sii_color', 'color'],
    '}',
    '.bp3-icon-add svg',

    ['height', 'a_size', 'slider'],
    ['width', 'a_size', 'slider'],
    ['margin', 'a_margin', 'dimensions'],
    '}',
    '.bp3-icon-add path',
    ['fill', 'a_color', 'color'],
    '}',
    '.bp3-menu-item:hover .bp3-icon-add path',
    ['fill', 'a_color', 'color', ':hover'],
    '}',
    '}',
  //</editor-fold>
  ];
  return styledString(styles, settings)

}
