import {getResponsiveSetting} from "../functions/getResponsiveSetting";
import {
  shadowControllerToStyles,
  dimensionsControllerToStyles,
  sliderStyled,
  colorPropertyStyled
} from '../helpers/styles';


const FrontPopupWrapper = window.styled.div`
&{
  overflow: hidden;
${({settings}) => {
  let styles = "";
  const layout_bg = getResponsiveSetting(settings, 'layout_bg')
  styles += `background-color:${_.get(layout_bg, 'color', 'rgba(0,0,0,0.7)')};`
  return styles
}
}
& .popup-content {
  ${({settings}) => {
  let styles = "";
  const height_custom_popup_layout = getResponsiveSetting(settings, 'height_custom_popup_layout')
  if (height_custom_popup_layout) {

  }
  if (settings.width_popup_layout && settings.width_popup_layout.size)
    styles += `width: ${settings.width_popup_layout.size} ${settings.width_popup_layout.unit};`;

  return styles;
}}
}
& .popup-window > .popup-scrollbar > div{
  ${({settings}) => {
  let styles = "";
  const content_position_popup_layout = getResponsiveSetting(settings, 'content_position_popup_layout')
  if (content_position_popup_layout && content_position_popup_layout !== 'flex-start') {
    styles += `align-items:${content_position_popup_layout};`
    styles += `display:flex;`
  }
  return styles;
}}
}
&& .popup-window{
  ${({settings}) => {
  let styles = "";

  let timeout = _.get(getResponsiveSetting(settings, 'time'), 'size', 0)
  const type_popup = getResponsiveSetting(settings, 'type_popup')
  if (type_popup === 'popup') {
    timeout = 0
  }
  if (timeout != 0) {
    styles += `transition-duration: ${timeout}ms;`
  }
  const height_custom_popup_layout = getResponsiveSetting(settings, 'height_custom_popup_layout')
  if (height_custom_popup_layout) {
    styles += `height:${sliderStyled(height_custom_popup_layout)};`
  }
  const content_position_popup_layout = getResponsiveSetting(settings, 'content_position_popup_layout')
  if (content_position_popup_layout) {
    styles += `justify-content:${content_position_popup_layout};`
  }
  const width_popup_layout = getResponsiveSetting(settings, 'width_popup_layout')
  if (width_popup_layout) {
    styles += `width:${sliderStyled(width_popup_layout)};`
  }

  const popup_bg = getResponsiveSetting(settings, 'popup_bg')
  if (popup_bg) {
    styles += `background-color:${popup_bg.color};`
  }
  const popup_pa = getResponsiveSetting(settings, 'popup_pa')
  if (popup_pa) {
    styles += dimensionsControllerToStyles(popup_pa, 'padding')
  }
  const popup_border = getResponsiveSetting(settings, 'popup_border')
  if (popup_border) {
    styles += `border-style:${popup_border};`
  }
  const popup_border_width = getResponsiveSetting(settings, 'popup_border_width')
  if (popup_border_width) {
    styles += dimensionsControllerToStyles(popup_border_width, 'border-width')
  }
  const popup_radius = getResponsiveSetting(settings, 'popup_radius')
  if (popup_radius) {
    styles += dimensionsControllerToStyles(popup_radius, 'border-radius')
  }
  const popup_border_color = getResponsiveSetting(settings, 'popup_border_color')
  if (popup_border_color) {
    styles += `border-color:${popup_border_color.color};`
  }
  const animations_offcanvas = getResponsiveSetting(settings, 'animations_offcanvas')
  timeout = _.get(getResponsiveSetting(settings, 'time'), 'size', 0)
  if (timeout && type_popup === 'popup' && animations_offcanvas === 'slide') {
    styles += `transition-duration:${timeout}ms;`
  }
  return styles;
}}
  max-height: 100%;
  max-width: 100%;
}
& .popup-close-button .altrp-image-placeholder svg{
  width: 100%;
  height: 100%;
  display: block;
}
&.popup-transition-state{
${({settings}) => {
  let styles = '';
  const vertical_position_popup_layout = getResponsiveSetting(settings, 'vertical_position_popup_layout')
  const horizontal_position_popup_layout = getResponsiveSetting(settings, 'horizontal_position_popup_layout')
  /**
   * @var s_direction
   * @type {string}
   */
  const s_direction = getResponsiveSetting(settings, 's_direction') || 'left'
  let topOffset = '0';
  let leftOffset = '0';
  let leftOffsetEnd = '0';
  let topOffsetEnd = '0';
  // if(vertical_position_popup_layout === 'top' || vertical_position_popup_layout === 'bottom') {
  //   topOffset = '0'
  // } else {
  //   topOffset = '-50%'
  // }

  if(horizontal_position_popup_layout === 'center') {
    leftOffsetEnd = '-50%'
  }
  if(vertical_position_popup_layout === 'center') {
    topOffsetEnd = '-50%'
  }
  switch (s_direction) {
    case 'left': {
      if(horizontal_position_popup_layout === 'center') {
        leftOffset = '-100%'
      } else {
        leftOffset = '-50%'
      }
      topOffset = topOffsetEnd
    } break;
    case 'top': {
      topOffset = '-50%'
      leftOffset = leftOffsetEnd
    } break;
    case 'right': {
      if(horizontal_position_popup_layout === 'center') {
        leftOffset = '0'
      } else {
        leftOffset = '50%'
      }
      topOffset = topOffsetEnd
    } break;
    case 'bottom': {
      topOffset = '50%'
      leftOffset = leftOffsetEnd
    } break;
  }

  styles += `&-exit-active .popup-window.popup-window.popup-window.popup-window{
      opacity: 0;
      transform: translate(${leftOffset}, ${topOffset});
    }
    &-enter .popup-window.popup-window.popup-window.popup-window{
      opacity: 0;
      transform: translate(${leftOffset}, ${topOffset});
    }
    &-enter-active .popup-window.popup-window.popup-window.popup-window{
      opacity: 1;
      transform: translate(${leftOffsetEnd}, ${topOffsetEnd});
    }`/*
    `
    &-enter-done .popup-window.popup-window.popup-window{
      transform: translate(${leftOffsetEnd}, ${topOffsetEnd});
    }`*/
  return styles
}}
}
&.app-popup_offcanvas .popup-window{
${({settings}) => {
  let styles = ''
  const type_popup = getResponsiveSetting(settings, 'type_popup')
  if (type_popup !== 'offcanvas') {
    return styles
  }
  let top = 0, left = 0, right = 'auto', bottom = 'auto';
  const horizontal_position_popup_layout = getResponsiveSetting(settings, 'horizontal_position_popup_layout')
  const vertical_position_popup_layout = getResponsiveSetting(settings, 'vertical_position_popup_layout')

  switch (vertical_position_popup_layout) {
    case 'bottom': {
      bottom = 0
      top = 'auto'
    }
      break;
    case 'center': {
      styles += 'height:100%;';
    }
      break;
  }
  switch (horizontal_position_popup_layout) {
    case 'right': {
      right = 0
      left = 'auto'
    }
      break;
    case 'center': {
      styles += 'width:100%;';
    }
      break;
  }
  styles += `top:${top};left:${left};right:${right};bottom:${bottom};`
  return styles
}}
}
&&& .popup-close-button{
  padding: 0;
  ${({settings}) => {
  let styles = ''
  const close_pa = getResponsiveSetting(settings, 'close_pa')
  if (close_pa) {
    styles += dimensionsControllerToStyles(close_pa, 'padding')
  }
  const close_right = getResponsiveSetting(settings, 'close_right')
  if (close_right) {
    styles += `right:${sliderStyled(close_right)};`
  }
  const close_top = getResponsiveSetting(settings, 'close_top')
  if (close_top) {
    styles += `top:${sliderStyled(close_top)};`
  }
  let close_c = getResponsiveSetting(settings, 'close_c');
  if (close_c) {
    styles += colorPropertyStyled(close_c, 'background-color')
  }
  close_c = getResponsiveSetting(settings, 'close_c', '.active');
  if (close_c) {
    styles += `&:active{${colorPropertyStyled(close_c, 'background-color')}}`
  }
  close_c = getResponsiveSetting(settings, 'close_c', ':hover');
  if (close_c) {
    styles += `&:hover{${colorPropertyStyled(close_c, 'background-color')}}`
  }
  let icon_fill = getResponsiveSetting(settings, 'icon_fill');
  if (icon_fill) {
    styles += `& svg *{${colorPropertyStyled(icon_fill, 'fill')}}`
  }
  icon_fill = getResponsiveSetting(settings, 'icon_fill', ':hover');
  if (icon_fill) {
    styles += `&:hover svg *{${colorPropertyStyled(icon_fill, 'fill')}}`
  }
  icon_fill = getResponsiveSetting(settings, 'icon_fill', '.active');
  if (icon_fill) {
    styles += `&:active svg *{${colorPropertyStyled(icon_fill, 'fill')}}`
  }
  return styles;
}
}
& .altrp-offcanvas {
  ${({settings}) => {
  let styles = '';
  if (settings.time_offcanvas && settings.time_offcanvas.size) {
    styles += `animation-duration: ${settings.time_offcanvas.size}${settings.time_offcanvas.unit} !important;`
  }
  return styles;
}}
}
`

export default FrontPopupWrapper;
