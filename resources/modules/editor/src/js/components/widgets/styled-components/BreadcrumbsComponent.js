
import {getResponsiveSetting} from"../../../../../../front-app/src/js/helpers";
import {typographicControllerToStyles} from "../../../../../../front-app/src/js/helpers/styles";

const BreadcrumbsComponent = styled.div`
  ${({settings}) => {
    let styles = `.bp3-icon svg{
    width:${getResponsiveSetting(settings, 'icon_width') || '20px'};
    height:${getResponsiveSetting(settings, 'icon_height') || '20px'};`

    styles += `}`;
    styles += `& .bp3-icon.bp3-icon{`;
    let icon_ml = getResponsiveSetting(settings, 'icon_ml');
    if(icon_ml){
      styles += `margin-left:${icon_ml};`;
    }
    let icon_mr = getResponsiveSetting(settings, 'icon_mr');
    if(icon_mr){
      styles += `margin-right:${icon_mr};`;
    }
    styles += `}`;

    styles += `.altrp-menu-item__icon {display:flex;}`;
    let height = getResponsiveSetting(settings, 'height');
    if(height){
      styles += `.bp3-breadcrumbs{height:${height};}`;
    }
    styles += `.bp3-breadcrumbs > li::after{`;
    const delimiter = getResponsiveSetting(settings, 'delimiter');
    if(delimiter && delimiter.url){
      styles += `background:url(${delimiter.url}) no-repeat center;`
      styles += `background-size:contain;`
    }
    const delimiter_width = getResponsiveSetting(settings, 'delimiter_width');
    if(delimiter_width){
      styles += `width:${delimiter_width};`
    }
    const delimiter_height = getResponsiveSetting(settings, 'delimiter_height');
    if(delimiter_height){
      styles += `height:${delimiter_height};`
    }
    const delimiter_ml = getResponsiveSetting(settings, 'delimiter_ml');
    if(delimiter_ml){
      styles += `margin-left:${delimiter_ml};`
    }
    const delimiter_mr = getResponsiveSetting(settings, 'delimiter_mr');
    if(delimiter_mr){
      styles += `margin-right:${delimiter_mr};`
    }

    styles += `}`;
    styles += `.bp3-breadcrumb:not(.bp3-breadcrumb-current){`;

    let color = getResponsiveSetting(settings, 'color');

    if(color && color.color){
      styles += `color:${color.color};`;
      styles += `svg, path {fill: ${color.color};}`;
    }
    let font = getResponsiveSetting(settings, 'font');
    if(font){
      styles += typographicControllerToStyles(font);
    }
    styles += `}`;
    styles += `.bp3-breadcrumb:not(.bp3-breadcrumb-current):hover{`;

    color = getResponsiveSetting(settings, 'color', ':hover');

    if(color && color.color){
      styles += `color:${color.color};`;
      styles += `svg, path {fill: ${color.color};}`;
    }
    font = getResponsiveSetting(settings, 'font', ':hover');

    if(font){
      styles += typographicControllerToStyles(font);
    }
    styles += `}`;

    styles += `.bp3-breadcrumb-current{`;

    let current_color = getResponsiveSetting(settings, 'current_color');

    if(current_color && current_color.color){
      styles += `color:${current_color.color};`;
      styles += `svg, path {fill: ${current_color.color};}`;
    }

    let current_font = getResponsiveSetting(settings, 'current_font');

    if(current_font){
      styles += typographicControllerToStyles(current_font);
    }

    styles += `}`;

    return styles;
  }}
`;

export default BreadcrumbsComponent;
