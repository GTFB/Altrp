import { getResponsiveSetting } from '../../helpers';
import { colorPropertyStyled, dimensionsControllerToStyles, typographicControllerToStyles, sliderStyled, opacityStyled, simplePropertyStyled } from '../../helpers/styles';

const getIconStyles = (settings, id) => {
    const parentClass = `.altrp-element${id}`

    let styles = ``

    styles += `.icon-widget-wrapper {
        display: flex;
        flex-direction: ${getResponsiveSetting(settings, 'flex_direction', '', 'row')};
    }`
    
    styles += `.widget-icon {
        width: auto;
        ${simplePropertyStyled( getResponsiveSetting(settings, 'icon_alignment') , 'align-self')}
    }`

    styles += `.widget-icon img { 
        width: auto;
    }`

    styles += `.content {
        width: 100%;
    }`

    styles += `.title {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'title_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'title_color', '', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'title_margin') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'title_alignment') , 'text-align')}
    }`

    styles += `.description {
        ${typographicControllerToStyles( getResponsiveSetting(settings, 'description_typography') )}
        ${colorPropertyStyled( getResponsiveSetting(settings, 'description_color', '', {color: 'rgb(0, 0, 0)'}) , 'color')}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'description_margin') , "margin")}
        ${simplePropertyStyled( getResponsiveSetting(settings, 'description_alignment') , 'text-align')}
    }`

    styles += `.widget-icon {
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_padding') , "padding")}
        ${dimensionsControllerToStyles( getResponsiveSetting(settings, 'icon_margin') , "margin")}
        ${opacityStyled( getResponsiveSetting(settings, 'icon_opacity') )}
    }`

    return styles
}

export default getIconStyles;