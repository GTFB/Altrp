import { backgroundImageControllerToStyles, colorPropertyStyled, dimensionsControllerToStyles, simplePropertyStyled, sliderStyled, styledString, typographicControllerToStyles } from "../../../../../../front-app/src/js/helpers/styles";
import { getResponsiveSetting } from "../../../../../../front-app/src/js/helpers";

export default function InputCropImageComponent(settings) {
  const getSetting = (...args) => getResponsiveSetting(settings, ...args)

  let styles = ``

  styles += `.image-to-crop-container {
    ${simplePropertyStyled(sliderStyled(getSetting('width', '', {size: 100, unit: '%'})), 'width')}
    ${simplePropertyStyled(sliderStyled(getSetting('height', '', {size: 300, unit: 'px'})), 'height')}
  }`

  styles += `.image-crop-container {
    ${simplePropertyStyled(sliderStyled(getSetting('crop_height') || getSetting('height', '', {size: 300, unit: 'px'})), 'height')}
    ${simplePropertyStyled(sliderStyled(getSetting('crop_width') || getSetting('width', '', {})), 'width')}
  }`

  styles += `.crop-image-background {
    ${backgroundImageControllerToStyles(getSetting('background_image'))}
    ${simplePropertyStyled(getSetting('background_position', '', 'center'), 'background-position')}
    ${simplePropertyStyled(getSetting('background_attachment'), 'background-attachment')}
    ${simplePropertyStyled(getSetting('background_repeat', '', 'no-repeat'), 'background-repeat')}
    ${simplePropertyStyled(sliderStyled(getSetting('background_image_width')), 'background-image-width')}
    ${simplePropertyStyled(getSetting('background_size', '', 'contain'), 'background-size')}
  }`

  styles += `.crop-image-background:hover {
    ${backgroundImageControllerToStyles(getSetting('background_image', ':hover'))}
    ${simplePropertyStyled(getSetting('background_position', ':hover'), 'background-position')}
    ${simplePropertyStyled(getSetting('background_attachment', ':hover'), 'background-attachment')}
    ${simplePropertyStyled(getSetting('background_repeat', ':hover'), 'background-repeat')}
    ${simplePropertyStyled(sliderStyled(getSetting('background_image_width', ':hover')), 'background-image-width')}
    ${simplePropertyStyled(getSetting('background_size', ':hover'), 'background-size')}
  }`

  styles += `.crop-image-text {
    ${typographicControllerToStyles(getSetting('text_typographic'))}
    ${colorPropertyStyled(getSetting('text_color', '', {color: 'rgb(0, 0, 0)'}), 'color')}
    ${dimensionsControllerToStyles(getSetting('text_margin'), 'margin')}
  }`

  styles += `.crop-image-text:hover {
    ${typographicControllerToStyles(getSetting('text_typographic', ':hover'))}
    ${colorPropertyStyled(getSetting('text_color', ':hover', {color: 'rgb(0, 0, 0)'}), 'color')}
    ${dimensionsControllerToStyles(getSetting('text_margin', ':hover'), 'margin')}
  }`

  return styles
}
