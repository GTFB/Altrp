import styled from 'styled-components';

const ImagePlaceholder = styled.div`& {
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
`;

export default ImagePlaceholder;