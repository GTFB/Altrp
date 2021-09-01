const {getResponsiveSetting} = window.altrpHelpers;
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

  return styles;
}}
  max-height: 100%;
  max-width: 100%;
}
& .popup-close-button .altrp-image-placeholder svg{
  width: 100%;
  height: 100%;
}
&&& .popup-close-button{
  transform: translate(50%, -50%);
  padding: 0;
  ${({settings}) => {
  let styles = ''
  const close_pa = getResponsiveSetting(settings, 'close_pa')
  if(close_pa){
    styles += dimensionsControllerToStyles(close_pa, 'padding')
  }
  const close_right = getResponsiveSetting(settings, 'close_right')
  if(close_right){
    styles += `right:${sliderStyled(close_right)};`
  }
  const close_top = getResponsiveSetting(settings, 'close_top')
  if(close_top){
    styles += `top:${sliderStyled(close_top)};`
  }
  let close_c = getResponsiveSetting(settings, 'close_c');
  if(close_c){
    styles += colorPropertyStyled(close_c, 'background-color')
  }
  close_c = getResponsiveSetting(settings, 'close_c', '.active');
  if(close_c){
    styles += `&:active{${colorPropertyStyled(close_c, 'background-color')}}`
  }
  close_c = getResponsiveSetting(settings, 'close_c', ':hover');
  if(close_c){
    styles += `&:hover{${colorPropertyStyled(close_c, 'background-color')}}`
  }
  let icon_fill = getResponsiveSetting(settings, 'icon_fill');
  if(icon_fill){
    styles += `& svg *{${colorPropertyStyled(icon_fill, 'fill')}}`
  }
  icon_fill = getResponsiveSetting(settings, 'icon_fill', ':hover');
  if(icon_fill){
    styles += `&:hover svg *{${colorPropertyStyled(icon_fill, 'fill')}}`
  }
  icon_fill = getResponsiveSetting(settings, 'icon_fill', '.active');
  if(icon_fill){
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
