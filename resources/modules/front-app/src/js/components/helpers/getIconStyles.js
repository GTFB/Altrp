import { getResponsiveSetting } from '../../helpers';
import { colorPropertyStyled, dimensionsControllerToStyles, typographicControllerToStyles, sliderStyled, opacityStyled, simplePropertyStyled } from '../../helpers/styles';

const getIconStyles = (settings, id) => {
    const parentClass = `.altrp-element${id}`

    let styles = ``

    styles += `.icon-widget-wrapper {
        display: flex;
        flex-direction: ${getResponsiveSetting(settings, 'flex_direction', '', 'column')};
    }`

    styles += `.icon-widget__icon * {
        width: auto;
        height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height') )};
        ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', '', 'rgb(0, 0, 0)') , 'fill')}
    }`

    styles += `.icon-widget__icon *:hover {
        width: auto;
        height: ${sliderStyled( getResponsiveSetting(settings, 'icon_height', ':hover') )};
        ${colorPropertyStyled( getResponsiveSetting(settings, 'icon_fill', ':hover', 'rgb(0, 0, 0)') , 'fill')}
    }`

    styles += `.content {
        width: 100%;
    }`

    styles += `.title {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', '', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'title_alignment', '', 'center') , 'text-align')}
    }`

    styles += `.title:hover {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography', ':hover') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', ':hover', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin', ':hover') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'title_alignment', ':hover', 'center') , 'text-align')}
    }`

    styles += `.description {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', '', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'description_alignment', '', 'center') , 'text-align')}
    }`

    styles += `.description:hover {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography', ':hover') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', ':hover', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin', ':hover') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'description_alignment', ':hover', 'center') , 'text-align')}
    }`

    styles += `.icon-widget__icon {
        width: auto;
        display: flex;
        justify-content: center;
        ${simplePropertyStyled( getResponsiveSetting(settings, 'icon_alignment', '', 'center') , 'align-self')}

        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', '') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin') , "margin")}
        ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity') )}
    }`

    styles += `.icon-widget__icon:hover {
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding', ':hover') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin', ':hover') , "margin")}
        ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity', ':hover') )}
    }`

    return styles
}

export default getIconStyles;