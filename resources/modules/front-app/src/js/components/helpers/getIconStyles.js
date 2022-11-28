import { getResponsiveSetting } from '../../helpers';
import { colorPropertyStyled, dimensionsControllerToStyles, typographicControllerToStyles, sliderStyled, opacityStyled, simplePropertyStyled } from '../../helpers/styles';

const getIconStyles = (settings, id) => {

    let styles = ``

    styles += `.icon-widget-wrapper {
        ${simplePropertyStyled( getResponsiveSetting(settings, 'icon_position', '') , 'flex-direction')}
    }`

    styles += `.icon-widget__icon * {
        height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height') )};
        ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', '', 'rgb(0, 0, 0)') , 'fill')}
    }`

    styles += `.state-disabled .icon-widget-wrapper {
          ${simplePropertyStyled( getResponsiveSetting(settings, 'icon_position', '.state-disabled', 'column') , 'flex-direction')}
      }`

    styles += `.state-disabled .icon-widget__icon * {
          height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height', '.state-disabled') )};
          ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', '.state-disabled', 'rgb(0, 0, 0)') , 'fill')}
      }`

    styles += `.active .icon-widget-wrapper {
            ${simplePropertyStyled( getResponsiveSetting(settings, 'icon_position', '.active', 'column') , 'flex-direction')}
        }`

    styles += `.active .icon-widget__icon * {
            height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height', '.active') )};
            ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', '.active', 'rgb(0, 0, 0)') , 'fill')}
        }`

    styles += `.icon-widget__icon:hover  {
        height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height', ':hover') )};
    }`
    styles += `.icon-widget__icon:hover * {
        ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', ':hover', 'rgb(0, 0, 0)') , 'fill')}
    }`

    styles += `.title {
        ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '') , 'text-align')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', '') , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin') , "margin")}
    }`

    styles += `.state-disabled .title {
          ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '.state-disabled') , 'text-align')}
          ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography', '.state-disabled') )}
          ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', '.state-disabled') , 'color')}
          ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding', '.state-disabled') , "padding")}
          ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin', '.state-disabled') , "margin")}
    }`

    styles += `.active .title {
            ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '.active') , 'text-align')}
            ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography', '.active') )}
            ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', '.active') , 'color')}
            ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding', '.active') , "padding")}
            ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin', '.active') , "margin")}
    }`

    styles += `.title:hover {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography', ':hover') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', ':hover') , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin', ':hover') , "margin")}
    }`

    styles += `.description {
        ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '') , 'text-align')}
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', '') , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin') , "margin")}
    }`

    styles += `.state-disabled .description {
          ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '.state-disabled') , 'text-align')}
          ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography', '.state-disabled') )}
          ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', '.state-disabled') , 'color')}
          ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding', '.state-disabled') , "padding")}
          ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin', '.state-disabled') , "margin")}
    }`

    styles += `.active .description {
            ${simplePropertyStyled( getResponsiveSetting(settings, 'content_alignment', '.active') , 'text-align')}
            ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography', '.active') )}
            ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', '.active') , 'color')}
            ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding', '.active') , "padding")}
            ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin', '.active') , "margin")}
    }`

    styles += `.description:hover {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography', ':hover') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', ':hover') , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin', ':hover') , "margin")}
    }`

    styles += `.icon-widget__icon {`

    switch (getResponsiveSetting(settings, 'icon_position', '')) {
        case 'column':
        case 'column-reverse':
            styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_horizontal_alignment', '', 'center') , 'justify-content')
            break;
        case 'row':
        case 'row-reverse':
            styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_vertical_alignment', '', 'center') , 'align-items')
            break;
    }

  styles += `${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', '') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin') , "margin")}
        ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity') )}
    }`

    styles += `.state-disabled .icon-widget__icon {`

    switch (getResponsiveSetting(settings, 'icon_position', '.state-disabled', 'column')) {
      case 'column':
      case 'column-reverse':
        styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_horizontal_alignment', '.state-disabled', 'center') , 'justify-content')
        break;
      case 'row':
      case 'row-reverse':
        styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_vertical_alignment', '.state-disabled', 'center') , 'align-items')
        break;
    }

    styles += `${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', '.state-disabled') , "padding")}
          ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin', '.state-disabled') , "margin")}
          ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity', '.state-disabled') )}
      }`

    styles += `.active .icon-widget__icon {`

    switch (getResponsiveSetting(settings, 'icon_position', '.active', 'column')) {
      case 'column':
      case 'column-reverse':
        styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_horizontal_alignment', '.active', 'center') , 'justify-content')
        break;
      case 'row':
      case 'row-reverse':
        styles += simplePropertyStyled( getResponsiveSetting(settings, 'icon_vertical_alignment', '.active', 'center') , 'align-items')
        break;
    }

    styles += `${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', '.active') , "padding")}
            ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin', '.active') , "margin")}
            ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity', '.active') )}
    }`

    styles += `.icon-widget__icon:hover {
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin', ':hover') , "margin")}
        ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity', ':hover') )}
    }}`

    return styles
}

export default getIconStyles;
