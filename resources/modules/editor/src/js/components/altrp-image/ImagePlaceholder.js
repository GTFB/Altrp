import styled from 'styled-components';
import getResponsiveSetting from '../../../../../front-app/src/js/helpers/get-responsive-setting'

const ImagePlaceholder = styled.div`&{
  ${props => {
  if (_.isNumber(props.width)) {
    return 'width:' + props.width + 'px';
  }
  return props.width ? `width: ${props.width}` : ''
}};
${(props) => {
  if(props.color){
    return `background-color: ${props.color};`
  }
  return ''
}}
}
&::before{
${(props) => {
  const {settings, height} = props;
  let style = '';
  const aspect_ratio_size = getResponsiveSetting(settings, 'aspect_ratio_size');
  if(Number(aspect_ratio_size) !== 0) {
    if(aspect_ratio_size === 'custom') {
      let custom_aspect = getResponsiveSetting(settings, 'custom_aspect');
      custom_aspect = Number(custom_aspect) || 100;
      style += `padding-top:${custom_aspect}%;`;
    } else if(Number(aspect_ratio_size)){
      style += `padding-top:${aspect_ratio_size}%;`;
    }
    return style;
  }
  if (height && _.isString(height) && height.indexOf('%') === -1) {
    return style;
  }
  if (Number(props.mediaWidth) && Number(props.mediaHeight)) {
    style += `padding-top:${(props.mediaHeight / props.mediaWidth) * 100}%;`
  }
  return style;
}};
}
`;

export default ImagePlaceholder;
