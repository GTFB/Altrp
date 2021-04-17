import styled from 'styled-components';

const ImagePlaceholder = styled.div`& {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  width: ${props => {
    if(_.isNumber(props.width)) {
      return props.width + 'px'; 
    }
    return props.width ? props.width : '100%'
  }};  
  height: ${props => props.height ? props.height : ''}; 
  background-color: ${props => props.color ? props.color : '#fff'}; 
}
&::before{
  display: block;
  content: '';
  width: 100%;
  ${(props) => {
  let style = '';
  if(props.height && _.isString(props.height) && props.height.indexOf('%') === -1) {
    return style;
  }
  if (Number(props.mediaWidth) && Number(props.mediaHeight)) {
    style += `padding-top:${(props.mediaHeight / props.mediaWidth) * 100}%;`
  }
  return style;
}};
}
&& .altrp-skeleton,
&& .altrp-image{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;  
}
`;

export default ImagePlaceholder;